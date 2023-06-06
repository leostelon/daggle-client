import { Box, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { uploadDataset } from "../api/dataset";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Upload = ({ title, loggedInAddress }) => {
	const [uploadLoading, setUploadLoading] = useState(false);
	const [file, setFile] = useState();
	const [description, setDescription] = useState("");
	const [name, setName] = useState("");
	const navigate = useNavigate();

	async function uploadFile() {
		if (!loggedInAddress || loggedInAddress === "")
			return toast("Please connect your wallet.", { type: "info" });
		if (!file) return toast("Please select a file!", { type: "info" });
		if (!name || name === "")
			return toast("Please enter a name for this dataset.", { type: "info" });
		if (!description || description === "")
			return toast("Please enter a description for this dataset.", {
				type: "info",
			});
		setUploadLoading(true);
		await uploadDataset(file, name, description);
		toast("Successfully uploaded your dataset", { type: "success" });
		navigate("/jobs");
		setUploadLoading(false);
	}

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: 2,
			}}
		>
			<Box
				sx={{
					textAlign: "center",
					border: "2px solid lightgrey",
					borderStyle: "dotted",
					p: 4,
				}}
			>
				<AiOutlineCloudUpload style={{ color: "grey" }} size={80} />
				<Box
					style={{
						marginBottom: "16px",
					}}
				>
					<input
						type="file"
						name="file"
						id="file"
						multiple
						onChange={(e) => setFile(e.target.files)}
					/>
				</Box>
				<Box sx={{ mt: 1, mb: 2 }}>
					<TextField
						placeholder="Enter dataset name"
						size="small"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
						sx={{
							width: "100%",
						}}
						InputProps={{
							style: {
								border: "1px solid white",
							},
						}}
					/>
					<TextField
						multiline
						rows={4}
						placeholder="Enter description"
						size="small"
						value={description}
						onChange={(e) => {
							setDescription(e.target.value);
						}}
						sx={{
							width: "100%",
							mt: 2,
						}}
						InputProps={{
							style: {
								border: "1px solid white",
							},
						}}
					/>
				</Box>
				<Box
					style={{
						backgroundColor: "#256afe",
						padding: "12px 16px",
						fontWeight: 600,
						borderRadius: "4px",
						cursor: "pointer",
						color: "white",
					}}
					onClick={uploadFile}
				>
					{uploadLoading ? (
						<CircularProgress size={14} sx={{ color: "white" }} />
					) : (
						"Upload File"
					)}
				</Box>
			</Box>
		</Box>
	);
};
