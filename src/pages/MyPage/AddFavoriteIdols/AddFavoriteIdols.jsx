import React, { useEffect, useCallback, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { isEmpty } from "lodash";
import useAsync from "../../../hooks/useAsync";
import { getIdolList } from "../../../api/idolsApi";
import TitleSection from "../../../components/TitleSection/TitleSection.jsx";
import ErrorSection from "../../../components/ErrorSection/ErrorSection.jsx";
import Avatar from "../../../components/Avatar/Avatar";
import Button from "../../../components/Button/Button";
import CaretButton from "../../../components/CaretButton/CaretButton.jsx";
import style from "../AddFavoriteIdols/myPageStyle.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.article`
	position: relative;
`;

//기종별 불러올 아이돌 데이터 크기(갯수)
const PAGE_SIZES = {
	mobile: 6,
	tablet: 8,
	desktop: 16,
};

function AddFavoriteIdols({ mode, myFavoriteIdolsState }) {
	const pageSize = PAGE_SIZES[mode];
	const profilSize = useMemo(() => {
		if (mode === "mobile") return "mobileAddIdol";
		else return "otherAddIdol";
	}, [mode]);

	const [selectedIdolIds, setSelectedIdolIds] = useState([]);
	const [idols, setIdols] = useState([]);
	const [load, setLoad] = useState(0);
	const [reload, setReload] = useState(0);
	const sliderRef = useRef(null);
	const [cursor, setCursor] = useState(null);
	const [disableButton, setDisableButton] = useState(true);
	const [myFavoriteIdols, setMyFavoriteIdols] = myFavoriteIdolsState;

	const [pending, error, execute] = useAsync(getIdolList);

	const getDataList = useCallback(async (cursor) => {
		const params = { pageSize: pageSize * 4 };
		if (cursor) {
			params.pageSize = pageSize;
			params.cursor = cursor;
		}
		const data = await execute(params);
		if (!data) return;
		const { list, nextCursor } = data;

		if (list) {
			setIdols((prev) => [...prev, ...list]);
			setCursor(nextCursor);
		}
		console.log(list);
		setDisableButton(false);
	}, []);

	const slickPrev = () => sliderRef.current.slickPrev();
	const slickNext = async () => sliderRef.current.slickNext();
	// 슬라이드 처음으로
	//const slickFirst = () => sliderRef.current.slickGoTo(0);

	const handleReload = () => {
		setIdols([]);
		setReload((prev) => ++prev);
	};

	/**
	 * @JuhyeokC
	 * 렌더링 된 후 fetch 함수 실행
	 */
	useEffect(() => {
		getDataList();
	}, [reload]);

	const settings = {
		rows: 2,
		slidesPerRow: 1,
		slidesToShow: pageSize / 2,
		slidesToScroll: pageSize / 4,
		swipeToSlide: true,
		infinite: false,
		speed: 500,
		centerPadding: "0px",
		arrows: false,
		dots: false,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					arrows: false,
					draggable: true,
					slidesToScroll: "auto",
					dots: true,
					centerMode: true,
					infinite: false,
				},
			},
		],
	};
	return (
		<>
			<TitleSection title={"관심 있는 아이돌을 추가해보세요."} carousel={true}>
				{error ? (
					<ErrorSection error={error} onReload={handleReload}></ErrorSection>
				) : (
					<>
						<Container>
							<Slider ref={sliderRef} {...settings}>
								{!pending && isEmpty(idols) ? (
									<p>등록된 아이돌이 없습니다...</p>
								) : (
									idols.map(({ id, profilePicture, group, name }) => {
										if (myFavoriteIdols.some((idol) => idol.id === id)) return false;
										return (
											<div key={`idol-id-${id}`}>
												<article className="mypage-addidol__items">
													<Avatar
														src={profilePicture}
														size={profilSize}
														alt={`${name} 프로필 이미지`}
														checked={selectedIdolIds.includes(id)}
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
												</article>
											</div>
										);
									})
								)}
								{pending && idols.length === 0 && (
									<div style={{ display: "grid", gridTemplateColumns: `repeat(${pageSize / 2}, 1fr)`, gap: "16px" }}>
										{Array.from({ length: pageSize }, (v, i) => i).map((_, i) => {
											return (
												<div key={`idol-id-${i}`}>
													<article className="mypage-addidol__items">
														<Avatar src={""} size={profilSize} alt={`프로필 이미지`} className="skeleton" />
														<p className="mypage__items-name skeleton" style={{ minWidth: "40px" }}>
															&nbsp;
														</p>
														<p className="mypage__items-group skeleton" style={{ minWidth: "64px" }}>
															&nbsp;
														</p>
													</article>
												</div>
											);
										})}
									</div>
								)}
							</Slider>
						</Container>
						{mode !== "mobile" && (
							<>
								<CaretButton direction="left" size="large" onClick={slickPrev} />
								<CaretButton direction="right" size="large" onClick={slickNext} />
							</>
						)}
						<section className="mypage-addidol_add">
							<Button
								className="mypage-addidol_add-button"
								icon={"plus"}
								size={"large"}
								round
								onClick={() => {
									setMyFavoriteIdols((prev) => {
										const selected = idols.filter((item) => selectedIdolIds.includes(item.id) && prev.every((p) => p.id !== item.id));
										setSelectedIdolIds([]);
										return [...prev, ...selected];
									});
								}}
								disabled={selectedIdolIds.length === 0}
							>
								추가하기
							</Button>
						</section>
					</>
				)}
			</TitleSection>
		</>
	);
}

export default AddFavoriteIdols;
