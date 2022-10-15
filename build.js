const StyleDictionary = require('style-dictionary')
const baseConfigLight = require('./config-light.json')
const baseConfigDark = require('./config-dark.json')
const baseConfigFonts = require('./config-fonts.json')

const Color = require('tinycolor2')

const formats = require('./src/formats');

console.log("------starting build------");

function degreesToRadiant(deg) {
    return (deg * Math.PI) / 180.0;
}


StyleDictionary.registerTransform({
    name: 'app/colors',
    type: 'value',
    matcher: prop => {
        return prop.attributes.category === 'colors'
    },
    transformer: prop => {
        var str = Color(prop.value).toHex8().toUpperCase();
        return `Color(0x${str.slice(6)}${str.slice(0, 6)})`;
    },
})


StyleDictionary.registerTransform({
    name: 'app/gradient',
    type: 'value',
    matcher: prop => {
        return prop.attributes.category === 'gradient'
    },
    transformer: prop => {

        console.log("inside gradient transform");

        var object = prop.value
        var stops = []
        var colors = []

        var rotation = object.rotation;

        const radiant = degreesToRadiant(rotation);

        for (var i = 0; i < object.stops.length; i++) {
            var stop = object.stops[i];
            var position = stop.position;
            stops.push(position);
            var str = Color(stop.color).toHex8().toUpperCase();
            var color = `Color(0x${str.slice(6)}${str.slice(0, 6)})`;
            colors.push(color)
        }


        const obj = `
        LinearGradient(
            begin: Alignment.bottomRight, 
            transform: GradientRotation(${radiant}),
            stops: [${stops}],
             colors: [${colors}]
        )`;

        return obj;
    },
});


StyleDictionary.registerTransform({
    name: 'app/fonts',
    type: 'value',
    matcher: prop => {
        return prop.attributes.category === 'font'
    },
    transformer: prop => {
    
        var object = prop.original.value;
       
        var fontsize = object.fontsize;
        var fontweight = object.fontWeight;
        var fontfamily = object.fontFamily;
        var fontStyle = object.fontStyle;
        var letterSpacing = object.letterSpacing;
        var lineHeight = object.lineHeight;
        var paragraphIndent = object.paragraphIndent;
        var paragraphSpacing = object.paragraphSpacing;
        

        const textStyle = `
        TextStyle(
            fontWeight: FontWeight.w${fontweight},
            fontStyle: FontStyle.${fontStyle},
            fontFamily: '${fontfamily}',
            fontSize: 40,
            letterSpacing: ${letterSpacing},
            height: ${lineHeight},
            )
        `;

        return textStyle;
    },
});


for (const key in formats) {
    
    const formatter = formats[key];
    StyleDictionary.registerFormat({
        name: key,
        formatter: formatter,
    });
}

const StyleDictionaryExtendedLight = StyleDictionary.extend(baseConfigLight)

const StyleDictionaryExtendedDark = StyleDictionary.extend(baseConfigDark)
const StyleDictionaryExtendedFonts = StyleDictionary.extend(baseConfigFonts)

StyleDictionaryExtendedLight.buildAllPlatforms()
StyleDictionaryExtendedDark.buildAllPlatforms()
StyleDictionaryExtendedFonts.buildAllPlatforms()


console.log("------finished build------");





