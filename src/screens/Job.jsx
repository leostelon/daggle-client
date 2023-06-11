import { Box, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LeftDrawer } from "../components/LeftDrawer";
import { Navbar } from "../components/Navbar";
import { JobComponent } from "../components/JobComponent";
import { getJobs } from "../api/bacalhau";
import { useLocation } from "react-router-dom";

export const Job = () => {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(true);
	const search = useLocation().search;
	const query = new URLSearchParams(search).get("query");

	async function gJ(query) {
		setLoading(true);
		const resolved = await getJobs(query);
		if (resolved.statusCode === 200) {
			setJobs(resolved.data);
		}
		setLoading(false);
	}

	useEffect(() => {
		gJ(query);
	}, [query]);

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
							{Array.from({ length: 10 }).map((_, i) => (
								<Skeleton
									variant="rectangular"
									sx={{ my: 1 }}
									height={"75px"}
									key={i}
								/>
							))}
						</Box>
					) : (
						<Box>
							<table>
								<thead>
									<tr>
										<th>Id</th>
										<th>Type</th>
										<th>Status</th>
										<th>Result</th>
										<th>Created</th>
									</tr>
								</thead>
								<tbody>
									{jobs.map((j, i) => (
										<JobComponent job={j.data} key={i} />
									))}
								</tbody>
							</table>
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
};
