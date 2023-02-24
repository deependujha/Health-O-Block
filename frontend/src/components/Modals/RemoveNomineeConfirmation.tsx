import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Modal, Button, Divider, Loading } from '@nextui-org/react';

type RemoveNomineeConfirmationProps = {
	removeNomineeModalVisible: boolean;
	setRemoveNomineeModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RemoveNomineeConfirmation({
	removeNomineeModalVisible,
	setRemoveNomineeModalVisible,
}: RemoveNomineeConfirmationProps) {
	const [loadingRemove, setLoadingRemove] = useState(false);

	const removeNomineeFunction = async () => {
		setLoadingRemove(true);
		setTimeout(() => {
			console.log('clicked on remove nominee btn');
			setLoadingRemove(false);
			setRemoveNomineeModalVisible(false);
		}, 1500);
	};

	const closeHandler = () => {
		setRemoveNomineeModalVisible(false);
	};
	return (
		<div>
			<Modal
				closeButton
				blur
				aria-labelledby="modal-title"
				open={removeNomineeModalVisible}
				onClose={closeHandler}
			>
				<Modal.Header>
					<div className="text-2xl text-pink-600 font-bold">
						Remove Nominee❗
					</div>
				</Modal.Header>
				<Divider />
				<Modal.Body>
					<div className="text-lg text-red-500 font-bold">
						Are you sure you want to remove Deependu as nominee?
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button auto flat color={'warning'} onPress={closeHandler}>
						Cancel
					</Button>
					<Button auto onPress={removeNomineeFunction} color="error">
						{loadingRemove ? <Loading color={'white'} /> : 'remove'}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
