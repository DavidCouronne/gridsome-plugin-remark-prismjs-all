# gridsome-plugin-remark-prism-all

Adds syntax highlighting to code blocks in markdown files using [PrismJS](https://prismjs.com/)

Inspired by [gatsby-remark-prismjs](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-prismjs)

![example](https://github.com/DavidCouronne/gridsome-plugin-remark-prism-all/blob/master/snapshot.png?raw=true)

## Install

```bash
npm install --save gridsome-plugin-remark-prism-all
```

## How to use

### With default options:

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
require("prismjs/themes/prism-solarizedlight.css")
```

### Add line numbering and line highlighting styles

If you want to add line numbering alongside your code, you need to import the corresponding CSS file from PrismJS, right after importing your colorscheme in `main.js`

```js
//main.js
require("prismjs/themes/prism-solarizedlight.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")
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

``````
```js{codeTitle: "In src/main.js"}
require("prismjs/themes/prism-solarizedlight.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")
require("prismjs/plugins/command-line/prism-command-line.css")
```
``````

is render:

```html
<div class="gridsome-code-title">
    <span>In src/main.js</span>
</div>
<div class="gridsome-highlight" data-language="js">
    <pre class="language-js">
        ... code here
    </pre>
</div>
```

You can add this CSS:

```css
.gridsome-code-title {
	position: relative;
	z-index: 100;
    margin-bottom: -0.8em;
    background-color: #feb; //solarized highlight lines color
    color: red;             // why not ;-)
    font-style: italic;
    font-weight: 100;
    text-align: center;
    font-family: PT Mono, Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
	line-height: 1.5;	
    border-top-left-radius: 0.3em;
    border-top-right-radius: 0.3em;	
}
```

You can also target the `span`.


