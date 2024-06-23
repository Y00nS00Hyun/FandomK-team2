import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { isEmpty } from "lodash";
import animateFunction from "../../../func/animateFunction.js";
import TitleSection from "../../../components/TitleSection/TitleSection";
import Avatar from "../../../components/Avatar/Avatar";
import CaretButton from "../../../components/CaretButton/CaretButton.jsx";
import Button from "../../../components/Button/Button.jsx";
import Modal from "../../../components/Modal/Modal";
import EmptyIcon from "../../../assets/images/icon/icon-empty.svg";
import "../../MyPage/myPageStyle.css";

// 기종별 불러올 아이돌 데이터 크기(갯수)
const PAGE_SIZES = {
  desktop: 16,
  tablet: 8,
  mobile: 6,
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

function MyFavoriteIdols({ mode, myFavoriteIdolsState }) {
  const [myFavoriteIdols, setMyFavoriteIdols] = myFavoriteIdolsState;
  const [selectedIdolIds, setSelectedIdolIds] = useState([]);
  const carouselRef = useRef(null);

  const pageSize = PAGE_SIZES[mode];
  const profilSize = useMemo(() => {
    if (mode === "mobile") return "basic";
    else return "otherMyIdol";
  }, [mode]);

  const [visibleModal, setVisibleModal] = useState(false);
  const handleClick = () => {
    setMyFavoriteIdols((prev) => {
      const remain = myFavoriteIdols.filter((item) => !selectedIdolIds.includes(item.id));
      setSelectedIdolIds([]);
      return [...remain];
    });
    setVisibleModal(false);
  };

  const [carouselButtonDisabled, setCarouselButtonDisabled] = useState(false);
  const [carouselScrollPosition, setCarouselScrollPosition] = useState("first");
  const carouselRows = pageSize / 2 < myFavoriteIdols.length ? 2 : 1;

  const checkCarousel = ({ currentTarget }) => {
    if (currentTarget !== carouselRef.current) carouselRef.current = currentTarget;
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
    const dataLength = Math.round(myFavoriteIdols.length / 2);
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
  return (
    <TitleSection title={`내가 관심있는 아이돌 (${myFavoriteIdols.length}명)`} bottomLine>
      {isEmpty(myFavoriteIdols) ? (
        <section className="mypage-myidol__empty">
          <img src={EmptyIcon} alt={"비어 있음 아이콘"} height={160} draggable="false" />
          <p>좋아하는 아이돌을 추가해주세요.</p>
        </section>
      ) : (
        <Container>
          <Carousel ref={carouselRef} onLoad={checkCarousel} onScroll={handleScroll}>
            <CarouselInner $rows={carouselRows} $size={pageSize < myFavoriteIdols.length}>
              {myFavoriteIdols.map(({ id, profilePicture, group, name }) => (
                <CarouselItem key={`idol-id-${id}`} $pageSize={pageSize / 2}>
                  <article className="mypage-myidol__items">
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
              ))}
            </CarouselInner>
          </Carousel>
          {mode === "desktop" && (
            <>
              <CaretButton direction="left" size="large" onClick={carouselPrev} disabled={carouselScrollPosition === "first" || carouselButtonDisabled} />
              <CaretButton direction="right" size="large" onClick={carouselNext} disabled={carouselScrollPosition === "last" || carouselButtonDisabled} />
            </>
          )}
        </Container>
      )}
      <section>
        {/*좋아하는 아이돌 데이터 추가하기 구현*/}
        {/* <Button onClick={carouselFirst} disabled={carouselScrollPosition === "first" || carouselButtonDisabled}>
								FIRST
							</Button> */}
        {/* <Button onClick={carouselLast} disabled={carouselScrollPosition === "last" || carouselButtonDisabled}>
								LAST
							</Button> */}
      </section>
      {!isEmpty(myFavoriteIdols) && (
        <section className="mypage-myidol_minus">
          <Button size={"large"} round icon={"minus"} onClick={() => setVisibleModal(true)} disabled={selectedIdolIds.length === 0}>
            삭제하기
          </Button>
          <Modal show={visibleModal} title={"선택한 아이돌을 삭제하시겠습니까?"} onClose={() => setVisibleModal(false)} icon={"minus"} buttonAction={handleClick} buttonName={"삭제하기"}>
            <p style={{ fontSize: "100px", textAlign: "center" }}>🥺</p>
          </Modal>
        </section>
      )}
    </TitleSection>
  );
}

export default MyFavoriteIdols;
