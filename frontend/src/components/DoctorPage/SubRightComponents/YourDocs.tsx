import React, { useEffect, useState } from 'react';
import { getContract } from '@/utils/ContractViewFunctions';
import UploadedDocLayout from '@/components/CustomComponents/UploadedDocLayout';
import { Loading } from '@nextui-org/react';
import axios from 'axios';
import { getSigner } from './UploadDocs';

type PdfType = {
	myFileName: string;
	ipfsHash: string;
};

const YourDocs = () => {
	const [loading, setLoading] = useState(false);
	const [docs, setDocs] = useState<PdfType[]>([]);
	const [doctorAddr, setDoctorAddr] = useState('');

	const getFileName = async (ipfsHash: string) => {
		const result = await axios.get(
			`http://localhost:7000/document/${ipfsHash}`
		);

		if (!result.data) return 'no name';
		return result.data.fileName;
	};

	const getAllMyDocs = async () => {
		setLoading(true);
		const contract = await getContract();
		if (!contract) return;
		const signer = await getSigner();
		if (!signer) return;
		const addr = await signer.getAddress();
		setDoctorAddr(addr);
		contract
			.getAllMyDocs()
			.then(async (res: string[]) => {
				let myData = [] as PdfType[];
				for (let i = 0; i < res.length; i++) {
					const fName = await getFileName(res[i]);
					// console.log('my filename is: ', fName);
					myData.push({ myFileName: fName, ipfsHash: res[i] });
				}
				setDocs(myData);
				setLoading(false);
				// console.log('my res is: ', res);
			})
			.catch((err: Error) => {
				setLoading(false);
				console.log(err);
			});
	};
	const fetchAllMyDocs = async () => {
		getAllMyDocs();
	};

	useEffect(() => {
		fetchAllMyDocs();
	}, []);

	return (
		<div className="pt-20">
			<div className="text-center text-xl font-mono text-pink-500 font-bold mb-4">
				your Documents
			</div>
			<hr />
			{loading && (
				<div className="py-72">
					<div className="text-center text-xl font-mono text-pink-500 font-bold mb-4">
						Loading...
					</div>
					<div className="flex justify-center">
						<Loading />
					</div>
				</div>
			)}
			{!loading && docs.length === 0 && (
				<div className="text-center font-mono text-xl text-pink-500 py-72">
					Seems like you haven't uploaded any documents yet.
				</div>
			)}
			<div className="grid grid-cols-5 gap-5 py-5">
				{docs.map((doc, index) => {
					return (
						<div key={index} className="mx-4 my-4">
							<UploadedDocLayout
								myFileName={doc.myFileName}
								ipfsHash={doc.ipfsHash}
								index={index}
								asNominee={false}
								user={doctorAddr}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default YourDocs;
