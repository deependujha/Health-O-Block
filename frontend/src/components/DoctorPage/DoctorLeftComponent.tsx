import { Button, Divider } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AyushmanBharatLogo from '../CustomComponents/AyushmanBharatLogo';
import LogoutConfirmation from '../Modals/LogoutConfirmation';

type currPossibleValues =
	| 'shared_docs'
	| 'your_docs'
	| 'upload_new_docs'
	| 'profile'
	| 'welcome';

type DoctorPageLeftComponentProps = {
	setCurr: React.Dispatch<React.SetStateAction<currPossibleValues>>;
};

const DoctorLeftComponent = ({ setCurr }: DoctorPageLeftComponentProps) => {
	const myDispatch = useDispatch();
	const router = useRouter();
	const [logoutConfirmationModalVisible, setLogoutConfirmationModalVisible] =
		useState(false);

	const logoutAsAdmin = async () => {
		setLogoutConfirmationModalVisible(true);
	};

	const sharedDocument = async () => {
		setCurr('shared_docs');
	};

	const uploadNewDocument = async () => {
		setCurr('upload_new_docs');
	};

	const yourDocs = async () => {
		setCurr('your_docs');
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
									onPress={sharedDocument}
								>
									<div className="text-lg">Shared Documents</div>
								</Button>
							</div>
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

export default DoctorLeftComponent;
