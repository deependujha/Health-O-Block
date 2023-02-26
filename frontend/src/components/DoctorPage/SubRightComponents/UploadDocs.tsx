import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { useStorageUpload } from '@thirdweb-dev/react';
import extractIPFSCID from '@/utils/ExtractIPFSCID';
import UploadingDocumentLoadingModal from '@/components/Modals/UploadingDocumentLoadingModal';

import { ethers } from 'ethers';
import { ABI, DEPLOYED_ADDRESS } from '@/Constants';
import Swal from 'sweetalert2';

export const getSigner = async () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	// MetaMask requires requesting permission to connect users accounts
	await provider.send('eth_requestAccounts', []);
	const { chainId } = await provider.getNetwork();
	if (chainId !== 80001) {
		alert('Please connect to Mumbai Testnet');
		return;
	}
	const signer = provider.getSigner();
	return signer;
};

const UploadNewDoc = () => {
	const [url, setUrl] = useState('');
	const [visibleUploadLoadingModal, setVisibleUploadLoadingModal] =
		useState(false);
	const [myFile, setMyFile] = useState<File | null>(null);
	const [myFileName, setMyFileName] = useState('');

	const { mutateAsync: upload } = useStorageUpload();

	const uploadDocFunction = async (_ipfsHash: string) => {
		const signer = await getSigner();
		let contract = new ethers.Contract(DEPLOYED_ADDRESS, ABI, signer);
		contract
			.uploadNewDoc(_ipfsHash)
			.then((tx: any) => {
				console.log('transaction occured : ', tx.hash);
				return tx
					.wait()
					.then(() => {
						setVisibleUploadLoadingModal(false);
						console.log('document uploaded successfully');
						Swal.fire({
							title: 'Success',
							text: 'Document uploaded successfully',
							icon: 'success',
							showConfirmButton: false,
							timer: 1500,
						});
					})
					.catch((err: Error) => {
						setVisibleUploadLoadingModal(false);
						console.log(
							'Printing error msg in overwritting text -1: ',
							err.message
						);
						Swal.fire({
							title: 'Error',
							text: 'Document not uploaded',
							icon: 'error',
							showConfirmButton: false,
							timer: 1500,
						});
					});
			})
			.catch((err: Error) => {
				setVisibleUploadLoadingModal(false);
				console.log('Printing error msg in transaction hash -2: ', err.message);
				Swal.fire({
					title: 'Error',
					text: 'An unexpected error occurred',
					icon: 'error',
					showConfirmButton: false,
					timer: 1500,
				});
			});
	};

	// Handle the `onChange` event of the `file` input
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const files = e.target.files;
		setMyFile(files[0]);
		files.length > 0 && setUrl(URL.createObjectURL(files[0]));
	};

	const uploadFile = async () => {
		if (!url || !myFile || !myFileName) {
			alert('Please select a file & give it a name to upload');
			return;
		}
		console.log('uploading file');
		setVisibleUploadLoadingModal(true);
		const uploadUrl = await upload({
			data: [myFile],
			options: {
				uploadWithGatewayUrl: true,
				uploadWithoutDirectory: true,
			},
		});

		const myIPFSCID = extractIPFSCID(uploadUrl[0]);
		console.log('my ipfs cid is: ', myIPFSCID);
		await uploadDocFunction(myIPFSCID);
		setMyFile(null);
		setUrl('');
		setMyFileName('');
	};

	return (
		<div>
			<div className="text-2xl font-bold text-pink-500 text-center py-28">
				Upload your health document:
			</div>
			<div>
				<div className="flex justify-center">
					<input type="file" accept=".pdf" onChange={onChange} />
				</div>
				<div>
					{url && (
						<div className="flex justify-center my-3">
							<Input
								placeholder="Give a name to the document"
								aria-label="name"
								width="300px"
								value={myFileName}
								onChange={(e) => setMyFileName(e.target.value)}
							/>
						</div>
					)}
				</div>
				<div className="flex justify-center py-3">
					<Button size="lg" color="secondary" onPress={uploadFile}>
						Upload
					</Button>
				</div>

				<div>
					{url && (
						<div
							className="flex justify-center py-4"
							style={{
								border: '1px solid rgba(0, 0, 0, 0.3)',
								height: '100%',
							}}
						>
							<embed src={url} width="80%" height="820"></embed>
						</div>
					)}
				</div>
			</div>
			<UploadingDocumentLoadingModal visible={visibleUploadLoadingModal} />
		</div>
	);
};

export default UploadNewDoc;
