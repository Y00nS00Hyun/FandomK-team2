import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';
import DesktopLogoImage from '../assets/images/logo/logo.svg';
import MobileLogoImage from '../assets/images/logo/logo-text.png';

// TODO: update LOGO
function Logo() {
	const mediaQuery = useMediaQuery();
	const logoImage = useMemo(() => {
		switch (mediaQuery) {
			case 'mobile':
				return MobileLogoImage;
			default:
				return DesktopLogoImage;
		}
	}, [mediaQuery]);

	return (
		<Link to={'/'}>
			<img src={logoImage} alt='판다마켓 로고' draggable='false' />
		</Link>
	);
}

export default Logo;
