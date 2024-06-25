import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

// 애니메이션 키프레임 정의
const animMoema1 = keyframes`
  60% {
    transform: scale3d(0.8, 0.8, 1);
  }
  85% {
    transform: scale3d(1.1, 1.1, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
`;

const animMoema2 = keyframes`
  to {
    opacity: 0;
    transform: scale3d(1, 1, 1);
  }
`;

// Button 스타일 정의
export const MoemaButton = styled(Link)`
  padding: 12px;
  border-radius: 50px;
  position: relative;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    transition: background-color 0.1s 0.3s, color 0.1s 0.3s;

    animation: ${animMoema1} 0.3s forwards;
  }

  &::before {
    content: "";
    position: absolute;
    top: -20px;
    left: -20px;
    bottom: -20px;
    right: -20px;
    background: inherit;
    border-radius: 50px;
    z-index: -1;
    opacity: 0.4;
    transform: scale3d(0.8, 0.5, 1);
  }

  &:hover::before {
    animation: ${animMoema2} 0.3s 0.3s forwards;
  }

  &.button--inverted {
    background: #eceff1;
    color: #37474f;

    &:hover {
      color: #eceff1;
      background-color: #7986cb;
    }
  }
`;
