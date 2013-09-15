/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , async = require('async')
  , <%= _.camelize(name) %> = mongoose.model('<%= _.camelize(name) %>')
  , _ = require('underscore')


/**
 * Find article by id
 */

exports.<%= name %> = function(req, res, next, id){
  var User = mongoose.model('User')

  <%= _.camelize(name) %>.load(id, function (err, <%= name %>) {
    if (err) return next(err)
    if (!<%= name %>) return next(new Error('Failed to load article ' + id))
    req.<%= name %> = <%= name %>
    next()
  })
}

/**
 * Create a <%= name %>
 */
exports.create = function (req, res) {
  var <%= name %> = new <%= _.camelize(name) %>(req.body)
  <%= name %>.user = req.user
  <%= name %>.save()
  res.jsonp(<%= name %>)
}

/**
 * Update a <%= name %>
 */
exports.update = function(req, res){
  var <%= name %> = req.<%= name %>
  <%= name %> = _.extend(<%= name %>, req.body)

  <%= name %>.save(function(err) {
  	res.jsonp(<%= name %>)
  })
}

/**
 * Delete an <%= name %>
 */
exports.destroy = function(req, res){
  var <%= name %> = req.<%= name %>
  <%= name %>.remove(function(err){
    if (err) {
		res.render('error', {status: 500});
	} else {			
		res.jsonp(<%= name %>);
	}
  })
}

/**
 * Show an <%= name %>
 */
exports.show = function(req, res){
  res.jsonp(req.<%= name %>);
}

/**
 * List of <%= _.camelize(name) %>s
 */
exports.all = function(req, res){
	<%= _.camelize(name) %>.find().sort('-created').populate('user').exec(function(err, <%= name %>s) {
		if (err) {
			res.render('error', {status: 500});
		} else {			
  			res.jsonp(<%= name %>s);
		}
	});
}