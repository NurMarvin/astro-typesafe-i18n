type Pattern = {
  regex: RegExp;
  replacement: string | ((lang: string, groups: string[]) => string);
};

const patterns: Pattern[] = [
  // Links ([text](url))
  {
    regex: /\[([^\]]+)\]\(([^)]+)\)/g,
    replacement: (lang: string, groups) => {
      const url = groups[1].startsWith("http")
        ? groups[1]
        : `${lang === "en" ? "" : `/${lang}`}${groups[1]}`;

      return `<a href="${url}">${groups[0]}</a>`;
    },
  },

  // Bold (**)
  {
    regex: /\*\*([^*]+)\*\*/g,
    replacement: "<strong>$1</strong>",
  },

  // Underlined (__)
  { regex: /__([^_]+)__/g, replacement: "<u>$1</u>" },

  // Italic (* or _)
  { regex: /\*([^*]+)\*/g, replacement: "<em>$1</em>" },
  { regex: /_([^_]+)_/g, replacement: "<em>$1</em>" },

  // Inline code (``code`` or `code`)
  { regex: /``([^`]+)``/g, replacement: "<code><pre>$1</pre></code>" },
  { regex: /`([^`]+)`/g, replacement: "<code><pre>$1</pre></code>" },
];

export function parseMarkdown(lang: string, markdownText: string): string {
  let result = markdownText;

  for (let i = 0; i < 3; i++) {
    for (const pattern of patterns) {
      result = result.replace(pattern.regex, (match, ...groups) => {
        return typeof pattern.replacement === "string"
          ? match.replace(pattern.regex, pattern.replacement)
          : pattern.replacement(lang, groups);
      });
    }
  }

  return result;
}
