import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { isEmpty } from "lodash";
import useAsync from "../../../hooks/useAsync";
import { getIdolList } from "../../../api/idolsApi";
import animateFunction from "../../../func/animateFunction.js";
import TitleSection from "../../../components/TitleSection/TitleSection.jsx";
import ErrorSection from "../../../components/ErrorSection/ErrorSection.jsx";
import Avatar from "../../../components/Avatar/Avatar";
import Button from "../../../components/Button/Button";
import CaretButton from "../../../components/CaretButton/CaretButton.jsx";
import "../../MyPage/myPageStyle.css";

//기종별 불러올 아이돌 데이터 크기(갯수)
const PAGE_SIZES = {
  mobile: 6,
  tablet: 8,
  desktop: 16,
};

const Container = styled.article`
  position: relative;
`;

const Carousel = styled.article`
  position: relative;
  overflow-x: auto;
  width: 100%;
  height: auto;
`;

const CarouselInner = styled.section`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  ${({ $size }) => {
    if ($size) {
      return `
        flex-direction: column;
        align-items: flex-start;
      `;
    } else {
      return `
        flex-direction: row;
        align-items: center;
      `;
    }
  }}

  width: 100%;
  ${({ $rows }) => {
    switch ($rows) {
      case 2:
        return `
        height: 400px;
      `;
      default:
        return `
          height: 200px;
      `;
    }
  }}
`;

const CarouselItem = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  ${({ $pageSize }) => $pageSize && `width: calc(100% / ${$pageSize})`};
  height: 50%;
