import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import HorizontalLine from '../CustomComponents/HorizontalLine';
import AdminPanelLogin from '../Modals/AdminPanelLogin';
import AyushmanBharatLogo from '../CustomComponents/AyushmanBharatLogo';
import RegisterNewUser from '../Modals/RegisterNewUser';

const LoginPage = () => {
	const [adminPanelLoginModalVisible, setAdminPanelLoginModalVisible] =
		useState(false);

	const [registerNewUserModalVisible, setRegisterNewUserModalVisible] =
		useState(false);

	const loginCitizen = async () => {
		console.log('clicked on login as citizen');
	};

	const loginDoctor = async () => {
		console.log('clicked on login as doctor');
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
