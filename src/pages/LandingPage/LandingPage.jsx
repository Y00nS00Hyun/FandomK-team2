import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
	return (
		<article>
			<p>랜딩페이지 입니다</p>
			<ul>
				<li>
					<Link to={'/list'}>후원 목록으로</Link>
				</li>
				<li>
					<Link to={'/mypage'}>마이페이지로</Link>
				</li>
			</ul>
		</article>
	);
}

export default LandingPage;
