"use strict"

const fs = require('fs')

async function replaceTokens(files, replacements, delimiter = ',') {
  if (delimiter === null || delimiter === undefined || delimiter.replace(/\s/g, '').length <= 0) {
    delimiter = ','
  } else {
    delimiter = delimiter.replace(/\s/g, '')
  }
  const fileNames = files.split(delimiter).map(x => x.trim())
  const replacementValues = replacements.split(delimiter)
  console.log(`Total Files: ${fileNames.length}`)
  for (let file = 1; file <= fileNames.length; file++) {
    const fileName = fileNames[file - 1]
    console.log(`File ${file}: ${fileName}`)
    let result = ''
    try {
      result = fs.readFileSync(fileName, 'utf8')
      console.log(result)
    } catch (err) {
      throw err
    }
    for (let i = 0; i < replacementValues.length; i++) {
      let [key, ...value] = replacementValues[i].split('=')
      const keyValuePair = [key, value.join('=')]
      if (keyValuePair.length === 2){
        let key = keyValuePair[0] ? keyValuePair[0].trim() : keyValuePair[0]
        key = (key.match(/^\[/) && key.match(/\]$/)) ? key.slice(1, -1) : key
        let value = keyValuePair[1] ? keyValuePair[1].trim() : keyValuePair[1]
        value = (value.match(/^\[/) && value.match(/\]$/)) ? value.slice(1, -1) : value
        result = result.replace(key, value)
      }
    }
    console.log(`File ${file} (Replaced): ${fileName}`)
    try {
      fs.writeFileSync(fileName, result, 'utf8')
    } catch (err) {
      throw err
    }
    console.log(result)
  }
  await delay(100)
}

const delay = millisecs => new Promise(resolve => setTimeout(resolve, millisecs))

module.exports = {
  replaceTokens
}