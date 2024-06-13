import React from 'react';
import styled from 'styled-components';
import DecotationImage from '../../assets/images/decoration/decoration-background-top-design.svg';

const Image = styled.img`
	position: fixed;
	z-index: -1;
	top: 0;
	left: 0;
`;

function BackgroundDecoration() {
	return <Image src={DecotationImage} alt='배경 장식' draggable='false' height={480} />;
}

export default BackgroundDecoration;
