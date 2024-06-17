import React, { useEffect, useMemo, useState } from "react";
import useAsync from "../../../../hooks/useAsync";
import { getDonationList } from "../../../../api/donationsApi";
import LodingImage from "../../../../components/LodingImage/LodingImage";
import CaretButton from "../../../../components/CaretButton/CaretButton";
import Card from "./DonationCard";

function DonationList({ mode }) {
	// list items
	const [items, setItems] = useState([]);

	// runFunction 삭제 가능?
	const [isLoading, errorMessage, runFunction] = useAsync(getDonationList);

	useEffect(() => {
		// 비동기 호출을 위한 래퍼 함수
		const fetchDonations = async () => {
			const result = await getDonationList({});
			setItems(result.list);
		};
		fetchDonations();
	}, []);
	return (
		<div>
			<div>
				{isLoading && <LodingImage />}

				{items?.map((item) => (
					<Card item={item} key={item.id} />
				))}
				{errorMessage && <p>에러발생!!!!!!</p>}
			</div>
			{/* <div>
				<CaretButton direction="LEFT" size="normal" />
				<CaretButton direction="RIGHT" size="normal" />
			</div> */}
		</div>
	);
}

export default DonationList;
