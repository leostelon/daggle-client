import "../styles/JobComponent.css";
import React, { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { IoRefreshOutline } from "react-icons/io5";
import { PrimaryGrey } from "../constants";
import { Box, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import { getJob } from "../api/bacalhau";

export const JobComponent = ({ job: jb }) => {
	const [copyEnabled, setCopyEnabled] = useState(false);
	const [open, setOpen] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [job, setJob] = useState();

	function toggleCopy() {
		setCopyEnabled(!copyEnabled);
	}

	async function gJ() {
		if (refreshing) return;
		setRefreshing(true);
		const jobResolved = await getJob(job.id, job.type);
		if (jobResolved.statusCode === 200) {
			setJob(jobResolved.data);
			toast("Successfully refreshed.", { type: "success" });
		} else {
			toast("Some error occured, try again.", { type: "warning" });
		}

		setRefreshing(false);
	}

	useEffect(() => {
		if (!job || !job.id) {
			setJob(jb);
		}
	}, [job, jb]);

	return !job ? (
		<></>
	) : (
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
								color: PrimaryGrey,
								visibility: copyEnabled ? "visible" : "hidden",
								cursor: "pointer",
							}}
							size={16}
						/>
					</Box>
				</Tooltip>
				{job.status !== "Completed" && (
					<Box
						onClick={gJ}
						className={`refresh-icon ${refreshing ? "active" : ""}`}
					>
						<IoRefreshOutline
							style={{
								color: PrimaryGrey,
								visibility: refreshing
									? "visible"
									: copyEnabled
									? "visible"
									: "hidden",
								cursor: "pointer",
							}}
							size={16}
						/>
					</Box>
				)}
			</td>
			<td>{job.type}</td>
			<td>{job.status}</td>
			<td
				onClick={() => {
					window.open(`https://ipfs.io/ipfs/${job.result}`, "_blank");
				}}
				style={{ cursor: "pointer" }}
			>
				{job.status === "Completed" ? "Check Result" : "-"}
			</td>
			{/* <td>09/04/2023 20:29</td> */}
			<td>{new Date(job.timestamp).toDateString()}</td>
		</tr>
	);
};
