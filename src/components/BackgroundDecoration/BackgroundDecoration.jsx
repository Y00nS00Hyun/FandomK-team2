/**
 * @todo
 * 240614
 * App.jsx 에서 가져오기
 */

import React from "react";
import styled from "styled-components";
import DecotationImage from "../../assets/images/decoration/decoration-background-top-design.svg";

const Image = styled.img`
	position: fixed;
	z-index: 0;
	top: 0;
	left: 0;

	& + * {
		position: relative;
		z-index: 1;
	}
`;

function BackgroundDecoration() {
	return <Image src={DecotationImage} alt="배경 장식" draggable="false" height={480} />;
}

export default BackgroundDecoration;
