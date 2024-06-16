import React, { useEffect, useMemo, useState } from "react";
import useAsync from "../../../../hooks/useAsync";
import { getDonationList } from "../../../../api/donationsApi";
import LodingImage from "../../../../components/LodingImage/LodingImage";
import CaretButton from "../../../../components/CaretButton/CaretButton";
import Card from "./DonationCard";

const getPageSize = () => {
	const width = window.innerWidth;
	if (width < 768) {
		// Mobile viewport
		return 3;
	} else if (width < 1280) {
		// Tablet viewport
		return 3;
	} else {
		// Desktop viewport
		return 4;
	}
};

/**
 * TODO: cors 에러 해결 필요
 * 1. fetchDonation 주석 풀기
 * 2. useAsync fetchFunction 주석 풀기
 * 3. window.addEventListener 주석 풀기
 * */
function DonationList({ mode }) {
	const pageSize = useMemo(() => getPageSize(), [mode]);

	// list items
	const [items, setItems] = useState(null);

	// async controller
	// responseData가 백엔드에서 받아온 데이터다
	const [refetchFunction, responseData, isLoading, errorMessage] = useAsync(getDonationList);
	// 대충 API 호출 함수
	const getDonation = async (pageSize) => {
		await refetchFunction({ pageSize });
		// TODO: 주석 풀고, 바꾸기
		// setItems(responseData);
		setItems([
			{
				id: 342,
				title: "예지 짱",
				subtitle: "강남구 광고",
				idolId: 720,
				targetDonation: 1000000,
				receivedDonations: 0,
				createdAt: "2024-06-15T05:37:49.436Z",
				deadline: "2024-06-20T23:59:59.000Z",
				status: true,
				teamId: 19,
			},
		]);
	};

	useEffect(() => {
		// 비동기 호출을 위한 래퍼 함수
		const fetchDonations = async () => {
			await getDonation(getPageSize());
		};

		// TODO: 주석 풀기
		// window.addEventListener("resize", fetchDonations);
		fetchDonations();

		return () => {
			// TODO: 주석 풀기
			// window.removeEventListener("resize", fetchDonations);
		};
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
			<div>
				<CaretButton direction="LEFT" size="normal" />
				<CaretButton direction="RIGHT" size="normal" />
			</div>
		</div>
	);
}

export default DonationList;
