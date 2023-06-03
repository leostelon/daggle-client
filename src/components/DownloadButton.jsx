import { Box, CircularProgress, Dialog, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { download } from "../utils/download";
import { BuyAccessTokenDialog } from "./BuyAccessTokenDialog";

export const DownloadButton = ({ ds }) => {
	const [selectedDataset, setSelectedDataset] = useState();
	const [downloadLoading, setDownloadLoading] = useState(false);
	const [accessDialogOpen, setAccessDialogOpen] = useState(false);

	function handleTokenDialogClose() {
		setAccessDialogOpen(false);
	}

	return (
		<Box>
			<BuyAccessTokenDialog
				isOpen={accessDialogOpen}
				handleExternalClose={handleTokenDialogClose}
				dataset={selectedDataset}
			/>
			<Dialog
				fullWidth
				maxWidth="xs"
				open={downloadLoading}
				PaperProps={{
					style: {
						backgroundColor: "transparent",
						boxShadow: "none",
					},
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100px",
					}}
				>
					<CircularProgress sx={{ color: "white" }} />
				</Box>
			</Dialog>
			<Box mr={2}>
				<Tooltip title="Download dataset" placement="top">
					<Box
						className="access-enabled"
						onClick={async () => {
							setDownloadLoading(true);
							const resolved = await download(ds.id);
							setDownloadLoading(false);

							if (resolved.data.status === 401) {
								setAccessDialogOpen(true);
							} else if (resolved.data.status === 200) {
								setSelectedDataset(ds);
							}
						}}
						sx={{ display: "flex", alignItems: "center" }}
					>
						Download
						<AiOutlineCloudDownload style={{ marginLeft: "4px" }} size={16} />
					</Box>
				</Tooltip>
			</Box>
		</Box>
	);
};
