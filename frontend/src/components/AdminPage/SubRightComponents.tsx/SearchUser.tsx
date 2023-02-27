import React, { useState } from 'react';
import Image from 'next/image';
import { Divider, Loading } from '@nextui-org/react';
import HorizontalLine from '@/components/CustomComponents/HorizontalLine';
import axios from 'axios';
import Swal from 'sweetalert2';
import SearchUserModal from '@/components/Modals/SearchUserModal';
import AddingNomineeLoadingModal from '@/components/Modals/AddingNomineeLoadingModal';
import AdminFindUser_Doctor from '@/components/Modals/AdminFindUser_Doctor';

const initialData = {
	name: '',
	email: '',
	walletAddress: '',
	imageUrl: '/assets/dummyImg.png',
};
const SearchUser = () => {
	const [visibleModal, setVisibleModal] = useState(false);
	const [userData, setUserData] = useState(initialData);

	const [inputVal, setInputVal] = useState('');
	const [loading, setLoading] = useState(false);
	const searchUser = async () => {
		setLoading(true);
		axios
			.get(`http://localhost:7000/user/${inputVal}`)
			.then((res) => {
				setLoading(false);
				if (res.data === 'user not found') {
					Swal.fire({
						icon: 'error',
						title: 'No user found!',
						text: 'Seems like the wallet address is not registered.',
					});
				} else {
					const { name, email, walletAddress, imageUrl } = res.data;
					setUserData({
						name,
						email,
						walletAddress,
						imageUrl: `http://localhost:7000/user/image/${imageUrl}`,
					});
					setVisibleModal(true);
				}
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!',
				});
			});
	};
	return (
		<div>
			<div className="text-center text-4xl text-pink-500 pt-28">
				Search User 🤠
			</div>
			<div className="flex justify-center py-4">
				<div style={{ width: '400px' }} className="">
					<HorizontalLine />
				</div>
			</div>
			<div className="flex justify-center py-32">
				<div className="flex justify-around">
					<input
						value={inputVal}
						onChange={(e) => setInputVal(e.target.value)}
						placeholder="enter the wallet address whom you want to nominate"
						color="secondary"
						style={{
							width: '450px',
							border: '1px solid white',
							padding: '2px',
							borderRadius: '20px',
							color: 'black',
						}}
					/>
					<button onClick={searchUser}>
						<Image
							src="/assets/search.png"
							width={50}
							height={50}
							alt="search"
							className="mx-8"
						/>
					</button>
				</div>
			</div>
			<div className="my-5 flex justify-center">
				{loading ? (
					<div>
						loading...
						<Loading color={'white'} />
					</div>
				) : (
					<div></div>
				)}
			</div>
			<AdminFindUser_Doctor
				setVisible={setVisibleModal}
				visible={visibleModal}
				userType="User"
				userData={userData}
			/>
		</div>
	);
};

export default SearchUser;
