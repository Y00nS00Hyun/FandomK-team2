import React from "react";

import LeftCaretButtonIcon from "../../assets/images/caret/caret-btn-left.svg";
import RightCaretButtonIcon from "../../assets/images/caret/caret-btn-right.svg";
import LeftCaretButtonLargeIcon from "../../assets/images/caret/caret-btn-large-left.svg";
import RightCaretButtonLargeIcon from "../../assets/images/caret/caret-btn-large-right.svg";
import styled from "styled-components";

const CARET_ICONS = {
	normal: {
		left: LeftCaretButtonIcon,
		right: RightCaretButtonIcon,
		width: 40,
	},
	large: {
		left: LeftCaretButtonLargeIcon,
		right: RightCaretButtonLargeIcon,
		width: 29,
	},
};

/* eslint-disable-next-line */
const StyledButton = styled.button`
	position: absolute;
	top: 50%;
	${({ $direction, $gap }) => {
		if ($direction === "left") {
			return `left: -${$gap}px;`;
		} else {
			return `right: -${$gap}px;`;
		}
	}}
	transform: translateY(-50%);
	border: none;
	background: none;
	width: auto;
	height: auto;
	opacity: 0.8;

	&:before {
		content: none;
	}

	&:hover,
	&:focus {
		opacity: 1;
	}

	&[disabled] {
		cursor: default;
		opacity: 0.32;
	}
`;

const CaretImage = styled.img`
	display: block;
`;

function CaretButton({ direction = "left", size = "normal", ...args }) {
	const icon = CARET_ICONS[size][direction];
	const gap = CARET_ICONS[size].width * 2;

	return (
		<StyledButton $direction={direction} $gap={gap} {...args}>
			<CaretImage src={icon} alt={`${direction} caret icon`} draggable="false" />
		</StyledButton>
	);
}

export default CaretButton;
