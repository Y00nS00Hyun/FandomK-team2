import styled from 'styled-components';
import Button from "../../../../components/Button/Button";


const CARD_WIDTHS = {
	small: "158px",
	medium: "282px",
};

const CARD_HEIGHTS = {
	small: "303px",
	medium: "402px",
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
}

const TITLE_FONT_SIZE = {
	small: "14px",
	medium: "18px",
}

const DETAIL_HEIGHT = {
	small: "41px",
	medium: "47px",
}

const INFOWRAPPER_HEIGHT = {
	small: "87px",
	medium: "97px",
}


// 😸 적용해보자 😸


const Card = styled.div`
	width: ${({ size }) => CARD_WIDTHS[size] ?? CARD_WIDTHS['small']};
  	height: ${({ size }) => CARD_HEIGHTS[size] ?? CARD_HEIGHTS['small']};
`;

const ImgButton = styled.div`
	position: relative;
	display: flex;
;`

const Img = styled.img`
	width: ${({ size }) => CARD_WIDTHS[size] ?? CARD_WIDTHS['small']};
	height: ${({ size }) => IMG_HEIGHTS[size] ?? IMG_HEIGHTS['small']};
	border-radius: 8px;
	overflow: hidden;
	object-fit: cover;
	object-position: center;
;`

const Block = styled.div`
    display: block;
	bottom: 8px;
	position: absolute;
	left: 50%;
    transform: translateX(-50%);
`;

const SubmitButton = styled(Button)`
	font-size: 13px;
	width: ${({ size }) => BUTTON_WIDTHS[size] ?? BUTTON_WIDTHS['small']};
  	height: ${({ size }) => BUTTON_HEIGHTS[size] ?? BUTTON_HEIGHTS['small']};
`;


// 🍋 여기서부터는 글자 🍋
const InfoWrapper = styled.div`
	width: ${({ size }) => CARD_WIDTHS[size] ?? CARD_WIDTHS['small']};
	height: ${({ size }) => INFOWRAPPER_HEIGHT[size] ?? INFOWRAPPER_HEIGHT['small']};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-top: 10px;
	margin-top: 10px;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
;`
// ellipsis 왜 안될까 -> 애니메이션이나 적용해볼까??


const Detail = styled.div`
	height: ${({ size }) => DETAIL_HEIGHT[size] ?? DETAIL_HEIGHT['small']};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
;`

const Status = styled.div`
	height: 26px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
;`

const Subtitle = styled.div`
	font-size: ${({ size }) => SUBTITLE_FONT_SIZE[size] ?? SUBTITLE_FONT_SIZE['small']};
	color: #adadad;
;`

const Title = styled.div`
	font-size: ${({ size }) => TITLE_FONT_SIZE[size] ?? TITLE_FONT_SIZE['small']};
	color: #F7F7F8;
;`

const Credit = styled.div`
	font-size: 12px;
	color: #F96D69;
	display: flex;
	align-items: center;
;`

const Countdown = styled.div`
	font-size: 12px;
	color: #F7F7F8;
;`


const StatusInfo = styled.div`
	height: 26px;
;`

// 😸 export 해보자 😸


const style = { Card, Img, SubmitButton, ImgButton, Subtitle, Title, Detail, InfoWrapper, Status, Credit, Countdown, StatusInfo, Block };

export default style;