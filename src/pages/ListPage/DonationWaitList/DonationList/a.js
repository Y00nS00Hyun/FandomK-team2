import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow({ className, style, onClick }) {
	return <div className={className} style={{ ...style, display: "block", background: "red" }} onClick={onClick} />;
}

function SamplePrevArrow({ className, style, onClick }) {
	return <div className={className} style={{ ...style, display: "block", background: "green" }} onClick={onClick} />;
}

const settings = {
	nextArrow: <SampleNextArrow />,
	prevArrow: <SamplePrevArrow />,
	rows: 1, //이미지를 몇 줄로 표시할지 개수
	dots: false, //슬라이더 아래에 도트 네비게이션 버튼 표시 여부
	//draggable: false, //슬라이드 드래그 가능여부
	arrows: true, //이전 다음 버튼 표시 여부
	speed: 500,
	slidesToShow: 4, //centerMode: true, //중앙에 슬라이드가 보여지는 모드 -> 왜 중앙으로 안가?????
	centerPadding: "0px", //중앙에 슬라이드가 보여지는 모드에서 패딩 값
	infinite: false,
	responsive: [
		{
			//작은 사이즈
			breakpoint: 1200,
			settings: {
				arrows: false, //이전 다음 버튼 표시 여부
				draggable: true, //슬라이드 드래그 가능여부
				slidesToShow: 3,
				// slidesToScroll: 1,
				dots: true,
				centerMode: true,
			},
		},
	],
};

export default settings;

// 중요
// 모바일&탭 사이즈일 때 왜 한 번 스크롤 해야 생기는걸까?
// 왜 마지막 데이터들은 안 보이는지?

// 저장할 때 마다 바가 하나씩 생기는 이유
// 이제는 인정하겠삼
// 내가 잘못된 라이브러리를 사용했다는 것을..........................
