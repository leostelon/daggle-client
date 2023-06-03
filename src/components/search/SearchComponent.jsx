import "./search.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TbSearch } from "react-icons/tb";

export function SearchComponent() {
	const navigate = useNavigate();
	const [input, setInput] = useState("");

	const handleKeyDown = (event) => {
		const value = event.target.value;
		if (event.key === "Enter" && value !== "") {
			navigate(`/explore?query=${value}`);
		}
	};

	const onSearch = (event) => {
		if (input !== "") {
			navigate(`/explore?query=${input}`);
		}
	};

	return (
		<div>
			<div className="search-container">
				<TbSearch
					onClick={onSearch}
					color="grey"
					cursor={"pointer"}
					size={18}
				/>
				<input
					type="search"
					id="search"
					onKeyDown={handleKeyDown}
					placeholder="Search..."
					value={input}
					onInput={(e) => setInput(e.target.value)}
				/>
			</div>
		</div>
	);
}
