import React from "react";
import popup from "../module.css/Popup.module.css";
import credit from "../../../../assets/images/icon/icon-credit.svg";
import Button from "../../../Button/Button";
import Xbutton from "../../../Button/Xbutton";

// 크레딧 부족 알림 팝업
function PopupModal({ onClose }) {
	return (
		<div id={popup.modalBackground}>
			<div className={popup.popupContainer}>
				<div className={popup.popupTop}>
					<Xbutton size={"large"} onClick={onClose} />
				</div>
				<div className={popup.popupBody}>
					<img src={credit} className={popup.popupImg} alt="팝업 크레딧 이미지" />
					<div className={popup.popupNotification}>
						<span>
							앗! 투표하기 위한 <span className={popup.popupCredit}>크레딧</span>이 부족해요
						</span>
					</div>
					<Button className={popup.popupButton} onClick={onClose}>
						확인
					</Button>
				</div>
			</div>
		</div>
	);
}

export default PopupModal;
