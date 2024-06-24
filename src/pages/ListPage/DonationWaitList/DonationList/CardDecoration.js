import styled from "styled-components";
import Button from "../../../../components/Button/Button";

const CARD_MARGIN = {
  small: "8px",
  medium: "21px",
};

const CARD_WIDTHS = {
  small: "158px",
  medium: "282px",
};

const CARD_HEIGHTS = {
  small: "316px",
  medium: "415px",
};

const IMG_HEIGHTS = {
  small: "206px",
  medium: "293px",
};

const BUTTON_WIDTHS = {
  small: "142px",
  medium: "234px",
};

const BUTTON_HEIGHTS = {
  small: "31px",
  medium: "40px",
};

// 🍋 여기서부터는 글자 🍋

const SUBTITLE_FONT_SIZE = {
  small: "12px",
  medium: "16px",
};

const TITLE_FONT_SIZE = {
  small: "14px",
  medium: "18px",
};

const DETAIL_HEIGHT = {
  small: "41px",
  medium: "47px",
};

const INFOWRAPPER_HEIGHT = {
  small: "87px",
  medium: "97px",
};

// 😸 적용해보자 😸

const Card = styled.div`
  width: ${({ size }) => CARD_WIDTHS[size] ?? CARD_WIDTHS["small"]};
  height: ${({ size }) => CARD_HEIGHTS[size] ?? CARD_HEIGHTS["small"]};
  margin-right: ${({ size }) => CARD_MARGIN[size] ?? CARD_MARGIN["small"]};
  position: relative;
  transition: transform 0.5s;

  &:hover {
    transform: scale(0.96);
    z-index: 1;
  }

  &:hover::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    background: #212121;
    transition: 0.8s;
    transform: scale(1.1);
    z-index: -1;
  }

  &:hover img {
  }
`;

const ImgButton = styled.div`
  position: relative;
  display: flex;
`;

const SkeletonImg = styled.div`
  width: ${({ size }) => CARD_WIDTHS[size] ?? CARD_WIDTHS["small"]};
  height: ${({ size }) => IMG_HEIGHTS[size] ?? IMG_HEIGHTS["small"]};
`;

const Img = styled.img`
  width: ${({ size }) => CARD_WIDTHS[size] ?? CARD_WIDTHS["small"]};
  height: ${({ size }) => IMG_HEIGHTS[size] ?? IMG_HEIGHTS["small"]};
  border-radius: 8px;
  overflow: hidden;
  object-fit: cover;
  object-position: center;
  transition: 0.5s;
`;

const BlackGradation = styled.img`
  width: ${({ size }) => CARD_WIDTHS[size] ?? CARD_WIDTHS["small"]};
  border-radius: 8px;
  position: absolute;
  bottom: 0;
`;

const Block = styled.div`
  display: block;
  bottom: 8px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const SubmitButton = styled(Button)`
  font-size: 13px;
  width: ${({ size }) => BUTTON_WIDTHS[size] ?? BUTTON_WIDTHS["small"]};
  height: ${({ size }) => BUTTON_HEIGHTS[size] ?? BUTTON_HEIGHTS["small"]};
  z-index: 1;
  transition: 0.5s;
`;

// 🍋 여기서부터는 글자 🍋
const InfoWrapper = styled.div`
  width: ${({ size }) => CARD_WIDTHS[size] ?? CARD_WIDTHS["small"]};
  height: ${({ size }) => INFOWRAPPER_HEIGHT[size] ?? INFOWRAPPER_HEIGHT["small"]};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 10px;
  margin-top: 10px;

  position: relative;
`;

const Detail = styled.div`
  height: ${({ size }) => DETAIL_HEIGHT[size] ?? DETAIL_HEIGHT["small"]};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Status = styled.div`
  height: 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const Subtitle = styled.div`
  font-size: ${({ size }) => SUBTITLE_FONT_SIZE[size] ?? SUBTITLE_FONT_SIZE["small"]};
  color: #adadad;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled.div`
  font-size: ${({ size }) => TITLE_FONT_SIZE[size] ?? TITLE_FONT_SIZE["small"]};
  color: #f7f7f8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Credit = styled.div`
  font-size: 12px;
  color: var(--color-gray-100);
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  & > span:not(:last-child) {
    color: var(--color-brand-orange);
  }
`;

const Countdown = styled.div`
  font-size: 12px;
  color: #f7f7f8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StatusInfo = styled.div`
  height: 26px;
`;

// 😸 export 해보자 😸

const style = { Card, Img, BlackGradation, SubmitButton, ImgButton, Subtitle, Title, Detail, InfoWrapper, Status, Credit, Countdown, StatusInfo, Block, SkeletonImg };

export default style;
