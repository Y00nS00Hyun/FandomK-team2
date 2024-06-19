import React, { useState } from "react";
import PopupModal from "./components/Modal/Fandom-k_Modal/modal.js/PopupModal";
import VotesModal from "./components/Modal/Fandom-k_Modal/modal.js/VotesModal";
import TopupModal from "./components/Modal/Fandom-k_Modal/modal.js/TopupModal";
import DonationModal from "./components/Modal/Fandom-k_Modal/modal.js/DonationModal";

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
				<button onClick={popupOpen}>open popup modal</button>
				{popup && <PopupModal onClose={popupClose} />}
			</div>
			<div>
				<button onClick={votesOpen}>Open votes Modal</button>
				{votes && <VotesModal onClose={votesClose} />}
			</div>
			<div>
				<button onClick={topupOpen}>Open topup Modal</button>
				{topup && <TopupModal onClose={topupClose} />}
			</div>
			<div>
				<button onClick={donationOpen}>Open donation Modal</button>
				{donation && <DonationModal onClose={donationClose} />}
			</div>
		</>
	);
}

export default TestModal;
