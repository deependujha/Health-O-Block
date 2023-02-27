import React, { useState } from 'react';
import { Button, Card, Divider } from '@nextui-org/react';
import Image from 'next/image';
import ShareDocModal from '../Modals/ShareDocModal';
import { useRouter } from 'next/router';

type PdfType = {
	myFileName: string;
	ipfsHash: string;
	index: number;
	user: string;
	asNominee: boolean;
};
const UploadedDocLayout = ({
	myFileName,
	ipfsHash,
	index,
	user,
	asNominee,
}: PdfType) => {
	const router = useRouter();
	const isDoctor = router.pathname === '/doctor';
	const [visible, setVisible] = useState(false);
	// console.log('myipfsHash', ipfsHash);
	const shareDoc = () => {
		// console.log('clicked on share doc with ipfsHash: ', ipfsHash);
		// console.log('index is: ', index);
		setVisible(true);
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
					</a>
					{!isDoctor && (
						<div>
							<Divider />
							<div className="flex justify-center my-2">
								<Button color="secondary" auto onPress={shareDoc}>
									share
								</Button>
							</div>
						</div>
					)}
				</div>
				<ShareDocModal
					visible={visible}
					setVisible={setVisible}
					index={index}
					user={user}
					asNominee={asNominee}
				/>
			</Card.Body>
		</Card>
	);
};

export default UploadedDocLayout;
