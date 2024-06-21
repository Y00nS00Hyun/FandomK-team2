import done from "../module.css/Donation.module.css";
import credit from "../../../../assets/images/icon/icon-credit.svg";
import { useMyCredit } from "../../../../context/MyCreditContext";
import { useState } from "react";
import useAsync from "../../../../hooks/useAsync";
import { donateCredit } from "../../../../api/donationsApi";
import PopupModal from "./PopupModal";
import Button from "./../../../Button/Button";

// 후원하기 모달
function DonationModal({ onClose, icon, idol, creditValueState, donationButtonDisabledState, disabled, buttonName }) {
	const [myCredit, setMyCredit] = useMyCredit();
	const [creditValue, setCreditValue] = creditValueState;
	const [donationButtonDisabled, setDonationButtonDisabled] = donationButtonDisabledState;
	const [message, setMessage] = useState(false);
	const [notEnough, setNotEnough] = useState(false);

	const handleChange = (e) => {
		const value = e.target.value;
		if (value < 1000) {
			setDonationButtonDisabled(true);
		} else {
			setDonationButtonDisabled(false);
		}
		setMessage(value > myCredit);
		setCreditValue(value);
	};

	const [pending, error, execute] = useAsync(donateCredit);

	const donate = async (id, { amount }) => {
		const params = { amount };
		if (amount > myCredit) setNotEnough(true);
		const result = await execute(id, params);
		if (!result) return;
		console.log(result);
		onClose();
	};

	const handleCredit = (e) => {
		e.preventDefault();
		setMyCredit((prev) => prev - creditValue);
		donate(idol?.id, { amount: creditValue });
	};

	console.log(idol);
	console.log(this);

	return (
		<>
			{notEnough ? (
				<PopupModal onClose={onClose} />
			) : (
				<div className={done.donationBody}>
					<img src={idol?.idol.profilePicture} className={done.donationImg} alt={`${idol?.name} 프로필 사진`} />
					<div className={done.adTitle}>
						<span className={done.adWhere}>{idol?.subtitle}</span>
						<span>{idol?.title}</span>
					</div>
					<form>
						<div className={done.creditInputBox}>
							<input className={done.creditInput} type="number" name="chargeCredit" placeholder="크레딧 입력" value={creditValue} onChange={handleChange} />
							<img src={credit} alt="크레딧 사진" />
						</div>
						{message && <p>초과</p>}
						{buttonName && (
							<Button icon={icon} size={"wide"} onClick={handleCredit} disabled={pending || disabled}>
								{buttonName}
							</Button>
						)}
					</form>
				</div>
			)}
		</>
	);
}

export default DonationModal;
