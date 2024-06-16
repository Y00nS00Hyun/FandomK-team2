import React, { useEffect, useRef } from "react";
import style from "./CardDecoration.js";
import ProgressBar from 'progressbar.js';


function Card({ item }) {
    const today = new Date();
    const deadline = new Date(item.deadline);
    const dDay = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    const displaysDay = dDay >= 0 ? dDay : 0; //dDay가 음수일 때 제외
    const progressRef = useRef(null);

    useEffect(() => {
        if (progressRef.current) {
            const progressBar = new ProgressBar.Line(progressRef.current, {
                strokeWidth: 1,
                easing: 'easeInOut',
                duration: 1400,
                color: '#F96D69',
                trailColor: '#FFFFFF',
                trailWidth: 1,
                svgStyle: { width: '100%', height: '100%' },
                from: { color: '#F96D69' },
                to: { color: '#F96D69' },
                step: (state, bar) => {
                    bar.path.setAttribute('stroke', state.color);
                }
            });
            const progress = (item.receivedDonations / item.targetDonation);
            progressBar.animate(progress); // Number from 0.0 to 1.0
        }
    }, [item.receivedDonations, item.targetDonation]);

    return (
        <style.Card>
            <style.ImgButton>
                <style.Img src={item.idol.profilePicture} alt={item.title} />
                <style.Block>
                    <style.SubmitButton>후원하기</style.SubmitButton>
                </style.Block>
            </style.ImgButton>
            <style.InfoWrapper>
                <style.Detail>
                    <style.Subtitle>{item.subtitle}</style.Subtitle>
                    <style.Title>{item.title}</style.Title>
                </style.Detail>
                <style.StatusInfo>
                    <style.Status>
                        <style.Credit>
                            <img src="/CreditImg.png" alt="크레딧 이미지" />
                            {item.targetDonation.toLocaleString()}
                        </style.Credit>
                        <style.Countdown>{displaysDay}일 남음</style.Countdown>
                    </style.Status>
                    <div ref={progressRef} style={{ width: '100%', height: '1px' }} />
                </style.StatusInfo>
            </style.InfoWrapper>
        </style.Card >
    );
}

export default Card;
