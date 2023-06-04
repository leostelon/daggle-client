import { Box } from "@mui/material";
import React from "react";
import { LeftDrawer } from "../components/LeftDrawer";

export const Job = () => {
	return (
		<Box sx={{ display: "flex" }}>
			<LeftDrawer />
			<Box sx={{ color: "pink" }}>Job</Box>
		</Box>
	);
};
