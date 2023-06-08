import { Box, Grid } from "@mui/material";
import React from "react";
import { Navbar } from "../components/Navbar";
import { LeftDrawer } from "../components/LeftDrawer";
import TensorflowImg from "../assets/tensorflow.png";
import StableDiffusion from "../assets/stablediffusion.png";
import Nodejs from "../assets/nodejs-logo.png";
import Python from "../assets/python-logo.png";
import FileUpload from "../assets/fileupload.png";
import Dataset from "../assets/dataset.png";
import RemoveBG from "../assets/removebg.png";
import { useNavigate } from "react-router-dom";

const actions = [
	{ title: "Upload File", image: FileUpload, path: "/fileupload" },
	{ title: "Train Model", image: TensorflowImg, path: "/tensorflowtrain" },
	{ title: "Upload Dataset", image: Dataset, path: "/datasetupload" },
	{ title: "Stable Diffusion", image: StableDiffusion },
	{ title: "Node.js Script", image: Nodejs, path: "/nodejs" },
	{ title: "Python Script", image: Python, path: "/python" },
	{ title: "Remove Background", image: RemoveBG },
];

export const Marketplace = () => {
	const navigate = useNavigate();

	return (
		<Box sx={{ display: "flex" }}>
			<LeftDrawer />
			<Box style={{ width: `calc(100vw - 280px)` }}>
				<Navbar />
				<Box sx={{ p: 2 }}>
					<h2>Marketplace 🧭</h2>
					<br />
					<br />
					<Grid
						container
						spacing={{ xs: 2, md: 3 }}
						columns={{ xs: 4, sm: 8, md: 12 }}
					>
						{actions.map((i, ind) => (
							<Grid item xs={12} sm={4} md={2} key={ind}>
								<Box
									key={ind}
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
									onClick={() => navigate(i.path)}
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
							</Grid>
						))}
					</Grid>
				</Box>
			</Box>
		</Box>
	);
};
