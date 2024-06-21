import React from "react";
import { HashLoader } from "react-spinners";
import styled from "styled-components";

const COLORS = {
	yellow: "#d2c030",
	orange: "#f96d69",
	pink: "#fe5493",
	blue: "#14C3FE",
};

const Container = styled.section`
	position: fixed;
	z-index: 10;
	inset: 0;
	display: flex;
	flex-flow: column wrap;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	padding: 100px;
	background: var(--modal-cover);
	background-color: var(--background-color-basic);
`;

function LodingImage({ ...args }) {
	return (
		<Container {...args}>
			<HashLoader color={COLORS.orange} size={160} />
		</Container>
	);
}

export default LodingImage;
