import { default as axios } from "axios";
import { SERVER_URL } from "../constants";
import { resolve } from "../utils/resolver";

export const uploadDataset = async function (
	files,
	dataset,
	description,
	stableDiffusionEnabled
) {
	try {
		let token = localStorage.getItem("token");
		const form = new FormData();
		for (let i = 0; i < files.length; i++) {
			form.append("file", files[i], files[i].name);
		}
		form.append("dataset", dataset);
		form.append("description", description);
		form.append("stableDiffusionEnabled", stableDiffusionEnabled);

		const response = await axios.post(SERVER_URL + "/upload/dataset", form, {
			headers: {
				"Content-Type": `multipart/form-data`,
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.log(error.message);
	}
};

export const getDatasets = async function () {
	try {
		const response = await axios.get(SERVER_URL + "/datasets");
		if (response.status === 200) {
			return response.data.repositories;
		}
	} catch (error) {
		console.log(error.message);
	}
};

export const searchDatasets = async function (name) {
	try {
		const response = await axios.get(
			SERVER_URL + "/datasets/search?name=" + name
		);
		if (response.status === 200) {
			return response.data.repositories;
		}
	} catch (error) {
		console.log(error.message);
	}
};

export const userDatasets = async function (user) {
	try {
		let token = localStorage.getItem("token");

		const response = await axios.get(SERVER_URL + "/datasets/user/" + user, {
			headers: {
				"Content-Type": `application/json`,
				Authorization: "Bearer " + token,
			},
		});
		if (response.status === 200) {
			return response.data.repositories;
		}
	} catch (error) {
		console.log(error.message);
	}
};

export const getDatasetVersion = async function (name) {
	try {
		let token = localStorage.getItem("token");

		const response = await axios.get(
			SERVER_URL + "/datasets/versions?name=" + name,
			{
				headers: {
					"Content-Type": `application/json`,
					Authorization: "Bearer " + token,
				},
			}
		);
		if (response.status === 200) {
			return response.data.repositories;
		}
	} catch (error) {
		console.log(error.message);
	}
};

export const downloadDataset = async function (id) {
	try {
		let token = localStorage.getItem("token");

		const resolved = await resolve(
			axios.get(SERVER_URL + "/datasets/download?id=" + id, {
				headers: {
					"Content-Type": `application/json`,
					Authorization: "Bearer " + token,
				},
			})
		);
		return resolved;
	} catch (error) {
		console.log(error.message);
	}
};
