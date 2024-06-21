import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../components/Logo/Logo";
import SkeletonAvater from "../../assets/images/avatar/avater-skeleton.svg";
import Symbol from "../../assets/images/symbol/symbol-credit-white.svg";

const Header = styled.header`
	position: fixed;
	z-index: 8;
	inset: 0;
	bottom: auto;
	padding: 0 24px;
	backdrop-filter: blur(8px);
`;

const Inner = styled.section`
	position: relative;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	align-items: center;
	height: ${({ $headerHeight }) => ($headerHeight ? $headerHeight : 80)}px;
	filter: drop-shadow(0 0 2px var(--background-color-basic));
`;

const Section = styled.section`
	& a,
	& img {
		display: block;
	}
`;

function RootHeader({ headerHeight }) {
	const { pathname } = useLocation();

	const handleRefresh = (e) => {
		const href = `/${e.currentTarget.href.split("/").pop()}`;
		if (href === pathname) window.location.replace(href);
	};

	return (
		<Header>
			<Inner className="inner" $headerHeight={headerHeight}>
				<Section>
					<Link to={"/"} draggable="false">
						<img src={Symbol} alt={"Credit symbol"} height={32} draggable="false" />
					</Link>
				</Section>

				<Section>
					<Link to={"/list"} draggable="false" onClick={handleRefresh}>
						<Logo size={"lg"} />
					</Link>
				</Section>

				<Section>
					<Link to={"/mypage"} draggable="false" onClick={handleRefresh}>
						<img src={SkeletonAvater} alt={"기본 아바타 이미지"} height={32} draggable="false" />
					</Link>
				</Section>
			</Inner>
		</Header>
	);
}

export default RootHeader;
