import createHttpError from "http-errors";
import {findSession, findUser} from "../services/auth.js";

export const authenticate = async (req, res, next) => {
	const authHeader = req.get("Authorization");
	if (!authHeader) {
		return next(createHttpError(401, "Authorization header is missing"));
	}

	const [bearer, accessToken] = authHeader.split(" ");
	if (bearer !== "Bearer" || !accessToken) {
		return next(createHttpError(401, "Authorization header is not bearer type or access token is missing"));
	}


	const session = await findSession({ accessToken });
	if (!session) {
		return next(createHttpError(401, "Session is not found"));
	}


	if (Date.now() > session.accessTokenValidUntil) {
		return next(createHttpError(401, "Access token expired"));
	}


	const user = await findUser({ _id: session.userId });
	if (!user) {
		return next(createHttpError(401, "User is not found"));
	}

	req.user = user;
	next();
};

