import { Home } from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Job } from "./screens/Job";
import { FileUpload } from "./screens/FileUpload";
import { DatasetUpload } from "./screens/DatasetUpload";
import { Datasets } from "./screens/Datasets";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/jobs" exact element={<Job />} />
				<Route path="/fileupload" exact element={<FileUpload />} />
				<Route path="/datasetupload" exact element={<DatasetUpload />} />
				<Route path="/datasets" exact element={<Datasets />} />
			</Routes>
		</Router>
	);
}

export default App;
