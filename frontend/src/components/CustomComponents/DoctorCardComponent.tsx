import React, { useState } from 'react';
import { Card, Grid, Text, Button, Row } from '@nextui-org/react';
import Image from 'next/image';
import RemoveNomineeConfirmation from '../Modals/RemoveNomineeConfirmation';
import { imageUrlForBackend } from '@/utils/ImageUrlForBackend';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';

type props = {
	name: string;
	imageUrl: string;
    walletAddress: string;
    email: string;
    description:string
};

const DoctorCardComponent = ({ name, imageUrl, walletAddress, email, description }: props) => {
	const myImageUrl = imageUrlForBackend(imageUrl, true);

	const shareDocBtn = () => {
		console.log('clicked on share doc button');
	};

	return (
		<div className="flex justify-center my-4">
			<Card style={{ width: '50vw', height: '250px' }}>
				<Card.Body>
					<div className="flex my-auto">
						<div className="pr-4" style={{ borderRight: '2px solid black' }}>
							<Image
								src={myImageUrl}
								width={300}
								height={250}
								alt="nomineeImg"
							/>
						</div>

						<div className="text-lg font-bold text-blue-500 px-8 flex my-auto">
							<div>
								<div>
									<span className="text-black">Name: </span>
									{name}
								</div>
								<div>
									<span className="text-black">Email: </span>
									{email}
								</div>
								<div>
									<span className="text-black">About: </span>
									{description}
								</div>
								<div className="overflow-hidden">
									<span className="text-black">WalletAddress: </span>
									{walletAddress}
								</div>
							</div>
						</div>
					</div>
				</Card.Body>
			</Card>
		</div>
	);
};

export default DoctorCardComponent;
