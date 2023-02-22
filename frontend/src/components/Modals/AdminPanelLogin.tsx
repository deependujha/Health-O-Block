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
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setAllowed } from '@/redux/slices/AdminPanelSlice';

type AdminPanelLoginProps = {
	adminPanelLoginModalVisible: boolean;
	setAdminPanelLoginModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const InitialAdminLoginState = {
	adminId: '',
	password: '',
	loading: false,
};

export default function AdminPanelLogin({
	adminPanelLoginModalVisible,
	setAdminPanelLoginModalVisible,
}: AdminPanelLoginProps) {
	const dispatch = useDispatch();
	const myRouter = useRouter();
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
		setAdminLoginData({ ...adminLoginData, loading: true });
		if (
			adminLoginData.adminId === process.env.NEXT_PUBLIC_SECRET_ADMIN_ID &&
			adminLoginData.password === process.env.NEXT_PUBLIC_SECRET_PASSWORD
		) {
			dispatch(setAllowed(true));
			setTimeout(() => {
				myRouter.push('/adminPage');
				setAdminLoginData({ ...adminLoginData, loading: false });
			}, 2000);
		} else {
			setTimeout(() => {
				setAdminLoginData({ ...adminLoginData, loading: false });
				setAdminPanelLoginModalVisible(false);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Sorry! wrong admin ID or password.',
				});
			}, 2000);
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
						{adminLoginData.loading ? (
							<Loading color={'white'} />
						) : (
							<div>Sign in</div>
						)}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
