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
};

const NomineeCardComponent = ({ name, imageUrl, walletAddress }: props) => {
	const [removeNomineeModalVisible, setRemoveNomineeModalVisible] =
		useState(false);

	const myImageUrl = imageUrlForBackend(imageUrl,false);

	const removeNomineeBtn = () => {
		setRemoveNomineeModalVisible(true);
	};

	return (
		<div className="mx-3">
			<Card style={{ width: '200px' }}>
				<Card.Body>
					<div>
						<div className="flex justify-center">
							<Image
								src={myImageUrl}
								width={100}
								height={100}
								alt="nomineeImg"
							/>
						</div>
						<div className="text-lg font-bold text-blue-500 text-center">
							{name}
						</div>
					</div>
					<Card.Divider />
					<div className="flex justify-center mt-3">
						<Button size="sm" color={'error'} onPress={removeNomineeBtn}>
							Remove Nominee
						</Button>
					</div>
				</Card.Body>
			</Card>
			<div>
				<RemoveNomineeConfirmation
					removeNomineeModalVisible={removeNomineeModalVisible}
					setRemoveNomineeModalVisible={setRemoveNomineeModalVisible}
					name={name}
					walletAddress={walletAddress}
				/>
			</div>
		</div>
	);
};

export default NomineeCardComponent;
