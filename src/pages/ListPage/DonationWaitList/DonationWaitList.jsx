import React, { useCallback, useEffect, useRef, useState } from "react";
import useAsync from "../../../hooks/useAsync";
import { getDonationList } from "../../../api/donationsApi";
import Slider from "react-slick";
import TitleSection from "../../../components/TitleSection/TitleSection";
import LodingImage from "../../../components/LodingImage/LodingImage";
import Card from "./DonationList/DonationCard.jsx";
import settings from "./DonationList/a.js";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CaretButton from "../../../components/CaretButton/CaretButton.jsx";

const PAGE_SIZES = {
	desktop: 100,
	tablet: 100,
	mobile: 100,
};

function DonationWaitList({ mode, myCreditState }) {
	const pageSize = PAGE_SIZES[mode];
	const sliderRef = useRef(null);
	const [load, setLoad] = useState(0);
	const [idols, setIdols] = useState([]);
	const [cursor, setCursor] = useState(null);
	const [disableButton, setDisableButton] = useState(true);

	const { refetchFunction, pending, error } = useAsync(getDonationList);

	const getDataList = useCallback(async (cursor) => {
		try {
			const params = { pageSize: pageSize * 2 };
			if (cursor) {
				params.pageSize = pageSize;
				params.cursor = cursor;
			}

			const data = await refetchFunction(params);
			if (data) {
				setIdols((prev) => [...prev, ...data?.list]);
				setCursor(data.nextCursor);
			}
		} finally {
			setDisableButton(false);
		}
	}, []);

	const slickNext = async () => {
		try {
			setDisableButton(true);
			if (cursor !== null) await getDataList(cursor);
		} finally {
			sliderRef.current.slickNext();
			setDisableButton(false);
		}
	};

	const slickPrev = () => {
		return sliderRef.current.slickPrev();
	};

	useEffect(() => {
		getDataList();
	}, [getDataList, load]);

	return (
		<TitleSection title={"후원을 기다리는 조공"} carousel={true} size={"normal"}>
			{pending && idols.length === 0 && <LodingImage />}
			{error && (
				<>
					<p>{error.message}에러발생🦄</p>
					<button onClick={() => setLoad((prev) => ++prev)}>RELOAD</button>
				</>
			)}
			<Slider ref={sliderRef} {...settings}>
				{idols &&
					idols?.map((item) => (
						<div key={item.id} style={{ padding: "0 10px" }}>
							<Card key={item.id} item={item} size={mode === "mobile" ? "small" : "medium"} myCreditState={myCreditState} />
						</div>
					))}
			</Slider>
			{mode === "desktop" && (
				<>
					{/* 이전 다음 버튼 */}
					<CaretButton direction="right" onClick={slickNext} disabled={disableButton} />
					<CaretButton direction="left" onClick={slickPrev} disabled={disableButton} />
				</>
			)}
		</TitleSection>
	);
}

export default DonationWaitList;

//<article style={{ width: "1200px", margin: "0 auto" }}>
