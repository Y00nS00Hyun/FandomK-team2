import React, { useState } from "react";
import PopupModal from "./components/TestModals.js/PopupModal";
import VotesModal from "./components/TestModals.js/VotesModal";
import TopupModal from "./components/TestModals.js/TopupModal";
import DonationModal from "./components/TestModals.js/DonationModal";

function TestModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        <button onClick={openModal}>open Modal</button>
        {isModalOpen && <PopupModal onClose={closeModal} />}
      </div>
      <VotesModal />
      <TopupModal />
      <DonationModal />
    </>
  );
}

export default TestModal;
