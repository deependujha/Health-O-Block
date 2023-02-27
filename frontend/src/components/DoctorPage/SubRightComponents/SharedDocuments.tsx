import AddedYouAsNomineeCard from '@/components/CustomComponents/AddedYouAsNomineeCard';
import { Loading } from '@nextui-org/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { getSigner } from './UploadDocs';

const SharedDocuments = () => {
	const [loading, setLoading] = useState(true);
	const [users, setUsers] = useState<any>([]);

	const fetchThoseWhoSharedDocWithYou = async () => {
		const signer = await getSigner();
		if (!signer) return;
		const address = await signer.getAddress();
		axios
			.get(`http://localhost:7000/document/share/${address}`)
			.then((res) => {
				setLoading(false);
				setUsers(res.data);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
				setLoading(false);
			});
	};

	useEffect(() => {
		setLoading(true);
		fetchThoseWhoSharedDocWithYou();
	}, []);

	return (
		<div className="pt-16">
			<div className="text-center pb-4 font-bold text-pink-500 font-mono text-xl">
				Shared Documents
			</div>
			<hr />
			<div className="flex overflow-hidden justify-center">
				{loading && (
					<div className="flex justify-center py-24">
						<Loading color={'white'} />
					</div>
				)}
				{users.map((user: any, idx: number) => {
					return <AddedYouAsNomineeCard key={idx} user={user} />;
				})}

				{loading === false && users.length === 0 && (
					<div className="text-xl font-bold font-mono text-white py-40">
						Seems like no one has added you as their nominee.👨‍⚕️
					</div>
				)}
			</div>
		</div>
	);
};

export default SharedDocuments;
