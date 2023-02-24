import React, { useState } from 'react';
import { Card, Grid, Text, Button, Row } from '@nextui-org/react';
import Image from 'next/image';
import RemoveNomineeConfirmation from '../Modals/RemoveNomineeConfirmation';

const NomineeCardComponent = () => {
	const [removeNomineeModalVisible, setRemoveNomineeModalVisible] =
		useState(false);

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
								src="/assets/dummyImg.png"
								width={100}
								height={100}
								alt="nomineeImg"
							/>
						</div>
						<div className="text-lg font-bold text-blue-500 text-center">
							Deependu Jha
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
				/>
			</div>
		</div>
	);
};

export default NomineeCardComponent;
