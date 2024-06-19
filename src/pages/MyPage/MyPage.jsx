import React from "react";
import MyFavoriteIdols from "./MyFavoriteIdols/MyFavoriteIdols";
import AddFavoriteIdols from "./AddFavoriteIdols/AddFavoriteIdols";

function MyPage() {
	return (
		<article>
			<MyFavoriteIdols />
			<AddFavoriteIdols />
		</article>
	);
}

export default MyPage;
