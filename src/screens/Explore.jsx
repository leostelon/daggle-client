import "./Explore.css";
import "../styles/dscard.css";
import { Box } from "@mui/material";
import { Navbar } from "../components/Navbar";
import React, { useEffect, useState } from "react";
import { getDatasets, searchDatasets } from "../api/dataset";
import { SearchComponent } from "../components/search/SearchComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { IoMdOpen } from "react-icons/io";
import { getShortAddress } from "../utils/addressShort";
import { RxHalf2 } from "react-icons/rx";
import { DownloadButton } from "../components/DownloadButton";
import { TagsDialog } from "../components/TagsDialog";
import { StableDiffusion } from "../components/StableDiffusion";

export const Explore = () => {
	const navigate = useNavigate();
	const search = useLocation().search;
	const [name, setName] = useState("");
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const query = new URLSearchParams(search).get("query");
	const [tagsDialogOpen, setTagsDialogOpen] = useState(false);

	async function getImages() {
		setLoading(true);
		const repos = await getDatasets();
		setImages(repos);
		setLoading(false);
	}

	async function searchImages(query) {
		setLoading(true);
		const repos = await searchDatasets(query);
		setImages(repos);
		setLoading(false);
	}

	useEffect(() => {
		if (query && query !== "") {
			searchImages(query);
		} else {
			getImages();
		}
	}, [query]);

	function handleTagDialogClose() {
		setTagsDialogOpen(false);
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "100%",
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
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<h2>Explore</h2>
					<SearchComponent />
				</Box>
				<TagsDialog
					name={name}
					isOpen={tagsDialogOpen}
					handleExternalClose={handleTagDialogClose}
				/>

				<Box mt={2}>
					{loading ? (
						<Loader />
					) : (
						images.map((d, i) => {
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
										<h5>Uploaded at {new Date(ds.timestamp).toDateString()}</h5>
									</Box>
									<Box>
										<Box display={"flex"}>
											{ds.private && (
												<Box
													className="tag"
													sx={{
														backgroundColor: "#ff1616 !important",
													}}
												>
													Private
												</Box>
											)}
										</Box>
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
									{/* Maintained By */}
									<Box
										sx={{ display: "flex", justifyContent: "space-between" }}
									>
										<Box className="creator">
											<p>Maintained by&nbsp;</p>
											<Box
												sx={{
													"&:hover": {
														textDecoration: "underline",
													},
													cursor: "pointer",
												}}
												onClick={() => navigate("/profile/" + ds.creator)}
											>
												{getShortAddress(ds.creator)}
											</Box>
											<IoMdOpen
												style={{ color: "white" }}
												className="open-creator-icon"
											/>
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
										</Box>
									</Box>
									{ds.stableDiffusionEnabled && (
										<StableDiffusion dataset={ds} />
									)}
								</Box>
							);
						})
					)}
				</Box>
			</Box>
		</Box>
	);
};
