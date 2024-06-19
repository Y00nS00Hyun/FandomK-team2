import React, { useEffect } from "react";
import useAsync from "../../../hooks/useAsync";
import { getChartData } from "../../../api/chartsApi";
import LodingImage from "../../../components/LodingImage/LodingImage";
import BlockTitle from "../../../components/BlockTitle/BlockTitle";
import style from "./ChartOfMonth.module.css";
import TitleSection from "../../../components/TitleSection/TitleSection";

/**
 * @JuhyeokC
 * mode 별 페이지사이즈 매직넘버
 */
const PAGE_SIZES = {
	desktop: 10,
	others: 5,
};

// TODO : 내가 개발할 곳 (이대진) 2024.06.10 13:20
function ChartOfMonth({ mode }) {
	/**
	 * @JuhyeokC
	 * mode 에 맞는 페이지사이즈 가져오기
	 */
	const pageSize = PAGE_SIZES[mode];

	/**
	 * @JuhyeokC
	 * useAsync 커스텀훅 사용
	 */
	const { refetchFunction, data, pending, error } = useAsync(getChartData);

	/**
	 * @JuhyeokC
	 * 렌더링 된 후 fetch 함수 실행
	 */
	useEffect(() => {
		refetchFunction({ pageSize });
	}, [refetchFunction, pageSize]);

	/**
	 * @JuhyeokC
	 * data 가 업데이트될 때 idols 담길 items 와 더보기를 위한 cursor
	 */
	const items = data?.idols || [];
	const cursor = data?.nextCursor;

	return (
		<TitleSection title={"이달의 차트"}>
			<section className={style["chartbar"]}>
				<section className={style["chartbar__header"]}>
					<button className="vote">차트 투표하기</button>
				</section>

				<section className=""></section>
				<section className={style["chartbar__gender"]}>
					<button className={style["chartbar__female"]}>이달의 여자 아이돌</button>
					<button className={style["chartbar__male"]}>이달의 남자 아이돌</button>
				</section>

				<section className={style["container"]}>
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
							<article key={item.id}>
								<p>
									랭크: <span>{item.rank}</span>
								</p>
								<p>
									프로필: <img src={item.profilePicture} alt={`${item.name} 프로필 이미지`} height={80} draggable="false" />
								</p>
								<p>
									그룹: <span>{item.group}</span>
								</p>
								<p>
									이름: <span>{item.name}</span>
								</p>
								<p>
									성별: <span>{item.gender}</span>
								</p>
								<p>
									투표수: <span>{item.totalVotes}</span>
								</p>
							</article>
						))}

					<div id="rank1" className={style["item"]}>
						Item1
					</div>
					<div id="rank2" className={style["item"]}>
						Item2
					</div>
					<div id="rank3" className={style["item"]}>
						Item3
					</div>
					<div id="rank4" className={style["item"]}>
						Item4
					</div>
					<div id="rank5" className={style["item"]}>
						Item5
					</div>
					<div id="rank6" className={style["item"]}>
						Item6
					</div>
					<div id="rank7" className={style["item"]}>
						Item7
					</div>
					<div id="rank8" className={style["item"]}>
						Item8
					</div>
					<div id="rank9" className={style["item"]}>
						Item9
					</div>
					<div id="rank10" className={style["item"]}>
						Item10
					</div>
				</section>

				<button className={style["viewMore"]}> 더보기 </button>
			</section>
		</TitleSection>
	);
}

export default ChartOfMonth;

{
	/* <button // 모달창 띄우기
      popovertarget = "mypopover"
      popovertargetcation = "show">
        Show popover</button>
      <button popovertarget = "mypopover"
      popovertargetcation = "hide">
        Hide popover
        </button>
      <div id = "mypopover" popover> Popover content</div> */
}

/**
 * @JuhyeokC
 * 확인 후 제 이름이 달린 주석은 삭제해주세요!
 * 이해가 어려운 부분은 질문해주세요!
 */
