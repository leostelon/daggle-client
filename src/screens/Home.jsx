import "../App.css";
import React from "react";
import { Navbar } from "../components/Navbar";
import { Box } from "@mui/material";
import BgImg from "../assets/computer.png";

export const Home = () => {
	return (
		<div className="App">
			<Navbar />
			{/* body */}
			<Box className="app-body">
				<Box className="homepage-shadow-overlay"></Box>
				<Box className="app-body-inner">
					<Box sx={{ textAlign: "left", flex: 3 }}>
						<Box sx={{ fontSize: "30px" }}>
							<h1>✨Collaborative DataDAO</h1>
						</Box>
						<Box sx={{ fontSize: "30px" }}>
							<h2>for the data science community!</h2>
						</Box>
						<Box
							sx={{
								fontSize: "18px",
								color: "#9FA1A4",
								mt: 1.5,
								fontWeight: "500",
							}}
						>
							<p>
								Daggle🚀 is a decentralized version of Kaggle/Huggingface,
								enabling you to train models onsite
								<br /> using&nbsp;
								<span
									style={{
										fontWeight: "bold",
										textDecoration: "underline",
										cursor: "pointer",
									}}
									onClick={() => {
										window.open("https://docs.bacalhau.org/", "_blank");
									}}
								>
									bacalhau
								</span>{" "}
								or access wider range of datasets and models via{" "}
								<span style={{ fontWeight: "bold" }}>DAO</span>.
							</p>
						</Box>
						<Box onClick={() => {}} className="explore-button">
							<p>Start Exploring 🚀</p>
						</Box>
					</Box>
					{/* Image */}
					<Box
						right={0}
						sx={{
							backgroundRepeat: "no-repeat",
							flex: 1,
						}}
					>
						<img height={"auto"} width={"450px"} src={BgImg} alt="computer" />
					</Box>
				</Box>
			</Box>
		</div>
	);
};
