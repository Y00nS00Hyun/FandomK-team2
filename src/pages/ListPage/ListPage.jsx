import React from "react";
import { Helmet } from "react-helmet-async";
import MyCredit from "./MyCredit/MyCredit";
import DonationWaitList from "./DonationWaitList/DonationWaitList";
import ChartOfMonth from "./ChartOfMonth/ChartOfMonth";
import useMediaQuery from "../../hooks/useMediaQuery";

function ListPage() {
  const mode = useMediaQuery();

  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>FANDOM-K : 메인</title>
        <meta name="description" content="좋아하는 아이돌에게 쉽게 조공해 보세요" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:url" content="" />
        <meta property="og:site_name" content="FANDOM-K 메인페이지" />
        <meta property="og:title" content="FANDOM-K : 메인" />
        <meta property="og:description" content="좋아하는 아이돌에게 쉽게 조공해 보세요" />
        <meta property="og:image" content="/assets/images/og/og-image-main.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>
      <article>
        <MyCredit mode={mode} />
        <DonationWaitList mode={mode} />
        <ChartOfMonth mode={mode} />
      </article>
    </>
  );
}

export default ListPage;
