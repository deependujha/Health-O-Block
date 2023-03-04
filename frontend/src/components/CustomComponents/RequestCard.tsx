import React, { useState } from 'react';
import { Card } from '@nextui-org/react';
import AcceptRequestModal from '../Modals/AcceptRequestModal';

const RequestCard = () => {
	const [acceptReqModalVisible, setAcceptReqModalVisible] = useState(false);
	const cardClicked = async () => {
		setAcceptReqModalVisible(true);
	};

	return (
		<div className="flex justify-center my-8">
			<Card
				isPressable
				isHoverable
				variant="bordered"
				css={{ mw: '60vw' }}
				onClick={cardClicked}
			>
				<Card.Body>
					<div>{}Deependu Jha wants to share documents with you.</div>
				</Card.Body>
			</Card>
			<AcceptRequestModal
				visible={acceptReqModalVisible}
				setVisible={setAcceptReqModalVisible}
			/>
		</div>
	);
};

export default RequestCard;
