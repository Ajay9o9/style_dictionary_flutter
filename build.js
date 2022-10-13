const StyleDictionary = require('style-dictionary')
const baseConfigLight = require('./config-light.json')
const baseConfigDark = require('./config-dark.json')
const baseConfigFonts = require('./config-fonts.json')
const baseConfigGlobal = require('./config-global.json')
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


StyleDictionary.registerTransform({
    name: 'test/gradient',
    type: 'value',
    matcher: prop => {
        return prop.attributes.category === 'gradient'
    },
    transformer: prop => {

        var object = prop.value
        console.log(object); 
        object.stops

        //"rotation": 360,
        // "stops": [
        //     {
        //       "position": 0,
        //       "color": "#000000ff"
        //     },
        //     {
        //       "position": 1,
        //       "color": "#00000000"
        //     }
        //   ]
        var stops = []
        var colors = []

        var rotation = object.rotation;

        for (var i = 0; i < object.stops.length; i++) {
            var stop = object.stops[i];
            var position = stop.position;
            stops.push(position);
            var str = Color(stop.color).toHex8().toUpperCase();
            var color = `Color(0x${str.slice(6)}${str.slice(0, 6)})`;
            colors.push(color)
        }


        const ss = `
        LinearGradient(
            begin: Alignment.bottomRight, 
            transform: GradientRotation(math.pi / ${rotation}),
            stops: [${stops}],
             colors: [${colors}]
        )`;

        return ss;
    },
})


StyleDictionary.registerTransform({
    name: 'test/fonts',
    type: 'value',
    matcher: prop => {
        return prop.attributes.category === 'font'
    },
    transformer: prop => {
        // console.log(prop.attributes);

        // console.log(prop.original.value);
        
        var object = prop.original.value;
        // console.log(prop.value.fontWeight); 
        // var sss = JSON.parse(object);
        // console.log(JSON.stringify(object)); 

       
       
        var fontsize = object.fontsize;
        var fontweight = object.fontWeight;
        var fontfamily = object.fontFamily;
        var fontStyle = object.fontStyle;
        var letterSpacing = object.letterSpacing;
        var lineHeight = object.lineHeight;
        var paragraphIndent = object.paragraphIndent;
        var paragraphSpacing = object.paragraphSpacing;

        const ss = `
        TextStyle(
            fontWeight: FontWeight.w${fontweight},
            fontStyle: FontStyle.${fontStyle},
            fontFamily: '${fontfamily}',
            fontSize: 40,
            letterSpacing: ${letterSpacing},
            height: ${lineHeight},
            )
        `;

        return ss;
    },
})


StyleDictionary.registerTransform({
    name: 'test/typography',
    type: 'value',
    matcher: prop => {

        if(prop.attributes.category === 'typography'){
            console.log(prop.attributes);
            console.log(prop.attributes.item);
            console.log(prop.value);
        }
        return prop.attributes.category === 'typography'
    },
    transformer: prop => {
        return prop.value;
        // console.log(prop.attributes);

        console.log(prop.original.value);


        
        var object = prop.original.value;
        // // console.log(prop.value.fontWeight); 
        // // var sss = JSON.parse(object);
        // // console.log(JSON.stringify(object)); 

       
       
        var fontsize = object.fontsize;
        var fontweight = object.fontWeight;
        var fontfamily = object.fontFamily;
        var fontStyle = object.fontStyle;
        var letterSpacing = object.letterSpacing;
        var lineHeight = object.lineHeight;
        var paragraphIndent = object.paragraphIndent;
        var paragraphSpacing = object.paragraphSpacing;

        const ss = `
        TextStyle(
            fontWeight: FontWeight.w${fontweight},
            fontStyle: FontStyle.${fontStyle},
            fontFamily: '${fontfamily}',
            fontSize: 40,
            letterSpacing: ${letterSpacing},
            height: ${lineHeight},
            )
        `;

        return ss;
    },
})



const StyleDictionaryExtendedLight = StyleDictionary.extend(baseConfigLight)

const StyleDictionaryExtendedDark = StyleDictionary.extend(baseConfigDark)
const StyleDictionaryExtendedFonts = StyleDictionary.extend(baseConfigFonts)
const StyleDictionaryExtendedGlobal = StyleDictionary.extend(baseConfigGlobal)

StyleDictionaryExtendedLight.buildAllPlatforms()
StyleDictionaryExtendedDark.buildAllPlatforms()
StyleDictionaryExtendedFonts.buildAllPlatforms()
StyleDictionaryExtendedGlobal.buildAllPlatforms()





