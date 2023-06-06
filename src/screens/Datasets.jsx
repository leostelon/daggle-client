import { Box, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LeftDrawer } from "../components/LeftDrawer";
import { Navbar } from "../components/Navbar";
import { getDatasets } from "../api/dataset";
import { formatBytes } from "../utils/formatBytes";
import { getShortAddress } from "../utils/addressShort";

export const Datasets = () => {
	const [datasets, setDatasets] = useState([]);
	const [loading, setLoading] = useState(true);

	async function gJ() {
		setLoading(true);
		const resolved = await getDatasets();
		setDatasets(resolved);
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
					<h2>Datasets 📃</h2>
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
									<th>Name</th>
									<th>Description</th>
									<th>Link</th>
									<th>Size</th>
									<th>Created</th>
								</tr>
								{datasets.map((d, i) => {
									d = d.data;
									return (
										<tr>
											<td
												style={{
													fontWeight: "500",
													color: "#303031",
													display: "flex",
												}}
											>
												{getShortAddress(d.id)}
											</td>
											<td>{d.name}</td>
											<td>{d.description}</td>
											<td
												onClick={() => window.open(d.file, "_blank")}
												style={{ cursor: "pointer" }}
											>
												{getShortAddress(d.file)}
											</td>
											<td>{formatBytes(d.size)}</td>
											{/* <td>09/04/2023 20:29</td> */}
											<td>{new Date(d.timestamp).toDateString()}</td>
										</tr>
									);
								})}
							</table>
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
};
