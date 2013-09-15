/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema

/**
 * Article Schema
 */

var <%= _.camelize(name) %>Schema = new Schema({
	
});


/**
 * Statics
 */

<%= _.camelize(name) %>Schema.statics = {
  load: function (id, cb) {
    // this.findOne({ _id : id }).populate('user').exec(cb);
  }
}

mongoose.model('<%= _.camelize(name) %>', <%= _.camelize(name) %>Schema)