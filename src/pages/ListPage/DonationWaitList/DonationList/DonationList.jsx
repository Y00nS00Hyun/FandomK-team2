import React, { useEffect } from "react";
import useAsync from "../../../../hooks/useAsync";
import { getDonationList } from "../../../../api/donationsApi";
import LodingImage from "../../../../components/LodingImage/LodingImage";
import Card from "./DonationCard";
import Slider from "react-slick";
import settings from "./a.js";
import useMediaQuery from "../../../../hooks/useMediaQuery.js";
import "./CardLocation.css";

const PAGE_SIZES = {
	desktop: 100,
	tablet: 100,
	mobile: 100,
};

function DonationList() {
	const mode = useMediaQuery();
	const pageSize = PAGE_SIZES[mode];
	const { refetchFunction, data, pending, error } = useAsync(getDonationList);
	useEffect(() => {
		refetchFunction({ pageSize });
	}, [refetchFunction, pageSize]);

	const items = data?.list || [];

	// 아이템 인기순으로 정렬하기 👽
	const sortedItems = items.sort((a, b) => b.receivedDonations - a.receivedDonations);

	return (
		<>
			{pending && <LodingImage />}
			{error && <p> </p>}
			<div>
				<Slider {...settings}>
					{sortedItems.map((item) => (
						<div key={item.id} style={{ padding: "0 10px" }}>
							<Card item={item} size={mode === "mobile" ? "small" : "medium"} />
						</div>
					))}
				</Slider>
			</div>
		</>
	);
}

export default DonationList;

//{error && <p>{error.message}에러발생🦄</p>}
