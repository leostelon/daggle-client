import { default as axios } from "axios";
import { SERVER_URL } from "../constants";
import { resolve } from "../utils/resolver";
import { toast } from "react-toastify";

export const createJob = async function (datasetId, prompt) {
	try {
		let token = localStorage.getItem("token");

		const resolved = await resolve(
			axios.post(
				SERVER_URL + "/bacalhau",
				{ datasetId, prompt },
				{
					headers: {
						"Content-Type": `application/json`,
						Authorization: `Bearer ${token}`,
					},
				}
			)
		);
		if (resolved.statusCode === 401) {
			toast("Please buy token's to access the datasets.", {
				type: "info",
			});
		} else if (resolved.statusCode === 404) {
			const data = resolved.data;
			if (data.data.message && data.data.message.includes("authenticate")) {
				toast("Please connect your wallet!", {
					type: "info",
				});
			} else
				toast("Creator has not created access for this dataset yet🥺", {
					type: "info",
				});
		} else if (resolved.statusCode === 200) {
			toast(
				"Successfully created a job in Bacalhau, please visit your profile to check status🚀",
				{
					type: "success",
				}
			);
		}
		return resolved;
	} catch (error) {
		console.log(error.message);
	}
};

export const getJobs = async function () {
	try {
		let token = localStorage.getItem("token");

		const resolved = await resolve(
			axios.get(SERVER_URL + "/bacalhau", {
				headers: {
					"Content-Type": `application/json`,
					Authorization: `Bearer ${token}`,
				},
			})
		);
		return resolved;
	} catch (error) {
		console.log(error.message);
	}
};

export const getJob = async function (id) {
	try {
		let token = localStorage.getItem("token");

		const resolved = await resolve(
			axios.get(SERVER_URL + "/bacalhau/job?id=" + id, {
				headers: {
					"Content-Type": `application/json`,
					Authorization: `Bearer ${token}`,
				},
			})
		);
		return resolved;
	} catch (error) {
		console.log(error.message);
	}
};
