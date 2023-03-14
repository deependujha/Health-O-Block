import React, { useState } from 'react';
import {
	Modal,
	Input,
	Row,
	Checkbox,
	Button,
	Text,
	Divider,
	FormElement,
	Loading,
} from '@nextui-org/react';
import { ethers } from 'ethers';
import Image from 'next/image';
import axios from 'axios';
import Swal from 'sweetalert2';

type RegisterNewUserProps = {
	registerNewUserModalVisible: boolean;
	setRegisterNewUserModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const InitialNewUserData = {
	name: '',
	email: '',
	walletAddress: '',
	loading: false,
};

const RegisterNewUser = ({
	registerNewUserModalVisible,
	setRegisterNewUserModalVisible,
}: RegisterNewUserProps) => {
	const [newUserData, setNewUserData] = useState(InitialNewUserData);
	const [img, setImg] = useState<File | null>(null);

	const imageUploader = (val: FileList | null) => {
		if (val === null) return;
		setImg(val[0]);
	};

	const closeHandler = () => {
		setNewUserData(InitialNewUserData);
		setRegisterNewUserModalVisible(false);
	};

	const handleChange = (e: React.ChangeEvent<FormElement>) => {
		const { name, value } = e.target;
		if (newUserData.loading && name !== 'loading') return;
		setNewUserData({ ...newUserData, [name]: value });
	};

	const registerNewUser = async () => {
		if (!img) {
			alert("Please upload a profile picture for the user's account");
			return;
		}
		setNewUserData({ ...newUserData, loading: true });
		console.log('name is:', newUserData.name);
		console.log('email is:', newUserData.email);
		console.log('wallet address is:', newUserData.walletAddress);

		// A Web3Provider wraps a standard Web3 provider, which is
		// what MetaMask injects as window.ethereum into each page

		if (window.ethereum === undefined) {
			alert('Please install MetaMask first.');
			return;
		}

		let signer = null;

		let provider;
		// Connect to the MetaMask EIP-1193 object. This is a standard
		// protocol that allows Ethers access to make all read-only
		// requests through MetaMask.
		provider = new ethers.providers.Web3Provider(window.ethereum);
		// MetaMask requires requesting permission to connect users accounts
		await provider.send('eth_requestAccounts', []);

		// It also provides an opportunity to request access to write
		// operations, which will be performed by the private key
		// that MetaMask manages for the user.
		signer = await provider.getSigner();

		let message = 'Registering new user to the Health-O-Block app';

		// Signing the message
		let sig = await signer.signMessage(message);

		// Validating a message; notice the address matches the signer
		// let meow = ethers.verifyMessage(message, sig);

		const meow = await signer.getAddress();
		// console.log('meow is:', meow);
		setNewUserData({ ...newUserData, walletAddress: meow, loading: true });

		const formData = new FormData();
		formData.append('name', newUserData.name);
		formData.append('email', newUserData.email);
		formData.append('walletAddress', meow);
		formData.append('image', img);

		axios
			.post('http://localhost:7000/user/register', formData)
			.then((res) => {
				console.log(res.data);
				// set all the states to empty
				setImg(null);
				setNewUserData(InitialNewUserData);
				setRegisterNewUserModalVisible(false);
				Swal.fire('Success', 'User registration successful', 'success');
			})
			.catch((err) => {
				console.log(err);
				setImg(null);
				setNewUserData(InitialNewUserData);
				setRegisterNewUserModalVisible(false);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!',
				});
			});
	};

	return (
		<div>
			<Modal
				preventClose
				visible={registerNewUserModalVisible}
				open={registerNewUserModalVisible}
				closeButton
				blur
				aria-labelledby="modal-title"
				aria-label="modal-title"
				onClose={closeHandler}
				width="500px"
			>
				<Modal.Header>
					<div>
						<div className="text-3xl text-pink-600 font-bold">
							New user registration 🏥
						</div>
					</div>
				</Modal.Header>
				<Divider />
				<Modal.Body>
					<div className="my-4 flex justify-center">
						<Image
							src={img ? URL.createObjectURL(img) : '/assets/dummyImg.png'}
							height="200"
							width="200"
							alt="myImage"
							style={{
								border: '1px solid purple',
								borderRadius: '15px',
							}}
						/>
					</div>
					<div className="my-3 flex justify-center">
						<input
							type="file"
							accept="image/png, image/jpg, image/jpeg"
							onChange={(e) => {
								imageUploader(e.target.files);
							}}
						/>
					</div>
					<Input
						clearable
						readOnly={newUserData.loading}
						bordered
						fullWidth
						color="primary"
						size="lg"
						placeholder="Name"
						aria-labelledby="modal-title"
						aria-label="modal-title"
						onChange={handleChange}
						value={newUserData.name}
						name="name"
					/>
					<Input
						clearable
						readOnly={newUserData.loading}
						bordered
						fullWidth
						color="primary"
						size="lg"
						placeholder="email"
						aria-labelledby="modal-title"
						aria-label="modal-title"
						onChange={handleChange}
						value={newUserData.email}
						name="email"
					/>
					<Input
						disabled
						bordered
						fullWidth
						color="primary"
						size="lg"
						placeholder="wallet address"
						aria-labelledby="modal-title"
						aria-label="modal-title"
						value={newUserData.walletAddress}
						name="walletAddress"
						style={{ color: 'purple' }}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						size="lg"
						color={'gradient'}
						style={{ width: '450px' }}
						onPress={registerNewUser}
					>
						{newUserData.loading ? (
							<Loading color={'white'} />
						) : (
							<div>Connect wallet to register</div>
						)}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default RegisterNewUser;
