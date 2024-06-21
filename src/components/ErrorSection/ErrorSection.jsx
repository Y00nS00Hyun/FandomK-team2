import React from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import ErrorIcon from "../../assets/images/icon/icon-error.svg";

const Article = styled.section`
  position: relative;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: 0 auto;
  padding: 40px 0;
  max-width: 1200px;
  min-height: 160px;
`;

const Message = styled.p`
  text-align: center;
  line-height: 1.6;
`;

/**
 * @name ErrorSection
 *
 * @param {Object} error 오류 객세
 * @param {function} onReload 리로드 함수
 */
function ErrorSection({ error, onReload }) {
  return (
    <Article>
      <img src={ErrorIcon} alt={"오류 아이콘"} height={160} draggable="false" />
      <Message>
        {error?.message}
        <br />
        잠시 후 다시 시도해 주세요
      </Message>
      <Button icon={"repost"} size={"large"} round onClick={onReload}>
        다시 시도
      </Button>
    </Article>
  );
}

export default ErrorSection;
