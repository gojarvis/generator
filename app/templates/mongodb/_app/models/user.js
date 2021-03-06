/**
 * Module dependencies.
 */
var env = process.env.NODE_ENV || 'development',
    config = require('../../config/config')[env],
    Schema = require('jugglingdb').Schema,
    schema = new Schema('mongodb', {url: config.db});

var crypto = require('crypto'),
    _ = require('underscore'),
    authTypes = ['github', 'twitter', 'facebook', 'google'];


/**
 * User Schema
 */
var User = schema.define('User',{
    name: String,
    email: String,
    username: String,
    provider: String,
    hashed_password: String,
    salt: String
});

/**
 * Virtuals
 */
// User.prototype.virtualPassword = ('password').set(function(password) {
//     this._password = password;
//     this.salt = this.makeSalt();
//     this.hashed_password = this.encryptPassword(password);
// }).get(function() {
//     return this._password;
// });

/**
 * Validations
 */
var validatePresenceOf = function(value) {
    return value && value.length;
};

// the below 4 validations only apply if you are signing up traditionally


// User.path('email').validate(function(email) {
//     // if you are authenticating by any of the oauth strategies, don't validate
//     if (authTypes.indexOf(this.provider) !== -1) return true;
//     return email.length;
// }, 'Email cannot be blank');

// User.path('username').validate(function(username) {
//     // if you are authenticating by any of the oauth strategies, don't validate
//     if (authTypes.indexOf(this.provider) !== -1) return true;
//     return username.length;
// }, 'Username cannot be blank');

// User.path('hashed_password').validate(function(hashed_password) {
//     // if you are authenticating by any of the oauth strategies, don't validate
//     if (authTypes.indexOf(this.provider) !== -1) return true;
//     return hashed_password.length;
// }, 'Password cannot be blank');


/**
 * Pre-save hook
 */
// User.pre('save', function(next) {
//     if (!this.isNew) return next();

//     if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1)
//         next(new Error('Invalid password'));
//     else
//         next();
// });

/**
 * Methods
 */
User.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function(password) {
        if (!password) return '';
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    }
};


module.exports = schema.models.User;
