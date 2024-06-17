import React from "react";
import credit from "../../assets/images/icon/icon-credit.svg";
import radio from "../../assets/images/icon/icon-radio-checked.svg";
import whiteCredit from "../../assets/images/icon/icon-credit-white.svg";
import topup from "../TestModalModule.css/Topup.module.css";
import Button from "../Button/Button";
import Xbutton from "../Button/Xbutton";

// 크레딧 충전하기 모달
function TopupModal() {
	return (
		<div className={topup.creditChargeContainer}>
			<div className={topup.chargeTop}>
				<p>크레딧 충전하기</p>
				<Xbutton $size={"large"} />
			</div>
			<div className={topup.chargeBody}>
				<button className={topup.creditChooseButton}>
					<div className={topup.creditAmount}>
						<img src={credit} alt="크레딧 이미지" />
						<span>100</span>
					</div>
					<img src={radio} alt="라디오 버튼 이미지" />
				</button>
				<button className={topup.creditChooseButton}>
					<div>
						<img src={credit} alt="크레딧 이미지" />
						<span>500</span>
					</div>
					<img src={radio} alt="라디오 버튼 이미지" />
				</button>
				<button className={topup.creditChooseButton}>
					<div>
						<img src={credit} alt="크레딧 이미지" />
						<span>1000</span>
					</div>
					<img src={radio} alt="라디오 버튼 이미지" />
				</button>
			</div>
			<Button className={topup.creditChargeButton}>
				<img src={whiteCredit} alt="화이트 크레딧 이미지" />
				<span>충전하기</span>
			</Button>
		</div>
	);
}

export default TopupModal;
