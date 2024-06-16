import React from "react";
import popup from "../TestModalModule.css/Popup.module.css";
import xButton from "../../assets/images/icon/icon-X.svg";
import credit from "../../assets/images/icon/icon-credit.svg";
import Button from "../Button/Button";

function PopupModal({ onClose }) {
  return (
    <div className={popup.popupContainer}>
      <div className={popup.popupTop}>
        <img
          src={xButton}
          alt="엑스 버튼 이미지"
          className="popupXbutton"
          onClick={onClose}
        />
      </div>
      <div className={popup.popupBody}>
        <img src={credit} className={popup.popupImg} alt="팝업 크레딧 이미지" />
        <div className={popup.popupNotification}>
          <span>
            앗! 투표하기 위한 <span className={popup.credit}>크레딧</span>이
            부족해요
          </span>
        </div>
        <Button className={popup.popupButton} onClick={onClose}>
          확인
        </Button>
      </div>
    </div>
  );
}

export default PopupModal;
