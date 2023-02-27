import React, { useState } from 'react';
import Image from 'next/image';
import { Divider, Button, Loading } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { setAllowed } from '@/redux/slices/AdminPanelSlice';
import { useRouter } from 'next/router';
import AyushmanBharatLogo from '../CustomComponents/AyushmanBharatLogo';
import LogoutConfirmation from '../Modals/LogoutConfirmation';

type currPossibleValues =
	| 'search_user'
	| 'register_new_doctor'
	| 'search_doctor'
	| 'welcome';

type AdminPageLeftComponentProps = {
	setCurr: React.Dispatch<React.SetStateAction<currPossibleValues>>;
};
const AdminPageLeftComponent = ({ setCurr }: AdminPageLeftComponentProps) => {
	const myDispatch = useDispatch();
	const router = useRouter();
	const [logoutConfirmationModalVisible, setLogoutConfirmationModalVisible] =
		useState(false);

	const logoutAsAdmin = async () => {
		setLogoutConfirmationModalVisible(true);
	};

	const searchUser = async () => {
		setCurr('search_user');
	};

	const registerNewDoctor = async () => {
		setCurr('register_new_doctor');
	};

	const searchDoctor = async () => {
		setCurr('search_doctor');
	};

	return (
		<div className="flex h-screen">
			<div
				className="bg-gradient-to-r from-purple-900 rounded-3xl my-auto"
				style={{ width: '22vw', borderWidth: '2px', borderColor: 'white' }}
			>
				<div className="" style={{ height: '94vh' }}>
					<div className="flex justify-center py-2">
						<button
							onClick={() => {
								setCurr('welcome');
							}}
						>
							<AyushmanBharatLogo />
						</button>
					</div>
					<Divider color={'error'} />
					<div
						className="flex flex-col justify-between"
						style={{ height: '80vh' }}
					>
						<div>
							<div className="flex justify-center my-6">
								<Button
									color="gradient"
									style={{ width: '20vw' }}
									onPress={searchUser}
								>
									<div className="text-lg">Search user</div>
								</Button>
							</div>
							<div className="flex justify-center my-6  ">
								<Button
									color="gradient"
									onPress={searchDoctor}
									style={{ width: '20vw' }}
								>
									<div className="text-lg">Search Doctor</div>
								</Button>
							</div>
							<div className="flex justify-center my-6">
								<Button
									color="gradient"
									onPress={registerNewDoctor}
									style={{ width: '20vw' }}
								>
									<div className="text-lg">Register new Doctor</div>
								</Button>
							</div>
						</div>
						<div className="flex justify-center my-6">
							<Button
								color="error"
								style={{ width: '20vw' }}
								onPress={logoutAsAdmin}
							>
								<div className="text-lg">logout</div>
							</Button>
							<div>
								<LogoutConfirmation
									logoutConfirmationModalVisible={
										logoutConfirmationModalVisible
									}
									setLogoutConfirmationModalVisible={
										setLogoutConfirmationModalVisible
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminPageLeftComponent;
