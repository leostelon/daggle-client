import "../components/search/search.css";
import "../styles/navbar.css";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { LeftDrawer } from "../components/LeftDrawer";
import { Navbar } from "../components/Navbar";
import URLUpload from "../assets/fileupload.png";
import S3Upload from "../assets/amazon_aws_logo.png";
import { AiOutlineLink } from "react-icons/ai";
import { Info } from "../components/Info";
import { BlueButton } from "../components/BlueButton";
import { fileUpload } from "../api/bacalhau";
import { toast } from "react-toastify";

const actions = [
	{ title: "URL Upload", image: URLUpload },
	{ title: "S3 Upload", image: S3Upload },
];

export const FileUpload = () => {
	const [actionsIndex, setActionsIndex] = useState(0);
	const [urlInput, setUrlInput] = useState("");
	const [loading, setLoading] = useState(false);

	function isValidHttpUrl(string) {
		let url;

		try {
			url = new URL(string);
		} catch (_) {
			return false;
		}

		return url.protocol === "http:" || url.protocol === "https:";
	}

	async function fU() {
		if (urlInput === "" || !isValidHttpUrl(urlInput))
			return toast("Please provide valid url", { type: "info" });
		setLoading(true);
		const resolved = await fileUpload(urlInput);
		console.log(resolved);
		setUrlInput("");
		setLoading(false);
	}

	return (
		<Box sx={{ display: "flex" }}>
			<LeftDrawer />
			<Box style={{ width: `calc(100vw - 280px)` }}>
				<Navbar />
				<Box sx={{ p: 2, display: "flex" }}>
					<Box flex={3}>
						<h2>File Upload 📂</h2>
						<br />
						<br />
						<h4 style={{ color: "#525252" }}>Actions ✨</h4>
						<br />
						<Box display={"flex"}>
							{actions.map((i, ind) => (
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
										border: `3px solid ${
											actionsIndex === ind ? "#4954FD" : "transparent"
										}`,
										backgroundColor: "#e9e9e95d",
										"&:hover": {
											backgroundColor: "#e9e9e99d",
											border: `3px solid #4954FD`,
										},
									}}
									onClick={() => setActionsIndex(ind)}
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
							))}
						</Box>
						<br />
						<h4 style={{ color: "#525252" }}>
							{actions[actionsIndex].title} 📤
						</h4>
						<br />
						{actionsIndex === 0 && (
							<Box maxWidth="50vw">
								<p>Paste your URL🔗</p>
								<br />
								<Box maxWidth="20vw" display={"flex"}>
									<Box
										className="search-container"
										sx={{ justifyContent: "flex-start" }}
									>
										<AiOutlineLink
											color="#828488"
											cursor={"pointer"}
											size={18}
										/>
										<input
											type="url"
											id="search"
											placeholder="URL"
											value={urlInput}
											onInput={(e) => setUrlInput(e.target.value)}
										/>
									</Box>
									<Box ml={1}>
										<BlueButton
											onClick={fU}
											title={"Upload"}
											loading={loading}
										/>
									</Box>
								</Box>
								<Info
									title={"Uploads to IPFS via Estuary"}
									description={
										"Files are uploaded to decentralized cloud via Estaury using Bacalhau, file's can be accessed through IPFS CID."
									}
								/>
							</Box>
						)}
						{actionsIndex === 1 && (
							<Box maxWidth="50vw">
								<p>
									🎄 This is option is not enabled yet, check back later. 🎄
								</p>
								<Info
									title={"Upload files from Amazon S3 to IPFS via Estuary"}
									description={
										"Amazon S3 files are uploaded to decentralized cloud via Estaury using Bacalhau. This only works with datasets that are publicly accessible and don't require an AWS account or pay to use buckets."
									}
								/>
							</Box>
						)}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
