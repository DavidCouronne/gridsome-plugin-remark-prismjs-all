const visit = require('unist-util-visit')

const parseOptions = require(`./parse-options`)
const highlightCode = require(`./highlight-code`)
const loadLanguageExtension = require(`./load-prism-language-extension`)
const addLineNumbers = require(`./add-line-numbers`)
const commandLine = require(`./command-line`)




module.exports = options => {
    const customHighlightClassName = options.highlightClassName || `gridsome-highlight`;
    const codeTitleClassName = options.codeTitleClassName || 'gridsome-code-title';
    const classPrefix = options.classPrefix || 'language-';
    const inlineCodeMarker = options.inlineCodeMarker || null;
    const aliases = options.aliases || {};
    const noInlineHighlight = options.noInlineHighlight || false;
    const showLineNumbersGlobal = options.showLineNumbers || false;
    const languageExtensions = options.languageExtensions || [];
    const prompt = options.prompt || {
        user: `root`,
        host: `localhost`,
        global: false,
    };


    const normalizeLanguage = lang => {
        const lower = lang.toLowerCase()
        return aliases[lower] || lower
    }
    //Load language extension if defined
    loadLanguageExtension(languageExtensions)

    // const customcodeTitleClassName = options.codeTitleClassName;
    return tree => {
        //codeTitle(tree, codeTitleClassName);
        visit(tree, "code", (node, index) => {
            let language = node.meta ? node.lang + node.meta : node.lang
            let {
                splitLanguage,
                highlightLines,
                showLineNumbersLocal,
                numberLinesStartAt,
                outputLines,
                promptUserLocal,
                promptHostLocal,
                codeTitle
            } = parseOptions(language)
            const showLineNumbers = showLineNumbersLocal || showLineNumbersGlobal
            const promptUser = promptUserLocal || prompt.user
            const promptHost = promptHostLocal || prompt.host
            language = splitLanguage
            let languageName = `text`
            if (language) {
                languageName = normalizeLanguage(language)
            }

            const className = `${classPrefix}${languageName}`

            let numLinesStyle, numLinesClass, numLinesNumber
            numLinesStyle = numLinesClass = numLinesNumber = ``
            if (showLineNumbers) {
                numLinesStyle = ` style="counter-reset: linenumber ${numberLinesStartAt -
                    1}"`
                numLinesClass = ` line-numbers`
                numLinesNumber = addLineNumbers(node.value)
            }

            let highlightClassName = customHighlightClassName;
            if (highlightLines && highlightLines.length > 0)
                highlightClassName += ` has-highlighted-lines`

            const useCommandLine =
                [`bash`].includes(languageName) &&
                (prompt.global ||
                    (outputLines && outputLines.length > 0) ||
                    promptUserLocal ||
                    promptHostLocal)

            node.type = `html`
            node.value = ``
                + `${codeTitle ? `<div class="${codeTitleClassName}"><span>${codeTitle}</span></div>` : ``}`
                + `<div class="${highlightClassName}" data-language="${languageName}">`
                + `<pre${numLinesStyle} class="${className}${numLinesClass}">`
                + `<code class="${className}">`
                + `${useCommandLine ? commandLine(node.value, outputLines, promptUser, promptHost) : ``}`
                + `${highlightCode(languageName, node.value, highlightLines, noInlineHighlight)}`
                + `</code>`
                + `${numLinesNumber}`
                + `</pre>`
                + `</div>`
        }

        );
        visit(tree, `inlineCode`, node => {
            let languageName = `text`
      
            if (inlineCodeMarker) {
              let [language, restOfValue] = node.value.split(`${inlineCodeMarker}`, 2)
              if (language && restOfValue) {
                languageName = normalizeLanguage(language)
                node.value = restOfValue
              }
            }
      
            const className = `${classPrefix}${languageName}`
      
            node.type = `html`
            node.value = `<code class="${className}">${highlightCode(
              languageName,
              node.value
            )}</code>`
          })
    }
}


