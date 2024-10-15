import * as contactsServices from "../services/contacts.js";

export const getContactsController = async (req, res) => {
	try {
		const data = await contactsServices.getContacts();

		res.json({
			status: 200,
			message: "Successfully found contacts!",
			data
		});
	}
	catch(error) {
		res.status(500).json({
			status:500,
			message: error.message,
		})
	}

}

export const getContactByIdController = async (req, res) => {
	try {
		const {contactId} = req.params
		const data = await contactsServices.getContactById(contactId);

		if(!data) {
			return res.status(404).json({
				status:404,
				message:"Contact not found"
			})
		}

		res.json({
			status:200,
			message:`Successfully found contact with id ${contactId}!`,
			data
		})
	}
	catch (error){
		res.status(500).json({
			status:500,
			message: error.message,
		})
	}

}
