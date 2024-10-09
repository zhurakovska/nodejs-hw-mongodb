import express from "express";
import cors from "cors";
import pino from "pino-http";
import {env} from "./utils/env.js";

import * as contactsServices from "./services/contacts.js";
import {getContactById} from "./services/contacts.js";

const logger = pino({
	transport: {
		target: 'pino-pretty',
		options: { colorize: true }
	}
});

export const setupServer = ()=> {
	const app = express()
	app.use(cors());
	app.use(logger)

	app.get("/contacts", async (req, res) => {
		const data = await contactsServices.getContacts();
		res.json({
			status: 200,
			message: "Successfully found contacts!",
			data
		});
	});

	app.get("/contacts/:contactId", async (req, res) => {
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
	});

	app.use((req, res)=>{
		res.status(404).json({
			message: `${req.url} not found`
		})
	})

	app.use((error, req, res, next)=> {
		res.status(500).json({
			message: error.message,
		});
	});

	const port = Number(env("PORT", 3000));
	app.listen(port,()=> console.log(`Server is running on server ${port} port`))
}


