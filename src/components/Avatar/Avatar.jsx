import React from "react";
import styled from "styled-components";
import ChekIcon from "../../assets/images/icon/icon-check.svg";
import XIcon from "../../assets/images/icon/icon-X.svg";

/*
목록 페이지
all : 70*70, 60*60
투표 모달
all : 70*70, 60*60

마이 페이지
-MyFavorite
desktop : 100*100, 85.71*85.71(???)
tablet : 100*100, 86.14*86.14
mobile : 70*70, 60*60

-AddIdol
desktop, tablet : 128*128, 115*115
mobile : 98*98, 88*88
*/

/*
const AVATAR_SIZE = {
  basic: "60px",
	mobileAddIdol: "88px",
	otherMyIdol: "85px",
	otherAddIdol: "115px",
};
*/

/*목록 페이지, 투표 모달창은 디바이스 상관 없이 크기 같음
전부 basic 사용*/
const IMAGE_SZIE = {
	basic: "70px",
	mobileAddIdol: "98px",
	otherMyIdol: "100px",
	otherAddIdol: "128px",
};

const Article = styled.article`
	position: relative;
	border-radius: 9999px;
	width: ${({ $size }) => IMAGE_SZIE[$size] ?? IMAGE_SZIE["basic"]};
	height: ${({ $size }) => IMAGE_SZIE[$size] ?? IMAGE_SZIE["basic"]};
	overflow: hidden;
	border: 2px solid var(--color-brand-orange);
`;

const Cover = styled.div`
	position: absolute;
	width: 90%;
	height: 90%;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 9999px;
	z-index: 1;

	${({ $checked }) =>
		$checked &&
		`
    &:before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: var(--color-brand-pink);
      opacity: 0.5;
      z-index: 2;
      border-radius: 9999px;
    }

    &:after {
      content: url(${ChekIcon});
      position: absolute;
      top: 50%;
	    left: 50%;
	    transform: translate(-50%, -50%);
      z-index: 3;
    }
  `}
`;

const Photo = styled.img`
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 9999px;
	object-fit: cover;
	cursor: pointer;
`;

/**
 * @param {string} src - 아이돌 이미지 주소
 * @param {string} size - 아바타 크기 = [ 'basic', 'mobileAddIdol', 'otherMyIdol', 'otherAddIdol']
 * @param {boolean} checked - 선택 = checked만 적기
 *
 *
 * @example
 * <Avatar src={profilePicture} size={"basic"} alt={${아이돌 이름} 프로필 이미지} onClick={() => 아이돌 선택 함수} checked/>
 */

function Avatar({ onClick, src, size, alt, checked, ...args }) {
	return (
		<Article $size={size} onClick={onClick} {...args}>
			<Cover $checked={checked}>
				<Photo src={src} alt={alt} />
			</Cover>
		</Article>
	);
}

export default Avatar;
