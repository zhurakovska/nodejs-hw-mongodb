import express from "express";
import cors from "cors";
import pino from "pino-http";
import {env} from "./utils/env.js";

import * as contactsServices from "./services/contacts.js";
import {getContactById} from "./services/contacts.js";
import contactsRouter from "./routers/contacts.js"

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


	app.use("/contacts",contactsRouter )
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


