import { Home } from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Job } from "./screens/Job";
import { FileUpload } from "./screens/FileUpload";
import { TensorflowTrain } from "./screens/TensorflowTrain";
import { DatasetUpload } from "./screens/DatasetUpload";
import { Datasets } from "./screens/Datasets";
import { Model } from "./screens/Model";
import { Marketplace } from "./screens/Marketplace";
import { Python } from "./screens/Python";
import { Nodejs } from "./screens/Nodejs";
import { Welcome } from "./screens/Welcome";
import { Removebg } from "./screens/Removebg";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" exact element={<Welcome />} />
				<Route path="/home" exact element={<Home />} />
				<Route path="/jobs" exact element={<Job />} />
				<Route path="/fileupload" exact element={<FileUpload />} />
				<Route path="/datasetupload" exact element={<DatasetUpload />} />
				<Route path="/removebg" exact element={<Removebg />} />
				<Route path="/datasets" exact element={<Datasets />} />
				<Route path="/models" exact element={<Model />} />
				<Route path="/python" exact element={<Python />} />
				<Route path="/nodejs" exact element={<Nodejs />} />
				<Route path="/marketplace" exact element={<Marketplace />} />
				<Route path="/tensorflowtrain" exact element={<TensorflowTrain />} />
			</Routes>
		</Router>
	);
}

export default App;
