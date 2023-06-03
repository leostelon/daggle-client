import React, { useEffect, useState } from "react";
import { Box, Dialog } from "@mui/material";
import { getShortAddress } from "../utils/addressShort";
import { useNavigate } from "react-router-dom";
import { IoMdOpen } from "react-icons/io";
import { getDatasetVersion } from "../api/dataset";
import { Loader } from "./Loader";
import { RxHalf2 } from "react-icons/rx";
import { DownloadButton } from "./DownloadButton";

export const TagsDialog = ({ name, isOpen, handleExternalClose }) => {
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const [images, setImages] = useState([]);
	const [open, setOpen] = useState(false);

	async function getImages(name) {
		setLoading(true);
		const repos = await getDatasetVersion(name);
		setImages(repos);
		setLoading(false);
	}

	const handleClose = () => {
		setOpen(false);
		setImages([]);
		if (handleExternalClose) {
			handleExternalClose();
		}
	};

	useEffect(() => {
		if (!name || name === "") return;
		if (isOpen) {
			setOpen(true);
			getImages(name);
		}
	}, [name, isOpen]);

	return (
		<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
			<Box
				sx={{
					backgroundColor: "#131313",
					padding: "12px",
					color: "white",
				}}
			>
				<h2 style={{ textAlign: "center", color: "white" }}>
					{getShortAddress(name.split("/")[0])}/{name.split("/")[1]} versions
				</h2>

				<br />
				{loading ? (
					<Loader />
				) : (
					images.map((d, i) => {
						const ds = d.data;
						return (
							<Box className="dscard" key={i}>
								<Box
									display="flex"
									alignItems={"center"}
									justifyContent={"space-between"}
								>
									<Box>
										<Box sx={{ display: "flex", alignItems: "center" }}>
											<h3>
												{getShortAddress(ds.name.split("/")[0])}/
												{ds.name.split("/")[1]}
											</h3>
											<Box className="tag" sx={{ ml: 2 }}>
												<RxHalf2
													style={{
														marginRight: "6px",
														color: "#256afe",
													}}
												/>
												{ds.version}
											</Box>
										</Box>
									</Box>
									<h5>Uploaded at {new Date(ds.timestamp).toDateString()}</h5>
								</Box>
								<Box>
									<Box display={"flex"}>
										{ds.private && (
											<Box
												className="tag"
												sx={{
													backgroundColor: "#ff1616 !important",
												}}
											>
												Private
											</Box>
										)}
									</Box>
								</Box>
								{/* Description */}
								<Box mt={2} sx={{ color: "grey" }}>
									<p>
										{ds.description !== "" ? ds.description : "No description"}
									</p>
								</Box>
								{/* Maintained By */}
								<Box className="creator">
									<p>Maintained by&nbsp;</p>
									<Box
										sx={{
											"&:hover": {
												textDecoration: "underline",
											},
											cursor: "pointer",
										}}
										onClick={() => navigate("/profile/" + ds.creator)}
									>
										{getShortAddress(ds.creator)}
									</Box>
									<IoMdOpen
										style={{ color: "white" }}
										className="open-creator-icon"
									/>
								</Box>
								<Box
									display="flex"
									alignItems={"center"}
									sx={{
										marginTop: "12px",
										fontWeight: "600",
										fontSize: "12px",
									}}
								>
									<DownloadButton ds={ds} />
								</Box>
							</Box>
						);
					})
				)}
			</Box>
		</Dialog>
	);
};
