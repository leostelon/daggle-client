import "../styles/navbar.css";
import React, { useEffect, useState } from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import { HiOutlineBell, HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { SearchComponent } from "./search/SearchComponent";
import { MdOutlinePersonOutline } from "react-icons/md";
import NoProfilePicture from "../assets/default-profile-icon.png";
import { getShortAddress } from "../utils/addressShort";
import { EmbedSDK } from "@pushprotocol/uiembed";

import { ethers } from "ethers";
import { PrimaryGrey } from "../constants";

export const Navbar = ({ disableSearch = false }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();
	const username = localStorage.getItem("address");
	const [connectedToSite, setConnectedToSite] = useState(false);
	const [ensName, setEnsName] = useState("");
	const [ensAvatar, setEnsAvatar] = useState("");

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	async function connectSite() {
		let token = localStorage.getItem("token");
		if (!token || token === "" || token === "undefined") {
			setConnectedToSite(false);
			return navigate("/welcome");
		}
		setConnectedToSite(true);
	}

	async function getEnsName() {
		const provider = new ethers.providers.JsonRpcProvider(
			process.env.REACT_APP_QUICK_NODE
		);
		const name = await provider.lookupAddress(username);
		console.log({ ENSNAME: name });
		if (!name) return;
		setEnsName(name);
		const resolver = await provider.getResolver(name);
		const avatar = await resolver.getAvatar();
		console.log({ ENSAVATAR: avatar });
		if (!avatar || !avatar.url) return;
		setEnsAvatar(avatar.url);
	}

	useEffect(() => {
		connectSite();
		getEnsName();
		if (username) {
			// 'your connected wallet address'
			EmbedSDK.init({
				headerText: "Notifications", // optional
				targetID: "sdk-trigger-id", // mandatory
				appName: "consumerApp", // mandatory
				user: username, // mandatory
				chainId: 1, // mandatory
				viewOptions: {
					type: "sidebar", // optional [default: 'sidebar', 'modal']
					showUnreadIndicator: true, // optional
					unreadIndicatorColor: "#cc1919",
					unreadIndicatorPosition: "bottom-right",
				},
				theme: "light",
				onOpen: () => {},
				onClose: () => {},
			});
		}

		return () => {
			EmbedSDK.cleanup();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Box
			sx={{
				position: "relative",
				width: "100%",
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
				borderBottom: "1px solid #f5f5f5",
			}}
		>
			<div className="navbar">
				<div
					onClick={() => {
						navigate("/");
					}}
					style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
				>
					{!disableSearch && (
						<Box mr={2}>
							<SearchComponent />
						</Box>
					)}
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Box
						mr={3}
						sx={{ display: "flex", position: "relative", cursor: "pointer" }}
						id="sdk-trigger-id"
					>
						<HiOutlineBell size={24} color="#828488" />
						<Box
							sx={{
								position: "absolute",
								color: "red",
								size: "50px",
								top: "-8px",
								right: 0,
							}}
						>
							●
						</Box>
					</Box>
					{!connectedToSite ? (
						<Box onClick={connectSite} className="upload-button">
							Connect Wallet
						</Box>
					) : (
						<Box>
							<Box display="flex" alignItems={"center"}>
								<Box
									sx={{
										backgroundImage: `url("${
											ensAvatar !== "" ? ensAvatar : NoProfilePicture
										}")`,
										backgroundPosition: "center",
										backgroundRepeat: "no-repeat",
										backgroundSize: "cover",
									}}
									className="profile-icon"
									onClick={handleClick}
								></Box>
								<Box sx={{ fontWeight: "bold", ml: "6px" }}>
									{ensName !== "" ? ensName : getShortAddress(username)}
								</Box>
							</Box>
							<Menu
								sx={{ top: "4px" }}
								id="basic-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								MenuListProps={{
									"aria-labelledby": "basic-button",
								}}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
							>
								<MenuItem
									onClick={() => {
										const address = localStorage.getItem("address");
										navigate("/profile/" + address);
										setAnchorEl(null);
									}}
								>
									<MdOutlinePersonOutline color="#828488" size={20} />
									<p
										style={{
											fontSize: "14px",
										}}
									>
										Change Profile
									</p>
								</MenuItem>
								<MenuItem
									onClick={() => {
										localStorage.clear();
										window.location.replace("/");
										setAnchorEl(null);
									}}
								>
									<HiOutlineLogout
										color="#828488"
										size={20}
										onClick={() => {
											localStorage.clear();
											window.location.replace("/");
											setAnchorEl(null);
										}}
									/>
									&nbsp;
									<p
										style={{
											fontSize: "14px",
										}}
									>
										Logout
									</p>
								</MenuItem>
								<Box
									sx={{
										fontSize: "10px",
										color: PrimaryGrey,
										textAlign: "center",
									}}
								>
									Names and Avatars
									<br /> powered by{" "}
									<span
										style={{ color: "blue", cursor: "pointer" }}
										onClick={() =>
											window.open("https://ens.domains/", "_blank")
										}
									>
										ENS
									</span>
								</Box>
							</Menu>
						</Box>
					)}
				</div>
			</div>
		</Box>
	);
};
