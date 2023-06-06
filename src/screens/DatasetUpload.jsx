import React from "react";
import { LeftDrawer } from "../components/LeftDrawer";
import { Box } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { Upload } from "../components/Upload";

export const DatasetUpload = () => {
	const loggedInAddress = localStorage.getItem("address");

	return (
		<Box sx={{ display: "flex" }}>
			<LeftDrawer />
			<Box style={{ width: `calc(100vw - 280px)` }}>
				<Navbar />
				<Box sx={{ p: 2 }}>
					<h2>Dataset Upload 🪣</h2>
					<br />
					<Upload
						title={"Upload your dataset.😃"}
						loggedInAddress={loggedInAddress}
					/>
				</Box>
			</Box>
		</Box>
	);
};
