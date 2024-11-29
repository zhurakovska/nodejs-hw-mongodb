import {Router} from "express";
import {addContactController, getContactByIdController, getContactsController, upsertContactController, patchContactController, deleteContactController} from "../controllers/contacts.js";
import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import {isValidId} from "../middlewares/isValidId.js";

const contactsRouter = Router()


contactsRouter.get("/",ctrlWrapper(getContactsController));

contactsRouter.get("/:contactId", isValidId, ctrlWrapper(getContactByIdController));

contactsRouter.post("/", ctrlWrapper(addContactController));

contactsRouter.put("/:contactId", ctrlWrapper(upsertContactController))

contactsRouter.patch("/:contactId", ctrlWrapper(patchContactController))

contactsRouter.delete("/:contactId", ctrlWrapper(deleteContactController))

export default contactsRouter
