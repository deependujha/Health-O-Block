import { ethers } from 'ethers';
import { ABI, DEPLOYED_ADDRESS } from '@/Constants';

export const getContract = async () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	// MetaMask requires requesting permission to connect users accounts
	await provider.send('eth_requestAccounts', []);
	const { chainId } = await provider.getNetwork();
	if (chainId !== 80001) {
		alert('Please connect to Mumbai Testnet');
		return;
	}
	const signer = provider.getSigner();
	let contract = new ethers.Contract(DEPLOYED_ADDRESS, ABI, signer);

	return contract;
};
