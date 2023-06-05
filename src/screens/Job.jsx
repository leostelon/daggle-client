import { Box, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LeftDrawer } from "../components/LeftDrawer";
import { Navbar } from "../components/Navbar";
import { JobComponent } from "../components/JobComponent";
import { getJobs } from "../api/bacalhau";

export const Job = () => {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(true);

	async function gJ() {
		setLoading(true);
		const resolved = await getJobs();
		setJobs(resolved.data);
		setLoading(false);
	}

	useEffect(() => {
		gJ();
	}, []);

	return (
		<Box sx={{ display: "flex" }}>
			<LeftDrawer />
			<Box style={{ width: `calc(100vw - 280px)` }}>
				<Navbar />
				<Box sx={{ p: 2 }}>
					<h2>Jobs 📃</h2>
					<br />
					{loading ? (
						<Box>
							{Array.from({ length: 10 }).map((i) => (
								<Skeleton
									variant="rectangular"
									sx={{ my: 1 }}
									height={"75px"}
								/>
							))}
						</Box>
					) : (
						<Box>
							<table>
								<tr>
									<th>Id</th>
									<th>Type</th>
									<th>Status</th>
									<th>Result</th>
									<th>Created</th>
								</tr>
								{jobs.map((j, i) => (
									<JobComponent job={j.data} key={i} />
								))}
							</table>
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
};
