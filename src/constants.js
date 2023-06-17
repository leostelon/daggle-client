export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const PrimaryGrey = "#828488"

export const ChainsConfig = {
	FVM_TESTENT: {
		chainId: 3141,
		chainName: "Filecoin - Hyperspace testnet",
		nativeCurrency: { name: "Filecoin", symbol: "tFIL", decimals: 18 },
		rpcUrls: ["https://filecoin-hyperspace.chainup.net/rpc/v1"],
		blockExplorerUrls: ["https://hyperspace.filfox.info/en"],
	},
	FVM_CALIBERATION: {
		chainId: 314159,
		chainName: "Filecoin - Caliberation testnet",
		nativeCurrency: { name: "Filecoin", symbol: "tFIL", decimals: 18 },
		rpcUrls: ["https://filecoin-calibration.chainstacklabs.com/rpc/v1"],
		blockExplorerUrls: ["https://calibration.filscan.io"],
	},
	FVM_MAINNET: {
		chainId: 314,
		chainName: "Filecoin Mainnet",
		nativeCurrency: { name: "Filecoin", symbol: "FIL", decimals: 18 },
		rpcUrls: ["https://api.node.glif.io"],
		blockExplorerUrls: ["https://fvm.starboard.ventures/explorer/tx/"],
	},
	POLYGON_TESTNET: {
		chainId: 80001,
		rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
		chainName: "Polygon Testnet",
		nativeCurrency: {
			name: "tMATIC",
			symbol: "tMATIC",
			decimals: 18,
		},
		blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
	},
};

export const CONTRACT_ADDRESS = "0x2a4b87d7825Fc7C56ecb6B7c0932449a6D6EF663";