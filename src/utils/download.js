import { toast } from "react-toastify";
import { downloadDataset } from "../api/dataset";

export async function download(id) {
	try {
		// Server Interaction
		const resolved = await downloadDataset(id);
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
			// Download File
			downloadURI(resolved.data.data.file, resolved.data.data.name);
		}

		return resolved;
	} catch (error) {
		toast(error.message);
	}
}

function downloadURI(uri, name) {
	const link = document.createElement("a");
	link.href = uri;
	link.download = name;
	link.click();
}
