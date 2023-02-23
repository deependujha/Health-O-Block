import React, { useState } from 'react';
import CitizenPageLeftComponent from './CitizenLeftComponent';
import CitizenPageRightComponent from './CitizenRightConponent';

type currPossibleValues =
	| 'upload_new_docs'
	| 'your_docs'
	| 'add_nominee'
	| 'nominee'
	| 'profile'
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
