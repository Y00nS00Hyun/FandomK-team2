import React, { useEffect } from "react";
import useMediaQuery from "../../../hooks/useMediaQuery";
import BlockTitle from "../../../components/BlockTitle/BlockTitle";
import DonationList from "./DonationList/DonationList";

function DonationWaitList() {
	const mode = useMediaQuery();

	//useEffect(() => {}, [mode]);

	return (
		<article>
			<BlockTitle>후원을 기다리는 조공</BlockTitle>
			<DonationList mode={mode} />
		</article>
	);
}

export default DonationWaitList;
