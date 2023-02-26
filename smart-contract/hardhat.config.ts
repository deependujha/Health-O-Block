import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import dotenv from 'dotenv';
dotenv.config();

const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL || '';
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || '';

const config: HardhatUserConfig = {
	solidity: '0.8.17',

	networks: {
		mumbai: {
			url: `${ALCHEMY_API_URL}`,
			accounts: [WALLET_PRIVATE_KEY],
		},
	},
};

export default config;
