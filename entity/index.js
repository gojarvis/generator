'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var ScriptBase = require('../script-base.js');



var JarvisGenerator = module.exports = function JarvisGenerator(args, options, config) {
   if (typeof this.appPath === 'undefined') {
    try {
      this.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.appPath = this.appPath || 'app';
  }

  yeoman.generators.Base.apply(this, arguments);


  // console.log('You called the entity subgenerator with the argument ' + this.name + '.');
};

util.inherits(JarvisGenerator, ScriptBase);




JarvisGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [
    {
      type: 'input',
      name: 'name',
      message: "What is the singular name of your entity?",
      default: "myThing"
    }
  ];

  this.prompt(prompts, function (props) {
    this.name = props.name;

    cb();
  }.bind(this));
};

JarvisGenerator.prototype.askForDatabase = function askFor() {
  var cb = this.async();

  this.prompt([{
        type: 'list',
        name: 'dbAdapter',
        message: 'What kind of DB would you want to use for this entity?',
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


JarvisGenerator.prototype.files = function files() {
  // console.log(this.appPath);
  
  //Generate server side
  this.template('app/controller_scaffold.js', 'app/controllers/' + this.name + '.js');
  this.template('app/'+this.dbAdapter+'/model_scaffold.js', 'app/models/' + this.name + '.js');

  this.updateAppJson('server',controllers,this.name);

  //Generate angular
  this.template('public/modules/controllers/controller_scaffold.js', 'public/modules/' + this.name + 's/controllers/' + this.name + '.js');
  this.template('public/modules/services/service_scaffold.js', 'public/modules/' + this.name +'s/services/' + this.name + '.js');
  this.template('public/modules/config/routes_scaffold.js', 'public/modules/' + this.name +'s/config/' + this.name + '.js');
  this.template('public/modules/module_scaffold.js', 'public/modules/' + this.name +'s/' + this.name + '.js');

  //Add dependencies
  this.addToJade(this.name,'app/views/includes/foot.jade', "end-entities");
  this.addToJade('end-' + this.name,'app/views/includes/foot.jade', "end-entities");

  this.addScriptToJade('public/modules/' + this.name + 's/controllers/' + this.name + '.js','app/views/includes/foot.jade', 'end-' + this.name);
  this.addScriptToJade('public/modules/' + this.name + 's/services/' + this.name + '.js','app/views/includes/foot.jade', 'end-' + this.name);  
  this.addScriptToJade('public/modules/' + this.name + 's/config/routes.js','app/views/includes/foot.jade', 'end-' + this.name);
  this.addScriptToJade('public/modules/' + this.name + 's/' + this.name + '.js','app/views/includes/foot.jade', 'end-' + this.name);

  this.mkdir('public/modules/' + this.name + 's/views');

  this.template('public/modules/views/create_scaffold.html', 'public/modules/' + this.name + 's/views/create.html');
  this.template('public/modules/views/edit_scaffold.html', 'public/modules/' + this.name + 's/views/edit.html');
  this.template('public/modules/views/list_scaffold.html', 'public/modules/' + this.name + 's/views/list.html');
  this.template('public/modules/views/view_scaffold.html', 'public/modules/' + this.name + 's/views/view.html');
};






