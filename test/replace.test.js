"use strict"

const { before } = require('mocha')
const replace = require('../src/replace')
const {assert, expect} = require('chai')
const fs = require('fs')

before(async () => {
    let content = 'Hi,\r\n\r\nHow are you ?'
    fs.writeFileSync('./test/test-files/single_file_replace_single_token.txt', content)
    content = 'Hi,\r\n\r\nHow are you ??'
    fs.writeFileSync('./test/test-files/single_file_replace_multiple_similar_tokens.txt', content)
    content = 'Hi,\r\n\r\nHow are you ?'
    fs.writeFileSync('./test/test-files/single_file_replace_multiple_different_tokens.txt', content)
    content = '{"name":"file1","key":"_KEY_"}'
    fs.writeFileSync('./test/test-files/multiple_files_single_token/file1.json', content)
    content = "name,key\r\nfile2,_KEY_"
    fs.writeFileSync('./test/test-files/multiple_files_single_token/file2.csv', content)
    content = 'name: file3\r\n  key: _KEY_'
    fs.writeFileSync('./test/test-files/multiple_files_single_token/file3.yml', content)
    content = 'name=file4\r\nkey=_KEY_'
    fs.writeFileSync('./test/test-files/multiple_files_single_token/file4.txt', content)
    content = '{"name":"file1","key":"_KEY_", "secret": "_SECRET_"}'
    fs.writeFileSync('./test/test-files/multiple_files_mutiple_tokens/file1.json', content)
    content = 'name,key,secret\r\nfile2,_KEY_,_SECRET_'
    fs.writeFileSync('./test/test-files/multiple_files_mutiple_tokens/file2.csv', content)
    content = 'name: file3\r\n  key: _KEY_\r\n  secret: _SECRET_'
    fs.writeFileSync('./test/test-files/multiple_files_mutiple_tokens/file3.yml', content)
    content = 'name=file4\r\nkey=_KEY_\r\nsecret=_SECRET_'
    fs.writeFileSync('./test/test-files/multiple_files_mutiple_tokens/file4.txt', content)
    content = '....'
    fs.writeFileSync('./test/test-files/replacement_value_has_equal_to.txt', content)
})                                                                      

