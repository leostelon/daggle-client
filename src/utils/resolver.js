import { Resolved } from "../models/resolved";

export async function resolve(promise) {
	const resolved = new Resolved();

	try {
		const res = await promise;
		resolved.data = res.data;
		resolved.statusCode = res.status;
	} catch (e) {
		resolved.data = e.response;
		resolved.statusCode = e.response.status;
		resolved.error = e;
	}

	return resolved;
}
