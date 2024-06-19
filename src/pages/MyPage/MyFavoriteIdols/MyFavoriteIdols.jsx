import React, { useEffect, useMemo, useState } from "react";
import BlockTitle from "../../../components/BlockTitle/BlockTitle";
import useMediaQuery from "../../../hooks/useMediaQuery";
import useAsync from "../../../hooks/useAsync";
import { getIdolList } from "../../../api/idolsApi";
import { isEmpty } from "lodash";
import LodingImage from "../../../components/LodingImage/LodingImage";
import Button from "../../../components/Button/Button";
import Avatar from "../../../components/Avatar/Avatar";
import style from "../AddFavoriteIdols/avatarStyle.css";

//기종별 불러올 아이돌 데이터 크기(갯수)
const PAGE_SIZES = {
	top: 3,
	mobile: 6,
	tablet: 8,
	desktop: 16,
};

//기종별 프로필 이미지 크기
const PROFILE_SIZES = {
	mobile: 98,
	others: 128,
};

function MyFavoriteIdols() {
	const mode = useMediaQuery();

	const pageSize = PAGE_SIZES["top"];

	const profilSize = useMemo(() => {
		if (mode === "mobile") return PROFILE_SIZES["mobile"];
		else return PROFILE_SIZES["others"];
	}, [mode]);

	/**
	 * @JuhyeokC
	 * useAsync 커스텀훅 사용
	 */
	const { refetchFunction, data, pending, error } = useAsync(getIdolList);

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
		<article className="mypage myidol">
			<section className="mypage__title">
				<BlockTitle>내가 관심있는 아이돌</BlockTitle>
			</section>
			<section className="mypage-myidol__container">
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

				{!isEmpty(items) &&
					items.map(({ id, profilePicture, group, name }) => (
						<div className="mypage-myidol__items" key={`idol-id-$(id)`}>
							<Avatar
								src={profilePicture}
								size={"otherMyIdol"}
								alt={`${name} 프로필 이미지`}
								checked
								onCanceled={() => {
									console.log("canceled", id);
								}}
							/>
							<p className="mypage__items-name">{name}</p>
							<p className="mypage__items-group">{group}</p>
						</div>
					))}
			</section>
			{/* TODO: LIST COMPONENT */}
		</article>
	);
}

export default MyFavoriteIdols;

/**
 * @JuhyeokC
 * 확인 후 제 이름이 달린 주석은 삭제해주세요!
 * 이해가 어려운 부분은 질문해주세요!
 * map 의 key 잘넣어주셧는데요!
 * 백틱으로 템플릿리터럴 사용하실 때 변수는 ${} 중괄호 사용해주셔야해요!
 */