describe('REPLACE TOKENS TESTS', () => {

    it('Test 1: Replace a token in a file.', async () => {
        await replace.replaceTokens('./test/test-files/single_file_replace_single_token.txt', "?=.")
        const data = fs.readFileSync('./test/test-files/single_file_replace_single_token.txt', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes('?')).to.be.equals(false)
        expect(data.includes('.')).to.be.equals(true)
    })
    
    it('Test 2: Replace similar multiple tokens in a file.', async () => {
        await replace.replaceTokens('./test/test-files/single_file_replace_multiple_similar_tokens.txt', "?=.,?=.")
        const data = fs.readFileSync('./test/test-files/single_file_replace_multiple_similar_tokens.txt', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes('?')).to.be.equals(false)
        expect(data.includes('..')).to.be.equals(true)
    })

    it('Test 3: Replace different multiple tokens in a file.', async () => {
        await replace.replaceTokens('./test/test-files/single_file_replace_multiple_different_tokens.txt', "Hi=Hello,?=....")
        const data = fs.readFileSync('./test/test-files/single_file_replace_multiple_different_tokens.txt', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes('Hi')).to.be.equals(false)
        expect(data.includes('Hello')).to.be.equals(true)
        expect(data.includes('?')).to.be.equals(false)
        expect(data.includes('....')).to.be.equals(true)
    })

    it('Test 4: Replace single token in multiple files.', async () => {
        const key = '54c213d6-ac7f-44cb-8ac2-91e6a175af3d'
        const files = "./test/test-files/multiple_files_single_token/file1.json, ./test/test-files/multiple_files_single_token/file2.csv, "
                    + "./test/test-files/multiple_files_single_token/file3.yml, ./test/test-files/multiple_files_single_token/file4.txt"
        await replace.replaceTokens(files, `_KEY_=${key}`)
        let data = fs.readFileSync('./test/test-files/multiple_files_single_token/file1.json', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes('_KEY_')).to.be.equals(false)
        expect(data.includes(key)).to.be.equals(true)
        data = fs.readFileSync('./test/test-files/multiple_files_single_token/file2.csv', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes('_KEY_')).to.be.equals(false)
        expect(data.includes(key)).to.be.equals(true)
        data = fs.readFileSync('./test/test-files/multiple_files_single_token/file3.yml', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes('_KEY_')).to.be.equals(false)
        expect(data.includes(key)).to.be.equals(true)
        data = fs.readFileSync('./test/test-files/multiple_files_single_token/file4.txt', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes('_KEY_')).to.be.equals(false)
        expect(data.includes(key)).to.be.equals(true)
    })

    it('Test 5: Replace multiple token in multiple files.', async () => {
        const key = '54c213d6-ac7f-44cb-8ac2-91e6a175af3d'
        const secret = '323acd81-6a1f-4eb8-bc6c-22a7711ab8ba'
        const files = "./test/test-files/multiple_files_mutiple_tokens/file1.json, ./test/test-files/multiple_files_mutiple_tokens/file2.csv, "
                    + "./test/test-files/multiple_files_mutiple_tokens/file3.yml, ./test/test-files/multiple_files_mutiple_tokens/file4.txt"
        await replace.replaceTokens(files, `_KEY_=${key},_SECRET_=${secret}`)
        let data = fs.readFileSync('./test/test-files/multiple_files_mutiple_tokens/file1.json', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes('_KEY_')).to.be.equals(false)
        expect(data.includes(key)).to.be.equals(true)
        expect(data.includes('_SECRET_')).to.be.equals(false)
        expect(data.includes(secret)).to.be.equals(true)
        data = fs.readFileSync('./test/test-files/multiple_files_mutiple_tokens/file2.csv', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes('_KEY_')).to.be.equals(false)
        expect(data.includes(key)).to.be.equals(true)
        expect(data.includes('_SECRET_')).to.be.equals(false)
        expect(data.includes(secret)).to.be.equals(true)
        data = fs.readFileSync('./test/test-files/multiple_files_mutiple_tokens/file3.yml', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes('_KEY_')).to.be.equals(false)
        expect(data.includes(key)).to.be.equals(true)
        expect(data.includes('_SECRET_')).to.be.equals(false)
        expect(data.includes(secret)).to.be.equals(true)
        data = fs.readFileSync('./test/test-files/multiple_files_mutiple_tokens/file4.txt', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes('_KEY_')).to.be.equals(false)
        expect(data.includes(key)).to.be.equals(true)
        expect(data.includes('_SECRET_')).to.be.equals(false)
        expect(data.includes(secret)).to.be.equals(true)
    })

    it('Test 6: Use a different separator/delimiter than the default comma.', async () => {
        const key = '54c213d6-ac7f-44cb-8ac2-91e6a175af3d'
        const secret = '323acd81-6a1f-4eb8-bc6c-22a7711ab8ba'
        const files = "./test/test-files/multiple_files_mutiple_tokens/file1.json|./test/test-files/multiple_files_mutiple_tokens/file2.csv|"
                    + "./test/test-files/multiple_files_mutiple_tokens/file3.yml|./test/test-files/multiple_files_mutiple_tokens/file4.txt"
        await replace.replaceTokens(files, `_KEY_=${key}|_SECRET_=${secret}`, '|')
        let data = fs.readFileSync('./test/test-files/multiple_files_mutiple_tokens/file1.json', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes('_KEY_')).to.be.equals(false)
        expect(data.includes(key)).to.be.equals(true)
        expect(data.includes('_SECRET_')).to.be.equals(false)
        expect(data.includes(secret)).to.be.equals(true)
        data = fs.readFileSync('./test/test-files/multiple_files_mutiple_tokens/file2.csv', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes('_KEY_')).to.be.equals(false)
        expect(data.includes(key)).to.be.equals(true)
        expect(data.includes('_SECRET_')).to.be.equals(false)
        expect(data.includes(secret)).to.be.equals(true)
        data = fs.readFileSync('./test/test-files/multiple_files_mutiple_tokens/file3.yml', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes('_KEY_')).to.be.equals(false)
        expect(data.includes(key)).to.be.equals(true)
        expect(data.includes('_SECRET_')).to.be.equals(false)
        expect(data.includes(secret)).to.be.equals(true)
        data = fs.readFileSync('./test/test-files/multiple_files_mutiple_tokens/file4.txt', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes('_KEY_')).to.be.equals(false)
        expect(data.includes(key)).to.be.equals(true)
        expect(data.includes('_SECRET_')).to.be.equals(false)
        expect(data.includes(secret)).to.be.equals(true)
    })

    it('Test 7: Replace token, separator is null.', async () => {
        await replace.replaceTokens('./test/test-files/single_file_replace_single_token.txt', ".=*", null)
        const data = fs.readFileSync('./test/test-files/single_file_replace_single_token.txt', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes('.')).to.be.equals(false)
        expect(data.includes('*')).to.be.equals(true)
    })

    it('Test 8: Replace token, separator is undefined.', async () => {
        await replace.replaceTokens('./test/test-files/single_file_replace_single_token.txt', "*=;", undefined)
        const data = fs.readFileSync('./test/test-files/single_file_replace_single_token.txt', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes('*')).to.be.equals(false)
        expect(data.includes(';')).to.be.equals(true)
    })

    it('Test 9: Replace token, separator is blank.', async () => {
        await replace.replaceTokens('./test/test-files/single_file_replace_single_token.txt', ";=#", '')
        const data = fs.readFileSync('./test/test-files/single_file_replace_single_token.txt', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes(';')).to.be.equals(false)
        expect(data.includes('#')).to.be.equals(true)
    })

    it('Test 10: Replace token, separator is whitespaces.', async () => {
        await replace.replaceTokens('./test/test-files/single_file_replace_single_token.txt', "#=::", '    ')
        const data = fs.readFileSync('./test/test-files/single_file_replace_single_token.txt', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes('#')).to.be.equals(false)
        expect(data.includes('::')).to.be.equals(true)
    })

    it('Test 11: Replace token, filename with trailing spaces.', async () => {
        await replace.replaceTokens('  ./test/test-files/single_file_replace_single_token.txt ', "::=?", '')
        const data = fs.readFileSync('./test/test-files/single_file_replace_single_token.txt', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes('::')).to.be.equals(false)
        expect(data.includes('?')).to.be.equals(true)
    })

    it('Test 12: Replace token, replacement values with trailing spaces and whitespaces.', async () => {
        await replace.replaceTokens('./test/test-files/single_file_replace_single_token.txt', "?=[    . .    ]", '')
        const data = fs.readFileSync('./test/test-files/single_file_replace_single_token.txt', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes('?')).to.be.equals(false)
        expect(data.includes('    . .    ')).to.be.equals(true)
    })

    it('Test 13: Replace token, replacement key with trailing spaces and whitespaces.', async () => {
        await replace.replaceTokens('./test/test-files/single_file_replace_single_token.txt', "[    . .    ]=.", '')
        const data = fs.readFileSync('./test/test-files/single_file_replace_single_token.txt', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes('    ..    ')).to.be.equals(false)
        expect(data.includes('.')).to.be.equals(true)
    })

    it('Test 14: Replace token, replacement value has =.', async () => {
        await replace.replaceTokens('./test/test-files/replacement_value_has_equal_to.txt', "....=====", '')
        const data = fs.readFileSync('./test/test-files/replacement_value_has_equal_to.txt', 'utf8')
        expect(data).to.not.be.equals(undefined)
        expect(data.includes('....')).to.be.equals(false)
        expect(data.includes('====')).to.be.equals(true)
    })

    it('Test 15: Replace token, file not found.', async () => {
        try {
            await replace.replaceTokens('./test/test-files/file_not_found.txt', "?=.")
            assert.fail('No Error')
        } catch (err) {
            const error = Error(err)
            expect(error.message.includes('ENOENT: no such file or directory')).to.be.true
        }
    })
    
})

