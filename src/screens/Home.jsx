import "../styles/Home.css";
import { Box, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LeftDrawer } from "../components/LeftDrawer";
import { Navbar } from "../components/Navbar";
import TensorflowImg from "../assets/tensorflow.png";
import StableDiffusion from "../assets/stablediffusion.png";
import FileUpload from "../assets/fileupload.png";
import Dataset from "../assets/dataset.png";
import { JobComponent } from "../components/JobComponent";
import { getJobs } from "../api/bacalhau";

const actions = [
	{ title: "Upload File", image: FileUpload },
	{ title: "Upload Dataset", image: Dataset },
	{ title: "Train Model", image: TensorflowImg },
	{ title: "Stable Diffusion", image: StableDiffusion },
];
export const Home = () => {
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
				<Box sx={{ p: 2, display: "flex" }}>
					<Box flex={3}>
						<h2>Home 🏠</h2>
						<br />
						<br />
						<h4 style={{ color: "#525252" }}>Actions ✨</h4>
						<br />
						<Box display={"flex"}>
							{actions.map((i, ind) => (
								<Box
									sx={{
										borderRadius: "12px",
										p: 3,
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "space-between",
										height: "150px",
										mx: 1,
										ml: ind === 0 ? 0 : 1,
										cursor: "pointer",
										border: `3px solid transparent`,
										backgroundColor: "#e9e9e95d",
										"&:hover": {
											backgroundColor: "#e9e9e99d",
											border: `3px solid #4954FD`,
										},
									}}
								>
									<Box
										sx={{
											flex: 2,
											backgroundImage: `url("${i.image}")`,
											backgroundPosition: "center",
											backgroundSize: "contain",
											backgroundRepeat: "no-repeat",
											height: "50px",
										}}
									></Box>
									<Box
										sx={{
											display: "flex",
											alignItems: "flex-end",
											justifyContent: "center",
											textAlign: "center",
											flex: 1,
											fontSize: "12px",
											fontWeight: "600",
										}}
									>
										<p>{i.title}</p>
									</Box>
								</Box>
							))}
						</Box>
						<br />
						<h4 style={{ color: "#525252" }}>Recent Jobs ❇️</h4>
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
					<Box flex={1} p={1} borderLeft="1px solid #ededed">
						<h4 style={{ color: "#525252" }}>Overview</h4>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
