import "../styles/TensorflowTrain.css";
import React, { useState } from "react";
import { LeftDrawer } from "../components/LeftDrawer";
import { Box } from "@mui/material";
import { Navbar } from "../components/Navbar";

// Code Editor Imports
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another

import { BlueButton } from "../components/BlueButton";
import { getDatasets } from "../api/dataset";
import { useEffect } from "react";
import { Info } from "../components/Info";
import { useNavigate } from "react-router-dom";
import { createTensorJob, uploadScript } from "../api/bacalhau";
import { toast } from "react-toastify";

export const TensorflowTrain = () => {
	const [loading, setLoading] = useState(false);
	const [datasetOptions, setDatasetOptions] = useState([]);
	const [selectedDataset, setSelectedDataset] = useState("");
	const [code, setCode] = useState(`# Paste your python code here.`);
	const navigate = useNavigate();
	const [fileUrl, setFileUrl] = useState("");

	async function train() {
		setLoading(true);
		const fileUplaodResolved = await uploadScript(code);
		if (fileUplaodResolved.statusCode !== 200)
			toast("Script upload failed", { type: "error" });

		const bacalhauResolved = await createTensorJob(
			fileUplaodResolved.data.protocolLink,
			fileUplaodResolved.data.filename,
			fileUrl
		);
		console.log(bacalhauResolved);
		setLoading(false);
	}

	async function gd() {
		const fileUplaodResolved = await getDatasets();
		setDatasetOptions(fileUplaodResolved);
		setFileUrl(fileUplaodResolved[0].data.file + "/");
	}

	useEffect(() => {
		gd();
	}, []);

	return (
		<Box sx={{ display: "flex" }}>
			<LeftDrawer />
			<Box style={{ width: `calc(100vw - 280px)`, maxHeight: "100vh" }}>
				<Navbar />
				<Box sx={{ p: 2, display: "flex" }}>
					<Box flex={3} mr={1}>
						<h2>Train Tensorflow Models ⚒️</h2>
						<br />
						<Editor
							value={code}
							onValueChange={(code) => setCode(code)}
							highlight={(code) => highlight(code, languages.js)}
							padding={10}
							style={{
								fontFamily: '"Fira code", "Fira Mono", monospace',
								fontSize: 12,
								maxHeight: "75vh",
							}}
							className="editor"
						/>
					</Box>
					<Box
						flex={1}
						p={1}
						borderLeft="1px solid #ededed"
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
							height: "82.5vh",
							alignItems: "center",
						}}
					>
						<Box>
							<h4 style={{ color: "#525252" }}>Train</h4>
							<Box pl={2} mt={1} sx={{ fontWeight: "600", fontSize: "14px" }}>
								<ul>
									<li>Upload only Python code.</li>
									<li>Paste only Tensorflow enabled model training code.</li>
									<li>Save your weights/models to outputs folder.</li>
									<li>model.save('/outputs/')</li>
									<li>model.save_weights('/outputs/')</li>
								</ul>
							</Box>
						</Box>
						<Box width={"100%"}>
							<Info
								title={"Add datasets 🪣"}
								description={
									<>
										Not able to find datasets, you can add new datasets from{" "}
										<span
											style={{ cursor: "pointer", color: "blue" }}
											onClick={() => navigate("/datasetupload")}
										>
											here
										</span>
										!
									</>
								}
							/>
							<Box>
								<select
									name="datasets"
									id="datasets"
									value={selectedDataset}
									placeholder="Select dataset"
									onChange={(e) => {
										setSelectedDataset(e.target.value);
										setFileUrl(e.target.value.split("--")[1] + "/");
									}}
								>
									{datasetOptions.map((o, i) => {
										o = o.data;
										return (
											<option value={o.id + "--" + o.file} key={i}>
												{o.name}
											</option>
										);
									})}
								</select>
							</Box>
							<Box flex={1} mt={1}>
								<BlueButton
									title={"Train Model"}
									loading={loading}
									onClick={train}
								/>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
