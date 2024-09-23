# replace-tokens
*Replace tokens (GitHub action) replaces tokens in the text or code files with replacement values during the execution of the CI/CD process.* </br></br>
[![Replace-Tokens](https://github.com/abhinavminhas/replace-tokens/actions/workflows/ci.yml/badge.svg)](https://github.com/abhinavminhas/replace-tokens/actions/workflows/ci.yml)
[![codecov](https://codecov.io/github/abhinavminhas/replace-tokens/branch/main/graph/badge.svg?token=VP3CAOQCVB)](https://codecov.io/github/abhinavminhas/replace-tokens)
![maintainer](https://img.shields.io/badge/Creator/Maintainer-abhinavminhas-e65c00)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub Release](https://img.shields.io/github/v/release/abhinavminhas/replace-tokens?label=Github%20Release)](https://github.com/abhinavminhas/replace-tokens/releases)

## Inputs

- `files` **(Required)** - File names (path included), comma-separated for multiple files.  
  - **Example:** ``` file1, file2 ```
- `replacements` **(Required)** - Token (to be replaced) & value comma-separated pairs (TOKEN=value).  
  - **Example:** ``` key1=value1, key2=value2 ```
  - **Note:**
    - _key & value pairs ignore leading & trailing whitespaces. Enclose within ```[]``` for such expressions._
    - _key (token) cannot have any ```=``` but value can. Use a different key (token) in such case._
    - _key, value or pairs can be CI/CD variables / secrets._
- `delimiter` **(Optional)** - Defines separator/delimiter to be used, default value is comma (``` , ```).  
  - **Example:** ``` | ``` or ``` ; ``` or ``` : ``` or ``` - ``` etc.
  - **Note:** _Ignores whitespaces._

## Usage

- **Example 1:** _Replace a token in a file._
  ```
  - name: Replace Tokens
    uses: abhinavminhas/replace-tokens@main
    with:
      files: file
      replacements: key=value
  ```

- **Example 2:** _Replace multiple tokens in a file._
  ```
  - name: Replace Tokens
    uses: abhinavminhas/replace-tokens@main
    with:
      files: file
      replacements: key1=value1, key2=value2
  ```

- **Example 3:** _Replace a token in multiple files._
  ```
  - name: Replace Tokens
    uses: abhinavminhas/replace-tokens@main
    with:
      files: file1, file2
      replacements: key=value
  ```

- **Example 4:** _Replace multiple tokens in multiple files._
  ```
  - name: Replace Tokens
    uses: abhinavminhas/replace-tokens@main
    with:
      files: file1, file2
      replacements: key1=value1, key2=value2
  ```

- **Example 5:** _Use a different separator than comma (``` , ```)._
  ```
  - name: Replace Tokens
    uses: abhinavminhas/replace-tokens@main
    with:
      files: file1 | file2
      replacements: key1=value1 | key2=value2
      delimiter: '|'
  ```
  - **Note:** _The delimiter is enclosed within single quotation marks in the above example since yml interprets ```|``` as "Literal Block Scalar", also required for other reserved keywords._

**Note:** _Implementation for above examples can be checked [here](https://github.com/abhinavminhas/replace-tokens/blob/main/.github/workflows/test-replace-tokens-action.yml)._