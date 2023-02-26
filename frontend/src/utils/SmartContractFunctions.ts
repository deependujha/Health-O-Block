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

export const uploadDoc = async (_ipfsHash: string) => {
	const signer = await getSigner();
	let contract = new ethers.Contract(DEPLOYED_ADDRESS, ABI, signer);
	contract
		.uploadNewDoc(_ipfsHash)
		.then((tx: any) => {
			console.log('transaction occured : ', tx.hash);
			return tx
				.wait()
				.then(() => {
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
