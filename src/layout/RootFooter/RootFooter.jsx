import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Styled Components for the Footer

const FooterContainer = styled.footer`
  background-color: var(--color-black-800);
  color: var(--color-white-50);
  padding: 40px 20px;
  font-family: Arial, sans-serif;
  margin-top: 10%;
`;

const FooterInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterSection = styled.div`
  margin: 20px;
`;

const FooterTitle = styled.h4`
  font-size: 18px;
  margin-bottom: 20px;
`;

const CopyrightText = styled.p`
  text-align: center;
  color: var(--color-gray-300);
  margin-top: 40px;
  font-size: 14px;
`;

//

const BasicText = styled.p`
  font-size: 14px;
`;

const ICON_SIZE = 20;

const SkillIcon = styled.span``;

const SVG = styled.svg`
  height: ${ICON_SIZE}px;
`;

const FooterImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const Image = styled.img`
  height: ${ICON_SIZE}px;
`;

// Footer Component

function RootFooter() {
  return (
    <FooterContainer>
      <FooterInner>
        <FooterSection>
          <FooterTitle>We Make</FooterTitle>
          <BasicText>Fandom-k</BasicText>
          <BasicText>Copyright by codeit</BasicText>
          <BasicText>sprinter</BasicText>
        </FooterSection>

        <FooterSection>
          <FooterTitle>We Are</FooterTitle>
          <Link to={"https://sprint.codeit.kr/"} target="_blank" draggable="false" style={{ fontSize: "14px" }}>
            Codeit Sprint Front End Bootcamp
          </Link>
          <BasicText>7th Cohort</BasicText>
          <BasicText>Part2 - 2</BasicText>
        </FooterSection>

        <FooterSection>
          <FooterTitle>We Use</FooterTitle>
          <FooterImg>
            <Link to={"https://react.dev/"} target="_blank" draggable="false">
              <SkillIcon>
                <SVG viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" draggable="false">
                  <circle cx="0" cy="0" r="2" fill="#58c4dc"></circle>
                  <g stroke="#58c4dc" strokeWidth="1" fill="none">
                    <ellipse rx="10" ry="4.5"></ellipse>
                    <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
                    <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
                  </g>
                </SVG>
              </SkillIcon>
            </Link>
            <Link to={"https://reactrouter.com/en/main"} target="_blank" draggable="false">
              <SkillIcon>
                <SVG viewBox="0 0 94 61" xmlns="http://www.w3.org/2000/svg" draggable="false">
                  <path d="M72.7315 20.9357C70.0548 20.0941 68.6725 20.3778 65.8649 20.071C61.5246 19.5976 59.7954 17.9013 59.0619 13.5356C58.6514 11.0985 59.1361 7.53022 58.0881 5.32106C56.0839 1.10875 51.3943 -0.780439 46.6828 0.297843C42.7049 1.20956 39.3951 5.18518 39.2117 9.266C39.0021 13.9254 41.657 17.901 46.2156 19.273C48.3814 19.9261 50.6825 20.2548 52.9444 20.4214C57.0925 20.7238 57.4113 23.0297 58.5335 24.9277C59.2409 26.1243 59.9264 27.3034 59.9264 30.8714C59.9264 34.4394 59.2365 35.6185 58.5335 36.8151C57.4113 38.7087 56.0271 39.9491 51.879 40.2559C49.6171 40.4225 47.3116 40.7513 45.1502 41.4044C40.5916 42.7807 37.9367 46.7519 38.1463 51.4113C38.3297 55.4921 41.6395 59.4678 45.6174 60.3795C50.3289 61.4621 55.0185 59.5686 57.0227 55.3563C58.075 53.1471 58.6514 50.6443 59.0619 48.2072C59.7998 43.8414 61.5289 42.1451 65.8649 41.6717C68.6725 41.3649 71.5783 41.6717 74.2093 40.177C76.9895 38.1456 79.4734 35.0968 79.4734 30.8714C79.4734 26.6459 76.7967 22.2156 72.7315 20.9357Z" fill="#f44250"></path>
                  <path d="M28.1997 40.7739C22.7285 40.7739 18.2656 36.3027 18.2656 30.8213C18.2656 25.3399 22.7285 20.8687 28.1997 20.8687C33.6709 20.8687 38.1338 25.3399 38.1338 30.8213C38.1338 36.2983 33.6665 40.7739 28.1997 40.7739Z" fill="#ffffff"></path>
                  <path d="M9.899 61C4.43661 60.9868 -0.0130938 56.498 2.89511e-05 51.0122C0.0132099 45.5353 4.4936 41.0773 9.96914 41.0948C15.4359 41.108 19.8856 45.5968 19.8681 51.0825C19.8549 56.5551 15.3745 61.0131 9.899 61Z" fill="#ffffff"></path>
                  <path d="M83.7137 60.9998C78.2339 61.0304 73.7361 56.5901 73.7052 51.122C73.6747 45.632 78.1068 41.1258 83.5646 41.0949C89.0444 41.0643 93.5423 45.5046 93.5731 50.9727C93.6036 56.4583 89.1716 60.9689 83.7137 60.9998Z" fill="#ffffff"></path>
                </SVG>
              </SkillIcon>
            </Link>
            <Link to={"https://styled-components.com/"} target="_blank" draggable="false">
              <SkillIcon>
                <Image src={"https://styled-components.com/nav-logo.png"} draggable="false" />
              </SkillIcon>
            </Link>
          </FooterImg>
        </FooterSection>
      </FooterInner>
      <CopyrightText>&copy; Codeit7. All rights reserved.</CopyrightText>
    </FooterContainer>
  );
}

export default RootFooter;
