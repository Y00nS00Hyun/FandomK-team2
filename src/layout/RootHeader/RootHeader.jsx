import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../components/Logo/Logo";
import SkeletonAvater from "../../assets/images/avatar/avater-skeleton.svg";
import Symbol from "../../assets/images/symbol/symbol-credit-large.svg";

const Header = styled.header`
  position: fixed;
  z-index: 8;
  inset: 0;
  bottom: auto;
  padding: 0 24px;
  backdrop-filter: blur(8px);
  top: ${({ $visible }) => ($visible === true ? 0 : $visible * -1)}px;
  transition: top 1s;
`;

const Inner = styled.section`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  height: ${({ $headerHeight }) => ($headerHeight ? $headerHeight : 80)}px;
  filter: drop-shadow(0 0 2px var(--background-color-basic));
`;

const Section = styled.section`
  & a,
  & img {
    display: block;
  }
`;

function RootHeader({ headerHeight }) {
  const { pathname } = useLocation();
  const [scroll, setScroll] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleRefresh = (e) => {
    const href = `/${e.currentTarget.href.split("/").pop()}`;
    if (href === pathname) window.location.replace(href);
  };

  /**
   * @todo 스크롤 인터렉션 개발하기
   */
  useEffect(() => {
    const handleScroll = (e) => {
      const currentScroll = e.srcElement.scrollingElement.scrollTop;
      setScroll((prev) => {
        prev !== 0 && prev < currentScroll ? setVisible(false) : setVisible(true);
        return currentScroll;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scroll]);

  return (
    <Header $visible={visible || headerHeight}>
      <Inner className="inner" $headerHeight={headerHeight}>
        <Section>
          <Link to={"/"} draggable="false">
            <img src={Symbol} alt={"Credit symbol"} height={40} draggable="false" />
          </Link>
        </Section>

        <Section>
          <Link to={"/list"} draggable="false" onClick={handleRefresh}>
            <Logo size={"lg"} />
          </Link>
        </Section>

        <Section>
          <Link to={"/mypage"} draggable="false" onClick={handleRefresh}>
            <img src={SkeletonAvater} alt={"기본 아바타 이미지"} height={32} draggable="false" />
          </Link>
        </Section>
      </Inner>
    </Header>
  );
}

export default RootHeader;
