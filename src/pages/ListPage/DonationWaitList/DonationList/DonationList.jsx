import React, { useEffect, useMemo, useState } from "react";
import useAsync from "../../../../hooks/useAsync";
import { getDonationList } from "../../../../api/donationsApi";
import LodingImage from "../../../../components/LodingImage/LodingImage";
import CaretButton from "../../../../components/CaretButton/CaretButton";
import Card from "./DonationCard";

/**
 * @JuhyeokC
 * mode 별 페이지사이즈 매직넘버
 */
const PAGE_SIZES = {
	desktop: 4,
	others: 3,
};

function DonationList({ mode }) {
	/**
	 * @JuhyeokC
	 * 페이지 사이즈
	 * mode 는 부모컴포넌트에서 사용된 useMediaQuery 입니다~
	 * 부모컴포넌트에서 현재컴포넌트로 가져오셔도 됩니다!
	 */
	const pageSize = PAGE_SIZES[mode];

	/**
	 * @JuhyeokC
	 * useAsync 커스텀훅 사용
	 */
	const { refetchFunction, data, pending, error } = useAsync(getDonationList);

	/**
	 * @JuhyeokC
	 * 렌더링 된 후 fetch 함수 실행
	 */
	useEffect(() => {
		refetchFunction({ pageSize });
	}, [refetchFunction, pageSize]);

	/**
	 * @JuhyeokC
	 * data 가 업데이트될 때 list가 담길 items
	 */
	const items = data?.list || [];

	return (
		<div>
			{/**
			 * @JuhyeokC
			 * 로딩 출력
			 */}
			{pending && <LodingImage />}

			{/**
			 * @JuhyeokC
			 * 에러 출력
			 */}
			{error && <p>{error.message}에러발생!!!!!!</p>}

			{/**
			 * @JuhyeokC
			 * 데이터 출력
			 */}
			{items && items.map((item) => <Card item={item} key={item.id} />)}

			{/* <div>
				<CaretButton direction="LEFT" size="normal" />
				<CaretButton direction="RIGHT" size="normal" />
			</div> */}
		</div>
	);
}

export default DonationList;

/**
 * @JuhyeokC
 * 확인 후 제 이름이 달린 주석은 삭제해주세요!
 * 이해가 어려운 부분은 질문해주세요!
 */
