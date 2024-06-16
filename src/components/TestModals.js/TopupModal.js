import React from "react";
import xButton from "../../assets/images/icon/icon-X.svg";
import credit from "../../assets/images/icon/icon-credit.svg";
import radio from "../../assets/images/icon/icon-radio-checked.svg";
import whiteCredit from "../../assets/images/icon/icon-credit-white.svg";
import topup from "../TestModalModule.css/Topup.module.css";

function TopupModal() {
  return (
    <div className={topup.creditChargeContainer}>
      <div className={topup.chargeTop}>
        <p>크레딧 충전하기</p>
        <img src={xButton} alt="엑스 버튼" />
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
      <div className={topup.creditChargeButton}>
        <img src={whiteCredit} alt="화이트 크레딧 이미지" />
        <span>충전하기</span>
      </div>
    </div>
  );
}

export default TopupModal;
