<!-- TITLE/ -->

<h1>gridsome-plugin-remark-prismjs-all</h1>

<!-- /TITLE -->


<!-- BADGES/ -->

<span class="badge-npmversion"><a href="https://npmjs.org/package/gridsome-plugin-remark-prismjs-all" title="View this project on NPM"><img src="https://img.shields.io/npm/v/gridsome-plugin-remark-prismjs-all.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/gridsome-plugin-remark-prismjs-all" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/gridsome-plugin-remark-prismjs-all.svg" alt="NPM downloads" /></a></span>
<span class="badge-daviddm"><a href="https://david-dm.org/DavidCouronne/gridsome-plugin-remark-prismjs-all" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/DavidCouronne/gridsome-plugin-remark-prismjs-all.svg" alt="Dependency Status" /></a></span>
<span class="badge-daviddmdev"><a href="https://david-dm.org/DavidCouronne/gridsome-plugin-remark-prismjs-all#info=devDependencies" title="View the status of this project's development dependencies on DavidDM"><img src="https://img.shields.io/david/dev/DavidCouronne/gridsome-plugin-remark-prismjs-all.svg" alt="Dev Dependency Status" /></a></span>
<br class="badge-separator" />

<!-- /BADGES -->


<a href="https://twitter.com/nollan94" target="_blank">
    <img alt="Twitter: nollan94" src="https://img.shields.io/twitter/follow/nollan94.svg?style=social" />
</a>

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/DavidCouronne/gridsome-plugin-remark-prismjs-all/issues)


