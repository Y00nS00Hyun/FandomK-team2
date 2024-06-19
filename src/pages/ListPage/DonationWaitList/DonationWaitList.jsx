import React from "react";
import BlockTitle from "../../../components/BlockTitle/BlockTitle";
import DonationList from "./DonationList/DonationList";

function DonationWaitList({ mode, myCredit }) {
	return (
		<article>
			<BlockTitle>후원을 기다리는 조공</BlockTitle>
			<DonationList mode={mode} />
		</article>
	);
}

export default DonationWaitList;
