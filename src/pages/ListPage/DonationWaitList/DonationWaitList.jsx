import React from "react";
import DonationList from "./DonationList/DonationList";
import TitleSection from "../../../components/TitleSection/TitleSection";

function DonationWaitList({ mode, myCredit }) {
	return (
		<TitleSection title={"후원을 기다리는 조공"} carousel={true} size={"normal"}>
			<DonationList mode={mode} />
		</TitleSection>
	);
}

export default DonationWaitList;
