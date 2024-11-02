import {Router} from "express";
import {addContactController, getContactByIdController, getContactsController, upsertContactController, patchContactController, deleteContactController} from "../controllers/contacts.js";
import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import {isValidId} from "../middlewares/isValidId.js";
import {validateBody} from "../utils/validateBody.js";
import {contactAddSchema, contactUpdateSchema} from "../validations/contacts.js";
import {parsePaginationParams} from "../middlewares/parsePaginationParams.js";
import {parseSortParamsDecorator} from "../middlewares/parseSortParamsDecorator.js";
import {contactsSortList} from "../db/models/Contact.js";
import {authenticate} from "../middlewares/authenticate.js";

const contactsRouter = Router()

contactsRouter.use(authenticate)


contactsRouter.get("/", parsePaginationParams,parseSortParamsDecorator(contactsSortList), ctrlWrapper(getContactsController));

contactsRouter.get("/:contactId", isValidId, ctrlWrapper(getContactByIdController));

contactsRouter.post("/",validateBody(contactAddSchema), ctrlWrapper(addContactController));

contactsRouter.put("/:contactId",isValidId, validateBody(contactAddSchema), ctrlWrapper(upsertContactController))

contactsRouter.patch("/:contactId",isValidId,validateBody(contactUpdateSchema), ctrlWrapper(patchContactController))

contactsRouter.delete("/:contactId",isValidId, ctrlWrapper(deleteContactController))

export default contactsRouter
