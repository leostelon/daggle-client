import {
	Box,
	CircularProgress,
	IconButton,
	InputAdornment,
	TextField,
} from "@mui/material";
import React, { useState } from "react";
import {
	MdOutlineKeyboardArrowDown,
	MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { createJob } from "../api/bacalhau";
import { BsArrowRightCircle } from "react-icons/bs";
import { toast } from "react-toastify";
import { BuyAccessTokenDialog } from "./BuyAccessTokenDialog";

export const StableDiffusion = ({ dataset }) => {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [text, setText] = useState("");
	const [accessDialogOpen, setAccessDialogOpen] = useState(false);

	function handleTokenDialogClose() {
		setAccessDialogOpen(false);
	}

	async function createBJob() {
		if (text === "") return toast("Please enter a prompt.", { type: "info" });
		if (loading) return;
		setLoading(true);
		const resolved = await createJob(dataset.id, text);
		if (resolved.data.status === 401) {
			setAccessDialogOpen(true);
		}
		setLoading(false);
	}

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<Box
			sx={{
				mt: 1,
				backgroundColor: "#256afe33",
				borderRadius: "4px",
				px: 2,
				py: 1,
			}}
		>
			<BuyAccessTokenDialog
				isOpen={accessDialogOpen}
				handleExternalClose={handleTokenDialogClose}
				dataset={dataset}
			/>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
				}}
				onClick={() => setOpen(!open)}
			>
				Bacalhau Enabled✨
				<Box>
					{open ? (
						<MdOutlineKeyboardArrowDown size={24} />
					) : (
						<MdOutlineKeyboardArrowRight size={24} />
					)}
				</Box>
			</Box>
			{open && (
				<Box sx={{ color: "#b9b9b9", fontWeight: "500" }}>
					<Box mt={1} mb={1}>
						<TextField
							size="small"
							fullWidth
							sx={{
								color: "white",
								border: "1px solid #256afe",
								borderRadius: "4px",
							}}
							placeholder="Enter a prompt"
							inputProps={{ style: { color: "white" } }}
							onChange={(e) => {
								setText(e.target.value);
							}}
							value={text}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={createBJob}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{loading ? (
												<CircularProgress size={"20px"} />
											) : (
												<BsArrowRightCircle color="white" />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</Box>
					<small>
						ℹ️ This is a stable-diffusion enabled dataset, try sending a prompt.
					</small>
				</Box>
			)}
		</Box>
	);
};
