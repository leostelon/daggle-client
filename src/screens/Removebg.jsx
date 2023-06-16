import React, { useEffect, useState } from "react";
import { LeftDrawer } from "../components/LeftDrawer";
import { Box, Button, IconButton } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { RiImageEditLine } from "react-icons/ri";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
import { BlueButton } from "../components/BlueButton";
import { createRemovebgJob } from "../api/bacalhau";
import { useNavigate } from "react-router-dom";

export const Removebg = () => {
	const loggedInAddress = localStorage.getItem("address");
	const [thumbnailFile, setThumbnailFile] = useState();
	const [thumbnailFilePreview, setThumbnailFilePreview] = useState();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function uploadFile() {
		if (!loggedInAddress)
			return toast("Please connect your wallet.", { type: "info" });
		if (!thumbnailFile)
			return toast("Please select an image!", { type: "info" });
		setLoading(true);
		// Upload File here
		await createRemovebgJob(thumbnailFile);
		setLoading(false);
		await new Promise((resolve) => setTimeout(resolve, 3000));
		navigate(`/jobs`);
	}

	useEffect(() => {
		if (thumbnailFile) {
			const objectUrl = URL.createObjectURL(thumbnailFile);
			setThumbnailFilePreview(objectUrl);

			return () => URL.revokeObjectURL(objectUrl);
		}
	}, [thumbnailFile]);

	return (
		<Box sx={{ display: "flex" }}>
			<LeftDrawer />
			<Box style={{ width: `calc(100vw - 280px)` }}>
				<Navbar />
				<Box sx={{ p: 2 }}>
					<h2>Remove Image Background 🪞</h2>
					<br />
					{thumbnailFilePreview ? (
						<Box
							sx={{
								width: "360px",
								height: "240px",
								borderRadius: "10px",

								backgroundImage: `url(${thumbnailFilePreview})`,
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
								backgroundPosition: "center",

								display: "flex",
								justifyContent: "flex-end",

								mt: 1,
							}}
						>
							<IconButtonHolder
								sx={{ m: 1 }}
								component="label"
								onChange={(e) => {
									if (e.target.files[0]?.type?.split("/")[0] !== "image")
										toast("Please select a file with type image!", {
											type: "info",
										});
									else setThumbnailFile(e.target.files[0]);
								}}
							>
								<RiImageEditLine />
								<input type="file" hidden />
							</IconButtonHolder>
						</Box>
					) : (
						<Button
							component="label"
							onChange={(e) => {
								if (e.target.files[0]?.type?.split("/")[0] !== "image")
									toast("Please select a file with type image!", {
										type: "info",
									});
								else setThumbnailFile(e.target.files[0]);
							}}
							sx={{ paddingLeft: "0px" }}
						>
							<input type="file" hidden />

							<FileUploadContainer />
						</Button>
					)}
					<BlueButton
						title={"Remove Background"}
						loading={loading}
						onClick={uploadFile}
					/>
				</Box>
			</Box>
		</Box>
	);
};

const IconButtonHolder = styled(IconButton)({
	color: "white",
	backgroundColor: "#191C22",
	borderRadius: "5px",

	width: "40px",
	height: "40px",

	marginRight: "8px",
});

const FileUploadContainer = (props) => {
	return (
		<Box
			sx={{
				border: "1.5px dashed darkgrey",
				borderRadius: "10px",
				width: "360px",
				height: "240px",

				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",

				bgcolor: "#c6c6c61c",
				cursor: "pointer",
			}}
			{...props}
		>
			<h4>Upload Image</h4>
			<input type="file" hidden />
		</Box>
	);
};
