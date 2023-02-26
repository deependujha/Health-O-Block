// Deployed on polygon mumbai chain
export const DEPLOYED_ADDRESS = '0x0D82D61D67f375B0716C93222aC63f53fB9eFd04';

export const ABI = [
	{
		inputs: [
			{
				internalType: 'address',
				name: '_nominee',
				type: 'address',
			},
		],
		name: 'addNominee',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		name: 'docSharedWithDoctor',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_addr',
				type: 'address',
			},
		],
		name: 'getAllDocsAsNominee',
		outputs: [
			{
				internalType: 'string[]',
				name: '',
				type: 'string[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getAllMyDocs',
		outputs: [
			{
				internalType: 'string[]',
				name: '',
				type: 'string[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_addr',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: '_idx',
				type: 'uint256',
			},
		],
		name: 'getDocSharedByCitizen',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'isNominee',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_nominee',
				type: 'address',
			},
		],
		name: 'removeNominee',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_addr',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'idx',
				type: 'uint256',
			},
		],
		name: 'removeShareHealthDocWithDoctor',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_addr',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'idx',
				type: 'uint256',
			},
		],
		name: 'shareHealthDocWithDoctor',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_doctorAddress',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_realUser',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: '_idx',
				type: 'uint256',
			},
		],
		name: 'shareHealthDocWithDoctorAsNominee',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: '_ipfsHash',
				type: 'string',
			},
		],
		name: 'uploadNewDoc',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
];
