import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import Button from "../../../components/Button/Button";
import TopupModal from "../../../components/TestModals.js/TopupModal";
import _ from "lodash";

/**
 * @todo
 * localStorage 에서 myCredit 가져와서 더하고 업데이트하기
 */

const CREDIT_NAME = "myCredit";

function MyCredit() {
	const [visibleModal, setVisibelModal] = useState(false);
	const [myCredit, setMyCredit] = useState(0);
	const [creditValue, setcreditValue] = useState(0);

	const handleChange = (e) => setcreditValue(Number(e.target.value));

	const handleClick = () => {
		setMyCredit((prev) => _.add(prev, creditValue));
		setVisibelModal(false);
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
				<Button onClick={() => setVisibelModal(true)}>충전 모달</Button>
			</section>

			<Modal show={visibleModal} title={"크레딧 충전하기"} onClose={() => setVisibelModal(false)} icon={"credit"} buttonAction={handleClick} buttonName={"충전하기"}>
				<TopupModal handleChange={handleChange} />
			</Modal>
		</article>
	);
}

export default MyCredit;
