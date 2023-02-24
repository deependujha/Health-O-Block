import AddedYouAsNomineeCard from '@/components/CustomComponents/AddedYouAsNomineeCard';
import React from 'react';

const Nominee = () => {
	return (
		<div className="text-center pt-28">
			<div className="text-xl text-pink-600 font-mono font-bold">
				These people have trusted you as their nominee.
			</div>
			<div className="flex overflow-hidden justify-center">
				<AddedYouAsNomineeCard />
				<AddedYouAsNomineeCard />
				<AddedYouAsNomineeCard />
			</div>
		</div>
	);
};

export default Nominee;
