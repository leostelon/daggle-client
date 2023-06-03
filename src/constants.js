export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const ChainsConfig = {
	FVM_TESTENT: {
		chainId: 3141,
		chainName: "Filecoin - Hyperspace testnet",
		nativeCurrency: { name: "Filecoin", symbol: "tFIL", decimals: 18 },
		rpcUrls: ["https://filecoin-hyperspace.chainup.net/rpc/v1"],
		blockExplorerUrls: ["https://hyperspace.filfox.info/en"],
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

export const CONTRACT_ADDRESS = "0xfC941b05Eee7a647683232665b0F9107A9F2E48d";