import React from "react";
import logoImage from "../../assets/images/logo/logo.svg";

const LOGO_HEIGHTS = {
	sm: 20,
	md: 24,
	lg: 32,
	xl: 100,
};

function Logo({ size = "md" }) {
	return <img src={logoImage} alt="FANDOM-K Logo" height={LOGO_HEIGHTS[size]} draggable="false" />;
}

export default Logo;
