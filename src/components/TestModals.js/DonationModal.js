import done from "../TestModalModule.css/Donation.module.css";
import xButton from "../../assets/images/icon/icon-X.svg";
import avatar from "../../assets/images/avatar/avater-skeleton.svg";
import credit from "../../assets/images/icon/icon-credit.svg";

function DonationModal() {
  return (
    <div class={done.donationContainer}>
      <div class={done.donationTop}>
        후원하기
        <img src={xButton} alt="닫기 버튼" />
      </div>
      <div class={done.donationBody}>
        <img src={avatar} class={done.donationImg} alt="연예인 프로필 사진" />
        <div class={done.adTitle}>
          <span class={done.adWhere}>강남역 광고</span>
          <span>민지 2023 첫 광고</span>
        </div>
        <div class={done.creditInputBox}>
          <input
            type="number"
            name="chargeCredit"
            class={done.creditInput}
            placeholder="크레딧 입력"
          />
          <img src={credit} alt="크레딧 사진" />
        </div>
        <div class={done.donationButton}>후원하기</div>
      </div>
    </div>
  );
}

export default DonationModal;
