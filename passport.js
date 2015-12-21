var LocalStrategy = require('passport-local').Strategy;
var userController = require('./models/user').controller;

module.exports = function(passport) {
    passport.serializeUser(function(user, callback) {
	callback(null, user.id);
    });
    passport.deserializeUser(function(id, callback) {
	User.findById(id, function(err, user) {
	    callback(err, user);
	});
    });
    passport.use('localSignUp', new LocalStrategy(
	function(username, password, callback){
	    userController.getUser(username, function(user) {
		if (!user) {
		    var newUser = userController.addUser(username, password);
		    return callback(null, newUser);
		}
		if (!userController.validPassword(user, password)) {
		    return callback(null, null);
		}
		return callback(null, user);
	    });
	}
    ));
}
