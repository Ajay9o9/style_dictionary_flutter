var fs = require('fs'),
    _  = require('lodash'),
    GroupMessages = require('./utils/groupMessages');

var SASS_MAP_FORMAT_DEPRECATION_WARNINGS = GroupMessages.GROUP.SassMapFormatDeprecationWarnings;

function fileHeader(options, commentStyle) {
    var to_ret = '\n';
    // for backward compatibility we need to have the user explicitly hide them
    var showFileHeader = (options) ? options.showFileHeader : true;
    if (showFileHeader) {
      if (commentStyle === 'short') {
        to_ret += '\n';
        to_ret += '// Do not edit directly\n';
        to_ret += '// Generated on ' + new Date().toUTCString() + '\n';
        to_ret += '\n';
      } else {
        to_ret += '/**\n';
        to_ret += ' * Do not edit directly\n';
        to_ret += ' * Generated on ' + new Date().toUTCString() + '\n';
        to_ret += ' */\n\n';
      }
    }
  
    return to_ret;
  }
  
  function variablesWithPrefix(prefix, properties, commentStyle) {
    return properties.map(function(prop) {
        var to_ret_prop = prefix + prop.name + ': ' + (prop.attributes.category==='asset' ? '"'+prop.value+'"' : prop.value) + ';';
  
        if (prop.comment) {
          if (commentStyle === 'short') {
            to_ret_prop = to_ret_prop.concat(' // ' + prop.comment);
          } else {
            to_ret_prop = to_ret_prop.concat(' /* ' + prop.comment + ' */');
          }
        }
  
        return to_ret_prop;
      })
      .filter(function(strVal) { return !!strVal })
      .join('\n');
  }


function iconsWithPrefix(prefix, properties, config) {
    return _.chain(properties)
      .filter(function(prop) {
        return prop.attributes.category === 'content' && prop.attributes.type === 'icon';
      })
      .map(function(prop) {
        var varName = prefix + prop.name + ': ' + prop.value + ';';
        var className = '.' + config.prefix + '-icon.' + prop.attributes.item + ':before ';
        var declaration = '{ content: ' + prefix + prop.name + '; }';
        return varName + '\n' + className + declaration;
      })
      .value().join('\n');
  }
  
  function minifyDictionary(obj) {
    var toRet = {};
    if (obj.hasOwnProperty('value')) {
      return obj.value;
    } else {
      for(var name in obj) {
        if(obj.hasOwnProperty(name)) {
          toRet[name] = minifyDictionary(obj[name]);
        }
      }
    }
    return toRet;
  }



module.exports = {

  // Flutter templates
  /**
   *  Creates a Dart implementation file of a class with values
   *
   * @memberof Formats
   * @kind member
   * @example
   * ```dart
   * import 'package:flutter/material.dart';
   * 
   * class StyleDictionary {
   *   StyleDictionary._();
   *   
   *     static const colorBrandPrimary = Color(0x00ff5fff);
   *     static const sizeFontSizeMedium = 16.00;
   *     static const contentFontFamily1 = "NewJune";
   * ```   
   */
  'flutter/class.dart': _.template(
    fs.readFileSync(__dirname + '/template/class.dart.template')
  ),
 
}