import Joi from "joi";
import {contactType, phoneNumberRegex} from "../constants/contacts.js";

export const contactAddSchema = Joi.object({
    name: Joi.string().
		min(3).
		max(20).
		required().
		messages({
			'string.base': 'name should be a string',
			'string.min': 'name should have at least 3 characters',
			'string.max': 'name should have at most 20 characters',
			'any.required': 'name is required',
	}),
	phoneNumber: Joi.string()
		.pattern(phoneNumberRegex)
		.required()
		.messages({
			'string.pattern.base': 'Phone number must start with +380 and contain 9 digits after the code',
			'any.required': 'Phone number is required',
			'string.base': 'Phone number should be a string'
		}),
	email: Joi.string().
		min(3).
		max(20).
		messages({
		'string.base': 'Email be a string',
		'string.min': 'Email should have at least 3 characters',
		'string.max': 'Email should have at most 20 characters',
	}),
	isFavourite:Joi.boolean()
		.messages({
			'boolean.base': 'isFavourite should be a boolean (true or false)',
	}),
	contactType:Joi.string().
		min(3).
		max(20).
		valid(...contactType).
		messages({
			'any.only': `Contact type must be one of the following: ${contactType.join(', ')}`,
			'string.base': 'Contact type should be a string',
			'string.min': 'Contact type should have at least 3 characters',
			'string.max': 'Contact type should have at most 20 characters'
		})
})

export const contactUpdateSchema = Joi.object({
	name: Joi.string().
	min(3).
	max(20).
	messages({
		'string.base': 'name should be a string',
		'string.min': 'name should have at least 3 characters',
		'string.max': 'name should have at most 20 characters',
	}),
	phoneNumber: Joi.string()
		.pattern(phoneNumberRegex)
		.messages({
			'string.pattern.base': 'Phone number must start with +380 and contain 9 digits after the code',
			'string.base': 'Phone number should be a string'
		}),
	email: Joi.string().
	min(3).
	max(20).
	messages({
		'string.base': 'Email be a string',
		'string.min': 'Email should have at least 3 characters',
		'string.max': 'Email should have at most 20 characters',
	}),
	isFavourite:Joi.boolean()
		.messages({
			'boolean.base': 'isFavourite should be a boolean (true or false)',
		}),
	contactType:Joi.string().
	min(3).
	max(20).
	valid(...contactType).
	messages({
		'any.only': `Contact type must be one of the following: ${contactType.join(', ')}`,
		'string.base': 'Contact type should be a string',
		'string.min': 'Contact type should have at least 3 characters',
		'string.max': 'Contact type should have at most 20 characters'
	})
})
