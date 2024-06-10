import React from 'react';
import Logo from './Logo';
import Avatar from '../components/Avatar/Avatar';

function RootHeader() {
	return (
		<header id='header'>
			<div className='inner'>
				<section className='header__left'>
					<section className='header__logo'>
						<Logo />
					</section>
				</section>

				<section className='header__buttons'>
					<Avatar />
				</section>
			</div>
		</header>
	);
}

export default RootHeader;
