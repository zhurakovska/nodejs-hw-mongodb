import {isValidObjectId} from "mongoose";
import createHttpError from "http-errors";

export const isValidId = (req, res, next)=> {
	const {contactId} = req.params;
	if(!isValidObjectId(contactId)) {
		return next(createHttpError(404, `Contact not found`));
	}
	next();
};
