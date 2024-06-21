import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { isEmpty } from "lodash";
import TitleSection from "../../../components/TitleSection/TitleSection";
import Avatar from "../../../components/Avatar/Avatar";
import CaretButton from "../../../components/CaretButton/CaretButton.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.article`
	position: relative;
`;

// 기종별 불러올 아이돌 데이터 크기(갯수)
const PAGE_SIZES = {
	desktop: 16,
	tablet: 8,
	mobile: 6,
};

function MyFavoriteIdols({ mode, myFavoriteIdolsState }) {
	const pageSize = PAGE_SIZES[mode];
	const profilSize = useMemo(() => {
		if (mode === "mobile") return "basic";
		else return "otherMyIdol";
	}, [mode]);
	let sliderRef = useRef(null);
	const [myFavoriteIdols, setMyFavoriteIdols] = myFavoriteIdolsState;

	// 슬라이드 처음으로
	const slickFirst = () => sliderRef.slickGoTo(0);

	// 슬라이드 이전으로
	const slickPrev = () => sliderRef.slickPrev();

	// 슬라이드 다음으로
	const slickNext = async () => sliderRef.slickNext();

	/**
	 * @JuhyeokC
	 * 크아악!!!!
	 * 적용하고 넘겨드리고 싶었는데 ㅜㅜ
	 * 슬라이더 설정 정말 모르겠어요 ㅜㅜ
	 * https://react-slick.neostack.com/docs/get-started
	 */
	const checkSize = pageSize / 2 < myFavoriteIdols.length;
	const rowSize = checkSize ? 2 : 1;

	const settings = {
		rows: rowSize,
		slidesToShow: myFavoriteIdols.length,
		swipeToSlide: true,
		infinite: true,
		speed: 500,
		centerPadding: "0px",
		arrows: false,
		dots: false,
		beforeChange: (oldIndex, newIndex) => {},
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

	return (
		<TitleSection title={"내가 관심있는 아이돌"} bottomLine>
			{isEmpty(myFavoriteIdols) ? (
				<p>좋아하는 아이돌을 추가해주세요</p>
			) : (
				<Container className="slider-container">
					<Slider
						ref={(slider) => {
							sliderRef = slider;
						}}
						{...settings}
					>
						{myFavoriteIdols.map(({ id, profilePicture, group, name }) => (
							<div key={`idol-id-${id}`}>
								<article className="mypage-myidol__items">
									<Avatar
										src={profilePicture}
										size={profilSize}
										alt={`${name} 프로필 이미지`}
										cancled
										onClick={() => {
											setMyFavoriteIdols((prev) => prev.filter((idol) => idol.id !== id));
										}}
									/>
									<p className="mypage__items-name">{name}</p>
									<p className="mypage__items-group">{group}</p>
								</article>
							</div>
						))}
					</Slider>
					{mode === "desktop" && (
						<>
							<CaretButton direction="left" size="large" onClick={slickPrev} />
							<CaretButton direction="right" size="large" onClick={slickNext} />
						</>
					)}
				</Container>
			)}
		</TitleSection>
	);
}

export default MyFavoriteIdols;
