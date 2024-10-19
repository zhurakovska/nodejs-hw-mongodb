import {Router} from "express";
import {getContactByIdController, getContactsController} from "../controllers/contacts.js";
import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import {isValidId} from "../middlewares/isValidId.js";

const contactsRouter = Router()


contactsRouter.get("/",ctrlWrapper(getContactsController));

contactsRouter.get("/:contactId", isValidId, ctrlWrapper(getContactByIdController));

export default contactsRouter
