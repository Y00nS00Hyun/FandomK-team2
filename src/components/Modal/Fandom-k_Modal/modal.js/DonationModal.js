import done from "../module.css/Donation.module.css";
import avatar from "../../../../assets/images/avatar/avater-skeleton.svg";
import credit from "../../../../assets/images/icon/icon-credit.svg";
import Button from "../../../Button/Button";
import Xbutton from "../../../Button/Xbutton";

// 후원하기 모달
function DonationModal({ onClose }) {
	return (
		<div id={done.modalBackground}>
			<div className={done.donationContainer}>
				<Xbutton size="small" className={done.donationTop} onClick={onClose}>
					후원하기
				</Xbutton>
				<div className={done.donationBody}>
					<img src={avatar} className={done.donationImg} alt="연예인 프로필 사진" />
					<div className={done.adTitle}>
						<span className={done.adWhere}>강남역 광고</span>
						<span>민지 2023 첫 광고</span>
					</div>
					<div className={done.creditInputBox}>
						<input type="number" name="chargeCredit" placeholder="크레딧 입력" className={done.creditInput} />
						<img src={credit} alt="크레딧 사진" />
					</div>
					<Button size={"wide"}>후원하기</Button>
				</div>
			</div>
		</div>
	);
}

export default DonationModal;
