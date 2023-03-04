import RequestCard from '@/components/CustomComponents/RequestCard';
import React, { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { Loading } from '@nextui-org/react';
import axios from 'axios';
import { getSigner } from './UploadDocs';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const AcceptRequest = () => {
	const { value } = useSelector((state: RootState) => state.Refresh);
	const [loading, setLoading] = useState(true);
	const [pendingReqs, setPendingReqs] = useState<any>([]);

	const fetchPendingRequests = async () => {
		setLoading(true);
		// fetch pending requests
		const signer = await getSigner();
		if (!signer) return;
		const address = await signer.getAddress();
		axios
			.get(`http://localhost:7000/document/pendingReq/${address}`)
			.then((res) => {
				setLoading(false);
				// console.log('res is: ', res.data);
				setPendingReqs(res.data);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};

	useEffect(() => {
		fetchPendingRequests();
	}, [value]);

	return (
		<div>
			<div className="font-bold text-4xl font-mono text-pink-500 text-center py-10">
				Requests
			</div>
			<hr />

			<div>
				{loading && (
					<div className="flex justify-center my-40">
						<Loading />
					</div>
				)}

				{!loading && pendingReqs.length === 0 && (
					<div className="text-center my-40 text-xl font-bold font-mono text-pink-500">
						No new requests
					</div>
				)}

				<SimpleBar style={{ maxHeight: '75vh' }}>
					{pendingReqs.map((user: any, index: number) => {
						return (
							<div key={index}>
								<RequestCard name={user.name} addr={user.walletAddress} />
							</div>
						);
					})}
				</SimpleBar>
			</div>
		</div>
	);
};

export default AcceptRequest;
