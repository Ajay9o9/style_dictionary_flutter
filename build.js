const StyleDictionary = require('style-dictionary')
const baseConfig = require('./config.json')
const Color = require('tinycolor2')

StyleDictionary.registerTransform({
    name: 'colors/hex8flutter',
    type: 'value',
    matcher: prop => {
        return prop.attributes.category === 'colors'
    },
    transformer: prop => {
        var str = Color(prop.value).toHex8().toUpperCase();
        return `Color(0x${str.slice(6)}${str.slice(0, 6)})`;
    },
})

const StyleDictionaryExtended = StyleDictionary.extend(baseConfig)

StyleDictionaryExtended.buildAllPlatforms()