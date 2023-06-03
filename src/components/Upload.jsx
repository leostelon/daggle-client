import { Box, Checkbox, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { uploadDataset } from "../api/dataset";
import { toast } from "react-toastify";

export const Upload = ({ title, loggedInAddress }) => {
	const [uploadLoading, setUploadLoading] = useState(false);
	const [file, setFile] = useState();
	const [version, setVersion] = useState("");
	const [description, setDescription] = useState("");
	const [name, setName] = useState("");
	const [checkMark, setCheckMark] = useState(false);

	async function uploadFile() {
		if (!loggedInAddress || loggedInAddress === "")
			return toast("Please connect your wallet.", { type: "info" });
		if (!file) return alert("Please select a file!");
		if (!name || name === "")
			return alert("Please enter a name for this dataset.");
		if (!version || version === "")
			return alert("Please enter a version for this dataset.");
		if (!description || description === "")
			return alert("Please enter a description for this dataset.");
		setUploadLoading(true);
		await uploadDataset(file, `${name}:${version}`, description, checkMark);
		toast("Successfully uploaded your dataset", { type: "success" });
		setUploadLoading(false);
	}

	function handleCheckChange(event) {
		setCheckMark(event.target.checked);
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
					border: "2px solid grey",
					borderStyle: "dotted",
					p: 4,
					backgroundColor: "#1b1c1d",
				}}
			>
				<h3
					style={{
						color: "grey",
					}}
				>
					{title}
				</h3>
				<AiOutlineCloudUpload size={80} />
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
				<Box sx={{ mt: 1 }}>
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
								color: "white",
								border: "1px solid white",
							},
						}}
					/>
					<TextField
						placeholder="Enter version"
						size="small"
						value={version}
						onChange={(e) => {
							setVersion(e.target.value);
						}}
						sx={{
							width: "100%",
							mt: 2,
						}}
						InputProps={{
							style: {
								color: "white",
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
								color: "white",
								border: "1px solid white",
							},
						}}
					/>
					{/* Enable Stable-Diffusion */}
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							backgroundColor: "#256afe33",
							mt: 2,
							mb: 2,
							borderRadius: "4px",
							p: 1,
							py: 2,
						}}
					>
						<Box>
							<Checkbox
								sx={{
									color: "#256afe",
									"&.Mui-checked": {
										color: "#256afe",
									},
								}}
								checked={checkMark}
								onChange={handleCheckChange}
							/>
							Enable Stable-Diffusion on this dataset.
						</Box>
						<Box
							sx={{
								textAlign: "start",
								color: "#8d8d8d",
								fontWeight: "500",
								px: 1,
							}}
						>
							⚠️ Enabling this gives option to test out your dataset's on our
							platform without the need of downloading. This uses{" "}
							<span
								style={{
									fontWeight: "bold",
									textDecoration: "underline",
									cursor: "pointer",
								}}
								onClick={() => {
									window.open("https://docs.bacalhau.org/", "_blank");
								}}
							>
								Bacalhau
							</span>{" "}
							to perform the operation off-chain. Please note that it might be
							slow or even it might break.
						</Box>
					</Box>
				</Box>
				<Box
					style={{
						backgroundColor: "#256afe",
						padding: "12px 16px",
						fontWeight: 600,
						borderRadius: "4px",
						cursor: "pointer",
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
