import { Box, CircularProgress, Dialog, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getWalletAddress, switchChain } from "../utils/wallet";
import FactoryInterface from "../contracts/Factory.json";
import ERC20Interface from "../contracts/ERC20.json";
import { createToken } from "../api/token";
import Web3 from "web3";
import { CONTRACT_ADDRESS } from "../constants";

const InputProps = {
	style: {
		color: "white",
		border: "1px solid white",
	},
};
const HelperProps = {
	style: {
		color: "white",
	},
};

export const CreateAccessTokenDialog = ({
	datasetId,
	datasetName,
	isOpen,
	handleExternalClose,
}) => {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("mytoki");
	const [maxSupply, setMaxSupply] = useState(5);
	const [pricePerToken, setPricePerToken] = useState(0.1);
	const [minimumPurchase, setMinimumPurchase] = useState(1);

	const handleClose = (event, reason) => {
		setOpen(false);
		if (handleExternalClose) {
			handleExternalClose();
		}
	};

	async function createNewToken() {
		try {
			if (loading) return;
			if (!name || !maxSupply || !pricePerToken || !minimumPurchase)
				return toast("Please fill all the details", { type: "info" });

			setLoading(true);

			// Contract Interaction
			await switchChain();
			const contract = new window.web3.eth.Contract(
				FactoryInterface.abi,
				CONTRACT_ADDRESS
			);
			const currentAddress = await getWalletAddress();

			// Gas Calculation
			const gasPrice = await window.web3.eth.getGasPrice();
			const pricePerTokenWei = Web3.utils.toWei(pricePerToken.toString());
			const maxSupplyEther = Web3.utils.toWei(maxSupply.toString());
			const gas = await contract.methods
				.deployToken(name, name, maxSupplyEther, pricePerTokenWei)
				.estimateGas({
					from: currentAddress,
				});
			const resp = await contract.methods
				.deployToken(name, name, maxSupplyEther, pricePerTokenWei)
				.send({ from: currentAddress, gasPrice, gas });

			// Server Interaction
			const tokenAddress = resp.events.TokenDeployed.returnValues.tokenAddress;
			const body = {
				datasetId,
				datasetName,
				name,
				tokenAddress,
				minimumPurchase,
				pricePerToken,
				maxSupply,
			};
			const response = await createToken(body);
			if (response.status === 200) {
				await approveTokens(tokenAddress);
				setLoading(false);
				toast("Token creation success🥳🍾", { type: "success" });
				await new Promise((res, rej) => {
					setTimeout(() => {
						res(true);
					}, 2000);
				});
				window.location.reload();
			} else {
				toast(response.data.message, { type: "error" });
			}
			setLoading(false);
		} catch (error) {
			toast(error.message);
			setLoading(false);
		}
	}

	async function approveTokens(tokenAddress) {
		const contract = new window.web3.eth.Contract(
			ERC20Interface.abi,
			tokenAddress
		);
		const maxSupplyEther = Web3.utils.toWei(maxSupply.toString());
		// Gas Calculation
		const gasPrice = await window.web3.eth.getGasPrice();
		const currentAddress = await getWalletAddress();

		const gas = await contract.methods
			.approve(CONTRACT_ADDRESS, maxSupplyEther)
			.estimateGas({
				from: currentAddress,
			});
		await contract.methods
			.approve(CONTRACT_ADDRESS, maxSupplyEther)
			.send({ from: currentAddress, gasPrice, gas });
	}

	useEffect(() => {
		if (isOpen) {
			setOpen(isOpen);
		}
	}, [isOpen]);

	return (
		<Dialog open={open} fullWidth maxWidth="xs" onClose={handleClose}>
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
					<h2>Create Access Token</h2>
					<br />
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<Box sx={{ mt: 1 }}>
						<TextField
							placeholder="Enter token name"
							size="small"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							InputProps={InputProps}
						/>
					</Box>
					<Box sx={{ mt: 2 }}>
						<TextField
							placeholder="Enter max supply"
							type="number"
							size="small"
							value={maxSupply}
							onChange={(e) => {
								setMaxSupply(e.target.value);
							}}
							helperText="Max supply of the token."
							FormHelperTextProps={HelperProps}
							InputProps={InputProps}
						/>
					</Box>
					<Box sx={{ mt: 2 }}>
						<TextField
							placeholder="Enter price per token"
							type="number"
							size="small"
							value={pricePerToken}
							onChange={(e) => {
								setPricePerToken(e.target.value);
							}}
							helperText="Enter the amount in FIL"
							FormHelperTextProps={HelperProps}
							InputProps={InputProps}
						/>
					</Box>
					<Box sx={{ mt: 2 }}>
						<TextField
							placeholder="Enter minimun purchase"
							type="number"
							size="small"
							value={minimumPurchase}
							onChange={(e) => {
								setMinimumPurchase(e.target.value);
							}}
							helperText="Minimum token's to access dataset."
							FormHelperTextProps={HelperProps}
							InputProps={InputProps}
						/>
					</Box>
					<Box
						sx={{
							backgroundColor: "#256afe",
							padding: "6px 12px",
							borderRadius: "4px",
							mt: 3,
							cursor: "pointer",
							minWidth: "100px",
						}}
						onClick={createNewToken}
					>
						{loading ? (
							<CircularProgress size={14} sx={{ color: "white" }} />
						) : (
							"Create Token"
						)}
					</Box>
				</Box>
			</Box>
		</Dialog>
	);
};
