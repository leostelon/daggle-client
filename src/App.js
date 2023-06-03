import { Home } from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Profile } from "./screens/Profile";
import { Explore } from "./screens/Explore";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/explore" exact element={<Explore />} />
				<Route path="/profile/:user" exact element={<Profile />} />
			</Routes>
		</Router>
	);
}

export default App;
