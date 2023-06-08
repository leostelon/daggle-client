import { default as axios } from "axios";
import { SERVER_URL } from "../constants";
import { resolve } from "../utils/resolver";
import { toast } from "react-toastify";

export const createTensorJob = async function (scriptUrl, filename, datasetUrl) {
	try {
		let token = localStorage.getItem("token");

		const resolved = await resolve(
			axios.post(
				SERVER_URL + "/bacalhau/traintensorflow",
				{ scriptUrl, filename, datasetUrl },
				{
					headers: {
						"Content-Type": `application/json`,
						Authorization: `Bearer ${token}`,
					},
				}
			)
		);
		if (resolved.statusCode === 200) {
			toast("Successfully created a job in Bacalhau, please check jobs for status🚀", { type: "success" });
		}
		return resolved;
	} catch (error) {
		console.log(error.message);
	}
};

export const fileUpload = async function (url) {
	try {
		let token = localStorage.getItem("token");

		const resolved = await resolve(
			axios.post(
				SERVER_URL + "/bacalhau/fileupload",
				{ url },
				{
					headers: {
						"Content-Type": `application/json`,
						Authorization: `Bearer ${token}`,
					},
				}
			)
		);
		if (resolved.statusCode === 404) {
			const data = resolved.data;
			if (data.data.message && data.data.message.includes("authenticate")) {
				toast("Please connect your wallet!", {
					type: "info",
				});
			}
		} else if (resolved.statusCode === 200) {
			toast("Successfully started upload to IPFS, check status in jobs sections.", { type: "success" });
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

export const getModels = async function () {
	try {
		let token = localStorage.getItem("token");

		const resolved = await resolve(
			axios.get(SERVER_URL + "/models", {
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

export const uploadScript = async function (script) {
	try {
		let token = localStorage.getItem("token");

		const resolved = await resolve(
			axios.post(
				SERVER_URL + "/bacalhau/pythonscript",
				{ script },
				{
					headers: {
						"Content-Type": `application/json`,
						Authorization: `Bearer ${token}`,
					},
				}
			)
		);
		return resolved;
	} catch (error) {
		console.log(error.message);
	}
}

export const uploadNodejsScript = async function (script) {
	try {
		let token = localStorage.getItem("token");

		const resolved = await resolve(
			axios.post(
				SERVER_URL + "/bacalhau/nodescript",
				{ script },
				{
					headers: {
						"Content-Type": `application/json`,
						Authorization: `Bearer ${token}`,
					},
				}
			)
		);
		return resolved;
	} catch (error) {
		console.log(error.message);
	}
}

export const runPythonScript = async function (scriptUrl, filename) {
	try {
		let token = localStorage.getItem("token");

		const resolved = await resolve(
			axios.post(
				SERVER_URL + "/bacalhau/runpython",
				{ scriptUrl, filename },
				{
					headers: {
						"Content-Type": `application/json`,
						Authorization: `Bearer ${token}`,
					},
				}
			)
		);
		if (resolved.statusCode === 200) {
			toast("Successfully created a job in Bacalhau, please check jobs for status🚀", { type: "success" });
		}
		return resolved;
	} catch (error) {
		console.log(error.message);
	}
};

export const runNodejsScript = async function (scriptUrl, filename) {
	try {
		let token = localStorage.getItem("token");

		const resolved = await resolve(
			axios.post(
				SERVER_URL + "/bacalhau/runnodejs",
				{ scriptUrl, filename },
				{
					headers: {
						"Content-Type": `application/json`,
						Authorization: `Bearer ${token}`,
					},
				}
			)
		);
		if (resolved.statusCode === 200) {
			toast("Successfully created a job in Bacalhau, please check jobs for status🚀", { type: "success" });
		}
		return resolved;
	} catch (error) {
		console.log(error.message);
	}
};

export const getJob = async function (id, type) {
	try {
		let token = localStorage.getItem("token");

		const resolved = await resolve(
			axios.get(`${SERVER_URL}/bacalhau/job?id=${id}&type=${type}`, {
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
