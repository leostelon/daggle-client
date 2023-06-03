import "./Profile.css";
import "../styles/dscard.css";
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Dialog, Tooltip } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { useParams } from "react-router-dom";
import { userDatasets } from "../api/dataset";
import { BsDatabase } from "react-icons/bs";
import { IoFishOutline } from "react-icons/io5";
import { TbBoxModel2 } from "react-icons/tb";
import { Loader } from "../components/Loader";
import EmptyBox from "../assets/629-empty-box.gif";
import { CreateAccessTokenDialog } from "../components/CreateAccessTokenDialog";
import { getShortAddress } from "../utils/addressShort";
import { RxHalf2 } from "react-icons/rx";
import { TagsDialog } from "../components/TagsDialog";
import { DownloadButton } from "../components/DownloadButton";
import { Upload } from "../components/Upload";
import { StableDiffusion } from "../components/StableDiffusion";
import { getJob, getJobs } from "../api/bacalhau";
import { toast } from "react-toastify";
import { MdContentCopy } from "react-icons/md";

export const Profile = () => {
	const [loading, setLoading] = useState(true);
	const [bacJobLoading, setBacJobLoading] = useState(true);
	const [bacJobStatusLoading, setBacJobStatusLoading] = useState(false);
	const [menuIndex, setMenuIndex] = useState(0);
	const [datasets, setDatasets] = useState([]);
	const [jobs, setJobs] = useState([]);
	const [name, setName] = useState("");
	const [tokenDialogOpen, setTokenDialogOpen] = useState(false);
	const [selectedDatasetid, setSelectedDatasetid] = useState();
	const [selectedDatasetName, setSelectedDatasetName] = useState();
	const [tagsDialogOpen, setTagsDialogOpen] = useState(false);
	const [loggedInAddress, setLoggedInAddress] = useState();

	const { user } = useParams();

	async function getDatasets(user) {
		setLoading(true);
		setDatasets([]);
		const repos = await userDatasets(user);
		setDatasets(repos);
		setLoading(false);
	}

	async function getAllJobs() {
		if (!loggedInAddress) return;
		setBacJobLoading(true);
		setJobs([]);
		const resolved = await getJobs();
		setJobs(resolved.data);
		setBacJobLoading(false);
	}

	async function getJobStatus(id) {
		setBacJobStatusLoading(true);
		const resolved = await getJob(id);
		if (resolved.data.state === "Completed") {
			toast("job completed🥳", { type: "success" });
			window.open("https://ipfs.io/ipfs/" + resolved.data.cid, "__blank");
		} else if (resolved.data.state === "BidRejected") {
			toast("Your job is rejected by Bacalhau.", { type: "error" });
		} else {
			toast("Job in progress, check back later. " + resolved.data.state, {
				type: "info",
			});
		}
		setBacJobStatusLoading(false);
	}

	function getColor(status) {
		switch (status) {
			case "Completed":
				return "#4cd964";
			case "BidRejected":
				return "#f44336";
			default:
				return "#ffe000";
		}
	}

	function getLoggedAddress() {
		const address = localStorage.getItem("address");
		setLoggedInAddress(address);
		if (address || address !== "") getAllJobs();
	}

	function handleTokenDialogClose() {
		setTokenDialogOpen(false);
	}

	function handleTagDialogClose() {
		setTagsDialogOpen(false);
	}

	useEffect(() => {
		getDatasets(user);
		getLoggedAddress();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, loggedInAddress]);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			{/* Full Screen Loader */}
			<Dialog
				fullWidth
				maxWidth="xs"
				open={bacJobStatusLoading}
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
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "100%",
					maxWidth: "960px",
				}}
			>
				<Navbar disableSearch={true} />
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "100%",
					maxWidth: "920px",
				}}
			>
				<Box className="profile">
					<Box className="profile-navigation">
						<Box
							onClick={() => setMenuIndex(0)}
							className={`item ${menuIndex === 0 ? "selected" : ""}`}
						>
							<p>Datasets</p>
							<BsDatabase />
						</Box>
						{loggedInAddress === user && (
							<Box
								onClick={() => setMenuIndex(1)}
								className={`item ${menuIndex === 1 ? "selected" : ""}`}
							>
								<p>Bacalhau Jobs</p>
								<IoFishOutline />
							</Box>
						)}
						<Box
							onClick={() => setMenuIndex(2)}
							className={`item ${menuIndex === 2 ? "selected" : ""}`}
						>
							<p>Models</p>
							<TbBoxModel2 />
						</Box>
					</Box>

					<CreateAccessTokenDialog
						isOpen={tokenDialogOpen}
						handleExternalClose={handleTokenDialogClose}
						datasetId={selectedDatasetid}
						datasetName={selectedDatasetName}
					/>

					<TagsDialog
						name={name}
						isOpen={tagsDialogOpen}
						handleExternalClose={handleTagDialogClose}
					/>

					{menuIndex === 0 && (
						<Box sx={{ flex: 1, width: "100%" }}>
							{loading ? (
								<Loader />
							) : datasets.length === 0 ? (
								loggedInAddress === user ? (
									<Upload
										title={"You have 0 datasets, try uploading one.😃"}
										loggedInAddress={loggedInAddress}
									/>
								) : (
									<Box>User has 0 datasets</Box>
								)
							) : (
								<Box px={1}>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											mb: 2,
										}}
									>
										<h1>Datasets</h1>
										{loggedInAddress && (
											<Box
												style={{
													backgroundColor: "#256afe",
													padding: "6px 16px",
													fontWeight: 500,
													borderRadius: "4px",
													cursor: "pointer",
												}}
												onClick={() => setMenuIndex(3)}
											>
												Upload File
											</Box>
										)}
									</Box>

									{datasets.map((d, i) => {
										const ds = d.data;
										return (
											<Box className="dscard" key={i}>
												<Box
													display="flex"
													alignItems={"center"}
													justifyContent={"space-between"}
												>
													<Box>
														<Box sx={{ display: "flex", alignItems: "center" }}>
															<h3>
																{getShortAddress(ds.name.split("/")[0])}/
																{ds.name.split("/")[1]}
															</h3>
															<Box className="tag" sx={{ ml: 2 }}>
																<RxHalf2
																	style={{
																		marginRight: "6px",
																		color: "#256afe",
																	}}
																/>
																{ds.version}
															</Box>
														</Box>
													</Box>
													<h5>
														Uploaded at {new Date(ds.timestamp).toDateString()}
													</h5>
												</Box>
												<Box>
													<p
														style={{
															fontWeight: "500",
															fontSize: "12px",
															marginTop: "4px",
															textDecoration: "underline",
															color: "white",
															cursor: "pointer",
														}}
														onClick={() => {
															setName(ds.name);
															setTagsDialogOpen(true);
														}}
													>
														view versions
													</p>
												</Box>
												{/* Description */}
												<Box mt={2} sx={{ color: "grey" }}>
													<p>
														{ds.description !== ""
															? ds.description
															: "No description"}
													</p>
												</Box>
												<Box
													display="flex"
													alignItems={"center"}
													sx={{
														marginTop: "12px",
														fontWeight: "600",
														fontSize: "12px",
													}}
												>
													<DownloadButton ds={ds} />
													{loggedInAddress === ds.creator &&
														!ds.tokenAccessEnabled && (
															<Tooltip
																title="Enable access to users."
																placement="top"
															>
																<p
																	className="access-enabled"
																	onClick={() => {
																		setSelectedDatasetid(ds.id);
																		setSelectedDatasetName(ds.name);
																		setTokenDialogOpen(true);
																	}}
																>
																	Create access token⚠️
																</p>
															</Tooltip>
														)}
												</Box>
												{ds.stableDiffusionEnabled && (
													<StableDiffusion dataset={ds} />
												)}
											</Box>
										);
									})}
								</Box>
							)}
						</Box>
					)}
					{menuIndex === 1 && loggedInAddress === user && (
						<Box sx={{ flex: 1, width: "100%" }}>
							{bacJobLoading ? (
								<Loader />
							) : jobs.length === 0 ? (
								<Box>You have 0 bacalhau jobs created.</Box>
							) : (
								<Box px={1}>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											mb: 2,
										}}
									>
										<h1>Jobs</h1>
									</Box>

									{jobs.map((d, i) => {
										const job = d.data;
										return (
											<Box key={i} className="dscard">
												<Box
													display="flex"
													alignItems={"center"}
													justifyContent={"space-between"}
												>
													<Box>
														<Box sx={{ display: "flex", alignItems: "center" }}>
															<h3>
																{getShortAddress(job.id.replace("\n", ""))}
															</h3>
															<CopyVideoId videoId={job.id} />
														</Box>
														<p
															style={{
																color: "grey",
																margin: "4px 0px",
																fontSize: "14px",
															}}
														>
															{job.prompt}
														</p>
													</Box>
													<h5 style={{ color: "grey" }}>
														Created at {new Date(job.timestamp).toDateString()}
													</h5>
												</Box>
												{/* Tag */}
												<Box
													className="tag"
													sx={{
														border: `1px solid ${getColor(
															job.status
														)}!important`,
														backgroundColor: `${getColor(
															job.status
														)}3a!important`,
														marginTop: "6px!important",
													}}
												>
													<RxHalf2
														style={{
															marginRight: "6px",
															color: getColor(job.status),
														}}
													/>
													{job.status}
												</Box>
												<Box
													sx={{
														fontWeight: "400",
														mt: 1.5,
														px: 1,
														py: 0.5,
														borderRadius: "4px",
														color: "white",
														cursor: "pointer",
														backgroundColor: "#256afe",
														width: "fit-content",
													}}
													onClick={() => getJobStatus(job.id)}
												>
													<p>
														{job.status === "Completed"
															? "See result"
															: "Check status"}
													</p>
												</Box>
											</Box>
										);
									})}
								</Box>
							)}
						</Box>
					)}
					{menuIndex === 2 && (
						<Box sx={{ flex: 1 }}>
							{loading ? (
								<Loader />
							) : (
								<Box
									sx={{
										width: "100%",
										alignItems: "center",
										flexDirection: "column",
										display: "flex",
										borderRadius: "8px",
										p: 3,
									}}
								>
									<img width={"100px"} src={EmptyBox} alt="empty box" />
									<h3
										style={{
											color: "grey",
											marginTop: "12px",
											textAlign: "center",
										}}
									>
										Models will be rolledd out in the next update😃
									</h3>
								</Box>
							)}
						</Box>
					)}
					{menuIndex === 3 && (
						<Upload
							title={"Upload your dataset.😃"}
							loggedInAddress={loggedInAddress}
						/>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export const CopyVideoId = ({ videoId }) => {
	const [open, setOpen] = useState(false);

	return (
		<Tooltip
			title="Copied!"
			placement="top"
			open={open}
			onClose={() => setOpen(false)}
		>
			<Box
				onClick={() => {
					navigator.clipboard.writeText(videoId);
					setOpen(true);
				}}
			>
				<MdContentCopy
					style={{
						marginLeft: "12px",
					}}
					size={20}
				/>
			</Box>
		</Tooltip>
	);
};
