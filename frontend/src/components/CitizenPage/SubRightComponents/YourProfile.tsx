import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SimpleBar from 'simplebar-react';
import NomineeCardComponent from '@/components/CustomComponents/NomineeCardComponent';
import { Loading } from '@nextui-org/react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { imageUrlForBackend } from '@/utils/ImageUrlForBackend';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const YourProfile = () => {
	const { refreshVal, address: walletAddress } = useSelector(
		(state: RootState) => state.citizen
	);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [imageUrl, setImageUrl] = useState('/assets/dummyImg.png');
	const [loading, setLoading] = useState(true);

	const [nomineeData, setNomineeData] = useState<any>([]);

	const fetchData = async () => {
		axios
			.get(`http://localhost:7000/user/${walletAddress}`)
			.then((res) => {
				const updatedImageUrl = imageUrlForBackend(res.data.imageUrl, false);
				setName(res.data.name);
				setEmail(res.data.email);
				setImageUrl(updatedImageUrl);
				axios
					.get(`http://localhost:7000/nominee/${walletAddress}`)
					.then((res) => {
						console.log(res.data);
						setNomineeData(res.data);
						setLoading(false);
					})
					.catch((err) => {
						setLoading(false);
						console.log(err);
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'Something went wrong!',
						});
					});
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!',
				});
			});
	};

	useEffect(() => {
		fetchData();
	}, [refreshVal]);

	if (loading) {
		return (
			<div>
				<div className="flex justify-center pt-40 text-center">
					<Loading />
				</div>
				<div className="text-center">Please wait...</div>
			</div>
		);
	}

	return (
		<div>
			<div className="flex justify-center mt-20">
				<Image
					src={imageUrl}
					width={200}
					height={300}
					alt="userProfile"
					style={{
						border: '1px solid purple',
						borderRadius: '15px',
					}}
				/>
			</div>
			<div className="text-2xl text-center text-pink-500 my-3">{name}</div>
			<div className="text-2xl text-center text-pink-500 my-3">{email}</div>
			<div className="text-2xl text-center text-pink-500 my-3">
				{walletAddress}
			</div>
			<div>
				<div className="text-2xl font-bold text-white my-5 mx-3">Nominees:</div>
			</div>
			<div className="flex overflow-hidden">
				{nomineeData.map((nmn: any, idx: number) => {
					return (
						<NomineeCardComponent
							key={idx}
							name={nmn.name}
							imageUrl={nmn.imageUrl}
							walletAddress={nmn.walletAddress}
						/>
					);
				})}
			</div>
			{loading === false && nomineeData.length === 0 && (
				<div className="text-xl font-bold font-mono text-white text-center py-6">
					You have not added anyone as nominee.👨‍⚕️
				</div>
			)}
		</div>
	);
};

export default YourProfile;
