# Changelog
All notable changes to this project documented here.

## [Released]

## [1.2](https://github.com/abhinavminhas/replace-tokens/releases/tag/v1.2) - 2024-04-21
### Changed
- Update action Node version from Node 18 to Node 20.

## [1.1](https://github.com/abhinavminhas/replace-tokens/releases/tag/v1.1) - 2024-04-21
### Changed
- Update action Node version from Node 16 to Node 18.

## [1.0](https://github.com/abhinavminhas/replace-tokens/releases/tag/v1.0) - 2023-07-23
### Added
- Github replace tokens action. (Initial Release).
    - Replace tokens in files __&#8595;__  
    __Function &#8594;__ `replaceTokens(files, replacements, delimiter = ',')`  
    __Inputs &#8595;__ 
        - {files} - File names (path included), comma-separated for multiple files. replacements.
        - {delimiter} - Token (to be replaced) & value comma-separated pairs (TOKEN=value).
        - {delimiter} - Defines separator/delimiter to be used, default value is comma ",".