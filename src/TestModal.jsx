import React, { useState } from "react";
import PopupModal from "./components/Modal/Fandom-k_Modal/modal.js/PopupModal";
import VotesModal from "./components/Modal/Fandom-k_Modal/modal.js/VotesModal";
import TopupModal from "./components/Modal/Fandom-k_Modal/modal.js/TopupModal";
import DonationModal from "./components/Modal/Fandom-k_Modal/modal.js/DonationModal";
import Button from "./components/Button/Button";

function TestModal() {
  const [popup, setPopup] = useState(false);
  const [votes, setVotes] = useState(false);
  const [topup, setTopup] = useState(false);
  const [donation, setDone] = useState(false);
  //팝업(Popup) 모달 on, off
  const popupOpen = () => setPopup(true);
  const popupClose = () => setPopup(false);
  //투표(Votes) 모달 on, off
  const votesOpen = () => setVotes(true);
  const votesClose = () => setVotes(false);
  //충전(Topup) 모달
  const topupOpen = () => setTopup(true);
  const topupClose = () => setTopup(false);
  //후원(Donation) 모달
  const donationOpen = () => setDone(true);
  const donationClose = () => setDone(false);

  return (
    <>
      <div>
        <Button onClick={popupOpen}>credit notification</Button>
        {popup && <PopupModal onClose={popupClose} />}
      </div>
      <div>
        <Button onClick={votesOpen} size={"small"} icon={"chart"}>
          차트 투표하기
        </Button>
        {votes && <VotesModal onClose={votesClose} />}
      </div>
      <div>
        <Button onClick={topupOpen}>Open topup Modal</Button>
        {topup && <TopupModal onClose={topupClose} />}
      </div>
      <div>
        <Button onClick={donationOpen} size={"large"}>
          후원하기
        </Button>
        {donation && <DonationModal onClose={donationClose} />}
      </div>
    </>
  );
}

export default TestModal;
