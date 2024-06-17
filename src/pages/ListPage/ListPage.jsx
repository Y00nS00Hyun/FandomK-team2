import React, { useEffect, useState } from "react";
import MyCredit from "./MyCredit/MyCredit";
import DonationWaitList from "./DonationWaitList/DonationWaitList";
import ChartOfMonth from "./ChartOfMonth/ChartOfMonth";
import useMediaQuery from "../../hooks/useMediaQuery";

const CREDIT_NAME = "myCredit";

function ListPage() {
	const mode = useMediaQuery();
	const [myCredit, setMyCredit] = useState(() => (localStorage?.getItem(CREDIT_NAME) === null ? 0 : Number(localStorage.getItem(CREDIT_NAME))));

	useEffect(() => {
		localStorage.setItem(CREDIT_NAME, myCredit);
	}, [myCredit]);

	return (
		<article>
			<MyCredit mode={mode} creditState={[myCredit, setMyCredit]} />
			<DonationWaitList mode={mode} myCredit={myCredit} />
			<ChartOfMonth mode={mode} />
		</article>
	);
}

export default ListPage;
