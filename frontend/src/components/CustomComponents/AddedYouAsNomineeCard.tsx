import React, { useState } from 'react';
import { Card, Grid, Text, Button, Row } from '@nextui-org/react';
import Image from 'next/image';
import RemoveNomineeConfirmation from '../Modals/RemoveNomineeConfirmation';

const AddedYouAsNomineeCard = () => {
	const viewDocsBtn = () => {
		console.log('clicked on view docs button');
	};

	return (
		<div className="mx-3 mt-32">
			<Card style={{ width: '300px' }}>
				<Card.Body>
					<div>
						<div className="flex justify-center">
							<Image
								src="/assets/dummyImg.png"
								width={250}
								height={250}
								alt="nomineeImg"
							/>
						</div>
						<div className="text-lg font-bold text-blue-500 text-center">
							Deependu Jha
						</div>
					</div>
					<Card.Divider />
					<div className="flex justify-center mt-3">
						<Button size="sm" color={'error'} onPress={viewDocsBtn}>
							View Docs
						</Button>
					</div>
				</Card.Body>
			</Card>
		</div>
	);
};

export default AddedYouAsNomineeCard;
