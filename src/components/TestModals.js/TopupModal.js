import React, { Children } from "react";
import InputRadio from "../InputRadio/InputRadio";
import credit from "../../assets/images/icon/icon-credit.svg";
import topup from "../TestModalModule.css/Topup.module.css";
import Xbutton from "../Button/Xbutton";
import Button from "../Button/Button";

const CREDIT_UNITS = [{ unit: 100 }, { unit: 500 }, { unit: 1000 }];

function TopupModal({ handleChange }) {
function TopupModal({ handleChange }) {
	return (
		<div className={topup.container}>
			<Xbutton size={"small"} className={topup.top}>
				크레딧 충전하기
			</Xbutton>
			<div className={topup.body}>
				{CREDIT_UNITS.map(({ unit }) => (
					<InputRadio key={`credit-unit-${unit}`} className={topup.creditChooseButton} id={`creditUnit${unit}`} name={"creditUnit"} value={unit} onChange={handleChange}>
						<div className={topup.creditAmount}>
							<img src={credit} alt="크레딧 이미지" />
							<span>{unit}</span>
						</div>
					</InputRadio>
				))}
			</div>
			<Button icon={"credit"} size={"wide"} className={topup.button}>
				충전하기
			</Button>
		</div>
	);
}

export default TopupModal;
