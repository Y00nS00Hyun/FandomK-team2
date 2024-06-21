import React from "react";
import "./PageNotFound.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Text = styled.h1`
	display: block;
	padding: 16px;
	font-size: 48px;
	& + a {
		font-size: 24px;
	}
`;

function PageNotFound() {
	return (
		<article className="page-not-found">
			<Text>PAGE ERROR</Text>
			<Link to={"/"} draggable="false">
				돌아가기
			</Link>
		</article>
	);
}

export default PageNotFound;
