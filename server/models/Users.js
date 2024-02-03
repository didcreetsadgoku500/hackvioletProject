

mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    emergency_contact_phone_number: {
		type: String,
		required: true,
	},
	emergency_contact_name: {
		type: String,
		required: true,
	},
});



const UserModel = mongoose.model("emergency_contacts", UserSchema);

module.exports = UserModel;