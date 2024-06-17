import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../components/Logo/Logo";
import SkeletonAvater from "../../assets/images/avatar/avater-skeleton.svg";

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
	height: ${({ $headerHeight }) => ($headerHeight ? $headerHeight : 80)}px;
	filter: drop-shadow(0 0 2px var(--background-color-basic));
`;

const LogoSection = styled.section`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	& a {
		display: block;
	}
`;

const UserSection = styled.section`
	position: absolute;
	top: 50%;
	right: 0;
	transform: translateY(-50%);
`;

function RootHeader({ headerHeight }) {
	const navigate = useNavigate();

	return (
		<Header>
			<Inner className="inner" $headerHeight={headerHeight}>
				<LogoSection>
					<Link to={"/"}>
						<Logo size={"lg"} />
					</Link>
				</LogoSection>

				<UserSection>
					<img src={SkeletonAvater} alt={"기본 아바타 이미지"} onClick={() => navigate("/mypage")} style={{ cursor: "pointer" }} height={32} />
				</UserSection>
			</Inner>
		</Header>
	);
}

export default RootHeader;
