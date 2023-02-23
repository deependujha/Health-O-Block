import React from 'react';
import {
	Modal,
	Button,
	Text,
	Input,
	Row,
	Checkbox,
	Divider,
} from '@nextui-org/react';
import Image from 'next/image';

type Props = {
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
	userData: {
		name: string;
		email: string;
		walletAddress: string;
		imageUrl: string;
	};
};
export default function SearchUserModal({
	visible,
	setVisible,
	userData,
}: Props) {
	const closeHandler = () => {
		setVisible(false);
	};

	const addNominee = async () => {
		console.log('add nominee');
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
					<div className="text-3xl font-bold text-pink-500">User found 🤠</div>
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
				</Modal.Body>
				<Modal.Footer>
					<Button auto flat color="error" onPress={closeHandler}>
						Close
					</Button>
					<Button auto onPress={addNominee}>
						Add nominee
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
