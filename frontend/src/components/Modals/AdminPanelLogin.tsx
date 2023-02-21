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
} from '@nextui-org/react';
import HorizontalLine from '../CustomComponents/HorizontalLine';

type AdminPanelLoginProps = {
	adminPanelLoginModalVisible: boolean;
	setAdminPanelLoginModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const InitialAdminLoginState = {
	adminId: '',
	password: '',
};

export default function AdminPanelLogin({
	adminPanelLoginModalVisible,
	setAdminPanelLoginModalVisible,
}: AdminPanelLoginProps) {
	const [adminLoginData, setAdminLoginData] = useState(InitialAdminLoginState);

	const closeHandler = () => {
		setAdminLoginData(InitialAdminLoginState);
		setAdminPanelLoginModalVisible(false);
	};

	const handleChange = (e: React.ChangeEvent<FormElement>) => {
		const { name, value } = e.target;
		setAdminLoginData({ ...adminLoginData, [name]: value });
	};
	const signIn = async () => {
		console.log('clicked on sign in');
		console.log('admin id is:', adminLoginData.adminId);
		console.log('password is:', adminLoginData.password);
		if (
			adminLoginData.adminId === process.env.NEXT_PUBLIC_SECRET_ADMIN_ID &&
			adminLoginData.password === process.env.NEXT_PUBLIC_SECRET_PASSWORD
		) {
			console.log('admin logged in successfully');
		} else {
			console.log('admin login failed');
		}
	};

	return (
		<div>
			<Modal
				preventClose
				visible={adminPanelLoginModalVisible}
				closeButton
				blur
				aria-labelledby="modal-title"
				aria-label="modal-title"
				open={adminPanelLoginModalVisible}
				onClose={closeHandler}
				width="500px"
			>
				<Modal.Header>
					<div>
						<div className="text-3xl text-pink-600 font-bold">
							Admin panel 👨🏻‍💻
						</div>
					</div>
				</Modal.Header>
				<Divider />
				<Modal.Body>
					<Input
						clearable
						bordered
						fullWidth
						color="primary"
						size="lg"
						placeholder="Admin ID"
						aria-labelledby="modal-title"
						aria-label="modal-title"
						onChange={handleChange}
						value={adminLoginData.adminId}
						name="adminId"
					/>
					<Input
						clearable
						bordered
						fullWidth
						color="primary"
						size="lg"
						placeholder="Password"
						aria-labelledby="modal-title"
						aria-label="modal-title"
						onChange={handleChange}
						value={adminLoginData.password}
						name="password"
					/>
					<Row justify="space-between">
						<Checkbox>
							<Text size={14}>Remember me</Text>
						</Checkbox>
						<Text size={14}>Forgot password?</Text>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button auto flat color="error" onPress={closeHandler}>
						Close
					</Button>
					<Button auto onPress={signIn}>
						Sign in
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
