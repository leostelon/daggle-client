import { default as axios } from "axios";
import { SERVER_URL } from "../constants";

export const createUser = async function (address) {
	try {
		const sign = await window.ethereum.request({
			method: "personal_sign",
			params: [address, "Please approve this message."],
		});

		const response = await axios.post(
			SERVER_URL + "/user/login",
			{ sign },
			{
				headers: {
					"Content-Type": `application/json`,
				},
			}
		);
		if (response.status === 200) {
			console.log(response.data);
			localStorage.setItem("token", response.data.token);

			return response.data;
		}
	} catch (error) {
		console.log(error.message);
	}
};

export const getUser = async function (address) {
	try {
		const response = await axios.get(SERVER_URL + "/user/" + address);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.log(error.message);
	}
};
