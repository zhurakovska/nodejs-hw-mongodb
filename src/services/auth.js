import {randomBytes} from "crypto"
import UserCollection from "../db/models/User.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import SessionCollection from "../db/models/Session.js";
import {accessTokenLifetime, refreshTokenLifetime} from "../constants/users.js";

export const register = async (payload) => {
	const {email, password} = payload;
	const user = await UserCollection.findOne({email})

	if(user) {
		throw createHttpError(409, "Email is already existed!")
	}

	const hashPassword = await bcrypt.hash(password,10)

	return await UserCollection.create({...payload, password: hashPassword });
}

export const login = async (payload) => {
	const {email, password} = payload;
	const user = await UserCollection.findOne({email})
    const comparePassword = await bcrypt.compare(password, user.password)

	if(!user) {
		throw createHttpError(401, "Email or password a re not found!")
	}

	if(!comparePassword) {
		throw createHttpError(401, "Email or password a re not found!")
	}

	await SessionCollection.deleteOne({userId: user._id})

	const accessToken = randomBytes(30).toString("base64")
	const refreshToken = randomBytes(30).toString("base64")

	return await SessionCollection.create({
		userId: user._id,
		accessToken,
		refreshToken,
		accessTokenValidUntil: Date.now() + accessTokenLifetime,
		refreshTokenValidUntil: Date.now() + refreshTokenLifetime
	})
}

