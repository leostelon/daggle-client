import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { PrimaryGrey } from "../constants";
import { Box, Tooltip } from "@mui/material";

export const JobComponent = ({ job }) => {
	const [copyEnabled, setCopyEnabled] = useState(false);
	const [open, setOpen] = useState(false);

	function toggleCopy() {
		setCopyEnabled(!copyEnabled);
	}
	return (
		<tr>
			<td
				style={{ fontWeight: "500", color: "#303031", display: "flex" }}
				onMouseEnter={toggleCopy}
				onMouseLeave={toggleCopy}
			>
				{job.id}
				<Tooltip
					title="Copied!"
					placement="top"
					open={open}
					onClose={() => setOpen(false)}
				>
					<Box
						onClick={() => {
							navigator.clipboard.writeText(job.id);
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
			<td>{job.type}</td>
			<td>{job.status}</td>
			<td>result</td>
			{/* <td>09/04/2023 20:29</td> */}
			<td>{new Date(job.timestamp).toDateString()}</td>
		</tr>
	);
};
