import React from "react";
import styled from "styled-components";

const DEFAULT_MAX_WIDTH = 1200;

const Article = styled.article`
	position: relative;
	margin: 0 auto;
	padding: 40px 0;
	min-height: 160px;

	${({ $bottomLine }) =>
		$bottomLine &&
		`
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      display: block;
      width: ${DEFAULT_MAX_WIDTH}px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
  `}
`;

const Head = styled.section`
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	align-items: center;
	gap: 16px;
	margin: 0 auto;
	max-width: ${DEFAULT_MAX_WIDTH}px;
	padding-bottom: 32px;
`;

const Body = styled.section`
	margin: 0 auto;
	max-width: ${DEFAULT_MAX_WIDTH}px;
`;

const Content = styled.article`
	position: relative;
`;

const Title = styled.p`
	flex: 1;
	font-size: 24px;
	font-weight: 700;
`;

const Buttons = styled.section``;

/**
 *
 * @param {Object} title 영역 제목
 * @param {Object} action 영역 제목
 * @returns
 */
function TitleSection({ children, title, action, carousel, bottomLine }) {
	return (
		<Article $bottomLine={bottomLine}>
			<Head>
				<Title>{title}</Title>
				{action && <Buttons>{action}</Buttons>}
			</Head>
			<Body $carousel={carousel}>
				<Content>{children}</Content>
			</Body>
		</Article>
	);
}

export default TitleSection;
