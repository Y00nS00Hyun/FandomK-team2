import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import useMediaQuery from "../../hooks/useMediaQuery";
import MyFavoriteIdols from "./MyFavoriteIdols/MyFavoriteIdols";
import AddFavoriteIdols from "./AddFavoriteIdols/AddFavoriteIdols";

const MY_FAVORITE_NAME = "myFavoriteList";

function MyPage() {
	const mode = useMediaQuery();

	const [myFavoriteIdols, setMyFavoriteIdols] = useState(() => {
		if (isEmpty(localStorage?.getItem(MY_FAVORITE_NAME))) {
			return [];
		} else {
			return JSON.parse(localStorage.getItem(MY_FAVORITE_NAME));
		}
	});

	useEffect(() => {
		localStorage.setItem(MY_FAVORITE_NAME, JSON.stringify(myFavoriteIdols));
	}, [myFavoriteIdols]);

	return (
		<article>
			<MyFavoriteIdols mode={mode} myFavoriteIdolsState={[myFavoriteIdols, setMyFavoriteIdols]} />
			<AddFavoriteIdols mode={mode} myFavoriteIdolsState={[myFavoriteIdols, setMyFavoriteIdols]} />
		</article>
	);
}

export default MyPage;
