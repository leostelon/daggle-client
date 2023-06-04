import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { PrimaryGrey } from "../constants";
import { Box, Tooltip } from "@mui/material";

export const JobComponent = () => {
	const [copyEnabled, setCopyEnabled] = useState(false);
	const [open, setOpen] = useState(false);

	function toggleCopy() {
		setCopyEnabled(!copyEnabled);
	}
	return (
		<tr>
			<td style={{ fontWeight: "500", color: "#303031", display: "flex" }}  onMouseEnter={toggleCopy} onMouseLeave={toggleCopy}>
				Alfreds Futterkiste
				<Tooltip
					title="Copied!"
					placement="top"
					open={open}
					onClose={() => setOpen(false)}
				>
					<Box
						onClick={() => {
							navigator.clipboard.writeText("videoId");
							setOpen(true);
						}}
					>
						<MdContentCopy
							style={{
								marginLeft: "12px",
								color: PrimaryGrey,
								visibility: copyEnabled ? "visible" : "hidden",
								cursor: "pointer",
							}}
							size={16}
						/>
					</Box>
				</Tooltip>
			</td>
			<td>Maria Anders</td>
			<td>Germany</td>
			<td>Germany</td>
			<td>09/04/2023 20:29</td>
		</tr>
	);
};
