import React, { useEffect, useState } from "react";

/**
 * @todo
 * localStorage 에서 myCredit 가져와서 더하고 업데이트하기
 */

const CREDIT_NAME = "myCredit";

function MyCredit() {
	const [myCredit, setMyCredit] = useState(0);

	const handleClick = () => {
		setMyCredit((prev) => prev + 1000);
	};

	useEffect(() => {
		if (localStorage?.getItem(CREDIT_NAME) === undefined) {
			localStorage.setItem(CREDIT_NAME, 0);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(CREDIT_NAME, myCredit);
	}, [myCredit]);

	return (
		<article>
			<section>
				<p>MyCredit 컴포넌트</p>
				<p>내 크레딧: {myCredit}</p>
			</section>
			<section>
				<button type={"button"} onClick={handleClick}>
					충전하기
				</button>
			</section>
		</article>
	);
}

export default MyCredit;
