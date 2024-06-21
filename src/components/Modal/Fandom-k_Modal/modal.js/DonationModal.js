import done from "../module.css/Donation.module.css";
import credit from "../../../../assets/images/icon/icon-credit.svg";
import Button from "../../../Button/Button";
import Xbutton from "../../../Button/Xbutton";

// 후원하기 모달
function DonationModal({ onClose, selectedItem }) {
	return (
		<div className={done.donationBody}>
			<img src={selectedItem.idol.profilePicture} className={done.donationImg} alt="연예인 프로필 사진" />
			<div className={done.adTitle}>
				<span className={done.adWhere}>{selectedItem.subtitle}</span>
				<span>{selectedItem.title}</span>
			</div>
			<form>
				<div className={done.creditInputBox}>
					<input className={done.creditInput} type="number" name="chargeCredit" placeholder="크레딧 입력" min={1} max={9999} />
					<img src={credit} alt="크레딧 사진" />
				</div>
			</form>
		</div>
	);
}

export default DonationModal;
