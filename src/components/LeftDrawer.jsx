import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	AiFillCompass,
	AiFillDatabase,
	AiFillFire,
	AiFillHome,
	AiOutlineCompass,
	AiOutlineDatabase,
	AiOutlineFire,
	AiOutlineHome,
} from "react-icons/ai";
import { MdOutlineTask, MdTask } from "react-icons/md";
import Logo from "../assets/logo.png";
import { PrimaryGrey } from "../constants";
import { BlueButton } from "./BlueButton";
import { Dialog } from "@mui/material";
import { BuyCreditsDialog } from "./BuyCredits";
import { getUser } from "../api/user";

const drawerWidth = 260;

const mainList = [
	{
		text: "Home",
		i: () => <AiOutlineHome />,
		ai: () => <AiFillHome />,
		path: "/home",
	},
	{
		text: "Jobs",
		i: () => <MdOutlineTask />,
		ai: () => <MdTask />,
		path: "/jobs",
	},
	{
		text: "Datasets",
		i: () => <AiOutlineDatabase />,
		ai: () => <AiFillDatabase />,
		path: "/datasets",
	},
	{
		text: "Models",
		i: () => <AiOutlineFire />,
		ai: () => <AiFillFire />,
		path: "/models",
	},
	{
		text: "Marketplace",
		i: () => <AiOutlineCompass />,
		ai: () => <AiFillCompass />,
		path: "/marketplace",
	},
];

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

const open = true;

export function LeftDrawer({ smaller }) {
	const location = useLocation();
	const navigate = useNavigate();
	const [index, setIndex] = useState(0);
	const [creditsOpen, setCreditsOpen] = useState(false);
	const [user, setUser] = useState();
	let credits = localStorage.getItem("credits");

	async function gU() {
		const address = localStorage.getItem("address");
		if (!address || address === "") return;
		const user = await getUser(address);
		setUser(user);
		localStorage.setItem("credits", user.credits);
	}

	const handleCreditClose = () => {
		setCreditsOpen(false);
	};

	function updateIndex(path) {
		switch (path.split("/")[1]) {
			case "home":
				return setIndex(0);
			case "jobs":
				return setIndex(1);
			case "datasets":
				return setIndex(2);
			case "models":
				return setIndex(3);
			case "marketplace":
				return setIndex(4);
			default:
				setIndex(0);
		}
	}

	useEffect(() => {
		updateIndex(location.pathname);
		gU();
	}, [location.pathname]);

	return (
		<Drawer
			variant="permanent"
			open={smaller ? false : open}
			sx={{
				mt: 2,
				borderRight: "0px solid black",
			}}
		>
			<Box
				sx={{
					backgroundColor: "#16171B",
					display: "flex",
					justifyContent: "space-between",
					flexDirection: "column",
					height: "100%",
					color: "white",
					p: 3,
				}}
			>
				<Box>
					{/* Logo */}
					<Box sx={{ mb: 6, display: "flex", alignItems: "center" }}>
						<img height={"40px"} src={Logo} alt="homepage-logo" />
						&nbsp;
						<h2 style={{ paddingTop: "8px" }}>Daggle🐟</h2>
					</Box>

					{/* Menu List */}
					<Box>
						{mainList.map(({ text, i, ai, path }, ind) => (
							<Box
								key={text}
								onClick={() => navigate(path)}
								sx={{
									backgroundColor: index === ind ? "#4954FD" : "",
									borderRadius: "8px",
									p: 1,
									py: 1.5,
									mb: 1,
									cursor: "pointer",
									"&:hover": {
										background: index === ind ? "" : "rgb(38 38 38 / 35%)",
									},
								}}
							>
								<Box
									sx={{
										justifyContent: open ? "initial" : "center",
										color: index === ind ? "white" : "#828488",
										alignItems: "center",
										display: "flex",
									}}
								>
									<Box
										sx={{
											mr: 2,
											fontSize: "20px",
											display: "flex",
										}}
									>
										{index === ind ? ai() : i()}
									</Box>
									<Box
										sx={{
											opacity: open ? 1 : 0,
										}}
									>
										{text}
									</Box>
								</Box>
							</Box>
						))}
					</Box>
				</Box>

				{/* Down */}
				<Box
					sx={{
						bottom: "30px",
						backgroundColor: "#2c2d32",
						p: 2,
						borderRadius: "4px",
					}}
				>
					<Dialog
						open={creditsOpen}
						onClose={handleCreditClose}
						fullWidth
						maxWidth="xs"
					>
						<BuyCreditsDialog />
					</Dialog>
					<p style={{ fontWeight: "600" }}>Credits</p>
					<Box
						display={"flex"}
						sx={{ alignItems: "baseline", fontWeight: "500" }}
					>
						<p style={{ fontSize: "48px" }}>
							{credits ? credits : user && user.credits}
						</p>
						<p style={{ fontSize: "12px", color: PrimaryGrey }}>
							&nbsp; Remaining
						</p>
					</Box>
					<Box>
						<BlueButton
							title={
								<p style={{ fontSize: "14px", fontWeight: "500" }}>
									Buy Credits
								</p>
							}
							onClick={() => setCreditsOpen(true)}
						/>
					</Box>
				</Box>
			</Box>
		</Drawer>
	);
}
