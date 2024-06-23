import React, { useEffect, useRef } from "react";
import SlotCounter from "react-slot-counter";
import ProgressBar from "progressbar.js";
import style from "./CardDecoration.js";
import blackgradation from "../../../../assets/images/decoration/decoration-donation-cover.svg";
import successImg from "../../../../assets/images/donation/success.png";
import CreditImg from "../../../../assets/images/symbol/symbol-credit.svg";

function Card({ item, size, onClick, ...args }) {
  const today = new Date();
  const deadline = new Date(item !== "skeleton" && item.deadline);
  const dDay = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
  const displaysDay = dDay >= 0 ? dDay : 0;
  const progressRef = useRef(null);
  const progressBarRef = useRef(null);

  // 후원이 100% 채워진 경우, 기한이 지난 경우
  const isDonationComplete = item.receivedDonations >= item.targetDonation;
  const isPastDeadline = dDay <= 0;

  useEffect(() => {
    if (progressRef.current && !progressBarRef.current) {
      progressBarRef.current = new ProgressBar.Line(progressRef.current, {
        strokeWidth: 1,
        easing: "easeInOut",
        duration: 1400,
        color: "#F96D69",
        trailColor: "#FFFFFF",
        trailWidth: 1,
        svgStyle: { width: "100%", height: "100%" },
        from: { color: "#F96D69" },
        to: { color: "#F96D69" },
        step: (state, bar) => {
          bar.path.setAttribute("stroke", state.color);
        },
      });
    }
    if (progressBarRef.current) {
      const progress = item.receivedDonations / item.targetDonation;
      //프로그래스바 예외 처리
      if (progress >= 1) {
        progressBarRef.current.animate(1, {
          from: { color: "#F96D69" },
          to: { color: "#F96D69" },
        });
      } else {
        progressBarRef.current.animate(progress);
      }
    }

    return () => {
      if (progressBarRef.current) {
        progressBarRef.current.destroy();
        progressBarRef.current = null;
      }
    };
  }, [item.receivedDonations, item.targetDonation]);

  // 버튼 텍스트 설정
  const buttonText = isPastDeadline ? "기간 마감" : "후원하기";

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    zIndex: 1,
    visibility: isPastDeadline ? "visible" : "hidden",
  };

  const successStamp = {
    position: "absolute",
    top: "2%",
    left: "2%",
    width: "40%",
    zIndex: 2,
    visibility: isDonationComplete ? "visible" : "hidden",
  };

  return (
    <style.Card rd size={size} onClick={onClick} {...args}>
      {item === "skeleton" ? (
        <>
          <style.SkeletonImg size={size} className="skeleton"></style.SkeletonImg>
          <style.InfoWrapper size={size}>
            <style.Detail size={size} className="skeleton"></style.Detail>
            <style.StatusInfo className="skeleton"></style.StatusInfo>
          </style.InfoWrapper>
        </>
      ) : (
        <>
          <style.ImgButton onClick={(e) => e.stopPropagation()}>
            <style.Img src={item.idol.profilePicture} alt={item.title} size={size} />
            <div style={overlayStyle}></div>
            <style.BlackGradation src={blackgradation} size={size} />
            <img src={successImg} style={successStamp} alt={"목표 금액 달성 아이콘"} />
            <style.Block>
              <style.SubmitButton
                size={size}
                onClick={(e) => {
                  e.stopPropagation(); // 이벤트 버블링을 막아 이미지 클릭 시 모달창 안 띄움
                  onClick(e);
                }}
                disabled={isPastDeadline} // 버튼 비활성화
              >
                {buttonText}
              </style.SubmitButton>
            </style.Block>
          </style.ImgButton>
          <style.InfoWrapper size={size}>
            <style.Detail size={size}>
              <style.Subtitle size={size}>{item.subtitle}</style.Subtitle>
              <style.Title size={size}>{item.title}</style.Title>
            </style.Detail>
            <style.StatusInfo>
              <style.Status>
                <style.Credit>
                  <img src={CreditImg} alt="크레딧 이미지" />
                  <SlotCounter value={item.receivedDonations.toLocaleString()} useMonospaceWidth />
                  &nbsp;/&nbsp;
                  <SlotCounter value={item.targetDonation.toLocaleString()} useMonospaceWidth />
                </style.Credit>
                <style.Countdown>{displaysDay}일 남음</style.Countdown>
              </style.Status>
              <div ref={progressRef} style={{ width: "100%", height: "1px" }} />
            </style.StatusInfo>
          </style.InfoWrapper>
        </>
      )}
    </style.Card>
  );
}
export default Card;
