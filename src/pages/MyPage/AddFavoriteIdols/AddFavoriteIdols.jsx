import React, { useEffect, useMemo, useState } from "react";
import BlockTitle from "../../../components/BlockTitle/BlockTitle";
import useMediaQuery from "../../../hooks/useMediaQuery";
import useAsync from "../../../hooks/useAsync";
import { getIdolList } from "../../../api/idolsApi";
import { isEmpty } from "lodash";
import LodingImage from "../../../components/LodingImage/LodingImage";
import Button from "../../../components/Button/Button";

//기종별 불러올 아이돌 데이터 크기(갯수)
const PAGE_SIZES = {
  mobile: 6,
  tablet: 8,
  desktop: 16,
};

//기종별 프로필 이미지 크기
const PROFILE_SIZES = {
  mobile: 98,
  others: 128,
};

function AddFavoriteIdols() {
  const mode = useMediaQuery();

  const pageSize = useMemo(() => {
    if (mode === "mobile") return PAGE_SIZES["mobile"];
    if (mode === "tablet") return PAGE_SIZES["tablet"];
    else return PAGE_SIZES["desktop"];
  }, [mode]);

  const profilSize = useMemo(() => {
    if (mode === "mobile") return PROFILE_SIZES["mobile"];
    else return PROFILE_SIZES["others"];
  }, [mode]);

  // async controller
  const [runFunction, responseData, isLoading, errorMessage] =
    useAsync(getIdolList);

  useEffect(() => {
    runFunction({ pageSize });
  }, [pageSize]);

  const items = responseData?.list || [];

  return (
    <article>
      <section>
        <BlockTitle>관심 있는 아이돌을 추가해보세요.</BlockTitle>
      </section>
      <section>
        {isLoading && <LodingImage />}
        {!isEmpty(items) &&
          items.map(({ id, profilePicture, group, name }) => (
            <div key={`idol-id-$(id)`}>
              <img
                src={profilePicture}
                alt={`${name} 프로필 이미지`}
                height={profilSize}
              />
              <p>그룹명: {group}</p>
              <p>이름: {name}</p>
            </div>
          ))}
        {errorMessage && <p>에러발생!</p>}
      </section>
      <section>
        <Button icon={"plus"} size={"large"} round>
          추가하기
        </Button>
      </section>
    </article>
  );
}

export default AddFavoriteIdols;
