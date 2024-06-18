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
	},
	large: {
		left: LeftCaretButtonLargeIcon,
		right: RightCaretButtonLargeIcon,
	},
};

const StyledButton = styled.button`
	position: relative;
	border: none;
	background: none;

	order: ${({ $direction }) => ($direction === "left" ? -1 : 1)};

	&:hover,
	&:focus {
	}
`;

const CaretImage = styled.img`
	display: block;
`;

function CaretButton({ direction = "left", size = "normal", ...args }) {
	const icon = CARET_ICONS[size][direction];

	return (
		<StyledButton $direction={direction} {...args}>
			<CaretImage src={icon} alt={`${direction} caret icon`} draggable="false" />
		</StyledButton>
	);
}

export default CaretButton;
