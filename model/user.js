const mongoose = require('mongoose');
var crypto = require('crypto');
let Schema = mongoose.Schema;

let userSchema = new Schema({
	username: {
        type:'String',
        required: true,
        unique: true
    },
	password: 'String',
	email: 'String',
    hash: 'String',
    salt: 'String',
	creationDate: 'Date',
	layouts: 'Array',
    versionKey: false,
}, {
	collection: 'Users'
});
userSchema.index({username: 1});

// Method to set salt and hash the password for a user 
userSchema.methods.setPassword = function(password) { 
// Creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex'); 
    
    // Hashing user's salt and password with 1000 iterations, 
    this.hash = crypto.pbkdf2Sync(password, this.salt,  
    1000, 64, `sha512`).toString(`hex`); 
}; 

// Method to check the entered password is correct or not 
userSchema.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
}; 

module.exports = mongoose.model('User', userSchema);