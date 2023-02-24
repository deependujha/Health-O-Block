import React from 'react';
import Image from 'next/image';
import SimpleBar from 'simplebar-react';
import NomineeCardComponent from '@/components/CustomComponents/NomineeCardComponent';

const YourProfile = () => {
	return (
		<SimpleBar style={{ maxHeight: 800 }}>
			<div className="flex justify-center mt-20">
				<Image
					src={'/assets/dummyImg.png'}
					width={200}
					height={300}
					alt="userProfile"
					style={{
						border: '1px solid purple',
						borderRadius: '15px',
					}}
				/>
			</div>
			<div className="text-2xl text-center text-pink-500 my-3">
				Deependu Jha
			</div>
			<div className="text-2xl text-center text-pink-500 my-3">
				deependujha21@gmail.com
			</div>
			<div className="text-2xl text-center text-pink-500 my-3">
				0x4e76d6B2404d59D01bD50e159A775044d37debdA
			</div>
			<div>
				<div className="text-2xl font-bold text-white my-3 mx-3">Nominees:</div>
			</div>
			<div className="flex overflow-hidden">
				<NomineeCardComponent />
				<NomineeCardComponent />
				<NomineeCardComponent />
			</div>
		</SimpleBar>
	);
};

export default YourProfile;
