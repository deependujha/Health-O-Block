import React, { useState, useEffect } from 'react';
import {
	Modal,
	Button,
	Text,
	Input,
	Row,
	Checkbox,
	Divider,
	Loading,
} from '@nextui-org/react';
import Image from 'next/image';

type Props = {
	visible: boolean;
	userType: 'User' | 'Doctor' | 'admin';
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
	userData: {
		name: string;
		email: string;
		walletAddress: string;
		imageUrl: string;
	};
};

type NomineeStatus = 'already' | 'no' | 'loading';

export default function AdminFindUser_Doctor({
	visible,
	setVisible,
	userData,
	userType,
}: Props) {
	const closeHandler = () => {
		setVisible(false);
	};

	return (
		<div>
			<Modal
				blur
				preventClose
				closeButton
				aria-labelledby="modal-title"
				open={visible}
				onClose={closeHandler}
				width="500px"
			>
				<Modal.Header>
					<div className="text-3xl font-bold text-pink-500">
						{userType} found 🤠
					</div>
				</Modal.Header>
				<Divider />
				<Modal.Body>
					<div>
						<div className="flex justify-center">
							<Image
								src={userData.imageUrl}
								width={150}
								height={150}
								alt="userImage"
								style={{ border: '1px solid black', borderRadius: '20px' }}
							/>
						</div>
						<div className="text-lg my-3 text-pink-500 font-bold  text-center">
							{userData.name}
						</div>
						<div className="text-lg my-3 text-purple-800 text-center">
							{userData.email}
						</div>
						<div className="text-lg my-3 text-purple-900 text-center">
							{userData.walletAddress}
						</div>
					</div>
					<hr className='my-2' />
					<div className="flex justify-center">
						<Button size="lg" color="error" onPress={closeHandler}>
							Close
						</Button>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}
