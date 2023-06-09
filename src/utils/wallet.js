import Web3 from "web3";
import { ChainsConfig } from "../constants";

export async function connectWalletToSite() {
	try {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			await window.ethereum.enable();
			return true;
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
			return true;
		} else {
			console.log(
				"Non-Ethereum browser detected. You should consider trying MetaMask!"
			);
			return false;
		}
	} catch (e) {
		if (e.code === 4001) {
			alert(e.message);
		}
		return false;
	}
}

export async function switchChain() {
	const config = { ...ChainsConfig["POLYGON_TESTNET"] };
	config.chainId = Web3.utils.toHex(ChainsConfig["POLYGON_TESTNET"].chainId);

	try {
		await window.ethereum.request({
			method: "wallet_switchEthereumChain",
			params: [{ chainId: config.chainId }],
		});
	} catch (error) {
		if (error.code === 4902) {
			try {
				await window.ethereum.request({
					method: "wallet_addEthereumChain",
					params: [config],
				});
			} catch (addError) {
				console.error(addError);
			}
		}
	}
}

export async function getWalletAddress() {
	try {
		let address = await window.ethereum.selectedAddress;
		return address;
	} catch (error) {
		console.log(error);
	}
}
