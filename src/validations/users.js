import Joi from "joi";
import { emailRegexp } from "../constants/users.js";

export const userRegisterSchema = Joi.object({
	username: Joi.string()
		.min(3)
		.required()
		.messages({
			'string.base': 'Username should be a string',
			'string.min': 'Username should have at least 3 characters',
			'any.required': 'Username is required'
		}),
	email: Joi.string()
		.pattern(emailRegexp)
		.required()
		.messages({
			'string.base': 'Email should be a string',
			'string.pattern.base': 'Please provide a valid email address',
			'any.required': 'Email is required'
		}),
	password: Joi.string()
		.min(6)
		.required()
		.messages({
			'string.base': 'Password should be a string',
			'string.min': 'Password should have at least 6 characters',
			'any.required': 'Password is required'
		})
});

export const userLoginSchema = Joi.object({
	email: Joi.string()
		.pattern(emailRegexp)
		.required()
		.messages({
			'string.base': 'Email should be a string',
			'string.pattern.base': 'Please provide a valid email address',
			'any.required': 'Email is required'
		}),
	password: Joi.string()
		.min(6)
		.required()
		.messages({
			'string.base': 'Password should be a string',
			'string.min': 'Password should have at least 6 characters',
			'any.required': 'Password is required'
		})
});

