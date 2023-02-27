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
import { getContract } from '@/utils/ContractViewFunctions';
import { Transaction } from 'ethers';

type Props = {
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
	user: string;
	index: number;
	asNominee: boolean;
};

export default function ShareDocModal({
	visible,
	setVisible,
	user,
	index,
	asNominee,
}: Props) {
	const [drName, setDrName] = useState('');
	const [drEmail, setDrEmail] = useState('');
	const [drImg, setDrImg] = useState('');
	const [loading, setLoading] = useState(false);
	const [shareDocStatus, setShareDocStatus] = useState(false);
	const [addr, setAddr] = useState('');
	const [noDoctorFound, setNoDoctorFound] = useState(false);
	const [sharingDoc, setSharingDoc] = useState(false);

	const closeHandler = () => {
		setVisible(false);
		// console.log('closed');
	};

	const searchDoctor = async () => {
		setLoading(true);
		axios
			.get(`http://localhost:7000/doctor/${addr}`)
			.then((res) => {
				setLoading(false);
				if (res.data === 'user not found') {
					setNoDoctorFound(true);
				} else {
					setNoDoctorFound(false);
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

	const shareTheDocAsNominee = async () => {
		const contract = await getContract();
		if (!contract) return;
		contract
			.shareHealthDocWithDoctorAsNominee(addr, user, index)
			.then((tx: any) => {
				console.log('transaction occured : ', tx.hash);
				return tx
					.wait()
					.then(() => {
						console.log('Doc sharing successfully');
						axios
							.post(`http://localhost:7000/document/share`, {
								user,
								doctor: addr,
								index,
							})
							.then((res) => {
								setVisible(false);
								setSharingDoc(false);
								Swal.fire({
									icon: 'success',
									title: 'Success',
									text: 'Doc sharing successful',
									timer: 1500,
									showConfirmButton: false,
								});
							})
							.catch((err) => {
								console.log(err);
								setVisible(false);
								setSharingDoc(false);
								Swal.fire({
									icon: 'error',
									title: 'Error!',
									text: 'Error occurred while sharing the Doc',
									timer: 1500,
									showConfirmButton: false,
								});
							});
					})
					.catch((err: Error) => {
						console.log(
							'Printing error msg in overwritting text -1: ',
							err.message
						);
						setVisible(false);
						setSharingDoc(false);
						Swal.fire({
							icon: 'error',
							title: 'Error!',
							text: 'Error occurred while sharing the Doc',
							timer: 1500,
							showConfirmButton: false,
						});
					});
			})
			.catch((err: Error) => {
				console.log('Printing error msg in transaction hash -2: ', err.message);
				setVisible(false);
				setSharingDoc(false);
				Swal.fire({
					icon: 'error',
					title: 'Error!',
					text: 'An unexpected error occurred while sharing the Doc. Please try again later',
				});
			});
	};
	const shareTheDocAsUser = async () => {
		const contract = await getContract();
		if (!contract) return;
		contract
			.shareHealthDocWithDoctor(addr, index)
			.then((tx: any) => {
				console.log('transaction occured : ', tx.hash);
				return tx
					.wait()
					.then(() => {
						console.log('Doc sharing successfully');
						axios
							.post(`http://localhost:7000/document/share`, {
								user,
								doctor: addr,
								index,
							})
							.then((res) => {
								setVisible(false);
								setSharingDoc(false);
								Swal.fire({
									icon: 'success',
									title: 'Success',
									text: 'Doc sharing successful',
									timer: 1500,
									showConfirmButton: false,
								});
							})
							.catch((err) => {
								console.log(err);
								setVisible(false);
								setSharingDoc(false);
								Swal.fire({
									icon: 'error',
									title: 'Error!',
									text: 'Error occurred while sharing the Doc',
									timer: 1500,
									showConfirmButton: false,
								});
							});
					})
					.catch((err: Error) => {
						setVisible(false);
						setSharingDoc(false);
						console.log(
							'Printing error msg in overwritting text -1: ',
							err.message
						);
						Swal.fire({
							icon: 'error',
							title: 'Error!',
							text: 'Error occurred while sharing the Doc',
							timer: 1500,
							showConfirmButton: false,
						});
					});
			})
			.catch((err: Error) => {
				setSharingDoc(false);
				setVisible(false);
				console.log('Printing error msg in transaction hash -2: ', err.message);
				Swal.fire({
					icon: 'error',
					title: 'Error!',
					text: 'An unexpected error occurred while sharing the Doc. Please try again later',
				});
			});
	};

	const shareTheDoc = async () => {
		setSharingDoc(true);
		if (asNominee) {
			shareTheDocAsNominee();
		} else {
			shareTheDocAsUser();
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
					{!loading && noDoctorFound && (
						<div className="text-lg my-3 text-red-500 font-bold  text-center">
							No doctor found with this address
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
							{sharingDoc ? (
								<div className="flex justify-center">
									<Loading color={'white'} />
								</div>
							) : (
								<div>Share Doc</div>
							)}
						</Button>
					)}
				</Modal.Footer>
			</Modal>
		</div>
	);
}
