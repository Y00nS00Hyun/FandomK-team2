import React, { useEffect, useState } from "react";
import BlockTitle from "../../../components/BlockTitle/BlockTitle";
import Avatar from "../../../components/Avatar/Avatar";
import { getIdolList } from "../../../api/idolsApi";
import { useMemo } from "react";
import useMediaQuery from "../../../hooks/useMediaQuery";
import useAsync from "../../../hooks/useAsync";
import LodingImage from "../../../components/LodingImage/LodingImage";
import { isEmpty } from "lodash";

const PAGE_SIZES = {
  mobile: 6,
  tablet: 8,
  desktop: 16,
};

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

  const profileSize = useMemo(() => {
    if (mode === "mobile") return PROFILE_SIZES["mobile"];
    if (mode === "tablet") return PAGE_SIZES["tablet"];
    else return PAGE_SIZES["desktop"];
  }, [mode]);

  // list items
  const [items, setItems] = useState(null);

  // async controller
  const [isLoading, errorMessage, runFunction] = useAsync(getIdolList);

  // 대충 API 호출 함수
  const getIdolDataList = async (pageSize) => {
    const { list, nextCursor } = runFunction({ pageSize });
    setItems(list);
  };

  useEffect(() => {
    // 대충 API 호출 함수
    getIdolDataList(pageSize);
  }, [pageSize]);

  return (
    <article>
      <BlockTitle>관심 있는 아이돌을 추가해보세요.</BlockTitle>
      {isLoading && <LodingImage />}!
      {!isEmpty(items) &&
        items?.map(({ id, profilePicture, group, name, gender }) => (
          <div key={`idol-id-$(id)`}>
            <img
              src={profilePicture}
              alt={`${name} 프로필이미지`}
              height={profileSize}
            />
            <p>그룹명: {group}</p>
            <p>이름: {name}</p>
            <p>성별: {gender}</p>
          </div>
        ))}
    </article>
  );
}

export default AddFavoriteIdols;
