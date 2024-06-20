import React, { useEffect, useState } from "react";
import useAsync from "../../../hooks/useAsync";
import { getChartData } from "../../../api/chartsApi";
import LodingImage from "../../../components/LodingImage/LodingImage";
import BlockTitle from "../../../components/BlockTitle/BlockTitle";
import style from "./ChartOfMonth.module.css";
import TitleSection from "../../../components/TitleSection/TitleSection";
import styled from "styled-components";
import Button from '../../../components/Button/Button';

/**
 * @JuhyeokC
 * mode 별 페이지사이즈 매직넘버
 */
const PAGE_SIZES = {
	desktop: 10,
	tablet: 5,
	mobile: 5,
};

const Container = styled.div`
	${({ $mode }) => {
		switch ($mode) {
			case "desktop":
				return `
        `;
			default:
				return `
        display:flex;
        `;
		}
	}}
`;

// TODO : 내가 개발할 곳 (이대진) 2024.06.10 13:20
function ChartOfMonth({ mode }) {
	/**
	 * @JuhyeokC
	 * mode 에 맞는 페이지사이즈 가져오기
	 */
	const pageSize = PAGE_SIZES[mode];

	const [gender, setGender] = useState("female");
	const [cursor, setCursor] = useState(null);
	// const [items,setItems] = useState([]);
	/**
	 * @JuhyeokC
	 * useAsync 커스텀훅 사용
	 */
	const { refetchFunction, data, pending, error } = useAsync(getChartData);

	/**
	 * @JuhyeokC
	 * 렌더링 된 후 fetch 함수 실행
	 */
  function handleClick() {
    console.log("차트모달열기");
  }

	useEffect(() => {
		refetchFunction({ pageSize, gender }); // gender State  (set) => male/female
		setCursor(data?.nextCursor);
	}, [refetchFunction, pageSize, gender]); // 커서에 대한 함수 추가 (para => refetchFunction)

	function nextIdols(cursor) {
		refetchFunction({ pageSize, gender, cursor });
		// setItems((prev)=>[...prev,data]);
	}
	/**
	 * @JuhyeokC
	 * data 가 업데이트될 때 idols 담길 items 와 더보기를 위한 cursor
	 */
	const items = data?.idols || [];

	return (
		<TitleSection title={"이달의 차트"} action={<Button size="small" icon="chart" onClick={handleClick}>차트투표하기</Button>}>
			<section className={style["chartbar"]}>
				{/* <section className={style["chartbar__header"]}>
				</section> */}
			<sehction className={style["chartbar__gender"]}>
				<button 
        onClick={() => setGender("female")}
         className={`${style["chartbar__female"]} ${gender === "female" ?style["selected"] : ""}`}>
					이달의 여자 아이돌
				</button>
				<button 
        onClick={() => setGender("male")}
         className={`${style["chartbar__male"]} ${gender === "male" ?style["selected"] : ""}`}>
					이달의 남자 아이돌
				</button>
			</sehction>

			<Container className={style["container"]} $mode={mode}>
				{/**
				 * @JuhyeokC
				 * 로딩 출력
				 */}
				{pending && <LodingImage />}

					{/**
					 * @JuhyeokC
					 * 에러 출력
					 */}
					{error && <p>ERROR! {error.message}</p>}

				{/**
				 * @JuhyeokC
				 * 데이터 출력
				 */}
				{items &&
					items.map((item) => (
						<div key={item.id} className={style["chart__ranking"]}>
							{/* <article key={item.id}> */}
							<section className={style["chart__profile"]}>
								<div className={style["chart__circle"]}>
									<img className={style["chart__img"]} src={item.profilePicture} alt={`${item.name} 프로필 이미지`} height={80} draggable="false" />
								</div>
								<span className={style["chart__rank"]}>{item.rank}</span>
								<div className={style["chart__group"]}>{`${item.group} ${item.name}`}</div>
							</section>
							<div className={style["chart__vote"]}>{item.totalVotes.toLocaleString()}표</div>
							{/* </article> */}
						</div>
					))}
			</Container>

			</section>
      <button className={style["viewMore"]}> 더보기 </button>
		</TitleSection>

	);
}

export default ChartOfMonth;

/**
 * @JuhyeokC
 * 확인 후 제 이름이 달린 주석은 삭제해주세요!
 * 이해가 어려운 부분은 질문해주세요!
 */
