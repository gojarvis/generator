'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var JarvisGenerator = module.exports = function JarvisGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments); 

  this.appPath = this.env.options.appPath;

  this.headerFile = this.engine(this.read('jade/_app/views/includes/head.jade'),
     this);

  this.footerFile = this.engine(this.read('jade/_app/views/includes/foot.jade'),
     this);

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(JarvisGenerator, yeoman.generators.Base);

JarvisGenerator.prototype.askForAppName = function askFor() {
  var cb = this.async();

  this.prompt([{
        type: 'input',
        name: 'appName',
        message: 'What is the name of your application?',
        filter: function(val) {
            return val.toLowerCase();
        },
        default: "myApp"
    }], function (props) {
    this.appName = props.appName;
    cb();
  }.bind(this));
};

JarvisGenerator.prototype.askForBootstrap = function askFor() {
  var cb = this.async();

  this.prompt([{
    type: 'confirm',
    name: 'bootstrap',
    message: 'Would you like to include Twitter Bootstrap?',
    default: true
  }, {
    type: 'confirm',
    name: 'compassBootstrap',
    message: 'Would you like to use Twitter Bootstrap for Compass (as opposed to vanilla CSS)?',
    default: true,
    when: function (props) {
      return props.bootstrap;
    }
  }], function (props) {
    this.bootstrap = props.bootstrap;
    this.compassBootstrap = props.compassBootstrap;

    cb();
  }.bind(this));
};

JarvisGenerator.prototype.askForDatabase = function askFor() {
  var cb = this.async();

  this.prompt([{
        type: 'list',
        name: 'dbAdapter',
        message: 'What kind of DB would you want to use primarily?',
        choices: ["MongoDB", "MySQL"],
        filter: function(val) {
            return val.toLowerCase();
        },
        default: "mongodb"
    }], function (props) {
    this.dbAdapter = props.dbAdapter;
    cb();
  }.bind(this));
};

JarvisGenerator.prototype.askForConnectionString = function askFor() {
  var cb = this.async();

  this.prompt([{
        type: 'input',
        name: 'connectionString',
        message: 'What is your db connection string?',
        filter: function(val) {
            return val.toLowerCase();
        },
        default: "mongodb://localhost"
    }], function (props) {
    this.connectionString = props.connectionString;
    cb();
  }.bind(this));
};

JarvisGenerator.prototype.askForTemplatingEngine = function askFor() {
  var cb = this.async();

  this.prompt([{
        type: 'list',
        name: 'templateEngine',
        message: 'What kind of template engine would you want to use?',
        choices: ["Jade", "Dot", "Hogan"],
        filter: function(val) {
            return val.toLowerCase();
        },
        default: "jade"
    }], function (props) {
    this.templateEngine = props.templateEngine;
    cb();
  }.bind(this));
};

JarvisGenerator.prototype.bootstrapJS = function bootstrapJS() {
  if (!this.bootstrap) {
    return;  // Skip if disabled.
  }

  //#TODO
  // Wire Twitter Bootstrap plugins
  // this.indexFile = this.appendJadeScripts(this.indexFile, 'scripts/plugins.js', [
    
  // ]);
};

JarvisGenerator.prototype.app = function app() {
    this.mkdir('app');
    this.mkdir('app/controllers');
    this.mkdir('app/models');
    this.mkdir('app/views');

    this.directory('common/_app/controllers', 'app/controllers');
    this.directory(this.templateEngine + '/_app/views', 'app/views');
    

    this.template(this.dbAdapter + '/_app/models/article.js', 'app/models/article.js');
    this.template(this.dbAdapter + '/_app/models/user.js', 'app/models/user.js');

    this.mkdir('config');

    this.directory(this.dbAdapter + '/_config', 'config');
    this.template(this.dbAdapter + '/_config/config.js', 'config/config.js');


    this.mkdir('public');
    if (this.compassBootstrap){
        this.directory('common/_public', 'public');
    }
    else{
        this.directory('nosass/_public', 'public');
    }
   
    

    this.copy('common/_package.json', 'package.json');
    this.copy('common/_bower.json', 'bower.json');
    this.copy('common/_.bowerrc', '.bowerrc');
    this.copy('common/_server.js', 'server.js');
    this.copy('common/_Gruntfile.js', 'Gruntfile.js');
    this.copy('common/_README.md', 'README.md');
    this.copy('common/_Procfile', 'Procfile');
    this.copy('common/_travis.yml', 'travis.yml');

    // this.on('end', function() {
    //     this.installDependencies();
    // });
};

