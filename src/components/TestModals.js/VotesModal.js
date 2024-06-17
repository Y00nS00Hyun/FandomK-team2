import React from "react";
import profile from "../../assets/images/avatar/avater-skeleton.svg";
import radio from "../../assets/images/icon/icon-radio-checked.svg";
import votes from "../TestModalModule.css/Votes.module.css";
import InputRadio from "../../components/InputRadio/InputRadio";
import Button from "../Button/Button";
import Xbutton from "../Button/Xbutton";

// 투표하기 모달
function Votes({ onClose }) {
	return (
		/*투표 모달*/
		<div className={votes.votesContainer}>
			<div className={votes.votesTop}>
				<div>이달의 여자 아이돌</div>
				<Xbutton $size={"small"} />
			</div>
			<div className={votes.votesContents}>
				<div className={votes.votesProfileContainer}>
					<img src={profile} className={votes.profileImg} alt="프로필 사진" />
					<div className={votes.lanking}>1</div>
					<div className={votes.profileInfo}>
						<span>르세라핌 채원</span>
						<span className={votes.profileVotes}>204,000표</span>
					</div>
				</div>
				<InputRadio />
			</div>
			<div className={votes.votesContents}>
				<div className={votes.votesProfileContainer}>
					<img src={profile} className={votes.profileImg} alt="프로필 사진" />
					<div className={votes.lanking}>1</div>
					<div>
						<span className={votes.profileInfo}>르세라핌 채원</span>
						<span className={votes.profileVotes}>204,000표</span>
					</div>
				</div>
				<img src={radio} className={votes.chooseButton} alt="선택버튼" />
			</div>
			<div className={votes.votesContents}>
				<div className={votes.votesProfileContainer}>
					<img src={profile} className={votes.profileImg} alt="프로필 사진" />
					<div className={votes.lanking}>1</div>
					<div>
						<span className={votes.profileInfo}>르세라핌 채원</span>
						<span className={votes.profileVotes}>204,000표</span>
					</div>
				</div>
				<img src={radio} className={votes.chooseButton} alt="선택버튼" />
			</div>
			<div className={votes.votesContents}>
				<div className={votes.votesProfileContainer}>
					<img src={profile} className={votes.profileImg} alt="프로필 사진" />
					<div className={votes.lanking}>1</div>
					<div>
						<span className={votes.profileInfo}>르세라핌 채원</span>
						<span className={votes.profileVotes}>204,000표</span>
					</div>
				</div>
				<img src={radio} className={votes.chooseButton} alt="선택버튼" />
			</div>
			<div className={votes.votesContents}>
				<div className={votes.votesProfileContainer}>
					<img src={profile} className={votes.profileImg} alt="프로필 사진" />
					<div className={votes.lanking}>1</div>
					<div>
						<span className={votes.profileInfo}>르세라핌 채원</span>
						<span className={votes.profileVotes}>204,000표</span>
					</div>
				</div>
				<img src={radio} className={votes.chooseButton} alt="선택버튼" />
			</div>
			<div className={votes.votesContents}>
				<div className={votes.votesProfileContainer}>
					<img src={profile} className={votes.profileImg} alt="프로필 사진" />
					<div className={votes.lanking}>1</div>
					<div>
						<span className={votes.profileInfo}>르세라핌 채원</span>
						<span className={votes.profileVotes}>204,000표</span>
					</div>
				</div>
				<img src={radio} className={votes.chooseButton} alt="선택버튼" />
			</div>
			<Button className={votes.voteButton} onClick={onClose}>
				투표하기
			</Button>
			<div className={votes.notification}>
				<span>
					투표하는 데<span className={votes.credit}>1000 크레딧</span>이 소모됩니다.
				</span>
			</div>
		</div>
	);
}

export default Votes;
