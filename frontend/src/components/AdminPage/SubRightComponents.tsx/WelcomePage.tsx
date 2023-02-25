import AyushmanBharatLogo from '@/components/CustomComponents/AyushmanBharatLogo';
import { Divider } from '@nextui-org/react';
import React from 'react';

const WelcomePage = () => {
	return (
		<div>
			<div className="py-3">
				<AyushmanBharatLogo />
			</div>
			<div className="flex justify-center">
				<Divider color={'error'} style={{ width: '30vw' }} />
			</div>
			<div className="text-3xl text-center text-pink-500 pt-64">
				Welcome to the admin page of 'Health-O-Block' 🧑‍⚕️🏥
			</div>
		</div>
	);
};

export default WelcomePage;
