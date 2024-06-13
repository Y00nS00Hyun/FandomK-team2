import React from "react";
import { Link } from "react-router-dom";

import Button from "../../components/Button/Button";

import style from "./LandingPage.module.css";

import CoverImage00 from "../../assets/images/landing/cover-00.png";
import CoverImage01 from "../../assets/images/landing/cover-01.png";
import CoverImage02 from "../../assets/images/landing/cover-02.png";
import CoverImage03 from "../../assets/images/landing/cover-03.png";

import DeviceImage01 from "../../assets/images/landing/device-01.png";
import DeviceImage02 from "../../assets/images/landing/device-02.png";
import DeviceImage03 from "../../assets/images/landing/device-03.png";

const SECTION_LIST = [
	{
		cover: CoverImage01,
		device: DeviceImage01,
		title: "후원하기",
		comment: "좋아하는 아이돌에게\n쉽게 조공해 보세요",
	},
	{
		cover: CoverImage02,
		device: DeviceImage02,
		title: "이달의 아티스트",
		comment: "내 아티스트에게 1등의\n영예를 선물하세요",
	},
	{
		cover: CoverImage03,
		device: DeviceImage03,
		title: "나만의 아티스트",
		comment: "좋아하는 아티스트들의\n소식을 모아보세요",
	},
];

function LandingPage() {
	return (
		<article className={`${style["landing-page"]} inner`}>
			<ul className={style["temp-menu"]}>
				<li>
					<Link to={"/list"}>후원 목록으로</Link>
				</li>
				<li>
					<Link to={"/mypage"}>마이페이지로</Link>
				</li>
			</ul>

			<article className={style["main-article"]}>
				<article className={style["cover"]}>
					<img src={CoverImage00} alt="레드벨벳 앨범 이미지" draggable="false" />
				</article>
				<Button>TEST</Button>
			</article>

			{SECTION_LIST.map(({ cover, device, title, comment }, index) => (
				<article className={style["landing-article"]} key={`landing-article-${index}`}>
					<section className={style["landing-article__head"]}>
						<p className={style["landing-article__title"]}>{title}</p>
						<p className={style["landing-article__comment"]}>{comment}</p>
					</section>
					<section className={style["landing-article__body"]}>
						<img className={style["landing-article__device-image"]} src={device} alt="레드벨벳 앨범 이미지" draggable="false" />
					</section>
					<article className={style["cover"]}>
						<img src={cover} alt="레드벨벳 앨범 이미지" draggable="false" />
					</article>
				</article>
			))}
		</article>
	);
}

export default LandingPage;
