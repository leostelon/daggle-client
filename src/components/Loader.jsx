import { Box, CircularProgress } from "@mui/material";
import React from "react";

export const Loader = () => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "10vh",
			}}
		>
			<CircularProgress sx={{ color: "#256afe" }} />
		</Box>
	);
};
