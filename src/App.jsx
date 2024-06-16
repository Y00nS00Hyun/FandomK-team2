import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import RootHeader from "./layout/RootHeader";
import LodingImage from "./components/LodingImage/LodingImage";
import styled from "styled-components";
import DecotationImage from "./assets/images/decoration/decoration-background-top-design.svg";

/**
 * @todo
 * BackgroundDecoration 컴포넌트로 보내기
 */
const Image = styled.img`
	position: fixed;
	z-index: ${({ $index }) => $index};
	top: 0;
	left: 0;
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
					{pathname !== "/" && <RootHeader />}
					<Image src={DecotationImage} alt="배경 장식" draggable="false" height={480} $index={pathname !== "/" ? -1 : 0} />
					<main id="rootContainer">
						<Outlet />
					</main>
				</>
			)}
		</>
	);
}

export default App;
