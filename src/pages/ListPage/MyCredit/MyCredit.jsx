import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import SlotCounter from "react-slot-counter";
import { useMyCredit } from "../../../context/MyCreditContext";
import Modal from "../../../components/Modal/Modal";
import TopupModal from "../../../components/Modal/Fandom-k_Modal/modal.js/TopupModal";
import CreditIcon from "../../../assets/images/symbol/symbol-credit.svg";

const PADDING_SIZES = {
  desktop: "32px 80px",
  tablet: "35px 64px",
  mobile: "20px",
};

const Article = styled.article`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin: 48px auto;
  padding: ${({ $mode }) => PADDING_SIZES[$mode] || "32px 80px"};
  border: 1px solid rgba(241, 238, 249, 0.8);
  border-radius: 8px;
  max-width: 1200px;
  background-color: var(--background-color-basic);
`;

const LeftSection = styled.section`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
`;

const RightSection = styled.section`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
`;

const SummaryText = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: var(--color-white-50);
  opacity: 0.6;
`;

const CreditSection = styled.p`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  color: rgba(255, 255, 255, 0.87);
`;

const Icon = styled.img`
  display: block;
  line-height: 1;
`;

const CreditText = styled.b`
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  & span {
    font-size: inherit;
  }
`;

const TextButton = styled.button`
  display: block;
  border: 1px solid transparent;
  background: none;
  padding: 1px;
  color: var(--color-brand-orange);
  font-size: 16px;
  font-weight: 500;
  transition: all 0.16s;

  &:hover,
  &:focus {
    border-bottom-color: var(--color-brand-orange);
  }
`;

function MyCredit({ mode }) {
  const [myCredit, setMyCredit] = useMyCredit();
  const [creditValue, setCreditValue] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);

  const handleChange = (e) => setCreditValue(Number(e.target.value));

  const handleClick = () => {
    setMyCredit((prev) => _.add(Number(prev), Number(creditValue)));
    setVisibleModal(false);
  };

  return (
    <>
      <Article $mode={mode}>
        <LeftSection>
          <SummaryText>내 크레딧</SummaryText>
          <CreditSection>
            <Icon src={CreditIcon} alt={"크레딧 아이콘"} height={32} />
            <CreditText>
              <SlotCounter value={myCredit.toLocaleString()} useMonospaceWidth />
            </CreditText>
          </CreditSection>
        </LeftSection>
        <RightSection>
          <TextButton type={"button"} onClick={() => setVisibleModal(true)}>
            충전하기
          </TextButton>
        </RightSection>

        <Modal show={visibleModal} modalOpen title={"크레딧 충전하기"} onClose={() => setVisibleModal(false)} icon={"credit"} buttonAction={handleClick} buttonName={"충전하기"} disabled={creditValue === 0}>
          <TopupModal handleChange={handleChange} />
        </Modal>
      </Article>
    </>
  );
}

export default MyCredit;
