'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var EntityGenerator = module.exports = function EntityGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the entity subgenerator with the argument ' + this.name + '.');
};

util.inherits(EntityGenerator, yeoman.generators.NamedBase);




EntityGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      type: 'input',
      name: 'stackName',
      message: "What is the singular name of your entity?",
      default: "myStack"
    }
  ];

  this.prompt(prompts, function (props) {
    this.stackName = props.stackName;

    cb();
  }.bind(this));
};


EntityGenerator.prototype.files = function files() {

  //Generate server side
  this.template('app/controller_scaffold.js', 'app/controllers/' + this.name + '.js');
  this.template('app/model_scaffold.js', 'app/models/' + this.name + '.js');


  //Generate angular
  this.template('public/js/controllers/controller_scaffold.js', 'public/js/modules/' + this.name + 's/controllers/' + this.name + '.js');
  this.template('public/js/services/service_scaffold.js', 'public/js/modules/' + this.name +'s/services/' + this.name + '.js');

  this.mkdir('public/js/modules/' + this.name + '/views');
  this.template('public/js/views/create_scaffold.html', 'public/js/modules/' + this.name + 's/views/create.html');
  this.template('public/js/views/edit_scaffold.html', 'public/js/modules/' + this.name + 's/views/edit.html');
  this.template('public/js/views/list_scaffold.html', 'public/js/modules/' + this.name + 's/views/list.html');
  this.template('public/js/views/view_scaffold.html', 'public/js/modules/' + this.name + 's/views/view.html');
};