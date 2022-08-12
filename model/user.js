const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
	username: {
        type:'String',
        required: true,
        unique: true
    },
	password: 'String',
	email: 'String',
	creationDate: 'Date',
	layouts: 'Array',
    versionKey: false,
}, {
	collection: 'Users'
});
userSchema.index({username: 1});


module.exports = mongoose.model('User', userSchema);