import { Box } from "@mui/material";
import React, { useEffect } from "react";
import LoginImage from "../assets/loginpage.png";
import BacalhauLogo from "../assets/bacalhaulogo.png";
import { useNavigate } from "react-router-dom";
import { connectWalletToSite, getWalletAddress } from "../utils/wallet";
import { createUser } from "../api/user";
import { BlueButton } from "../components/BlueButton";
import { PrimaryGrey } from "../constants";

export const Welcome = () => {
	const navigate = useNavigate();

	async function connectSite() {
		let token = localStorage.getItem("token");
		await connectWalletToSite();
		if (token && token !== "" && token !== "undefined") {
			return navigate("/home");
		}
		const address = await getWalletAddress();
		if (address && address !== "") {
			localStorage.setItem("address", address);
			if (!token || token === "" || token === "undefined") {
				await createUser(address);
			}
			token = localStorage.getItem("token");
			if (token && token !== "" && token !== "undefined") {
				navigate("/home");
			}
		}
	}

	useEffect(() => {
		// Redirect to beta website
		window.location.replace("https://beta.daggle.xyz");
		// connectSite();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Box display={"flex"} height="100vh">
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					height: "100%",
					flex: 1,
				}}
			>
				<Box textAlign={"center"}>
					<Box
						fontFamily={"'Alata', sans-serif"}
						fontSize={"30px"}
						sx={{ display: "flex", flexDirection: "column", color: "#4954fd" }}
					>
						<Box
							sx={{
								backgroundImage: `url("${BacalhauLogo}")`,
								backgroundPosition: "center",
								backgroundSize: "contain",
								backgroundRepeat: "no-repeat",
								height: "45px",
							}}
						></Box>
						Daggle
					</Box>
					<br />
					<h1>Log in to your account.</h1>
					<p style={{ color: PrimaryGrey }}>
						Hello power user, please connect your wallet.
					</p>
					<br />
					<br />
					<BlueButton title={"Connect your wallet"} onClick={connectSite} />
				</Box>
			</Box>
			<Box
				sx={{
					backgroundImage: `url("${LoginImage}")`,
					backgroundPosition: "center",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					height: "100%",
					width: "100%",
					flex: 1,
				}}
			></Box>
		</Box>
	);
};
