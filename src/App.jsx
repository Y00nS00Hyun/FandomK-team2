import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { MyCreditProvider } from "./context/MyCreditContext";
import RootHeader from "./layout/RootHeader/RootHeader";
import DecotationImage from "./assets/images/decoration/decoration-background-top-design.svg";

const HEADER_HEIGHT = 80;

const Main = styled.main`
  padding-top: ${HEADER_HEIGHT}px !important;
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
    </MyCreditProvider>
  );
}

export default App;
