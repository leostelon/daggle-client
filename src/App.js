import { Home } from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Job } from "./screens/Job";
import { FileUpload } from "./screens/FileUpload";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/jobs" exact element={<Job />} />
				<Route path="/fileupload" exact element={<FileUpload />} />
			</Routes>
		</Router>
	);
}

export default App;
