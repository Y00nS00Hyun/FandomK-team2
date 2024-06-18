import React, { useEffect } from "react";
import useAsync from "../../../../hooks/useAsync";
import { getDonationList } from "../../../../api/donationsApi";
import LodingImage from "../../../../components/LodingImage/LodingImage";
import Card from "./DonationCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./CardLocation.js";
import settings from "./a.js";
import useMediaQuery from "../../../../hooks/useMediaQuery.js";

const PAGE_SIZES = {
	desktop: 8,
	tablet: 8,
	mobile: 8,
};

function DonationList() {
	const mode = useMediaQuery();
	const pageSize = PAGE_SIZES[mode];
	const { refetchFunction, data, pending, error } = useAsync(getDonationList);
	useEffect(() => {
		refetchFunction({ pageSize });
	}, [refetchFunction, pageSize]);

	const items = data?.list || [];

	return (
		<div>
			{pending && <LodingImage />}
			{error && <p>{error.message}에러발생🦄</p>}
			<div>
				<style.SliderStyle>
					<Slider {...settings}>
						{items.map((item) => (
							<div key={item.id}>
								<Card item={item} size={mode === "mobile" ? "small" : "medium"} />
							</div>
						))}
					</Slider>
				</style.SliderStyle>
			</div>
		</div>
	);
}

export default DonationList;
