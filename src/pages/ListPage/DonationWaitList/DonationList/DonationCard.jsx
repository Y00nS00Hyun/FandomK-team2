// import React from "react";
// import Button from "../../../../components/Button/Button";
// import "./CardDecoration.jsx";

// function Card({ item }) {
// 	const today = new Date();
// 	const deadline = new Date(item.deadline);
// 	const dDay = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
// 	const displaysDay = dDay >= 0 ? dDay : 0; //dDay가 음수일 때 제외

// 	return (
// 		<div>
// 			<img className="donationIdolImage" src={"https://images.unsplash.com/photo-1717738118267-99f7c371127c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"} alt={item.title} />
// 			<Button>후원하기</Button>
// 			<div>
// 				<h2>{item.subtitle}</h2>
// 				<h1>{item.title}</h1>
// 				<div>
// 					<p>
// 						{/* <CreditIcon /> */}
// 						<img src="/CreditImg.png" alt="크레딧 이미지" />
// 						{item.targetDonation.toLocaleString()}
// 					</p>
// 					<p>{displaysDay}일 남음</p>
// 				</div>
// 				<div>바</div>
// 			</div>
// 		</div>
// 	);
// }

// export default Card;
