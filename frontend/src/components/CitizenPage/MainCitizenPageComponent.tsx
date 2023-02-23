import React, { useState } from 'react';
import CitizenPageLeftComponent from './CitizenLeftComponent';
import CitizenPageRightComponent from './CitizenRightConponent';

type currPossibleValues =
	| 'approve_citizens'
	| 'register_new_doctor'
	| 'superuser_access'
	| 'welcome';

const MainCitizenPageComponent = () => {
	const [curr, setCurr] = useState<currPossibleValues>('welcome');

	return (
		<div
			className={`bg-[url('/bg_img/bg3.jpg')] text-white`}
			style={{ height: '100vh', width: '100vw' }}
		>
			<div className="flex justify-around">
				<CitizenPageLeftComponent setCurr={setCurr} />
				<CitizenPageRightComponent curr={curr} />
			</div>
		</div>
	);
};

export default MainCitizenPageComponent;
