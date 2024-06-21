import React, { useEffect, useRef, useState } from "react";
import useAsync from "../../../hooks/useAsync";
import { getDonationList } from "../../../api/donationsApi";
import Slider from "react-slick";
import TitleSection from "../../../components/TitleSection/TitleSection";
import Button from "../../../components/Button/Button.jsx";
import Card from "./DonationList/DonationCard.jsx";
import CaretButton from "../../../components/CaretButton/CaretButton.jsx";
import LodingImage from "../../../components/LodingImage/LodingImage";
import Modal from "../../../components/Modal/Modal";
import DonationModal from "../../../components/Modal/Fandom-k_Modal/modal.js/DonationModal";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMyCredit } from "../../../context/MyCreditContext.jsx";

const PAGE_SIZES = 999;

function DonationWaitList({ mode }) {
	const [myCredit, setMyCredit] = useMyCredit();
	const sliderRef = useRef(null);
	const [reload, setReload] = useState(0);
	const [idols, setIdols] = useState([]);
	const [cursor, setCursor] = useState(null);
	const [disableButton, setDisableButton] = useState(true);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	const [pending, error, execute] = useAsync(getDonationList);

	const getData = async (cursor) => {
		const params = { pageSize: PAGE_SIZES * 2 };
		if (cursor) params.cursor = cursor;

		const result = await execute(params);
		if (!result) return;
		const { list, nextCursor } = result;

		// 종료된 카드들은 맨 뒤로 이동
		const sortedIdols = [...list].sort((a, b) => {
			const aIsEnded = a.receivedDonations >= a.targetDonation || new Date(a.deadline) < new Date();
			const bIsEnded = b.receivedDonations >= b.targetDonation || new Date(b.deadline) < new Date();
			if (aIsEnded && !bIsEnded) return 1;
			if (!aIsEnded && bIsEnded) return -1;
			return b.receivedDonations - a.receivedDonations;
		});

		setIdols((prev) => (cursor ? [...prev, ...sortedIdols] : sortedIdols));
		setCursor(nextCursor);
		setDisableButton(false);
	};

	const moreIdols = async (cursor) => {
		if (cursor) await getData(cursor);
	};

	const handleReload = () => {
		setIdols([]);
		setReload((prev) => ++prev);
	};

	// 슬라이드 처음으로
	const slickFirst = () => sliderRef.current.slickGoTo(0);
	const slickPrev = () => sliderRef.current.slickPrev();
	const slickNext = async () => sliderRef.current.slickNext();

	const openModal = (item) => {
		setSelectedItem(item);
		setModalOpen(true);
	};

	const closeModal = () => {
		setSelectedItem(null);
		setModalOpen(false);
	};

	useEffect(() => {
		getData();
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
			setDisableButton(true);
			if (newIndex > idols.length - 3) moreIdols(cursor);
			setCurrentSlide(newIndex);
		},
		afterChange: (index) => {
			setDisableButton(false);
		},
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					arrows: false,
					draggable: true,
					slidesToScroll: 1,
					dots: true,
					centerMode: true,
					infinite: false,
				},
			},
		],
	};

	return (
		<>
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
										<Card item={item} size={mode === "mobile" ? "small" : "medium"} openModal={openModal} />
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
			{modalOpen && <DonationModal onClose={closeModal} selectedItem={selectedItem} />}
		</>
	);
}

export default DonationWaitList;
