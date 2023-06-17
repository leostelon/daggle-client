import "../styles/PrivateDialog.css";
import { Box, CircularProgress } from "@mui/material";
import React, { useState } from "react";
// import { enablePremium } from "../api/user";
import Web3 from "web3";
import { getWalletAddress, switchChain } from "../utils/wallet";
import DaggleInterface from "../contracts/Daggle.json";
import { addCredits } from "../api/user";
import { CONTRACT_ADDRESS } from "../constants";

export const BuyCreditsDialog = () => {
	const [loading, setLoading] = useState(false);
    
	async function buyCredits() {
        try {
            setLoading(true);
			await switchChain();
			const price = Web3.utils.toWei("5");
            const web3 = new Web3(window.ethereum);

			const contract = new web3.eth.Contract(
				DaggleInterface.abi,
				CONTRACT_ADDRESS
			);
			const currentAddress = await getWalletAddress();

			// Gas Calculation
			const gasPrice = await web3.eth.getGasPrice();
			const gas = await contract.methods.buyCredits(5).estimateGas({
				from: currentAddress,
				value: price,
			});

			const resp = await contract.methods
				.buyCredits(5)
				.send({ from: currentAddress, gasPrice, gas, value: price })
				.on("receipt", async function (receipt) {
					console.log(receipt);
					await addCredits();
					setLoading(false);
					alert("You have purchased 5 credits🥳🍾");
					// window.location.reload();
				});
			console.log(resp);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}

	return (
		<Box
			sx={{
				backgroundColor: "#e9e9e9",
				padding: "12px",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<p style={{ fontSize: "24px", fontWeight: "500" }}>Credits🦋</p>
			<br />
			<Box sx={{ display: "flex", flexDirection: "column", fontWeight: "500" }}>
				<p style={{ marginBottom: "6px" }}>
					✅&nbsp; Free until you have credits{" "}
				</p>
				<p style={{ marginBottom: "6px" }}>✅&nbsp; Increases your credits</p>
				<p style={{ marginBottom: "6px" }}>✅&nbsp; Credits get increased</p>
				<p style={{ marginBottom: "6px" }}>✅&nbsp; Another point here😉</p>
			</Box>
			<br />
			<h1 style={{ fontSize: "38px" }}>
				5 FIL<span style={{ fontSize: "12px" }}> /+5 credits</span>
			</h1>
			<Box
				sx={{
					cursor: "pointer",
					color: "white",
					width: "fit-content",
					fontWeight: "600",
					minWidth: "100px",
					display: "flex",
					justifyContent: "center",
				}}
				onClick={buyCredits}
				className="buy-now"
			>
				{loading ? (
					<CircularProgress size={14} sx={{ color: "white" }} />
				) : (
					"Buy Now"
				)}
			</Box>
		</Box>
	);
};
