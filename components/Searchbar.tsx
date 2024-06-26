"use client";
import React, { FormEvent, useState } from "react";

const isValidProductLink = (url: string) => {
	try {
		const parsedUrl = new URL(url);
		const hostname = parsedUrl.hostname;
		if (hostname.includes("amazon.com") || hostname.includes("amazon.") || hostname.endsWith("amazon")) {
			return true;
		}
	} catch (error) {
		return false;
	}
	return false;
};

const Searchbar = () => {
	const [searchPrompt, setSearchPrompt] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const isValidLink = isValidProductLink(searchPrompt);
		if (!isValidLink) {
			alert("Please Provide the valid amazon product link!!");
		}
		try {
			setIsLoading(true);
			// ?? scrape the product page
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
			<input
				type="text"
				value={searchPrompt}
				onChange={(e) => setSearchPrompt(e.target.value)}
				placeholder="Enter Product Link"
				className="searchbar-input"
			/>
			<button type="submit" className="searchbar-btn" disabled={searchPrompt === ""}>
				{isLoading ? "Searching..." : "Search"}
			</button>
		</form>
	);
};

export default Searchbar;
