import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo/Logo";
import Avatar from "../components/Avatar/Avatar";
import styled from "styled-components";
import useMediaQuery from "../hooks/useMediaQuery";

const LogoSection = styled.section`
	flex: 1/1/1;
`;

const UserSection = styled.section``;

const Header = styled.header`
	position: relative;
	z-index: 8;
	height: 80px;
`;

const Inner = styled.section`
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	align-items: center;
	gap: 16px;
`;

function RootHeader() {
	return (
		<Header>
			<Inner className="inner">
				<LogoSection>
					<Link to={"/"}>
						<Logo size={"lg"} />
					</Link>
				</LogoSection>

				<UserSection>
					<Avatar />
				</UserSection>
			</Inner>
		</Header>
	);
}

export default RootHeader;
