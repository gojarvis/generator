'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var jarvisUtils = require('./util.js');

module.exports = JarvisGenerator;

function JarvisGenerator() {
  yeoman.generators.Base.apply(this, arguments);

  try {
    this.appname = require(path.join(process.cwd(), 'bower.json')).name;
  } catch (e) {
    this.appname = path.basename(process.cwd());
  }

  if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || 'app';
  }


  this.sourceRoot(path.join(__dirname, sourceRoot));
}

util.inherits(JarvisGenerator, yeoman.generators.Base);

// JarvisGenerator.prototype.appTemplate = function (src, dest) {
//   yeoman.generators.Base.prototype.template.apply(this, [
//     src + this.scriptSuffix,
//     path.join(this.env.options.appPath, dest) + this.scriptSuffix
//   ]);
// };

// JarvisGenerator.prototype.testTemplate = function (src, dest) {
//   yeoman.generators.Base.prototype.template.apply(this, [
//     src + this.scriptSuffix,
//     path.join(this.env.options.testPath, dest) + this.scriptSuffix
//   ]);
// };

// JarvisGenerator.prototype.htmlTemplate = function (src, dest) {
//   yeoman.generators.Base.prototype.template.apply(this, [
//     src,
//     path.join(this.env.options.appPath, dest)
//   ]);
// };

JarvisGenerator.prototype.addScriptToJade = function (scriptPath, jadeFile, target) {
  try {
    // console.log(appPath);

    jarvisUtils.rewriteFile({
      file: jadeFile,
      needle: '//' + target,
      splicable: [
        'script(type="text/javascript", src="' + scriptPath + '")'
      ]
    });
  } catch (e) {
    console.log('\nUnable to find '.yellow + jadeFile + '. Reference to '.yellow + scriptPath + ' ' + 'not added.\n'.yellow);
  }
};

JarvisGenerator.prototype.addToJade = function (text, jadeFile, target) {
  try {
    // console.log(appPath);

    jarvisUtils.rewriteFile({
      file: jadeFile,
      needle: '//' + target,
      splicable: [
        '//' + text
      ]
    });
  } catch (e) {
    console.log('\nUnable to find '.yellow + jadeFile + '. Reference to '.yellow + scriptPath + ' ' + 'not added.\n'.yellow);
  }
};



JarvisGenerator.prototype.updateAppJson = function(clientOrServer,section,whatToPush){
	var appJson = fs.readFileSync('app.json', 'utf8');
	console.log(appJson);
}
