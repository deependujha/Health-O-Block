import React, { useState } from 'react';
import { Card } from '@nextui-org/react';
import AcceptRequestModal from '../Modals/AcceptRequestModal';

type Props = {
	name: string;
	addr: string;
};

const RequestCard = ({ name, addr }: Props) => {
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
					<div>{name} wants to share documents with you.</div>
				</Card.Body>
			</Card>
			<AcceptRequestModal
				visible={acceptReqModalVisible}
				setVisible={setAcceptReqModalVisible}
				addr={addr}
				name={name}
			/>
		</div>
	);
};

export default RequestCard;
