import React from 'react';
import { Card, Divider } from '@nextui-org/react';
import Image from 'next/image';

type PdfType = {
	myFileName: string;
	ipfsHash: string;
};
const UploadedDocLayout = ({ myFileName, ipfsHash }: PdfType) => {
	// console.log('name is:', myFileName);
	// console.log("ipfs hash is: ", ipfsHash)
	return (
		<Card css={{ mw: '200px' }}>
			<Card.Body>
				<div className="flex justify-center">
					<Image
						src="/assets/pdf.png"
						width={100}
						height={100}
						alt="pdf icon"
					/>
				</div>
				<div className="my-2">
					<Divider />
				</div>
				<div className="text-center overflow-hidden">{myFileName}</div>
			</Card.Body>
		</Card>
	);
};

export default UploadedDocLayout;
