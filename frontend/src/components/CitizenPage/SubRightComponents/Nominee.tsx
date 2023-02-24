import AddedYouAsNomineeCard from '@/components/CustomComponents/AddedYouAsNomineeCard';
import { RootState } from '@/redux/store';
import { Loading } from '@nextui-org/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Nominee = () => {
	const [users, setUsers] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const { address, refreshVal } = useSelector(
		(state: RootState) => state.citizen
	);

	const fetchThoseWhoAddedYouAsNominee = async () => {
		axios
			.get(`http://localhost:7000/nominee/${address}`)
			.then((res) => {
				setUsers(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchThoseWhoAddedYouAsNominee();
	}, [address, refreshVal]);

	if (loading) {
		return (
			<div>
				<div className="flex justify-center pt-40 text-center">
					<Loading />
				</div>
				<div className="text-center">loading...</div>
			</div>
		);
	}
	return (
		<div className="text-center pt-28">
			<div className="text-xl text-pink-600 font-mono font-bold">
				These people have trusted you as their nominee.
			</div>
			<div className="flex overflow-hidden justify-center">
				{users.map((user: any, idx: number) => {
					return <AddedYouAsNomineeCard key={idx} user={user} />;
				})}
			</div>
		</div>
	);
};

export default Nominee;
