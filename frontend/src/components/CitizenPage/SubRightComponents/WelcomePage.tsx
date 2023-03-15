import AyushmanBharatLogo from '@/components/CustomComponents/AyushmanBharatLogo';
import { Divider, Loading } from '@nextui-org/react';
import React, { useState } from 'react';
import { Dropdown } from '@nextui-org/react';
import DoctorCardComponent from '@/components/CustomComponents/DoctorCardComponent';

const menuItems = [
	{ key: 'none', name: 'None' },
	{ key: 'eye', name: 'Eye Specialist' },
	{ key: 'ear', name: 'Ear Specialist' },
	{ key: 'heart', name: 'Heart Specialist' },
];

const WelcomePage = () => {
	const [currItem, setCurrItem] = useState('None');
	const [loading, setLoading] = useState(true);

	const selectionChange = (e: any) => {
		setCurrItem(e.target.value);
	};

	return (
		<div>
			<div className="py-3">
				<AyushmanBharatLogo />
			</div>
			<div className="flex justify-center">
				<Divider color={'error'} style={{ width: '30vw' }} />
			</div>
			<div className="text-xl text-center text-pink-500 pt-8">
				<form>
					<label htmlFor="doctors">Doctor's Speciality: </label>
					<select name="speciality" id="doctors" onChange={selectionChange}>
						{menuItems.map((item, idx) => {
							return (
								<option key={idx} value={item.key}>
									{item.name}
								</option>
							);
						})}
					</select>
				</form>
			</div>
			<div className="pt-8">
				{/* <DoctorCardComponent
					name="Tom"
					imageUrl="1677327244704---tom.jpeg"
					walletAddress="0x79E7896Ce53cC85617755Fdc91d9A5d1922a0FEC"
					email="deependujha21@gmail.com"
					description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
				/> */}
			</div>
			{loading && (
				<div className="flex justify-center pt-64">
					<div>
						<div>
							<Loading color={'error'} />
						</div>
						<div className="text-center">Please wait...</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default WelcomePage;
