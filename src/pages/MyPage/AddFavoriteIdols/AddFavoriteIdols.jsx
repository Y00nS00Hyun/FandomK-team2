import React, { useEffect, useMemo, useState } from "react";
import BlockTitle from "../../../components/BlockTitle/BlockTitle";
import useMediaQuery from "../../../hooks/useMediaQuery";
import useAsync from "../../../hooks/useAsync";
import { getIdolList } from "../../../api/idolsApi";
import { isEmpty } from "lodash";
import LodingImage from "../../../components/LodingImage/LodingImage";
import Button from "../../../components/Button/Button";
import Avatar from "../../../components/Avatar/Avatar";
import CaretButton from "../../../components/CaretButton/CaretButton.jsx";
import style from "../AddFavoriteIdols/avatarStyle.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//기종별 불러올 아이돌 데이터 크기(갯수)
const PAGE_SIZES = {
	mobile: 6,
	tablet: 8,
	desktop: 16,
};

function AddFavoriteIdols({ mode, setMyFavoriteIdols }) {
	const [selectedIdolIds, setSelectedIdolIds] = useState([]);
	const pageSize = PAGE_SIZES[mode];
	const profilSize = useMemo(() => {
		if (mode === "mobile") return "mobileAddIdol";
		else return "otherAddIdol";
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
			<section className="mypage-addidol__caretButton">
				<CaretButton direction="left" size="large" />
				<CaretButton direction="right" size="large" />
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
						items.map(({ id, profilePicture, group, name }) => {
							const checked = selectedIdolIds.includes(id);
							return (
								<div className="mypage-addidol__items" key={`idol-id-${id}`}>
									<Avatar
										src={profilePicture}
										size={profilSize}
										alt={`${name} 프로필 이미지`}
										checked={checked}
										onClick={() => {
											setSelectedIdolIds((prev) => {
												const hasId = prev.includes(id);
												if (hasId) {
													return prev.filter((item) => item !== id);
												}
												return [...new Set([...prev, id])];
											});
										}}
									/>
									<p className="mypage__items-name">{name}</p>
									<p className="mypage__items-group">{group}</p>
								</div>
							);
						})}
				</div>
			</section>
			<section className="mypage-addidol_add">
				<Button
					className="mypage-addidol_add-button"
					icon={"plus"}
					size={"large"}
					round
					onClick={() => {
						setMyFavoriteIdols((prev) => {
							const selected = items.filter((item) => selectedIdolIds.includes(item.id) && prev.every((p) => p.id !== item.id));
							return [...prev, ...selected];
						});
					}}
				>
					추가하기
				</Button>
			</section>
		</article>
	);
}

export default AddFavoriteIdols;
