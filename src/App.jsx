import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import RootHeader from "./layout/RootHeader/RootHeader";
import LodingImage from "./components/LodingImage/LodingImage";
import DecotationImage from "./assets/images/decoration/decoration-background-top-design.svg";

const HEADER_HEIGHT = 80;

const Main = styled.main`
	padding-top: ${HEADER_HEIGHT}px !important;
	background-image: url(${DecotationImage});
	background-repeat: no-repeat;
	background-position: left top;
	background-size: auto 480px;
`;

function App() {
	const [isLoading, setIsLoading] = useState(false);
	const { pathname } = useLocation();

	useEffect(() => {
		setTimeout(() => {
			setIsLoading((prev) => false);
		}, 2400);
	}, []);

	return (
		<>
			{isLoading ? (
				<LodingImage />
			) : (
				<>
					{pathname !== "/" && <RootHeader headerHeight={HEADER_HEIGHT} />}
					<Main id="rootContainer">
						<Outlet />
					</Main>
				</>
			)}
		</>
	);
}

export default App;