`;

function AddFavoriteIdols({ mode, myFavoriteIdolsState }) {
  const pageSize = PAGE_SIZES[mode];
  const profilSize = useMemo(() => {
    if (mode === "mobile") return "mobileAddIdol";
    else return "otherAddIdol";
  }, [mode]);
  const [myFavoriteIdols, setMyFavoriteIdols] = myFavoriteIdolsState;
  const [reload, setReload] = useState(0);
  const [idols, setIdols] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [selectedIdolIds, setSelectedIdolIds] = useState([]);

  const carouselRef = useRef(null);
  const [carouselButtonDisabled, setCarouselButtonDisabled] = useState(false);
  const [carouselScrollPosition, setCarouselScrollPosition] = useState("first");
  const carouselRows = pageSize / 2 < idols.length ? 2 : 1;
  const checkCarousel = ({ currentTarget }) => {
    if (currentTarget !== carouselRef.current) carouselRef.current = currentTarget;
  };

  /**
   * @JuhyeokC
   * useAsync 커스텀훅 사용
   */
  const [pending, error, execute] = useAsync(getIdolList);

  const getData = async ({ pageSize, cursor }) => {
    const params = { pageSize: 999 };
    if (cursor) {
      params.pageSize = pageSize;
      params.cursor = cursor;
    }

    const result = await execute(params);
    if (!result) return;
    const { list, nextCursor } = result;

    setIdols((prev) => {
      if (cursor) {
        return [...prev, ...list];
      } else {
        return list;
      }
    });
    setCursor(nextCursor);
  };

  const getMoreData = async () => {
    if (cursor) await getData({ pageSize, cursor });
  };

  const handleReload = () => {
    setIdols([]);
    setReload((prev) => ++prev);
  };

  // 슬라이드 처음으로
  const carouselFirst = () => {
    setCarouselButtonDisabled(true);
    const carousel = carouselRef.current;
    animateFunction(carousel, "scrollLeft", 0, 1000, () => setCarouselButtonDisabled(false));
  };

  // 슬라이드 마지막
  const carouselLast = () => {
    setCarouselButtonDisabled(true);
    const carousel = carouselRef.current;
    const carouselItemWidth = carousel.children[0].children[0].clientWidth;
    const dataLength = Math.round(idols.length / 2);
    animateFunction(carousel, "scrollLeft", carouselItemWidth * dataLength, 1000, () => setCarouselButtonDisabled(false));
  };

  // 슬라이드 이전으로
  const carouselPrev = () => {
    setCarouselButtonDisabled(true);
    const carousel = carouselRef.current;
    const to = carousel.scrollLeft - carousel.clientWidth;
    animateFunction(carousel, "scrollLeft", to, 1000, () => setCarouselButtonDisabled(false));
  };

  // 슬라이드 다음으로
  const carouselNext = () => {
    setCarouselButtonDisabled(true);
    const carousel = carouselRef.current;
    const to = carousel.scrollLeft + carousel.clientWidth;
    animateFunction(carousel, "scrollLeft", to, 1000, () => setCarouselButtonDisabled(false));
    getMoreData();
  };

  const handleScroll = ({ currentTarget }) => {
    const carousel = currentTarget;
    const carouselInner = carousel.children[0];
    setCarouselScrollPosition(() => {
      if (carousel.scrollLeft === 0) {
        return "first";
      } else if (carousel.scrollLeft >= carouselInner.scrollWidth - carousel.clientWidth) {
        return "last";
      } else {
        return false;
      }
    });
  };

  /**
   * @JuhyeokC
   * 렌더링 된 후 fetch 함수 실행
   */
  useEffect(() => {
    getData({ pageSize });
  }, [reload]);

  return (
    <>
      <TitleSection title={"관심 있는 아이돌을 추가해보세요."} carousel={true}>
        {error ? (
          <ErrorSection error={error} onReload={handleReload}></ErrorSection>
        ) : (
          <>
            <Container>
              <Carousel ref={carouselRef} onLoad={checkCarousel} onScroll={handleScroll}>
                <CarouselInner $rows={isEmpty(idols) ? 2 : carouselRows} $size={pageSize < idols.length}>
                  {!pending && isEmpty(idols) ? (
                    <p>등록된 아이돌이 없습니다...</p>
                  ) : (
                    idols.map(({ id, profilePicture, group, name }) => {
                      if (myFavoriteIdols.some((idol) => idol.id === id)) return false;
                      return (
                        <CarouselItem key={`idol-id-${id}`} $pageSize={pageSize / 2}>
                          <article className="mypage-addidol__items">
                            <Avatar
                              src={profilePicture}
                              size={profilSize}
                              alt={`${name} 프로필 이미지`}
                              checked={selectedIdolIds.includes(id)}
                              onClick={() => {
                                setSelectedIdolIds((prev) => {
                                  const hasId = prev.includes(id);
                                  if (hasId) {
                                    return prev.filter((item) => item !== id);
                                  }
                                  return [...new Set([...prev, id])];
                                });
                              }}
                            />
                            <p className="mypage__items-name">{name}</p>
                            <p className="mypage__items-group">{group}</p>
                          </article>
                        </CarouselItem>
                      );
                    })
                  )}
                  {pending && idols.length === 0 && (
                    <>
                      {Array.from({ length: pageSize }, (v, i) => i).map((_, i) => {
                        return (
                          <CarouselItem key={`idol-id-${i}`} $pageSize={pageSize / 2}>
                            <article className="mypage-addidol__items">
                              <Avatar src={""} size={profilSize} alt={`프로필 이미지`} className="skeleton" />
                              <p className="mypage__items-name skeleton" style={{ minWidth: "40px" }}>
                                &nbsp;
                              </p>
                              <p className="mypage__items-group skeleton" style={{ minWidth: "64px" }}>
                                &nbsp;
                              </p>
                            </article>
                          </CarouselItem>
                        );
                      })}
                    </>
                  )}
                </CarouselInner>
              </Carousel>
              {mode !== "mobile" && (
                <>
                  <CaretButton direction="left" size="large" onClick={carouselPrev} disabled={carouselScrollPosition === "first" || carouselButtonDisabled} />
                  <CaretButton direction="right" size="large" onClick={carouselNext} disabled={carouselScrollPosition === "last" || carouselButtonDisabled} />
                </>
              )}
            </Container>

            <section className="mypage-addidol_add">
              {/* <Button onClick={carouselFirst} disabled={carouselScrollPosition === "first" || carouselButtonDisabled}>
								FIRST
							</Button> */}
              <Button
                icon={"plus"}
                size={"large"}
                round
                onClick={() => {
                  setMyFavoriteIdols((prev) => {
                    const selected = idols.filter((item) => selectedIdolIds.includes(item.id) && prev.every((p) => p.id !== item.id));
                    setSelectedIdolIds([]);
                    return [...prev, ...selected];
                  });
                }}
                disabled={selectedIdolIds.length === 0}
              >
                추가하기
              </Button>
              {/* <Button onClick={carouselLast} disabled={carouselScrollPosition === "last" || carouselButtonDisabled}>
								LAST
							</Button> */}
            </section>
          </>
        )}
      </TitleSection>
    </>
  );
}

export default AddFavoriteIdols;
