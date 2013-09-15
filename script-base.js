'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var jarvisUtils = require('./util.js');

Generator.prototype.addScriptToJade = function (scriptPath, jadeFilePath,) {
  try {
    var appPath = this.env.options.appPath;
    var fullPath = path.join(appPath, jadeFile);
    jarvisUtils.rewriteFile({
      file: fullPath,
      needle: '<!-- endbuild -->',
      splicable: [
        'script(type="text/javascript" src="' + scriptPath + '")'
      ]
    });
  } catch (e) {
    console.log('\nUnable to find '.yellow + fullPath + '. Reference to '.yellow + script + ' ' + 'not added.\n'.yellow);
  }
};