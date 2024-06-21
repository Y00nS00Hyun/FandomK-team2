import React, { useEffect, useMemo, useRef, useState } from "react";
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
	const sliderRef = useRef(null);
	const [myFavoriteIdols, setMyFavoriteIdols] = myFavoriteIdolsState;
	const [reload, setReload] = useState(0);
	const [idols, setIdols] = useState([]);
	const [cursor, setCursor] = useState(null);
	const [selectedIdolIds, setSelectedIdolIds] = useState([]);
	const [currentSlide, setCurrentSlide] = useState(0); // 👽 (1) 슬라이드가 변경될 때 마다 현재 인덱스 업데이트

	/**
	 * @JuhyeokC
	 * useAsync 커스텀훅 사용
	 */
	const [pending, error, execute] = useAsync(getIdolList);

	const getData = async ({ cursor }) => {
		const params = { pageSize: 999 }; // 초기 로드 될 때 본래사이즈 보다 2배 사이즈로 호출
		if (cursor) {
			params.pageSize = pageSize; // 커서가 있을 때 본래 사이즈 만큼 추가 로드
			params.cursor = cursor; // 커서가 있을 때 커서 추가 (더보기)
		}

		const result = await execute(params); // 데이터 호출
		if (!result) return; // 호출 실패 시 함수 종료
		const { list, nextCursor } = result; // 응답받은 API 데이터 구조분해 (팬덤케이 스웨거 API 참조)

		setIdols((prev) => {
			// 데이터 담기 위해 이전 값 참조
			if (cursor) {
				// 더보기 실행 시 커서가 있을 것이므로 커서가 참일 때
				return [...prev, ...list]; // 이전 데이터에 새로운 데이터 추가
			} else {
				// 커서가 없을 때 (최초 실행 시 혹은 성별버튼 클릭 시)
				return list; // 새로운 데이터만 추가
			}
		});
		setCursor(nextCursor); // 서버요청에 사용될 커서 상태
	};

	// 추가 데이터 요청
	const getMoreData = async () => {
		if (cursor) await getData({ pageSize, cursor });
	};

	const handleReload = () => {
		setIdols([]);
		setReload((prev) => ++prev);
	};

	// 슬라이드 처음으로
	const slickFirst = () => sliderRef.current.slickGoTo(0);

	// 슬라이드 이전으로
	const slickPrev = () => sliderRef.current.slickPrev();

	// 슬라이드 다음으로
	const slickNext = async () => sliderRef.current?.slickNext();

	const settings = {
		rows: 2,
		slidesPerRow: 1,
		slidesToShow: pageSize / 2,
		swipeToSlide: true,

		speed: 500,
		centerPadding: "0px",
		arrows: false,
		dots: false,
		beforeChange: (oldIndex, newIndex) => {
			setCurrentSlide(newIndex);
			getMoreData();
		},
		afterChange: (index) => {},
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

	/**
	 * @JuhyeokC
	 * 렌더링 된 후 fetch 함수 실행
	 */
	useEffect(() => {
		getData({ pageSize });
	}, [reload]);

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
							</Slider>
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
							{mode !== "mobile" && (
								<>
									<CaretButton direction="left" size="large" onClick={slickPrev} />
									<CaretButton direction="right" size="large" onClick={slickNext} />
								</>
							)}
						</Container>

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
