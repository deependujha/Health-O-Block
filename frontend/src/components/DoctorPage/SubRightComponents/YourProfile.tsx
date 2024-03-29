import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Loading } from '@nextui-org/react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { imageUrlForBackend } from '@/utils/ImageUrlForBackend';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const YourProfile = () => {
	const { refreshVal, address } = useSelector(
		(state: RootState) => state.doctor
	);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [desc, setDesc] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [loading, setLoading] = useState(true);

	const [nomineeData, setNomineeData] = useState<any>([]);

	const fetchData = async () => {
		axios
			.get(`http://localhost:7000/doctor/${address}`)
			.then((res) => {
				const updatedImageUrl = imageUrlForBackend(res.data.imageUrl, true);
				setName(res.data.name);
				setEmail(res.data.email);
				setDesc(res.data.description);
				setImageUrl(updatedImageUrl);
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
			<div className="flex justify-center mt-40">
				<Image
					src={imageUrl}
					width={300}
					height={300}
					alt="userProfile"
					style={{
						border: '1px solid purple',
						borderRadius: '15px',
					}}
				/>
			</div>
			<div className="text-2xl text-center text-pink-500 my-3">Dr. {name}</div>
			<div className="text-2xl text-center text-pink-500 my-3">{email}</div>
			<div className="text-2xl text-center text-pink-500 my-3">{desc}</div>
			<div className="text-2xl text-center text-pink-500 my-3">{address}</div>
		</div>
	);
};

export default YourProfile;
