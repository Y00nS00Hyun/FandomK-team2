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
	test: 3,
	mobile: 6,
	tablet: 8,
	desktop: 16,
};

function MyFavoriteIdols({ mode, myFavoriteIdols }) {
	const pageSize = PAGE_SIZES["test"];
	const profilSize = useMemo(() => {
		if (mode === "mobile") return "basic";
		else return "otherMyIdol";
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
	//const items = data?.list || [];
	console.log({ myFavoriteIdols });
	const items = myFavoriteIdols;

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
						<div className="mypage-myidol__items" key={`idol-id-${id}`}>
							<Avatar src={profilePicture} size={profilSize} alt={`${name} 프로필 이미지`} />
							<p className="mypage__items-name">{name}</p>
							<p className="mypage__items-group">{group}</p>
						</div>
					))}
				{isEmpty(items) && <p>좋아하는 아이돌을 추가해주세요</p>}
			</section>
		</article>
	);
}

export default MyFavoriteIdols;
