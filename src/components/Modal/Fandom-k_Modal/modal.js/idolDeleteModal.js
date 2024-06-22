import done from "../module.css/Donation.module.css";

function IdolDeleteModal({ idol }) {
  return (
    <>
      <div className={done.donationBody}>
        <img src={idol?.idol.profilePicture} className={done.donationImg} alt={`${idol?.name} 프로필 사진`} />
        <div className={done.adTitle}>
          <span className={done.adWhere}>{idol?.subtitle}</span>
          <span>{idol?.title}</span>
        </div>
        <div>
          <span>진짜... 지울 거야...?🥺</span>
        </div>
      </div>
    </>
  );
}

export default IdolDeleteModal;
