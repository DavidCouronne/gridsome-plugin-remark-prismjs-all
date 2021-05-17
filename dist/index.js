"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _unistUtilVisit = _interopRequireDefault(require("unist-util-visit"));

var _parseOptions2 = _interopRequireDefault(require("./parse-options"));

var _highlightCode = _interopRequireDefault(require("./highlight-code"));

var _loadPrismLanguageExtension = _interopRequireDefault(require("./load-prism-language-extension"));

var _addLineNumbers = _interopRequireDefault(require("./add-line-numbers"));

var _commandLine = _interopRequireDefault(require("./command-line"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = function _default(options) {
  var customHighlightClassName = options.highlightClassName || "gridsome-highlight";
  var codeTitleClassName = options.codeTitleClassName || "gridsome-code-title";
  var classPrefix = options.classPrefix || "language-";
  var classPrefixInline = options.classPrefix || "language-inline-";
  var inlineCodeMarker = options.inlineCodeMarker || null;
  var aliases = options.aliases || {};
  var noInlineHighlight = options.noInlineHighlight || false;
  var showLineNumbersGlobal = options.showLineNumbers || false;
  var languageExtensions = options.languageExtensions || [];
  var prompt = options.prompt || {
    user: "root",
    host: "localhost",
    global: false
  };

  var normalizeLanguage = function normalizeLanguage(lang) {
    var lower = lang.toLowerCase();
    return aliases[lower] || lower;
  }; //Load language extension if defined


  (0, _loadPrismLanguageExtension["default"])(languageExtensions); // const customcodeTitleClassName = options.codeTitleClassName;

  return function (tree) {
    //codeTitle(tree, codeTitleClassName);
    (0, _unistUtilVisit["default"])(tree, "code", function (node, index) {
      var language = node.meta ? node.lang + node.meta : node.lang;

      var _parseOptions = (0, _parseOptions2["default"])(language),
          splitLanguage = _parseOptions.splitLanguage,
          highlightLines = _parseOptions.highlightLines,
          showLineNumbersLocal = _parseOptions.showLineNumbersLocal,
          numberLinesStartAt = _parseOptions.numberLinesStartAt,
          outputLines = _parseOptions.outputLines,
          promptUserLocal = _parseOptions.promptUserLocal,
          promptHostLocal = _parseOptions.promptHostLocal,
          codeTitle = _parseOptions.codeTitle;

      var showLineNumbers = showLineNumbersLocal || showLineNumbersGlobal;
      var promptUser = promptUserLocal || prompt.user;
      var promptHost = promptHostLocal || prompt.host;
      language = splitLanguage;
      var languageName = "text";

      if (language) {
        languageName = normalizeLanguage(language);
      }

      var className = "".concat(classPrefix).concat(languageName);
      var numLinesStyle, numLinesClass, numLinesNumber;
      numLinesStyle = numLinesClass = numLinesNumber = "";

      if (showLineNumbers) {
        numLinesStyle = " style=\"counter-reset: linenumber ".concat(numberLinesStartAt - 1, "\"");
        numLinesClass = " line-numbers";
        numLinesNumber = (0, _addLineNumbers["default"])(node.value);
      }

      var highlightClassName = customHighlightClassName;
      if (highlightLines && highlightLines.length > 0) highlightClassName += " has-highlighted-lines";
      var useCommandLine = ["bash"].includes(languageName) && (prompt.global || outputLines && outputLines.length > 0 || promptUserLocal || promptHostLocal);
      node.type = "html";
      node.value = "" + "".concat(codeTitle ? "<div class=\"".concat(codeTitleClassName, "\"><span>").concat(codeTitle, "</span></div>") : "") + "<div class=\"".concat(highlightClassName, "\" data-language=\"").concat(languageName, "\">") + "<pre".concat(numLinesStyle, " class=\"").concat(className).concat(numLinesClass, "\">") + "<code class=\"".concat(className, "\">") + "".concat(useCommandLine ? (0, _commandLine["default"])(node.value, outputLines, promptUser, promptHost) : "") + "".concat((0, _highlightCode["default"])(languageName, node.value, highlightLines, noInlineHighlight)) + "</code>" + "".concat(numLinesNumber) + "</pre>" + "</div>";
    });
    (0, _unistUtilVisit["default"])(tree, "inlineCode", function (node) {
      var languageName = "text";
      var classInlineName = "".concat(classPrefixInline).concat(languageName);

      if (inlineCodeMarker) {
        var _node$value$split = node.value.split("".concat(inlineCodeMarker), 2),
            _node$value$split2 = _slicedToArray(_node$value$split, 2),
            language = _node$value$split2[0],
            restOfValue = _node$value$split2[1];

        if (language && restOfValue) {
          languageName = normalizeLanguage(language);
          node.value = restOfValue;
        }
      }

      var className = "".concat(classPrefix).concat(languageName);
      node.type = "html";
      node.value = "<code class=\"".concat(classInlineName, "\">").concat((0, _highlightCode["default"])(languageName, node.value), "</code>");
    });
  };
};

exports["default"] = _default;