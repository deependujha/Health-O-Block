import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
	Modal,
	Input,
	Row,
	Checkbox,
	Button,
	Text,
	Divider,
	Loading,
} from '@nextui-org/react';

type LogoutConfirmationProps = {
	logoutConfirmationModalVisible: boolean;
	setLogoutConfirmationModalVisible: React.Dispatch<
		React.SetStateAction<boolean>
	>;
};

export default function LogoutConfirmation({
	logoutConfirmationModalVisible,
	setLogoutConfirmationModalVisible,
}: LogoutConfirmationProps) {
	const router = useRouter();
	const [loadingLogout, setLoadingLogout] = useState(false);

	const logoutFunction = async () => {
		setLoadingLogout(true);
		setTimeout(() => {
			router.push('/');
			setLoadingLogout(false);
		}, 500);
	};

	const closeHandler = () => {
		setLogoutConfirmationModalVisible(false);
		console.log('closed');
	};
	return (
		<div>
			<Modal
				closeButton
				blur
				aria-labelledby="modal-title"
				open={logoutConfirmationModalVisible}
				onClose={closeHandler}
			>
				<Modal.Header>
					<div className="text-3xl text-pink-600 font-bold">logout❗</div>
				</Modal.Header>
				<Divider />
				<Modal.Body>
					<div className="text-xl text-red-500 font-bold">
						Are you sure you want to logout?
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button auto flat color="error" onPress={closeHandler}>
						Cancel
					</Button>
					<Button auto onPress={logoutFunction}>
						{loadingLogout ? <Loading color={'white'} /> : 'Logout'}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
