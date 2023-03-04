import RequestCard from '@/components/CustomComponents/RequestCard';
import React from 'react';

const AcceptRequest = () => {
	return (
		<div>
			<div className="font-bold text-4xl font-mono text-pink-500 text-center py-10">
				Requests
			</div>
			<hr />

			<div>
				<RequestCard />
			</div>
		</div>
	);
};

export default AcceptRequest;
