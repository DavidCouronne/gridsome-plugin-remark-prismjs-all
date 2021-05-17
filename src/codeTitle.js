const visit = require('unist-util-visit');

const titlePrefix = ":title=";

function codeTitle(tree, customClassName) {
    visit(tree, "code", (node, index) => {
        const lang = node.lang || "";
        const separatorIndex = lang.lastIndexOf(titlePrefix);
        if (separatorIndex === -1) {
            return;
        }
        const newLang = lang.slice(0, separatorIndex);
        const title = lang.slice(separatorIndex + titlePrefix.length);
        const titleNode = {
            type: "html",
            value: `
          <div class="${customClassName}">
            <span>${title}</span>
          </div>
         `
        };
        tree.children.splice(index, 0, titleNode);
        node.lang = newLang;
    });
}
exports.codeTitle = codeTitle;
