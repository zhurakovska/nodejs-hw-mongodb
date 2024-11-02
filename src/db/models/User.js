import {Schema, model} from "mongoose";

import {handleSaveError, setUpdateSettings} from "./hooks.js";
import {emailRegexp} from "../../constants/users.js";

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, 'Username is required'],
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		match: [emailRegexp, 'Please provide a valid email address'],
		unique: true
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: [6, 'Password must be at least 6 characters long']
	}

},{ versionKey: false, timestamps: true})

userSchema.post("save", handleSaveError );
userSchema.pre("findOneAndUpdate", setUpdateSettings);
userSchema.post("findOneAndUpdate" , handleSaveError );

const UserCollection =  model("user",userSchema)

export default UserCollection;
