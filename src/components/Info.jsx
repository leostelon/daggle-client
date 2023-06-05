import { Box } from "@mui/material";
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { PrimaryGrey } from "../constants";

export const Info = ({ title, description }) => {
	return (
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
			<Box
				mb={1}
				sx={{
					fontSize: "14px",
					display: "flex",
					alignItems: "center",
					fontWeight: "500",
				}}
			>
				<AiOutlineInfoCircle />
				&nbsp;{title}
			</Box>
			<Box
				sx={{
					textAlign: "start",
					color: PrimaryGrey,
					fontWeight: "500",
					fontSize: "12px",
				}}
			>
				{description}
			</Box>
		</Box>
	);
};
