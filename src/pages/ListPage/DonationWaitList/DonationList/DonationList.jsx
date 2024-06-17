import React, { useEffect, useMemo, useState } from "react";
import useAsync from "../../../../hooks/useAsync";
import { getDonationList } from "../../../../api/donationsApi";
import LodingImage from "../../../../components/LodingImage/LodingImage";
import Card from "./DonationCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./CardLocation.js";
import settings from "./a.js";

const PAGE_SIZES = {
	desktop: 4,
	others: 3,
};

function DonationList({ mode }) {
	const pageSize = PAGE_SIZES[mode];
	const { refetchFunction, data, pending, error } = useAsync(getDonationList);
	useEffect(() => {
		refetchFunction({ pageSize });
	}, [refetchFunction, pageSize]);

	/**
	 * @JuhyeokC
	 * data 가 업데이트될 때 list가 담길 items
	 */
	const items = data?.list || [];

	return (
		<div>
			{pending && <LodingImage />}

			{error && <p>{error.message}에러발생🦄</p>}

			<style.SliderStyle>
				<Slider {...settings}>
					{items.map((item) => (
						<div key={item.id}>
							<Card item={item} />
						</div>
					))}
				</Slider>
			</style.SliderStyle>

			{/* <div>
				<CaretButton direction="LEFT" size="normal" />
				<CaretButton direction="RIGHT" size="normal" />
			</div> */}
		</div>
	);
}

export default DonationList;
