import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
	dots: true,
	infinite: false,
	speed: 500,
	slidesToShow: 4,
	slidesToScroll: 1,
	responsive: [
		{
			//작은 사이즈
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
				dots: true,
			},
		},
	],
};

export default settings;