after(async () => {
    const cleanUp = JSON.parse(fs.readFileSync('package.json', 'utf-8')).scripts.cleanUp
    if (cleanUp === 'true') {
        let content = ''
        fs.writeFileSync('./test/test-files/single_file_replace_single_token.txt', content)
        fs.writeFileSync('./test/test-files/single_file_replace_multiple_similar_tokens.txt', content)
        fs.writeFileSync('./test/test-files/single_file_replace_multiple_different_tokens.txt', content)
        fs.writeFileSync('./test/test-files/multiple_files_single_token/file1.json', content)
        fs.writeFileSync('./test/test-files/multiple_files_single_token/file2.csv', content)
        fs.writeFileSync('./test/test-files/multiple_files_single_token/file3.yml', content)
        fs.writeFileSync('./test/test-files/multiple_files_single_token/file4.txt', content)
        fs.writeFileSync('./test/test-files/multiple_files_mutiple_tokens/file1.json', content)
        fs.writeFileSync('./test/test-files/multiple_files_mutiple_tokens/file2.csv', content)
        fs.writeFileSync('./test/test-files/multiple_files_mutiple_tokens/file3.yml', content)
        fs.writeFileSync('./test/test-files/multiple_files_mutiple_tokens/file4.txt', content)
        fs.writeFileSync('./test/test-files/replacement_value_has_equal_to.txt', content)
    }
})