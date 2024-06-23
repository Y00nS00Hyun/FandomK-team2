import React, { useState, useEffect } from "react";
import done from "../module.css/Donation.module.css";
import credit from "../../../../assets/images/icon/icon-credit.svg";
import { useMyCredit } from "../../../../context/MyCreditContext";
import useAsync from "../../../../hooks/useAsync";
import { donateCredit } from "../../../../api/donationsApi";
import PopupModal from "./PopupModal";
import Button from "./../../../Button/Button";

function DonationModal({ onClose, icon, idol, creditValueState, donationButtonDisabledState, disabled, buttonName }) {
  const [myCredit, setMyCredit] = useMyCredit();
  const [creditValue, setCreditValue] = creditValueState;
  const [donationButtonDisabled, setDonationButtonDisabled] = donationButtonDisabledState;
  const [message, setMessage] = useState(false);
  const [notEnough, setNotEnough] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value < 1000 || value > myCredit) {
      setDonationButtonDisabled(true);
      setIsValid(false);
    } else {
      setDonationButtonDisabled(false);
      setIsValid(true);
    }
    setMessage(value > myCredit);
    setCreditValue(value);
  };

  const [pending, error, execute] = useAsync(donateCredit);

  const donate = async (id, { amount }) => {
    const params = { amount };
    if (amount > myCredit) {
      setNotEnough(true);
      return;
    }
    const result = await execute(id, params);
    if (!result) return;
    console.log(result);
    handleClose();
  };

  const handleCredit = (e) => {
    e.preventDefault();
    setMyCredit((prev) => prev - creditValue);
    donate(idol?.id, { amount: creditValue });
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 500); // fadeOut 애니메이션 시간과 일치시킴
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`${done.modalBackground} ${!isVisible ? done.hidden : ""}`}>
      {notEnough ? (
        <PopupModal onClose={handleClose} />
      ) : (
        <div className={done.donationContainer}>
          <img src={idol?.idol.profilePicture} className={done.donationImg} alt={`${idol?.name} 프로필 사진`} />
          <div className={done.adTitle}>
            <span className={done.adWhere}>{idol?.subtitle}</span>
            <span>{idol?.title}</span>
          </div>
          <form>
            <input className={`${done.creditInput} ${!isValid ? done.creditError : ""}`} type="number" name="chargeCredit" placeholder="크레딧 입력" value={creditValue} onChange={handleChange} />
            {message && <p className={done.notification}>갖고 있는 크레딧 보다 더 많이 후원할 수 없어요!</p>}
            {buttonName && (
              <Button icon={icon} size={"wide"} onClick={handleCredit} disabled={pending || disabled} className={done.donationButton}>
                {buttonName}
              </Button>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default DonationModal;
