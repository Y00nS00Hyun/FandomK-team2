import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import useMediaQuery from "../../hooks/useMediaQuery";
import MyFavoriteIdols from "./MyFavoriteIdols/MyFavoriteIdols";
import AddFavoriteIdols from "./AddFavoriteIdols/AddFavoriteIdols";
import MyCredit from "../ListPage/MyCredit/MyCredit";
import { Helmet } from "react-helmet-async";

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
    <>
      <Helmet prioritizeSeoTags>
        <title>FANDOM-K : 마이페이지</title>
        <meta name="description" content="좋아하는 아티스트들의 소식을 모아보세요" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:url" content="" />
        <meta property="og:site_name" content="FANDOM-K 마이페이지" />
        <meta property="og:title" content="FANDOM-K : 마이페이지" />
        <meta property="og:description" content="좋아하는 아티스트들의 소식을 모아보세요" />
        <meta property="og:image" content="/assets/images/og/og-image-mypage.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>
      <article>
        <MyCredit mode={mode} />
        <MyFavoriteIdols mode={mode} myFavoriteIdolsState={[myFavoriteIdols, setMyFavoriteIdols]} />
        <AddFavoriteIdols mode={mode} myFavoriteIdolsState={[myFavoriteIdols, setMyFavoriteIdols]} />
      </article>
    </>
  );
}

export default MyPage;
