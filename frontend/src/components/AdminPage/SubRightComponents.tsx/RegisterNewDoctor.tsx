import { Input, Card, Divider, Textarea, Button } from '@nextui-org/react';
import Image from 'next/image';
import React, { useState } from 'react';

const RegisterNewDoctor = () => {
	const [img, setImg] = useState<File | null>();
	const [name, setName] = useState<string>('');
	const [regNo, setRegNo] = useState<string>('');
	const [walletAddress, setWalletAddress] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	const imageUploader = (val: FileList | null) => {
		// console.log(val);
		// console.log("printing file name.. huihuihui");
		// console.log(val[0].name);
		if (val === null) return;
		setImg(val[0]);
	};

	const registerDoctor = async () => {
		console.log('registering doctor');
		console.log('doctor name: ', name);
		console.log('doctor regNo: ', regNo);
		console.log('doctor walletAddress: ', walletAddress);
		console.log('doctor description: ', description);
	};

	return (
		<div className="flex justify-center py-20">
			<div className="">
				<Card style={{ width: '600px' }}>
					{/* <Card.Header> */}
					<div className="text-2xl font-bold text-pink-500 flex justify-center text-center py-4">
						⚕️👨‍⚕️ Register New Doctor 👩‍⚕️⚕️
					</div>
					<Divider />
					{/* </Card.Header> */}
					<Card.Body>
						<div>
							<div className="my-4 flex justify-center">
								<Image
									src={img ? URL.createObjectURL(img) : '/assets/dummyImg.png'}
									height="200"
									width="200"
									alt="myImage"
									style={{
										border: '1px solid purple',
										borderRadius: '15px',
									}}
								/>
							</div>
							<div className="my-3 flex justify-center">
								<input
									type="file"
									accept="image/png, image/jpg, image/jpeg"
									onChange={(e) => {
										imageUploader(e.target.files);
									}}
								/>
							</div>
							<div className="my-4 flex justify-center">
								<Input
									clearable
									bordered
									value={name}
									onChange={(e) => setName(e.target.value)}
									aria-label="Enter Doctor's name"
									placeholder="Enter Doctor's name"
									color="secondary"
									size="lg"
									style={{ width: '500px' }}
								/>
							</div>
							<div className="my-4 flex justify-center">
								<Input
									clearable
									bordered
									value={regNo}
									onChange={(e) => setRegNo(e.target.value)}
									aria-label="Enter Doctor's registration number"
									placeholder="registration number"
									color="secondary"
									size="lg"
									style={{ width: '500px' }}
								/>
							</div>
							<div className="my-4 flex justify-center">
								<Input
									clearable
									bordered
									value={walletAddress}
									onChange={(e) => setWalletAddress(e.target.value)}
									aria-label="wallet address"
									placeholder="wallet address"
									color="secondary"
									size="lg"
									style={{ width: '500px' }}
								/>
							</div>

							<div className="my-4 flex justify-center">
								<Textarea
									placeholder="Enter Doctor's description"
									aria-label="Doctor description"
									color="secondary"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									size="lg"
									style={{ width: '500px' }}
									rows={3}
								/>
							</div>

							<div className="my-4 flex justify-center">
								<Button
									auto
									size="lg"
									color="secondary"
									style={{ width: '520px' }}
									onPress={registerDoctor}
								>
									Register
								</Button>
							</div>
						</div>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
};

export default RegisterNewDoctor;
