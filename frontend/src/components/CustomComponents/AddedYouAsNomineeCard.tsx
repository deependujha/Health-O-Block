import React, { useState } from 'react';
import { Card, Grid, Text, Button, Row } from '@nextui-org/react';
import Image from 'next/image';
import RemoveNomineeConfirmation from '../Modals/RemoveNomineeConfirmation';
import { imageUrlForBackend } from '@/utils/ImageUrlForBackend';
import { useDispatch } from 'react-redux';
import { setShowNomineePdf } from '@/redux/slices/ShowNomineePdf';

const AddedYouAsNomineeCard = ({ user }: any) => {
	const dispatch = useDispatch();
	const myImgUrl = imageUrlForBackend(user.imageUrl, false);
	const viewDocsBtn = () => {
		// console.log('user wallet address is:', user.walletAddress);
		dispatch(
			setShowNomineePdf({
				showNomineePdf: true,
				userName: user.name,
				userAddress: user.walletAddress,
			})
		);
	};

	return (
		<div className="mx-3 mt-32">
			<Card style={{ width: '300px' }}>
				<Card.Body>
					<div>
						<div className="flex justify-center">
							<Image src={myImgUrl} width={250} height={250} alt="nomineeImg" />
						</div>
						<div className="text-lg font-bold text-blue-500 text-center">
							{user.name}
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
