import { parseMarkdown } from "../markdown";
import { throwInProduction } from "../misc";
import {
  allowedTypes,
  type StringVariables,
  type VariableTypes,
} from "./types";
import { ui, defaultLang, type Languages, type Translations } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: Languages) {
  return function t<K extends keyof Translations>(
    key: K,
    ...args: StringVariables<Translations[K]> extends undefined
      ? []
      : [variables: StringVariables<Translations[K]>]
  ) {
    let value: string =
      ui[lang][key as keyof (typeof ui)[typeof lang]] || ui[defaultLang][key];

    if (!value) {
      throwInProduction(`Missing translation for key ${key}`);
      return key;
    }

    if (args.length === 0) {
      return parseMarkdown(lang, value);
    }

    const variables = args[0];

    if (!variables) {
      return value;
    }

    const matches = value.match(/{([^,}]+)(?:,([^}]+))?}/g) || [];
    const variablesMap = matches.reduce<Record<string, VariableTypes>>(
      (acc, match) => {
        const [variable, type = "string"] = match
          .slice(1, -1)
          .split(",")
          .map((v) => v.trim());

        acc[variable] = ensureType(key, variable, type);
        return acc;
      },
      {}
    );

    for (const [variable, replacement] of Object.entries(variables)) {
      const variableType = variablesMap[variable];
      const replacementValue = getReplacementValue(
        key,
        replacement,
        variable,
        variableType,
        lang
      );

      value = value.replace(
        new RegExp(`{${variable}(?:,[^}]*)?}`, "g"),
        replacementValue || `{${variable}}`
      );
    }

    return parseMarkdown(lang, value);
  };
}

function ensureType(
  key: string,
  variable: string,
  type: string
): VariableTypes {
  if (!allowedTypes.includes(type)) {
    throwInProduction(
      `Invalid type "${type}" for variable "${variable}" in key "${key}"`
    );
    return "string";
  }

  return type as VariableTypes;
}

function getReplacementValue(
  key: string,
  value: unknown,
  variableName: string,
  expectedType: VariableTypes,
  lang: string
) {
  let actualType: string;
  let replacement: string | null = null;

  if (value === null || value === undefined) {
    actualType = "string";
  } else if (expectedType === "date") {
    actualType = "date";
    replacement = new Date(value as string).toLocaleDateString(lang);
  } else {
    actualType = typeof value;
    replacement = String(value);
  }

  if (actualType !== expectedType) {
    throwInProduction(
      `Invalid value "${value}" for variable "${variableName}" in key "${key}". Expected type "${expectedType}", but got "${actualType}"`
    );
  }

  return replacement;
}
