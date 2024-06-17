import React from "react";
import MyCredit from "./MyCredit/MyCredit";
import DonationWaitList from "./DonationWaitList/DonationWaitList";
import ChartOfMonth from "./ChartOfMonth/ChartOfMonth";
import useMediaQuery from "../../hooks/useMediaQuery";

function ListPage() {
	const mode = useMediaQuery();

	return (
		<article>
			<MyCredit />
			<DonationWaitList mode={mode} />
			<ChartOfMonth mode={mode} />
		</article>
	);
}

export default ListPage;
