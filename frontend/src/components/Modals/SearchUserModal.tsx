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
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setRefreshVal } from '@/redux/slices/CitizenSlice';
import { getContract } from '@/utils/ContractViewFunctions';

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

type NomineeStatus = 'already' | 'no' | 'loading';

export default function SearchUserModal({
	visible,
	setVisible,
	userData,
}: Props) {
	const dispatch = useDispatch();
	const { address } = useSelector((state: RootState) => state.citizen);
	const [nomineeStatus, setNomineeStatus] = useState<NomineeStatus>('loading');

	const fetchNomineeStatus = async () => {
		axios
			.get(`http://localhost:7000/nominee`, {
				params: { user: address, nominee: userData.walletAddress },
			})
			.then((res) => {
				console.log(res.data);
				if (res.data === 'No nominee found') {
					setNomineeStatus('no');
				} else {
					setNomineeStatus('already');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		if (userData.walletAddress) fetchNomineeStatus();
	}, [userData.walletAddress]);

	const closeHandler = () => {
		setVisible(false);
	};

	const addNominee = async () => {
		// console.log('add nominee');
		if (nomineeStatus === 'no') {
			const myContract = await getContract();
			if (!myContract) return;
			myContract
				.addNominee(userData.walletAddress)
				.then((tx: any) => {
					console.log('transaction occured : ', tx.hash);
					return tx
						.wait()
						.then(() => {
							console.log('nominee added successfully');
							axios
								.post('http://localhost:7000/nominee', {
									user: address,
									nominee: userData.walletAddress,
								})
								.then((res) => {
									setVisible(false);
									console.log(res.data);
									setNomineeStatus('already');
									Swal.fire({
										icon: 'success',
										title: 'Nominee added successfully',
										showConfirmButton: false,
										timer: 1500,
									});
									dispatch(setRefreshVal());
								})
								.catch((err) => {
									setVisible(false);
									console.log(err);
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
							setVisible(false);
							Swal.fire({
								icon: 'error',
								title: 'Oops...',
								text: 'Something went wrong!',
							});
						});
				})

				.catch((err: Error) => {
					console.log(
						'Printing error msg in transaction hash -2: ',
						err.message
					);
					setVisible(false);
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Something went wrong!',
					});
				});
		} else {
			return;
		}
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
						{nomineeStatus === 'loading' ? (
							<div className="">
								<Loading color={'white'} />
							</div>
						) : (
							<div></div>
						)}
						{nomineeStatus === 'no' ? (
							<div className="">Add nominee</div>
						) : (
							<div></div>
						)}
						{nomineeStatus === 'already' ? (
							<div className="">Already added as nominee</div>
						) : (
							<div></div>
						)}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
