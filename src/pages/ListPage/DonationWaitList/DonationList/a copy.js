import React from "react";
import Slider from "react-slick";

const settings = {
	width: 800,
	rows: 1, //이미지를 몇 줄로 표시할지 개수
	// prevArrow: $("#prevArrow"), //이전 화살표만 변경
	// nextArrow: $("#nextArrow"), //다음 화살표만 변경
	dots: true, //슬라이더 아래에 도트 네비게이션 버튼 표시 여부
	draggable: false, //슬라이드 드래그 가능여부
	arrows: true, //이전 다음 버튼 표시 여부 -> 왜 안생기냐~ 환장하겠네
	speed: 500,
	slidesToShow: 4,
	slidesToScroll: 4,
	centerMode: true, //중앙에 슬라이드가 보여지는 모드 -> 왜 중앙으로 안가?????
	// centerPadding: "70px", //중앙에 슬라이드가 보여지는 모드에서 패딩 값
	infinite: false,
	responsive: [
		{
			//작은 사이즈
			breakpoint: 1200,
			settings: {
				arrows: false, //이전 다음 버튼 표시 여부
				draggable: true, //슬라이드 드래그 가능여부
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
				dots: true,
				centerMode: true,
			},
		},
	],
};

export default settings;
