import React, { use, useEffect, useState } from 'react';
import { getContract } from '@/utils/ContractViewFunctions';
import UploadedDocLayout from '@/components/CustomComponents/UploadedDocLayout';
import { Loading } from '@nextui-org/react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type PdfType = {
	myFileName: string;
	ipfsHash: string;
};

type Props = {
	userName: string;
	addr: string;
};

const NomineeDocs = () => {
	const { userAddress, userName } = useSelector(
		(state: RootState) => state.showNominee
	);
	const [loading, setLoading] = useState(false);
	const [docs, setDocs] = useState<PdfType[]>([]);

	// console.log('useraddress is: ', userAddress);
	// console.log('username is: ', userName);

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
		contract
			.getAllDocsAsNominee(userAddress)
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
				console.log('fetching resulted into error');
				console.log(err);
			});
	};
	const fetchAllMyDocs = async () => {
		getAllMyDocs();
	};

	useEffect(() => {
		fetchAllMyDocs();
	}, [userAddress]);

	return (
		<div className="pt-20">
			<div className="text-center text-xl font-mono text-pink-500 font-bold mb-4">
				Documents of '{userName}'
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
					Seems like they haven't uploaded any documents yet.
				</div>
			)}
			<div className="grid grid-cols-5 gap-5 py-5">
				{docs.map((doc, index) => {
					return (
						<div key={index} className="mx-4 my-4">
							<UploadedDocLayout
								myFileName={doc.myFileName}
								ipfsHash={doc.ipfsHash}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default NomineeDocs;
