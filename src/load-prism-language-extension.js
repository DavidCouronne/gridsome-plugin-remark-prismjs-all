import { languages } from `prismjs`
import loadPrismLanguage from `./load-prism-language`
import replaceStringWithRegex from `./replace-string-with-regexp`

export default languageExtensions => {
  //Create array of languageExtensions (if input is object)
  languageExtensions = [].concat(languageExtensions)

  languageExtensions.forEach(l => {
    loadLanguageExtension(l)
  })
}

let loadLanguageExtension = languageExtension => {
  if (!isObjectAndNotArray(languageExtension)) {
    throw new Error(
      `A languageExtension needs to be defined as an object. Given config is not valid: ${JSON.stringify(
        languageExtension
      )}`
    )
  }

  if (!containsMandatoryProperties(languageExtension)) {
    throw new Error(
      `A languageExtension needs to contain 'language' and 'extend' or both and a 'definition'. Given config is not valid: ${JSON.stringify(
        languageExtension
      )}`
    )
  }

  // If only 'extend' property is given, we extend the given extend language.
  if (!languageExtension.language) {
    languageExtension.language = languageExtension.extend
  }

  // To allow RegEx as 'string' in the config, we replace all strings with a regex object.
  if (languageExtension.definition) {
    languageExtension.definition = replaceStringWithRegex(
      languageExtension.definition
    )
  }

  // If 'extend' property is given we start from that language, otherwise we add a language from scratch.
  if (!languageExtension.extend) {
    languages[languageExtension.language] = languageExtension.definition
  } else {
    //Loads language if not already loaded.
    loadPrismLanguage(languageExtension.extend)

    languages[languageExtension.language] = languages.extend(
      languageExtension.extend,
      languageExtension.definition
    )
  }

  if (languageExtension.hasOwnProperty(`insertBefore`)) {
    // To allow RegEx as 'string' in the config, we replace all strings with a regex object.
    languageExtension.insertBefore = replaceStringWithRegex(
      languageExtension.insertBefore
    )

    Object.entries(languageExtension.insertBefore).forEach(([key, value]) => {
      languages.insertBefore(languageExtension.language, key, value)
    })
  }
}

const isObjectAndNotArray = extension =>
  //Array is an Object in javascript
  !Array.isArray(extension) && typeof extension === `object`

const containsMandatoryProperties = languageExtension => {
  // 'language' or 'extend' is mandatory
  if (!(languageExtension.language || languageExtension.extend)) {
    return false
  }

  // 'definition' or 'insertBefore' is mandatory
  if (!(languageExtension.definition || languageExtension.insertBefore)) {
    return false
  }

  // 'insertBefore' is not possible without 'extend' or 'definition'. There is nothing to insert before then.
  if (
    languageExtension.insertBefore &&
    !(languageExtension.definition || languageExtension.extend)
  ) {
    return false
  }

  return true
}