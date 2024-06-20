import React from "react";
import "./PageNotFound.css";
import { Link } from "react-router-dom";

function PageNotFound() {
	return (
		<article className="page-not-found">
			<h1>PAGE ERROR</h1>
			<Link to={"/"} draggable="false">
				랜딩페이지로
			</Link>
		</article>
	);
}

export default PageNotFound;
