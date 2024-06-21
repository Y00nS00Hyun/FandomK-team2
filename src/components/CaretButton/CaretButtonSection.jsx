import React, { Children } from "react";
import styled from "styled-components";

const ButtonSection = styled.section`
  position: absolute;
  z-index: -1;
  top: 50%;
  right: 0;
  left: 0;
`;

function CaretButtonSection({ children, direction, size }) {
  return <ButtonSection>{children}</ButtonSection>;
}

export default CaretButtonSection;
