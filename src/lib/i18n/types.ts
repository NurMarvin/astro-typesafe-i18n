type TypeMapping = {
  string: string;
  number: number;
  boolean: boolean;
  date: Date;
};

export const allowedTypes: string[] = [
  "string",
  "number",
  "boolean",
  "date",
] satisfies (keyof TypeMapping)[];

export type VariableTypes = keyof TypeMapping;

type ExtractVariableWithType<V extends string> =
  V extends `${infer Name},${infer Type}`
    ? { name: Name; type: Type extends keyof TypeMapping ? Type : "string" }
    : { name: V; type: "string" };

export type HasVariables<T extends string> =
  T extends `${string}{${string}}${string}` ? true : false;

type ExtractVariables<T extends string> =
  T extends `${infer Before}{${infer Variable}}${infer After}`
    ? ExtractVariableWithType<Variable> | ExtractVariables<After>
    : never;

export type StringVariables<T extends string> = HasVariables<T> extends true
  ? {
      [Item in ExtractVariables<T> as Item["name"]]: Item["type"] extends keyof TypeMapping
        ? TypeMapping[Item["type"]]
        : string;
    }
  : undefined;
