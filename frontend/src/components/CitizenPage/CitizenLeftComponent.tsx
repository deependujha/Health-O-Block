import React, { useState } from 'react';
import Image from 'next/image';
import { Divider, Button, Loading } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { setAllowed } from '@/redux/slices/AdminPanelSlice';
import { useRouter } from 'next/router';
import AyushmanBharatLogo from '../CustomComponents/AyushmanBharatLogo';
import LogoutConfirmation from '../Modals/LogoutConfirmation';

type currPossibleValues =
	| 'upload_new_docs'
	| 'your_docs'
	| 'add_nominee'
	| 'nominee'
	| 'profile'
	| 'welcome';

type CitizenPageLeftComponentProps = {
	setCurr: React.Dispatch<React.SetStateAction<currPossibleValues>>;
};
const CitizenPageLeftComponent = ({
	setCurr,
}: CitizenPageLeftComponentProps) => {
	const myDispatch = useDispatch();
	const router = useRouter();
	const [logoutConfirmationModalVisible, setLogoutConfirmationModalVisible] =
		useState(false);

	const logoutAsAdmin = async () => {
		setLogoutConfirmationModalVisible(true);
	};

	const uploadNewDocument = async () => {
		setCurr('upload_new_docs');
	};

	const yourDocs = async () => {
		setCurr('your_docs');
	};

	const addNominee = async () => {
		setCurr('add_nominee');
	};
	const nominee = async () => {
		setCurr('nominee');
	};
	const yourProfile = async () => {
		setCurr('profile');
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
									onPress={uploadNewDocument}
								>
									<div className="text-lg">Upload new document</div>
								</Button>
							</div>
							<div className="flex justify-center my-6  ">
								<Button
									color="gradient"
									onPress={yourDocs}
									style={{ width: '20vw' }}
								>
									<div className="text-lg">Your documents</div>
								</Button>
							</div>
							<div className="flex justify-center my-6">
								<Button
									color="gradient"
									onPress={addNominee}
									style={{ width: '20vw' }}
								>
									<div className="text-lg">Add new Nominee</div>
								</Button>
							</div>
							<div className="flex justify-center my-6">
								<Button
									color="gradient"
									onPress={nominee}
									style={{ width: '20vw' }}
								>
									<div className="text-lg">Nominees</div>
								</Button>
							</div>
							<div className="flex justify-center my-6">
								<Button
									color="gradient"
									onPress={yourProfile}
									style={{ width: '20vw' }}
								>
									<div className="text-lg">Profile</div>
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

export default CitizenPageLeftComponent;
