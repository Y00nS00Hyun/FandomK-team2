import xButton from "../../assets/images/icon/icon-X.svg";
import styled from "styled-components";

// 닫기 버튼 너비 조절, 필요한 경우 크기 추가
const X_BUTTON_WIDTHS = {
	small: "14px",
	large: "15.5px",
};

// 닫기 버튼 높이 조절, 필요한 경우 크기 추가
const X_BUTTON_HEIGHTS = {
	small: "14px",
	large: "15.5px",
};

// 사용 방법 : 닫기 버튼을 사용할 컴포넌트에서 <Xbutton $size={"small"} /> 형식으로 size 프롭으로 원하는 크기의 값을 전달
const IMG = styled.img`
	width: ${({ size }) => X_BUTTON_WIDTHS[size] ?? X_BUTTON_WIDTHS["small"]};
	height: ${({ size }) => X_BUTTON_HEIGHTS[size] ?? X_BUTTON_HEIGHTS["small"]};
`;

function Xbutton({ size, onClick }) {
	return <IMG src={xButton} width={X_BUTTON_WIDTHS[size]} height={X_BUTTON_HEIGHTS[size]} onClick={onClick} alt="닫기 버튼" />;
}
export default Xbutton;
