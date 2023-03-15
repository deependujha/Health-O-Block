import AyushmanBharatLogo from '@/components/CustomComponents/AyushmanBharatLogo';
import { Divider, Loading } from '@nextui-org/react';
import React, { useState } from 'react';
import { Dropdown } from '@nextui-org/react';
import DoctorCardComponent from '@/components/CustomComponents/DoctorCardComponent';
import axios from 'axios';

const menuItems = [
	{ key: 'none', name: 'None' },
	{ key: 'eye', name: 'Eye Specialist' },
	{ key: 'ear', name: 'Ear Specialist' },
	{ key: 'heart', name: 'Heart Specialist' },
	{ key: 'skin', name: 'Skin Specialist' },
	{ key: 'dental', name: 'Dental Specialist' },
	{ key: 'gastro', name: 'Gastroenterologist' },
	{ key: 'neuro', name: 'Neurologist' },
	{ key: 'gyno', name: 'Gynecologist' },
	{ key: 'ortho', name: 'Orthopedic' },
];

const WelcomePage = () => {
	const [currItem, setCurrItem] = useState('none');
	const [loading, setLoading] = useState(true);

	const [doctors, setDoctors] = useState<any>([]);

	const selectionChange = (e: any) => {
		setLoading(true);
		setDoctors([]);
		const val = e.target.value;
		setCurrItem(val);

		if (val === 'none') {
			setLoading(false);
		} else {
			axios
				.get(`http://localhost:7000/speciality/${val}`)
				.then((res) => {
					console.log('result is: ', res.data);
					setDoctors(res.data);
					setLoading(false);
				})
				.catch((err) => {
					console.log('error is: ', err);
					setLoading(false);
				});
		}
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
				{doctors.map((doctor: any, idx: number) => {
					return (
						<DoctorCardComponent
							key={idx}
							name={doctor.name}
							imageUrl={doctor.imageUrl}
							walletAddress={doctor.walletAddress}
							email={doctor.email}
							description={doctor.description}
						/>
					);
				})}
				{/* <DoctorCardComponent
					name="Tom"
					imageUrl="1677327244704---tom.jpeg"
					walletAddress="0x79E7896Ce53cC85617755Fdc91d9A5d1922a0FEC"
					email="deependujha21@gmail.com"
					description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
				/> */}
			</div>
			{loading && currItem !== 'none' && (
				<div className="flex justify-center pt-64">
					<div>
						<div>
							<Loading color={'error'} />
						</div>
						<div className="text-center">Please wait...</div>
					</div>
				</div>
			)}

			{currItem === 'none' && (
				<div className="text-2xl font-mono text-pink-500 text-center py-52">
					Select a speciality to see the list of specialized doctors
				</div>
			)}

			{doctors.length === 0 && currItem !== 'none' && !loading && (
				<div className="text-2xl font-mono text-pink-500 text-center py-52">
					Sorry, no specialized doctor found. 🤕
				</div>
			)}
		</div>
	);
};

export default WelcomePage;
