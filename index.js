"use strict"

const core = require('@actions/core')
const replace = require('./src/replace')

const run = async () => {
  try {
    const files = core.getInput('files')
    const replacements = core.getInput('replacements')
    const delimiter = core.getInput('delimiter')
    await replace.replaceTokens(files, replacements, delimiter)
  } catch (error) {
    setFailed(error.message)
  }
}

run()