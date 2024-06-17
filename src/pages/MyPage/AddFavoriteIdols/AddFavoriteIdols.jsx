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
import ButtonLeft from "../../../assets/images/caret/caret-btn-large-left.svg";
import ButtonRight from "../../../assets/images/caret/caret-btn-large-right.svg";

//기종별 불러올 아이돌 데이터 크기(갯수)
const PAGE_SIZES = {
	mobile: 6,
	tablet: 8,
	desktop: 16,
};

//기종별 프로필 이미지 크기
const PROFILE_SIZES = {
	mobile: 98,
	others: 128,
};

function AddFavoriteIdols() {
	/**
	 * @JuhyeokC
	 * AddFavoriteIdols 컴포넌트랑 MyFavoriteIdols 컴포넌트 둘 다 useMediaQuery 를 사용하니
	 * 부모 컴포넌트에서 mode 생성해서 prop으로 내려주셔도 될 것 같아요!
	 * 선택사항이니 무시하셔도 좋습니다!
	 */
	const mode = useMediaQuery();

	const pageSize = useMemo(() => {
		if (mode === "mobile") return PAGE_SIZES["mobile"];
		if (mode === "tablet") return PAGE_SIZES["tablet"];
		else return PAGE_SIZES["desktop"];
	}, [mode]);

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
		<article className="mypage addidol">
			<section className="mypage__title">
				<BlockTitle>관심 있는 아이돌을 추가해보세요.</BlockTitle>
			</section>
			<section className="mypage-addidol__container">
				<div className="mypage-addidol__container-inner">
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
							<div className="mypage-addidol__items" key={`idol-id-${id}`}>
								<Avatar src={profilePicture} size={"otherAddIdol"} alt={`${name} 프로필 이미지`} />
								<p className="mypage__items-name">{name}</p>
								<p className="mypage__items-group">{group}</p>
							</div>
						))}
				</div>
			</section>
			<section className="mypage-addidol_add">
				<Button className="mypage-addidol_add-button" icon={"plus"} size={"large"} round>
					추가하기
				</Button>
			</section>
		</article>
	);
}

export default AddFavoriteIdols;

/**
 * @JuhyeokC
 * 확인 후 제 이름이 달린 주석은 삭제해주세요!
 * 이해가 어려운 부분은 질문해주세요!
 * map 의 key 잘넣어주셧는데요!
 * 백틱으로 템플릿리터럴 사용하실 때 변수는 ${} 중괄호 사용해주셔야해요!
 */
