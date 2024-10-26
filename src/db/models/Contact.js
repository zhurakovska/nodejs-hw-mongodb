import {Schema, model} from "mongoose";

import {contactType, phoneNumberRegex} from "../../constants/contacts.js";
import {handleSaveError, setUpdateSettings} from "./hooks.js";

const contactSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Contact name is required'],
	},
	phoneNumber: {
		type: String,
		required: [true, 'Phone number is required'],
		match: [phoneNumberRegex, 'Phone number must start with +380 and contain 9 digits after the code'],
	},
	email:{
		type: String,
	},
	isFavourite: {
		type: Boolean,
		default: false
	},
	contactType: {
		type: String,
		required: true,
		default: "personal",
		enum: {
			values: contactType,
			message: `Contact type must be one of the following: ${contactType.join(', ')}`,
		},
	}
}, { versionKey: false, timestamps: true});

contactSchema.post("save", handleSaveError );
contactSchema.pre("findOneAndUpdate", setUpdateSettings);
contactSchema.post("findOneAndUpdate" , handleSaveError );

const ContactCollection = model("contact", contactSchema);

export default ContactCollection;
