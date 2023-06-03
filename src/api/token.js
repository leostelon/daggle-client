import { default as axios } from "axios";
import { SERVER_URL } from "../constants";

export const createToken = async function (body) {
	try {
		let token = localStorage.getItem("token");

		const response = await axios.post(SERVER_URL + "/token/create", body, {
			headers: {
				"Content-Type": `application/json`,
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error.message);
	}
};

export const getAccessToken = async function (datasetName) {
	try {
		const response = await axios.get(
			SERVER_URL + "/token?datasetName=" + datasetName,
			{
				headers: {
					"Content-Type": `application/json`,
				},
			}
		);
		return response;
	} catch (error) {
		console.log(error.message);
	}
};

export const createAccess = async function (body) {
	try {
		let token = localStorage.getItem("token");

		const response = await axios.post(
			SERVER_URL + "/token/access/create",
			body,
			{
				headers: {
					"Content-Type": `application/json`,
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response;
	} catch (error) {
		console.log(error.message);
	}
};
