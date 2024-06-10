import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useAsync from '../../../../hooks/useAsync';
import { getDonationList } from '../../../../api/donationsApi';
import LodingImage from '../../../../components/LodingImage/LodingImage';
import CaretButton from '../../../../components/CaretButton/CaretButton';

const PAGE_SIZES = {
	desktop: 4,
	other: 3,
};

function DonationList({ mode }) {
	const pageSize = useMemo(() => {
		if (mode === 'desktop') return PAGE_SIZES['desktop'];
		else return PAGE_SIZES['other'];
	}, [mode]);

	// list items
	const [items, setItems] = useState(null);

	// async controller
	const [isLoading, errorMessage, runFunction] = useAsync(getDonationList);

	// 대충 API 호출 함수
	const getDonation = async (pageSize) => {
		const result = runFunction({ pageSize });
		setItems(result);
	};

	useEffect(() => {
		// 대충 API 호출 함수
		getDonation(pageSize);
	}, [pageSize]);

	return (
		<article>
			<section>
				{isLoading && <LodingImage />}

				{!isEmpty(items) &&
					items?.map((item) => {
						<Card key={`donation-list-${item}`} />;
					})}

				{errorMessage && <p>에러발생!</p>}
			</section>
			<section>
				<CaretButton direction='LEFT' size='normal'></CaretButton>
				<CaretButton direction='RIGHT' size='normal'></CaretButton>
			</section>
		</article>
	);
}

export default DonationList;
