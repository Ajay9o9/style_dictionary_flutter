# Custom style dictionary created for generating flutter design files from design tokens

## How to build dart style code for flutter locally

1. You should have node (and npm) installed locally
1. `npm install -g style-dictionary`
1. `Run npm init`
1. `Run npm install --save tinycolor2`
1. When you're ready to generate dart files run 
   `Run node build.js`

If everything works you'll then see it under `lib/` folder.

The figma tokens should be placed inside the tokens folder, ideally you should have a file for dark, light and global theme and 
one for fonts. 
Make sure the file names inside these tokens folder are updated into their respective `config-xxxx.json` file inside the source key value.

```
{
  "source": ["tokens/dark-theme.json"],  <-- target file path

```

The newly generated files will be generated inside the lib folder. If you want to change it you can do so in the `config-xxx.json` file inside the platform json object.

If you want to change name of generated file change the value of destination key.


```
{
   "flutter": {
      "transforms": ["attribute/cti"],
      "buildPath": "lib/generated/styles",  <-- target file path
      "files": [
        {
            "destination": "AppDarkTheme.g.dart",   <---- target file name

```


If there is any parameter that is getting displayed as `undefined` or not in right format then you can refer to the custom transformers created in the build.js file and create a new one for that use case. After creating a new transformer make sure to add that to the `config-xxx.json` file.

```
{
    "flutter": {
        "transforms": [
          "attribute/cti",  "name/cti/camel", 
          "color/hex8flutter",  "size/flutter/remToDouble", 
          "content/flutter/literal",  "asset/flutter/literal",
          "font/flutter/literal",  "colors/hex8flutter",

           "app/myNewTransformer"   <---- Newly added transformer 


       ],
      
```

If you want to know more: 
Take a look at all the built-in [transforms](https://amzn.github.io/style-dictionary/#/transforms?id=pre-defined-transforms) and [formats](https://amzn.github.io/style-dictionary/#/formats?id=pre-defined-formats).
