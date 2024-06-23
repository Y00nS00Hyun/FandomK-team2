import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { MyCreditProvider } from "./context/MyCreditContext";
import RootHeader from "./layout/RootHeader/RootHeader";
import RootFooter from "./layout/RootFooter/RootFooter";
import DecotationImage from "./assets/images/decoration/decoration-background-top-design.svg";

const HEADER_HEIGHT = 80;
const FOOTER_HEIGHT = 120;

const Main = styled.main`
  padding-top: ${HEADER_HEIGHT}px !important;
  min-height: calc(100% - ${FOOTER_HEIGHT}px);
  background-image: url(${DecotationImage});
  background-repeat: no-repeat;
  background-position: left top;
  background-size: auto 480px;
  background-attachment: fixed;
`;

function App() {
  const { pathname } = useLocation();

  return (
    <MyCreditProvider>
      {pathname !== "/" && <RootHeader headerHeight={HEADER_HEIGHT} />}
      <Main id="rootContainer">
        <Outlet />
      </Main>
      {pathname !== "/" && <RootFooter footerHeight={FOOTER_HEIGHT} />}
    </MyCreditProvider>
  );
}

export default App;
