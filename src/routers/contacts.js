import {Router} from "express";
import {addContactController, getContactByIdController, getContactsController, upsertContactController, patchContactController, deleteContactController} from "../controllers/contacts.js";
import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import {isValidId} from "../middlewares/isValidId.js";
import {validateBody} from "../utils/validateBody.js";
import {contactAddSchema, contactUpdateSchema} from "../validations/contacts.js";

const contactsRouter = Router()


contactsRouter.get("/",ctrlWrapper(getContactsController));

contactsRouter.get("/:contactId", isValidId, ctrlWrapper(getContactByIdController));

contactsRouter.post("/",validateBody(contactAddSchema), ctrlWrapper(addContactController));

contactsRouter.put("/:contactId",isValidId, validateBody(contactAddSchema), ctrlWrapper(upsertContactController))

contactsRouter.patch("/:contactId",isValidId, ctrlWrapper(patchContactController))

contactsRouter.delete("/:contactId",isValidId, ctrlWrapper(deleteContactController))

export default contactsRouter
