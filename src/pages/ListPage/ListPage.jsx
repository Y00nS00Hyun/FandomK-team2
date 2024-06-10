import React from 'react';
import MyCredit from './MyCredit/MyCredit';
import DonationWaitList from './DonationWaitList/DonationWaitList';

function ListPage() {
	return (
		<article>
			<MyCredit />

			<DonationWaitList />

			{/* <ChartOfMonth /> */}
		</article>
	);
}

export default ListPage;
