import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import LandingPage from "./pages/LandingPage/LandingPage";
import ListPage from "./pages/ListPage/ListPage";
import MyPage from "./pages/MyPage/MyPage";

function Main() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<LandingPage />} />
					<Route path="list" element={<ListPage />} />
					<Route path="mypage" element={<MyPage />} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Main;
