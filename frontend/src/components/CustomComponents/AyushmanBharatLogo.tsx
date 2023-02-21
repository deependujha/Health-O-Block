import React from 'react';
import Image from 'next/image';

const AyushmanBharatLogo = () => {
	return (
		<div className="flex my-5 mx-5 justify-center">
			<h1 className="text-4xl font-bold text-pink-600 my-auto">
				आयुष्मान भारत
			</h1>
			<Image
				src="/health_icon.png"
				alt="health icon"
				width={100}
				height={100}
			/>
		</div>
	);
};

export default AyushmanBharatLogo;
