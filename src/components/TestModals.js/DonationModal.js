import done from "../TestModalModule.css/Donation.module.css";
import avatar from "../../assets/images/avatar/avater-skeleton.svg";
import credit from "../../assets/images/icon/icon-credit.svg";
import Button from "../Button/Button";
import Xbutton from "../Button/Xbutton";

// 후원하기 모달
function DonationModal() {
	return (
		<div className={done.donationContainer}>
			<div className={done.donationTop}>
				후원하기
				<Xbutton $size={"small"} />
			</div>
			<div className={done.donationBody}>
				<img src={avatar} className={done.donationImg} alt="연예인 프로필 사진" />
				<div className={done.adTitle}>
					<span className={done.adWhere}>강남역 광고</span>
					<span>민지 2023 첫 광고</span>
				</div>
				<div className={done.creditInputBox}>
					<input type="number" name="chargeCredit" className={done.creditInput} placeholder="크레딧 입력" />
					<img src={credit} alt="크레딧 사진" />
				</div>
				<Button $size={"wide"}>후원하기</Button>
			</div>
		</div>
	);
}

export default DonationModal;

//className={done.donationButton} > 버튼 컴포넌트 css
