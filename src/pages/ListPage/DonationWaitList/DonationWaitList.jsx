import React, { useEffect, useRef, useState } from "react";
import useAsync from "../../../hooks/useAsync";
import { getDonationList } from "../../../api/donationsApi";
import Slider from "react-slick";
import TitleSection from "../../../components/TitleSection/TitleSection";
import LodingImage from "../../../components/LodingImage/LodingImage";
import Button from "../../../components/Button/Button.jsx";
import Card from "./DonationList/DonationCard.jsx";
import CaretButton from "../../../components/CaretButton/CaretButton.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PAGE_SIZES = 999;

function DonationWaitList({ mode, myCreditState }) {
	const sliderRef = useRef(null);
	const [reload, setReload] = useState(0);
	const [idols, setIdols] = useState([]);
	const [cursor, setCursor] = useState(null);
	const [disableButton, setDisableButton] = useState(true);
	const [currentSlide, setCurrentSlide] = useState(0); // 👽 (1) 슬라이드가 변경될 때 마다 현재 인덱스 업데이트

	const [pending, error, execute] = useAsync(getDonationList);

	const getData = async (cursor) => {
		const params = { pageSize: PAGE_SIZES * 2 }; // 초기 로드 될 때 본래사이즈 보다 2배 사이즈로 호출
		if (cursor) {
			params.pageSize = PAGE_SIZES; // 커서가 있을 때 본래 사이즈 만큼 추가 로드
			params.cursor = cursor; // 커서가 있을 때 커서 추가 (더보기)
		}

		const result = await execute(params); // 데이터 호출
		if (!result) return; // 호출 실패 시 함수 종료
		const { list, nextCursor } = result; // 응답받은 API 데이터 구조분해 (팬덤케이 스웨거 API 참조)

		// 👽 receivedDonations 많은 순으로 정렬
		const sortedIdols = [...list.sort((a, b) => b.receivedDonations - a.receivedDonations)];

		setIdols((prev) => {
			// 데이터 담기 위해 이전 값 참조
			if (cursor) {
				// 더보기 실행 시 커서가 있을 것이므로 커서가 참일 때
				return [...prev, ...sortedIdols]; // 이전 데이터에 새로운 데이터 추가
			} else {
				// 커서가 없을 때 (최초 실행 시 혹은 성별버튼 클릭 시)
				return sortedIdols; // 새로운 데이터만 추가
			}
		});
		setCursor(nextCursor); // 서버요청에 사용될 커서 상태
		setDisableButton(false); // prev, next 버튼 활성화
	};

	// 슬라이드 처음으로
	const slickFirst = () => sliderRef.current.slickGoTo(0);

	// 슬라이드 이전으로
	const slickPrev = () => sliderRef.current.slickPrev();

	// 슬라이드 다음으로
	const slickNext = async () => sliderRef.current.slickNext();

	const handleReload = () => {
		setCurrentSlide(0);
		setReload((prev) => ++prev);
	};

	useEffect(() => {
		getData({ PAGE_SIZES });
	}, [reload]);

	const settings = {
		rows: 1,
		dots: false,
		arrows: false,
		speed: 500,
		slidesToScroll: 2,
		centerPadding: "0px",
		infinite: false,
		variableWidth: true,
		beforeChange: (oldIndex, newIndex) => {
			setDisableButton(true); // prev, next 버튼 비활성화
			setDisableButton(true);
			//오류 떠서 일단 주석 해놓음
			//if (newIndex > idols.length - 3) moreIdols();
			setCurrentSlide(newIndex);
		}, // 💀 (2) 슬라이드 변경 시 currentSlide 상태 업데이트
		afterChange: (index) => {
			setDisableButton(false); // prev, next 버튼 활성화
		},

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
		<TitleSection
			title={"후원을 기다리는 조공"}
			carousel={true}
			size={"normal"}
			action={
				<Button size={"small"} onClick={slickFirst} disabled={currentSlide === 0}>
					처음으로
				</Button>
			}
		>
			{error ? (
				<>
					<p> </p>
					<Button size={"wide"} onClick={handleReload}>
						RELOAD
					</Button>
				</>
			) : (
				<>
					{pending && <LodingImage style={{ position: "absolute" }} />}
					<Slider ref={sliderRef} {...settings}>
						{idols.length === 0 ? (
							<p>진행중인 후원이 없습니다.</p>
						) : (
							idols.map((item) => (
								<div key={item.id} style={{ padding: "0 10px" }}>
									<Card item={item} size={mode === "mobile" ? "small" : "medium"} myCreditState={myCreditState} />
								</div>
							))
						)}
					</Slider>
					{mode === "desktop" && (
						<>
							{currentSlide !== 0 && <CaretButton direction="left" onClick={slickPrev} disabled={disableButton} />}
							{currentSlide < idols.length - 3 && <CaretButton direction="right" onClick={slickNext} disabled={disableButton} />}
						</>
					)}
				</>
			)}
		</TitleSection>
	);
}

export default DonationWaitList;
