import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import votes from "../TestModalModule.css/Votes.module.css";
import InputRadio from "../../components/InputRadio/InputRadio";
import Button from "../Button/Button";
import Xbutton from "../Button/Xbutton";
import useAsync from "../../hooks/useAsync";
import LodingImage from "../LodingImage/LodingImage";
import { getIdolList } from "../../api/idolsApi";
import Avatar from "../Avatar/Avatar";

// 투표 모달 콘텐츠 : 프로필, 그룹명, 멤버명, 선택 버튼
function ProfileListItem({ onClose, item }) {
	//const [items, setItems] = useState();

	return (
		<>
			<InputRadio className={votes.ProfileContainer} id={`voteModal${item.id}`} name={"voteModal"} value={item.id}>
				<div className={votes.profileBox}>
					<Avatar src={item.profilePicture} className={votes.profileImg} alt="프로필 사진" />
					<div className={votes.lanking}>1</div>
					<div className={votes.profileInfo}>
						<span>
							{item.group} {item.name}
						</span>
						<span className={votes.profileVotes}>{Number(item.totalVotes).toLocaleString()}표</span>
					</div>
				</div>
			</InputRadio>
		</>
	);
}

function VotesModal({ onClose }) {
	const { refetchFunction, data, pending, error } = useAsync(getIdolList);

	const items = data?.list || [];
	const sortedItems = items.sort((a, b) => Number(b.totalVotes) - Number(a.totalVotes));
	const cursor = data?.nextCursor;

	useEffect(() => {
		refetchFunction({ pageSize: 6 });
		console.log(items);
		console.log(sortedItems);
	}, [refetchFunction]);

	return (
		/*투표 모달*/
		<div className={votes.Container}>
			<div className={votes.Top}>
				<div>이달의 여자 아이돌</div>
				<Xbutton $size={"small"} onClick={onClose} />
			</div>
			<div className={votes.Contents}>
				<ul className={votes.content}>
					{pending && <LodingImage />}

					{error && <p>ERROR! {error.message}</p>}

					{items &&
						items.map((item) => {
							return (
								<li key={item.id}>
									<ProfileListItem item={item} />
									<div className={votes.areaLine}></div>
								</li>
							);
						})}
				</ul>
			</div>
			<Button className={votes.button}>투표하기</Button>
			<div className={votes.notification}>
				<span>
					투표하는 데<span className={votes.credit}>1000 크레딧</span>이 소모됩니다.
				</span>
			</div>
		</div>
	);
}

export default VotesModal;
