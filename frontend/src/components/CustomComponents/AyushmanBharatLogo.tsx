import React from 'react';
import Image from 'next/image';

const AyushmanBharatLogo = () => {
	return (
		<div className="flex justify-center">
			<h1 className="text-3xl font-bold text-pink-600 my-auto">
				{/* आयुष्मान भारत */}
				Health-O-Block
			</h1>
			<Image src="/health_icon.png" alt="health icon" width={90} height={90} />
		</div>
	);
};

export default AyushmanBharatLogo;
