import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import HorizontalLine from '../CustomComponents/HorizontalLine';
import AdminPanelLogin from '../Modals/AdminPanelLogin';
import AyushmanBharatLogo from '../CustomComponents/AyushmanBharatLogo';
import RegisterNewUser from '../Modals/RegisterNewUser';
import { ethers } from 'ethers';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAddress as setAddressDoctor } from '@/redux/slices/DoctorSlice';
import { setAddress as setAddressCitizen } from '@/redux/slices/CitizenSlice';
import { useRouter } from 'next/router';

const LoginPage = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [adminPanelLoginModalVisible, setAdminPanelLoginModalVisible] =
		useState(false);

	const [registerNewUserModalVisible, setRegisterNewUserModalVisible] =
		useState(false);

	const loginCitizen = async () => {
		try {
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
			provider = new ethers.BrowserProvider(window.ethereum);

			// It also provides an opportunity to request access to write
			// operations, which will be performed by the private key
			// that MetaMask manages for the user.
			signer = await provider.getSigner();
			let message = 'login to the app. (Citizen)';

			// Signing the message
			let sig = await signer.signMessage(message);

			// Validating a message; notice the address matches the signer
			let meow = ethers.verifyMessage(message, sig);
			axios
				.get(`http://localhost:7000/user/${meow}`)
				.then((res) => {
					console.log(res.data);
					if (res.data === 'user not found') {
						Swal.fire({
							title: 'Error!',
							text: 'User not found',
							icon: 'error',
							confirmButtonText: 'Cool',
						});
					} else {
						dispatch(setAddressCitizen(meow));
						router.push('/citizen');
					}
				})
				.catch((err) => {
					console.log(err);
					Swal.fire({
						title: 'Error!',
						text: 'User not found',
						icon: 'error',
						confirmButtonText: 'Cool',
					});
				});
		} catch (error) {
			console.log(error);
			Swal.fire({
				title: 'Error!',
				text: 'Some unexpected error occured',
				icon: 'error',
			});
		}
	};

	const loginDoctor = async () => {
		try {
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
			provider = new ethers.BrowserProvider(window.ethereum);

			// It also provides an opportunity to request access to write
			// operations, which will be performed by the private key
			// that MetaMask manages for the user.
			signer = await provider.getSigner();
			let message = 'login to the app. (Doctor)';

			// Signing the message
			let sig = await signer.signMessage(message);

			// Validating a message; notice the address matches the signer
			let meow = ethers.verifyMessage(message, sig);
			axios
				.get(`http://localhost:7000/doctor/${meow}`)
				.then((res) => {
					console.log(res.data);
					if (res.data === 'user not found') {
						Swal.fire({
							title: 'Error!',
							text: 'User not found',
							icon: 'error',
							confirmButtonText: 'Cool',
						});
					} else {
						dispatch(setAddressDoctor(meow));
						router.push('/doctor');
					}
				})
				.catch((err) => {
					console.log(err);
					Swal.fire({
						title: 'Error!',
						text: 'User not found',
						icon: 'error',
						confirmButtonText: 'Cool',
					});
				});
		} catch (error) {
			console.log(error);
			Swal.fire({
				title: 'Error!',
				text: 'Some unexpected error occured',
				icon: 'error',
			});
		}
	};

	const register = async () => {
		setRegisterNewUserModalVisible(true);
	};

	const adminPanel = async () => {
		setAdminPanelLoginModalVisible(true);
	};

	return (
		<div
			className={`bg-[url('/bg_img/bg1.jpeg')]`}
			style={{ height: '100vh', width: '100vw' }}
		>
			<div className="flex justify-end text-white px-20 h-screen">
				<div className="my-auto">
					<div
						style={{
							border: '1px solid white',
							borderRadius: '15px',
							padding: '15px',
						}}
					>
						<AyushmanBharatLogo />
						<HorizontalLine />
						<div>
							<Button
								color="gradient"
								size={'lg'}
								className="my-6"
								style={{ width: '400px' }}
								onPress={loginCitizen}
							>
								login as citizen
							</Button>

							<Button
								color="gradient"
								size={'lg'}
								className="my-6"
								style={{ width: '400px' }}
								onPress={loginDoctor}
							>
								login as Doctor
							</Button>
							<div className="flex justify-between">
								<div style={{ width: '45%' }} className="pt-3">
									<HorizontalLine />
								</div>
								<div>Or</div>
								<div style={{ width: '45%' }} className="pt-3">
									<HorizontalLine />
								</div>
							</div>
							<Button
								color="secondary"
								size={'lg'}
								className="my-6"
								style={{ width: '400px' }}
								onPress={register}
							>
								Register as a new user
							</Button>
							<div className="flex justify-between">
								<div style={{ width: '40%' }} className="pt-3">
									<HorizontalLine />
								</div>
								<div>Admin</div>
								<div style={{ width: '40%' }} className="pt-3">
									<HorizontalLine />
								</div>
							</div>
							<Button
								color="error"
								size={'lg'}
								className="my-6"
								style={{ width: '400px' }}
								onPress={adminPanel}
							>
								Admin panel
							</Button>
							<AdminPanelLogin
								adminPanelLoginModalVisible={adminPanelLoginModalVisible}
								setAdminPanelLoginModalVisible={setAdminPanelLoginModalVisible}
							/>
							<RegisterNewUser
								registerNewUserModalVisible={registerNewUserModalVisible}
								setRegisterNewUserModalVisible={setRegisterNewUserModalVisible}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
