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
import { useEffect } from "react";
import { Info } from "../components/Info";
import { runNodejsScript, uploadNodejsScript } from "../api/bacalhau";
import { toast } from "react-toastify";

export const Nodejs = () => {
	const [loading, setLoading] = useState(false);
	const [code, setCode] = useState(`// This is sample script, you can also try running this.
const fs = require("fs")
// Your task here, make sure it's synchronous!

var dir = '/outputs';

if (!fs.existsSync(dir)){
	fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync("/outputs/results.json", JSON.stringify({ message: "Hello World!" }), { flags: "w" })	
	`);

	async function train() {
		setLoading(true);
		const fileUplaodResolved = await uploadNodejsScript(code);
		if (fileUplaodResolved.statusCode !== 200)
			toast("Script upload failed", { type: "error" });

		const bacalhauResolved = await runNodejsScript(
			fileUplaodResolved.data.protocolLink,
			fileUplaodResolved.data.filename
		);
		if (bacalhauResolved.statusCode === 200) {
			setCode(`// Paste your nodejs code here.`);
		}
		setLoading(false);
	}

	useEffect(() => {}, []);

	return (
		<Box sx={{ display: "flex" }}>
			<LeftDrawer />
			<Box style={{ width: `calc(100vw - 280px)`, maxHeight: "100vh" }}>
				<Navbar />
				<Box sx={{ p: 2, display: "flex" }}>
					<Box flex={3} mr={1}>
						<h2>Custom Node.js scripts 💚</h2>
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
									<li>Upload only node.js code.</li>
									<li>Save your output/results to outputs directory.</li>
								</ul>
							</Box>
						</Box>
						<Box width={"100%"}>
							<Info
								title={"Custom Node.js code 🪣"}
								description={
									"Paste your own node.js code and let Bacalhau compute it for you!"
								}
							/>
							<Box flex={1} mt={1}>
								<BlueButton
									title={"Create Job"}
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