Adds syntax highlighting to code blocks in markdown files using [PrismJS](https://prismjs.com/)

See live demo [here](https://kind-elion-23889d.netlify.com/demo-gridsome-plugin-remark-prismjs-all/) !

Inspired by [gatsby-remark-prismjs](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-prismjs)



![example](https://github.com/DavidCouronne/gridsome-plugin-remark-prismjs-all/blob/master/snapshots/snapshot-night-owl.png?raw=true)

## Install

```bash
npm i gridsome-plugin-remark-prismjs-all
```

### Add plugin in gridsome.config.js

```js
// In your gridsome.config.js
transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        'gridsome-plugin-remark-prismjs-all',
      ]
    }
  }
```

### Add theme in your main.js

There is only 3 themes available at this time. Contributions welcomes !

```js
// In your main.js
require("gridsome-plugin-remark-prismjs-all/themes/night-owl.css");
```

```js
// In your main.js
require("gridsome-plugin-remark-prismjs-all/themes/tomorrow.css");
```

```js
// In your main.js
require("gridsome-plugin-remark-prismjs-all/themes/solarized.css");
```

## Options

### With some options:

```js
// In your gridsome.config.js
transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        ['gridsome-plugin-remark-prismjs-all', {
            highlightClassName: "myCustomClass", //Default `gridsome-highlight`
            codeTitleClassName: "customCodeTitle", //Default 'gridsome-code-title'
            showLineNumbers: true, //  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
            languageExtensions: [
              {
                language: "superscript",
                extend: "javascript",
                definition: {
                  superscript_types: /(SuperType)/,
                },
                insertBefore: {
                  function: {
                    superscript_keywords: /(superif|superelse)/,
                  },
                },
              },
            ],

        }]
      ]
    }
  }
```

### All default options

```js
// In your gridsome.config.js
transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        ['gridsome-plugin-remark-prismjs-all', {
            highlightClassName: "gridsome-highlight",
            codeTitleClassName: "gridsome-code-title",
            classPrefix: 'language-',
            aliases: {},
            noInlineHighlight: false,
            showLineNumbers: false,     //  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
            languageExtensions: [],
            prompt: {                   //  `require("prismjs/plugins/command-line/prism-command-line.css");`
                user: `root`,
                host: `localhost`,
                global: false,
            }
        }]
      ]
    }
  }
```

## Include CSS

### Required: Pick a PrismJS theme or create your own

PrismJS ships with a number of [themes](https://github.com/PrismJS/prism/tree/1d5047df37aacc900f8270b1c6215028f6988eb1/themes)

Additional themes: [prism-themes](https://github.com/PrismJS/prism-themes)

To load a theme, just require its CSS file in your `main.js` file, e.g.

```js
require("prismjs/themes/prism-solarizedlight.css");
```

### Add line numbering and line highlighting styles

If you want to add line numbering alongside your code, you need to import the corresponding CSS file from PrismJS, right after importing your colorscheme in `main.js`

```js
//main.js
require("prismjs/themes/prism-solarizedlight.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");
```

You also need to add some additional CSS:

```css
/**
 * Add back the container background-color, border-radius, padding, margin
 * and overflow that we removed from <pre>.
 */
.gridsome-highlight {
  background-color: #fdf6e3; //for solarized theme
  border-radius: 0.3em;
  margin: 0.5em 0;
  padding: 1em;
  overflow: auto;
}
.gridsome-highlight-code-line {
  background-color: #feb; //for solarized theme
  display: block;
  margin-right: -1em;
  margin-left: -1em;
  padding-right: 1em;
  padding-left: 0.75em;
  border-left: 0.25em solid #f99;
}

/**
 * Remove the default PrismJS theme background-color, border-radius, margin,
 * padding and overflow.
 * 1. Make the element just wide enough to fit its content.
 * 2. Always fill the visible space in .gatsby-highlight.
 * 3. Adjust the position of the line numbers
 */
.gridsome-highlight pre[class*="language-"] {
  background-color: transparent;
  margin: 0;
  padding: 0;
  overflow: initial;
  float: left; /* 1 */
  min-width: 100%; /* 2 */
}

/* Adjust the position of the line numbers */
.gridsome-highlight pre[class*="language-"].line-numbers {
  padding-left: 2.8em;
}
```

### Code titles styling

Example:

````
```js{codeTitle: "In src/main.js"}
require("prismjs/themes/prism-solarizedlight.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")
require("prismjs/plugins/command-line/prism-command-line.css")
```
````

is render:

```html
<div class="gridsome-code-title">
  <span>In src/main.js</span>
</div>
<div class="gridsome-highlight" data-language="js">
  <pre class="language-js">
        ... code here
    </pre
  >
</div>
```

You can add this CSS:

```css
.gridsome-code-title {
  position: relative;
  z-index: 100;
  margin-bottom: -0.8em;
  background-color: #feb; //solarized highlight lines color
  color: red; // why not ;-)
  font-style: italic;
  font-weight: 100;
  text-align: center;
  font-family: PT Mono, Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  line-height: 1.5;
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
}
```

You can also target the `span`tag.

## Usage in Markdown

### Basic usage

````markdown
```js
const myvar = 'some value";
```
````

### Code Title

````md
```js{codeTitle: "In src/main.js"}
require("prismjs/themes/prism-solarizedlight.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");
require("prismjs/plugins/command-line/prism-command-line.css");
```
````

### Lines Numbers

To see the line numbers alongside your code, you can use the `numberLines` option:

````md
```html{numberLines: true}
<template>
  <Layout>
    <h2>Latest blog posts</h2>
    <ul>
      <li v-for="edge in $page.allWordPressPost.edges" :key="edge.node.id">
        {{ edge.node.title }}
      </li>
    </ul>
  </Layout>
</template>
```
````

You can also start numbering at any index you wish (here, numbering
will start at index 21):

````md
```html{numberLines: 21}
<template>
  <Layout>
    <h2>Latest blog posts</h2>
    <ul>
      <li v-for="edge in $page.allWordPressPost.edges" :key="edge.node.id">
        {{ edge.node.title }}
      </li>
    </ul>
  </Layout>
</template>
```
````

### Lines Highlighting

You can also add line highlighting. It adds a span around lines of code with a
special class `.gridsome-highlight-code-line` that you can target with styles.

You can specify the highlighted lines outside of the code block.
In the following code snippet, lines 3 and 5 through 7 will get the line
highlighting. The line range parsing is done with
<https://www.npmjs.com/package/parse-numeric-range>.

````md
```html{3,5-7}
<template>
  <Layout>
    <h2>Latest blog posts</h2>
    <ul>
      <li v-for="edge in $page.allWordPressPost.edges" :key="edge.node.id">
        {{ edge.node.title }}
      </li>
    </ul>
  </Layout>
</template>
```
````

### All Together

````md
```html{3,5-7}{numberLines: 21}{codeTitle: "In src/pages/Index.vue"}
<template>
  <Layout>
    <h2>Latest blog posts</h2>
    <ul>
      <li v-for="edge in $page.allWordPressPost.edges" :key="edge.node.id">
        {{ edge.node.title }}
      </li>
    </ul>
  </Layout>
</template>
```
````

### Prompt

To show fancy prompts next to shell commands (only triggers on `bash`), either set `prompt.global` to `true` in `gridsome.config.js`,
or pass at least one of `{outputLines: <range>}`, `{promptUser: <user>}`, or `{promptHost: <host>}` to a snippet

By default, every line gets a prompt appended to the start, this behaviour can be changed by specifying `{outputLines: <range>}`
to the language.

````
```bash{outputLines: 2-10,12}
````

The user and host used in the appended prompt is pulled from the `prompt.user` and `prompt.host` values,
unless explicitly overridden by the `promptUser` and `promptHost` options in the snippet, e.g.:

````
```bash{promptUser: alice}{promptHost: dev.localhost}
````

### Add new language definition or extend an existing language

You can provide a language extension by giving a single object or an array of
language extension objects as the `languageExtensions` option.

A language extension object looks like this:

```javascript
languageExtensions: [
  {
    language: "superscript",
    extend: "javascript",
    definition: {
      superscript_types: /(SuperType)/
    },
    insertBefore: {
      function: {
        superscript_keywords: /(superif|superelse)/
      }
    }
  }
];
```

used options:

- `language` (optional) The name of the new language.
- `extend` (optional) The language you wish to extend.
- `definition` (optional) This is the Prism language definition.
- `insertBefore` (optional) Is used to define where in the language definition we want to insert our extension.

More information of the format can be found here:
https://prismjs.com/extending.html

Note:

- One of the parameters `language` and `extend` is needed.
- If only `language` is given, a new language will be defined from scratch.
- If only `extend` is given, an extension will be made to the given language.
- If both `language` and `extend` is given, a new language that extends the `extend` language will
  be defined.

In case a language is extended, note that the definitions will not be merged.
If the extended language definition and the given definition contains the same
token, the original pattern will be overwritten.

One of the parameters `definition` and `insertBefore` needs to be defined.
`insertBefore` needs to be combined with `definition` or `extend` (otherwise
there will not be any language definition tokens to insert before).

In addition to this extension parameters the css also needs to be updated to
get a style for the new tokens. Prism will wrap the matched tokens with a
`span` element and give it the classes `token` and the token name you defined.
In the example above we would match `superif` and `superelse`. In the html
it would result in the following when a match is found:

```html
<span class="token superscript_keywords">superif</span>
```

<!-- HISTORY/ -->

<h2>History</h2>

<a href="https://github.com/DavidCouronne/gridsome-plugin-remark-prismjs-all/releases">Discover the release history by heading on over to the releases page.</a>

<!-- /HISTORY -->