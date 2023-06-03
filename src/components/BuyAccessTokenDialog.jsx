import Web3 from "web3";
import { toast } from "react-toastify";
import { download } from "../utils/download";
import { CONTRACT_ADDRESS } from "../constants";
import React, { useEffect, useState } from "react";
import FactoryInterface from "../contracts/Factory.json";
import { createAccess, getAccessToken } from "../api/token";
import { getWalletAddress, switchChain } from "../utils/wallet";
import { Box, CircularProgress, Dialog, Divider } from "@mui/material";

export const BuyAccessTokenDialog = ({
	dataset,
	isOpen,
	handleExternalClose,
}) => {
	const [loading, setLoading] = useState(true);
	const [buyLoading, setBuyLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [accessToken, setAccessToken] = useState();

	const handleClose = () => {
		setOpen(false);
		if (handleExternalClose) {
			handleExternalClose();
		}
	};

	async function getAccToken(dataset) {
		try {
			setLoading(true);
			const response = await getAccessToken(dataset.name);
			if (response.status === 200) {
				setAccessToken(response.data);
			}
			setLoading(false);
		} catch (err) {
			setLoading(false);
		}
	}

	async function buyAccessToken() {
		try {
			if (loading) return;
			setBuyLoading(true);

			// Contract Interaction
			await switchChain();
			const contract = new window.web3.eth.Contract(
				FactoryInterface.abi,
				CONTRACT_ADDRESS
			);
			const currentAddress = await getWalletAddress();

			const value = Web3.utils.toWei(
				(accessToken.pricePerToken * accessToken.miniumPurchase).toString()
			);
			// Gas Calculation
			const gasPrice = await window.web3.eth.getGasPrice();
			const gas = await contract.methods
				.buyToken(accessToken.tokenAddress)
				.estimateGas({
					from: currentAddress,
					value,
				});

			await contract.methods
				.buyToken(accessToken.tokenAddress)
				.send({ from: currentAddress, gasPrice, gas, value });

			// Server Interaction
			const body = {
				accessTokenId: accessToken.id,
				tokenAddress: accessToken.tokenAddress,
				supply: accessToken.miniumPurchase,
			};
			const response = await createAccess(body);
			setBuyLoading(false);
			if (response.status === 200) {
				toast("Successfully bought access token's🥳🍾", { type: "success" });
				await new Promise((res, rej) => {
					setTimeout(() => {
						res(true);
					}, 2000);
				});
				await download(dataset.id);
				handleClose();
			} else {
				toast(response.data.message, { type: "error" });
			}
		} catch (error) {
			toast(error.message);
			setBuyLoading(false);
		}
	}

	useEffect(() => {
		if (isOpen) {
			setOpen(isOpen);
		}
		if (dataset && isOpen) {
			getAccToken(dataset);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen, dataset]);

	return (
		<Dialog open={open} fullWidth maxWidth="xs" onClose={handleClose}>
			{!loading && dataset && (
				<Box
					sx={{
						p: 2,
						textAlign: "center",
						width: "100%",
						backgroundColor: "#171e25",
						color: "white",
					}}
				>
					<Box>
						<h2>Buy Access Token's</h2>
						<br />
						<Box>
							Buy access token's for{" "}
							<span>
								<h3>{dataset.name.split("/")[1]}</h3>
							</span>
						</Box>
					</Box>
					<Box sx={{ mt: 2 }}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								mb: 1,
							}}
						>
							<p>Price Per Token</p>
							<h4>{accessToken.pricePerToken} FIL</h4>
						</Box>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								mb: 2,
							}}
						>
							<p>Minimum Token's Required</p>
							<h4>
								{accessToken.miniumPurchase} {accessToken.name}
							</h4>
						</Box>
						<Divider
							sx={{
								border: "1px solid white",
								mb: 1,
							}}
						/>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								mb: 1,
							}}
						>
							<h3>TOTAL</h3>
							<h3>
								{accessToken.pricePerToken * accessToken.miniumPurchase} FIL
							</h3>
						</Box>
					</Box>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							flexDirection: "column",
						}}
					>
						<Box
							sx={{
								backgroundColor: "#256afe",
								padding: "6px 12px",
								borderRadius: "4px",
								mt: 3,
								cursor: "pointer",
								minWidth: "100px",
							}}
							onClick={buyAccessToken}
						>
							{buyLoading ? (
								<CircularProgress size={14} sx={{ color: "white" }} />
							) : (
								"Buy Tokens"
							)}
						</Box>
					</Box>
				</Box>
			)}
		</Dialog>
	);
};
