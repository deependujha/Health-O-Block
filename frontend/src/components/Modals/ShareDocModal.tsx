import React, { useState } from 'react';
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
import axios from 'axios';
import Swal from 'sweetalert2';

type Props = {
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ShareDocModal({ visible, setVisible }: Props) {
	const [drName, setDrName] = useState('');
	const [drEmail, setDrEmail] = useState('');
	const [drImg, setDrImg] = useState('');
	const [loading, setLoading] = useState(false);
	const [shareDocStatus, setShareDocStatus] = useState(false);
	const [addr, setAddr] = useState('');

	const closeHandler = () => {
		setVisible(false);
		console.log('closed');
	};

	const searchDoctor = async () => {
		setLoading(true);
		axios
			.get(`http://localhost:7000/doctor/${addr}`)
			.then((res) => {
				setLoading(false);
				if (res.data === 'user not found') {
					Swal.fire({
						icon: 'error',
						title: 'No user found!',
						text: 'Seems like the wallet address is not registered.',
					});
				} else {
					const { name, email, imageUrl } = res.data;
					setDrName(name);
					setDrEmail(email);
					setDrImg(`http://localhost:7000/doctor/image/${imageUrl}`);
					setShareDocStatus(true);
				}
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!',
				});
			});
	};

	const shareTheDoc = async () => {};

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
					<div className="text-xl font-mono font-bold text-pink-500 text-center">
						Share the Doc
					</div>
				</Modal.Header>
				<Divider />
				<Modal.Body>
					<Input
						aria-label="Doctor Address"
						value={addr}
						onChange={(e) => setAddr(e.target.value)}
						clearable
						bordered
						fullWidth
						color="primary"
						size="lg"
						placeholder="Doctor's wallet address"
					/>
					{loading && (
						<div className="flex justify-center my-4">
							<Loading />
						</div>
					)}
					{!loading && drName && (
						<div>
							<div className="flex justify-center">
								<Image
									src={drImg}
									width={150}
									height={150}
									alt="userImage"
									style={{ border: '1px solid black', borderRadius: '20px' }}
								/>
							</div>
							<div className="text-lg my-3 text-pink-500 font-bold  text-center">
								{drName}
							</div>
							<div className="text-lg my-3 text-purple-800 text-center">
								{drEmail}
							</div>
						</div>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button auto flat color="error" onPress={closeHandler}>
						Close
					</Button>
					<Button auto onPress={searchDoctor}>
						Search
					</Button>
					{shareDocStatus && (
						<Button auto onPress={shareTheDoc} color="secondary">
							Share Doc
						</Button>
					)}
				</Modal.Footer>
			</Modal>
		</div>
	);
}
