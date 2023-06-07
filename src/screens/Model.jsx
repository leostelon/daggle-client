import { Box, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LeftDrawer } from "../components/LeftDrawer";
import { Navbar } from "../components/Navbar";
import { getModels } from "../api/bacalhau";
import { getShortAddress } from "../utils/addressShort";

export const Model = () => {
	const [models, setModels] = useState([]);
	const [loading, setLoading] = useState(true);

	async function gM() {
		setLoading(true);
		const resolved = await getModels();
		if (resolved.statusCode === 200) {
			setModels(resolved.data);
		}
		setLoading(false);
	}

	useEffect(() => {
		gM();
	}, []);

	return (
		<Box sx={{ display: "flex" }}>
			<LeftDrawer />
			<Box style={{ width: `calc(100vw - 280px)` }}>
				<Navbar />
				<Box sx={{ p: 2 }}>
					<h2>Models 💃</h2>
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
										<th>Job Id</th>
										<th>File</th>
										<th>Created</th>
									</tr>
								</thead>
								<tbody>
									{models.map((d, i) => {
										d = d.data;
										return (
											<tr key={i}>
												<td
													style={{
														fontWeight: "500",
														color: "#303031",
														display: "flex",
													}}
												>
													{getShortAddress(d.id)}
												</td>
												<td
													onClick={() => {
														window.open(
															`https://ipfs.io/ipfs/${d.file}/outputs`,
															"_blank"
														);
													}}
													style={{ cursor: "pointer" }}
												>
													{getShortAddress(d.file)}
												</td>
												{/* <td>09/04/2023 20:29</td> */}
												<td>{new Date(d.timestamp).toDateString()}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
};
