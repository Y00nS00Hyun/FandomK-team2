import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";

import style from "./LandingPage.module.css";

import BackgroundImage00 from "../../assets/images/landing/background-00.png";
import BackgroundImage01 from "../../assets/images/landing/background-01.png";
import BackgroundImage02 from "../../assets/images/landing/background-02.png";
import BackgroundImage03 from "../../assets/images/landing/background-03.png";

import DeviceImage00 from "../../assets/images/landing/iPhone14Pro-Silver-Portrait.png";
import DeviceImage01 from "../../assets/images/landing/device-01.png";
import DeviceImage02 from "../../assets/images/landing/device-02.png";
import DeviceImage03 from "../../assets/images/landing/device-03.png";
import Logo from "../../components/Logo/Logo";

const SECTION_LIST = [
	{
		background: BackgroundImage01,
		device: DeviceImage01,
		title: "후원하기",
		comment: "좋아하는 아이돌에게\n쉽게 조공해 보세요",
	},
	{
		background: BackgroundImage02,
		device: DeviceImage02,
		title: "이달의 아티스트",
		comment: "내 아티스트에게 1등의\n영예를 선물하세요",
	},
	{
		background: BackgroundImage03,
		device: DeviceImage03,
		title: "나만의 아티스트",
		comment: "좋아하는 아티스트들의\n소식을 모아보세요",
	},
];

function LandingPage() {
	const navigate = useNavigate();

	const clearLocalStorage = () => {
		Object.keys(localStorage).forEach((key) => localStorage.removeItem(key)); // localStorage 비우기
		navigate("/list"); // list 페이지로 이동
	};

	/**
	 * @todo 스크롤 인터렉션 개발하기
	 */
	useEffect(() => {
		const handleScroll = (e) => {
			console.log(e.srcElement.scrollingElement.scrollTop);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<article className={`${style["landing-page"]} inner`}>
			<ul className={style["temp-menu"]}>
				<li>
					<Link
						to={"/mypage"}
						style={{
							display: "block",
							padding: "16px",
						}}
					>
						마이페이지
					</Link>
				</li>
			</ul>

			<article className={style["main-article"]}>
				<section className={style["main-article__head"]}>
					<p className={style["main-article__summary"]}>
						내가 좋아하는 아이돌을
						<br />
						가장 <b>쉽게 덕질</b> 하는 방법
					</p>
					<p className={style["main-article__logo"]}>
						<Logo size="xl" />
					</p>
				</section>
				<section className={style["main-article__button"]}>
					<Button size={"wide"} onClick={clearLocalStorage}>
						지금 시작하기
					</Button>
				</section>
				<article className={style["background"]}>
					<img src={BackgroundImage00} alt="레드벨벳 앨범 이미지" draggable="false" />
				</article>
			</article>

			{SECTION_LIST.map(({ background, device, title, comment }, index) => (
				<article className={style["landing-article"]} key={`landing-article-${index}`}>
					<section className={style["landing-article__head"]}>
						<p className={style["landing-article__title"]}>{title}</p>
						<p className={style["landing-article__comment"]}>{comment}</p>
					</section>
					<section className={style["landing-article__body"]}>
						<img className={style["landing-article__device-cover"]} src={DeviceImage00} alt="아이폰 테두리 이미지" draggable="false" />
						<img className={style["landing-article__device-image"]} src={device} alt={`${title} 이미지`} draggable="false" />
					</section>
					<article className={style["background"]}>
						<img src={background} alt="레드벨벳 앨범 이미지" draggable="false" />
					</article>
				</article>
			))}
		</article>
	);
}

export default LandingPage;
