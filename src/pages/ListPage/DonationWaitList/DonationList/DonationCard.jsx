import React, { useEffect, useRef } from "react";
import style from "./CardDecoration.js";
import ProgressBar from "progressbar.js";
import { useMyCredit } from "../../../../context/MyCreditContext.jsx";

function Card({ item, size, openModal }) {
    const today = new Date();
    const deadline = new Date(item.deadline);
    const dDay = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    const displaysDay = dDay >= 0 ? dDay : 0;
    const progressRef = useRef(null);
    const progressBarRef = useRef(null);

    // 후원이 100% 채워진 경우, 기한이 지난 경우
    const isDonationComplete = item.receivedDonations >= item.targetDonation;
    const isPastDeadline = dDay < 0;

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
            progressBarRef.current.animate(progress);
        }

        return () => {
            if (progressBarRef.current) {
                progressBarRef.current.destroy();
                progressBarRef.current = null;
            }
        };
    }, [item.receivedDonations, item.targetDonation]);

    // 버튼 텍스트 설정
    const buttonText = isDonationComplete ? "후원 종료" : isPastDeadline ? "후원 마감" : "후원하기";

    return (
        <style.Card size={size}>
            <style.ImgButton>
                <style.Img src={item.idol.profilePicture} alt={item.title} size={size} />
                <style.BlackGradation src="donationImg/blackgradation.png" size={size} />
                <style.Block>
                    <style.SubmitButton
                        size={size}
                        onClick={() => openModal(item)} // 버튼 활성화
                        disabled={isDonationComplete || isPastDeadline} // 버튼 비활성화
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
                            <img src="donationImg/CreditImg.png" alt="크레딧 이미지" />
                            {item.targetDonation.toLocaleString()}
                        </style.Credit>
                        <style.Countdown>{displaysDay}일 남음</style.Countdown>
                    </style.Status>
                    <div ref={progressRef} style={{ width: "100%", height: "1px" }} />
                </style.StatusInfo>
            </style.InfoWrapper>
        </style.Card>
    );
}

export default Card;

//PR 올리기 버튼 왜 안생기지??? 🐰