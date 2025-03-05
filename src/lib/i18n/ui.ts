export const languages = {
  en: "English",
  de: "Deutsch",
  cn: "简体中文",
};
export type Languages = keyof typeof languages;

export const defaultLang = "en";

const en = {
  getStarted: "To get started, open the ``{file}`` directory in your project.",
  docs: "Read our docs",
  joinDiscord: "Join our Discord",
  "whatsnew.title": "What's New in Astro 5.0?",
  "whatsnew.paragraph":
    "From content layers to server islands, click to learn more about the new features and improvements in Astro 5.0.",
  "languages.title": "Other Languages",
  "moreI18nExamples.title": "More i18n Examples",
  "moreI18nExamples.date.title": "Date",
  "moreI18nExamples.date.example": "{date,date}",
  "moreI18nExamples.number.title": "Number",
  "moreI18nExamples.number.example": "{number,number}",
  "moreI18nExamples.boolean.title": "Boolean",
  "moreI18nExamples.boolean.example": "{bool,boolean}",
  "moreI18nExamples.link.title": "Link",
  "moreI18nExamples.link.example": "[Text]({link})",
  "moreI18nExamples.combined.title": "Combined",
  "moreI18nExamples.combined.example":
    "Example __{bool,boolean}__ **{number,number}** *{date,date}* [{link}]({link})",
} as const;

export const otherLanguages: Record<
  Exclude<Languages, "en">,
  Partial<Record<keyof typeof en, string>>
> = {
  de: {
    getStarted:
      "Um loszulegen, öffne das ``{file}`` Verzeichnis in deinem Projekt.",
    docs: "Lies unsere Dokumentation",
    joinDiscord: "Trete unserem Discord bei",
    "whatsnew.title": "Was ist neu in Astro 5.0?",
    "whatsnew.paragraph":
      "Von Content-Layern bis hin zu Serverinseln, klicke hier, um mehr über die neuen Funktionen und Verbesserungen in Astro 5.0 zu erfahren.",
    "languages.title": "Andere Sprachen",
    "moreI18nExamples.title": "Mehr i18n Beispiele",
    "moreI18nExamples.date.title": "Datum",
    "moreI18nExamples.date.example": "{date,date}",
    "moreI18nExamples.number.title": "Zahl",
    "moreI18nExamples.number.example": "{number,number}",
    "moreI18nExamples.boolean.title": "Boolean",
    "moreI18nExamples.boolean.example": "{bool,boolean}",
    "moreI18nExamples.link.title": "Link",
    "moreI18nExamples.link.example": "[Text]({link})",
    "moreI18nExamples.combined.title": "Kombination",
    "moreI18nExamples.combined.example":
      "Beispiel __{bool,boolean}__ **{number,number}** *{date,date}* [{link}]({link})",
  },
  cn: {
    getStarted: "要开始，请在您的项目中打开 ``{file}`` 目录。",
    docs: "阅读我们的文档",
    joinDiscord: "加入我们的 Discord",
    "whatsnew.title": "Astro 5.0 有什么新功能？",
    "whatsnew.paragraph":
      "从内容层到服务器岛，点击了解 Astro 5.0 中的新功能和改进。",
    "languages.title": "其他语言",
    "moreI18nExamples.title": "更多 i18n 示例",
    "moreI18nExamples.date.title": "日期",
    "moreI18nExamples.date.example": "{date,date}",
    "moreI18nExamples.number.title": "数字",
    "moreI18nExamples.number.example": "{number,number}",
    "moreI18nExamples.boolean.title": "布尔值",
    "moreI18nExamples.boolean.example": "{bool,boolean}",
    "moreI18nExamples.link.title": "链接",
    "moreI18nExamples.link.example": "[文本]({link})",
    "moreI18nExamples.combined.title": "组合",
    "moreI18nExamples.combined.example":
      "示例 __{bool,boolean}__ **{number,number}** *{date,date}* [{link}]({link})",
  },
} as const;

export const ui = {
  en,
  ...otherLanguages,
} as const;
export type Translations = typeof en;
