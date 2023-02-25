import React, { useState } from 'react';
import DoctorPageLeftComponent from './DoctorLeftComponent';
import DoctorPageRightComponent from './DoctorRightComponent';

type currPossibleValues =
	| 'shared_docs'
	| 'your_docs'
	| 'upload_new_docs'
	| 'profile'
	| 'welcome';

const MainDoctorPageComponent = () => {
	const [curr, setCurr] = useState<currPossibleValues>('welcome');

	return (
		<div
			className={`bg-[url('/bg_img/bg3.jpg')] text-white`}
			style={{ height: '100vh', width: '100vw' }}
		>
			<div className="flex justify-around">
				<DoctorPageLeftComponent setCurr={setCurr} />
				<DoctorPageRightComponent curr={curr} />
			</div>
		</div>
	);
};

export default MainDoctorPageComponent;
