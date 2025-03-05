# Astro Typesafe i18n implementation

This is an example of how to implement a typesafe i18n system with TypeScript for use in Astro projects. It supports variable interpolation and markdown to make it as flexible as possible without having to duplicate strings in translations and code.

Most of the implementation is in the `src/lib/i18n` folder:

- `src/lib/i18n/ui.ts` contains all the UI strings that are used in the project
- `src/lib/i18n/types.ts` contains the types that make the i18n system typesafe
- `src/lib/i18n/utils.ts` contains the implementation of the actual i18n system

## Disclaimer

The i18n system was implemented without using any external libraries for simplicity and to have full control over how translations are handled. For this reason, Markdown parsing was done using very simple RegEx, which you should normally avoid, and it is recommended to use a proper Markdown parsing library like [marked.js](https://github.com/markedjs/marked) for this instead.

Also, the i18n system is very basic and does not support things like pluralization, so if that's a requirement, you'll have to look into implementing it yourself or using a library that supports it.

## Usage

To use the i18n system, you need to import the `useTranslations` hook from `src/lib/i18n/utils.ts` which will give you a `t` function that you can use to translate strings. The `t` function takes a `key` and if the translation has variables, it will also take an object with the variables.

If you use Markdown in a translation, you need to use the `Translate` component from `src/components/Translate.astro`, because Astro normally escapes HTML in strings, but since the Markdown is converted to HTML, it needs to be wrapped by `<Fragment set:html={html} />` to prevent the HTML from being escaped.

Additionally, if you are using the `Translate` component in an island, you need to pass the `lang` prop to the `Translate` component, because the component will be unable to extract the language from the URL.

## Example

```astro
---
import Translate from "./Translate.astro";
import { getLangFromUrl, useTranslations } from "../lib/i18n/utils";

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<div>
<h1>{t("hello")}</h1>
<Translate lang={lang} key="markdown" />

<h2>{t("greeting", { name: "John" })}</h2>
<Translate lang={lang} key="greeting" variables={{ name: "John" }} />
</div>
```

For a full example, check the `src/components/Welcome.astro` and `src/lib/i18n/ui.ts` files.

## Seeing the i18n system in action

To see the i18n system in action, you can either clone this repository and run it locally or check out the live demo at [astro-typesafe-i18n.pages.dev](https://astro-typesafe-i18n.pages.dev/).

To run the project locally, you need to have Node.js installed and run the following commands:

```bash
pnpm install
pnpm dev
```

This will start the development server and you can see the project at [localhost:4321](http://localhost:4321/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
