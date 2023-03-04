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
import axios from 'axios';
import { getSigner } from '@/utils/SmartContractFunctions';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { changeValue } from '@/redux/slices/RefreshSlice';

type Props = {
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
	addr: string;
	name: string;
};

export default function AcceptRequestModal({
	visible,
	setVisible,
	addr,
	name,
}: Props) {
	const router = useRouter();
	const dispatch = useDispatch();
	const [loadingAccept, setLoadingAccept] = useState(false);

	const closeHandler = () => {
		setVisible(false);
		// console.log('closed');
	};

	const acceptReq = async () => {
		setLoadingAccept(true);
		const signer = await getSigner();
		if (!signer) return;
		const docAddr = await signer.getAddress();
		axios
			.post(`http://localhost:7000/document/share/accept`, {
				user: addr,
				doctor: docAddr,
			})
			.then((res) => {
				setVisible(false);
				dispatch(changeValue());
				Swal.fire({
					icon: 'success',
					title: 'Request accepted',
					text: 'You can now view the documents',
				});
			})
			.catch((err) => {
				console.log(err);
				setVisible(false);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!',
				});
			});
	};
	return (
		<div>
			<Modal
				closeButton
				blur
				preventClose
				aria-labelledby="modal-title"
				open={visible}
				onClose={closeHandler}
			>
				<Modal.Header>
					<div className="text-2xl text-pink-600 font-bold">New request ⛑️</div>
				</Modal.Header>
				<Divider />
				<Modal.Body>
					<div className="text-lg text-purple-800 font-bold">
						<span className="text-blue-500">{name} </span>
						Wants to share documents with you.
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button auto flat color="error" onPress={closeHandler}>
						Cancel
					</Button>

					<Button auto onPress={acceptReq}>
						{loadingAccept ? <Loading color={'white'} /> : 'Accept'}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
