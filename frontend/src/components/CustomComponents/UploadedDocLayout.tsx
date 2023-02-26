import React from 'react';
import { Button, Card, Divider } from '@nextui-org/react';
import Image from 'next/image';

type PdfType = {
	myFileName: string;
	ipfsHash: string;
};
const UploadedDocLayout = ({ myFileName, ipfsHash }: PdfType) => {
	// console.log('myipfsHash', ipfsHash);
	const shareDoc = () => {
		console.log('clicked on share doc with ipfsHash: ', ipfsHash);
	};

	return (
		<Card css={{ mw: '200px' }}>
			<Card.Body>
				<div>
					<a
						style={{ cursor: 'pointer' }}
						target="_blank"
						href={`https://gateway.ipfscdn.io/ipfs/${ipfsHash}`}
					>
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
						<div className="my-2"></div>
						<Divider />
					</a>
					<div className="flex justify-center my-2">
						<Button color="secondary" auto onPress={shareDoc}>
							share
						</Button>
					</div>
				</div>
			</Card.Body>
		</Card>
	);
};

export default UploadedDocLayout;
