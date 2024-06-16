import React from "react";
import styled from "styled-components";

import CreditIcon from "../../assets/images/icon/icon-credit-white.svg";
import ChartIcon from "../../assets/images/icon/icon-chart.svg";
import PlusIcon from "../../assets/images/icon/icon-plus.svg";

const ICON_IMAGES = {
	credit: { src: CreditIcon, size: 24 },
	chart: { src: ChartIcon, size: 20 },
	plus: { src: PlusIcon, size: 20 },
};

const BUTTON_WIDTHS = {
	small: "auto",
	medium: "100px",
	large: "240px",
	wide: "100%",
};

const BUTTON_HEIGHTS = {
	small: "32px",
	medium: "40px",
	large: "42px",
	wide: "48px",
};

const BUTTON_FONT_SIZES = {
	small: "13px",
	medium: "14px",
	large: "15px",
	wide: "16px",
};

const Icon = styled.img``;

const StyledButton = styled.button`
	position: relative;
	display: inline-flex;
	flex-flow: row wrap;
	justify-content: center;
	align-items: center;
	gap: 4px;
	outline: none;
	border: none;
	border-radius: ${({ $round }) => ($round ? "9999px" : "3px")};
	min-width: ${({ $size }) => BUTTON_WIDTHS[$size] ?? BUTTON_WIDTHS["medium"]};
	min-height: ${({ $size }) => BUTTON_HEIGHTS[$size] ?? BUTTON_HEIGHTS["medium"]};
	padding: 4px 16px;
	background-image: var(--gradient-style-01);
	color: var(--text-color-basic);
	font-size: ${({ $size }) => BUTTON_FONT_SIZES[$size] ?? BUTTON_FONT_SIZES["medium"]};
	line-height: 1;

	${Icon},
	& span {
		position: relative;
		z-index: 2;
	}

	&:before {
		content: "";
		position: absolute;
		z-index: 1;
		top: 0;
		bottom: 0;
		left: 50%;
		right: 50%;
		display: block;
		background: var(--color-black-900);
		transition: inset 0.32s, opacity 0.16s;
		border-radius: inherit;
		opacity: 0;
	}

	&:hover:before,
	&:focus:before {
		inset: 0;
		opacity: 0.32;
	}

	&:not([disabled]):active {
		top: 1px;
	}

	&[disabled] {
		background: var(--color-gray-300);
		cursor: default;

		&:before {
			content: none;
		}
	}
`;

/**
 * @param {boolean} disabled - 버튼 비활성 유무 [ true, false ]
 * @param {boolean} round - 버튼 라운드 = round 만 적기
 * @param {string} size - 버튼 크기 = [ 'small', 'medium', 'large', 'wide' ]
 * @param {string} icon - 아이콘 = [ 'credit', 'chart', 'plus' ]
 *
 * @example
 *
 * <Button size={'wide'}>지금 시작하기</Button>
 * <Button size={'large'} onClick={() => 후원하기함수}>후원하기</Button>
 * <Button icon={'credit'} size={'medium'} onClick={() => 충전하기함수}>충전하기</Button>
 * <Button icon={'chart'} size={'small'} onClick={() => 투표하기함수}>차트 투표하기</Button>
 * <Button icon={'plus'} size={'large'} round onClick={() => 추가하기함수}>추가하기</Button>
 */

function Button({ children, onClick, disabled, round, size, icon, ...args }) {
	return (
		<StyledButton $icon={icon} $round={round} $size={size} onClick={onClick} disabled={disabled} {...args}>
			{icon && <Icon $icon={icon} src={ICON_IMAGES[icon].src} alt={`${icon} icon`} height={ICON_IMAGES[icon].size} />}
			<span>{children}</span>
		</StyledButton>
	);
}

export default Button;
