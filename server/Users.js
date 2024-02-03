const UserSchema = new mongoose.Schema({
	token: {
		type: String,
		required: true,
	},
	emergency_contact: {
		type: String,
		required: true,
	},
})