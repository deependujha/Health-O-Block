import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Modal, Button, Divider, Loading } from '@nextui-org/react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setRefreshVal } from '@/redux/slices/CitizenSlice';
import { getContract } from '@/utils/ContractViewFunctions';

type RemoveNomineeConfirmationProps = {
	removeNomineeModalVisible: boolean;
	setRemoveNomineeModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	name: string;
	walletAddress: string;
};

export default function RemoveNomineeConfirmation({
	removeNomineeModalVisible,
	setRemoveNomineeModalVisible,
	name,
	walletAddress,
}: RemoveNomineeConfirmationProps) {
	const dispatch = useDispatch();
	const { address } = useSelector((state: RootState) => state.citizen);
	const [loadingRemove, setLoadingRemove] = useState(false);

	const removeNomineeFunction = async () => {
		setLoadingRemove(true);
		const myContract = await getContract();
		if (!myContract) return;
		myContract
			.removeNominee(walletAddress)
			.then((tx: any) => {
				console.log('transaction occured : ', tx.hash);
				return tx
					.wait()
					.then(() => {
						console.log('nominee removed successfully');
						axios
							.delete('http://localhost:7000/nominee', {
								params: { user: address, nominee: walletAddress },
							})
							.then((res) => {
								console.log(res.data);
								setLoadingRemove(false);
								setRemoveNomineeModalVisible(false);
								Swal.fire({
									icon: 'success',
									title: 'Success',
									text: 'Nominee removed successfully',
								});
								dispatch(setRefreshVal());
							})
							.catch((err) => {
								console.log(err);
								setLoadingRemove(false);
								setRemoveNomineeModalVisible(false);
								Swal.fire({
									icon: 'error',
									title: 'Oops...',
									text: 'Something went wrong!',
								});
							});
					})
					.catch((err: Error) => {
						console.log(
							'Printing error msg in overwritting text -1: ',
							err.message
						);
						setLoadingRemove(false);
						setRemoveNomineeModalVisible(false);
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'Something went wrong!',
						});
					});
			})
			.catch((err: Error) => {
				console.log('Printing error msg in transaction hash -2: ', err.message);
				setLoadingRemove(false);
				setRemoveNomineeModalVisible(false);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!',
				});
			});
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
						Are you sure you want to remove {name} as nominee?
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
