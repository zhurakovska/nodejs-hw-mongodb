import * as contactsServices from "../services/contacts.js";
import createHttpError from "http-errors";

export const getContactsController = async (req, res) => {
	const { page, perPage, sortBy, sortOrder } = req.query;

	const data = await contactsServices.getContacts({
		page,
		perPage,
		sortBy,
		sortOrder
	});

	res.json({
		status: 200,
		message: "Successfully found contacts!",
		data
	});

}

export const getContactByIdController = async (req, res) => {
	const {contactId} = req.params;
	const {_id: userId} = req.user;
	const data = await contactsServices.getContact({_id:contactId, userId});

	if(!data) {
		throw createHttpError(404, "Contact not found")
	}

	res.json({
		status:200,
		message:`Successfully found contact with id ${contactId}!`,
		data
	})
}

export const addContactController = async (req, res )=> {
	const {_id: userId} = req.user
	const data = await contactsServices.addContact({...req.body,userId });

	res.status(201).json({
	   status:201,
	   message:"Successfully created a contact!",
	   data
	})
}

export const upsertContactController = async (req, res) =>{
	const {contactId} = req.params;
	const {_id: userId} = req.user;
	const {data, isNew} = await contactsServices.updateContact({_id:contactId, userId}, {...req.body, userId}, {upsert: true});

	const status = isNew ? 201 : 200;
	res.status(status).json({
		status,
		message:"Successfully updated a contact!",
		data,
	})
}

export const patchContactController = async (req, res) => {
	const {contactId} = req.params;
	const {_id: userId} = req.user;
	const {data} = await contactsServices.updateContact({_id:contactId, userId}, req.body, {upsert: true});

	res.json({
		status: 200,
		message:"Successfully patched a contact!",
		data,
	})
}

export const deleteContactController = async (req, res) => {
	const {contactId} = req.params;
	const {_id: userId} = req.user;
	const data = await contactsServices.deleteContact({_id:contactId, userId});

	if(!data) {
		throw createHttpError(404, "Contact not found")
	}

	res.status(204).send()
}
