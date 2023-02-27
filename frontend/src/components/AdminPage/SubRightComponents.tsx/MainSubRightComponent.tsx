import React from 'react';
import ApproveCitizens from './SearchUser';
import RegisterNewDoctor from './RegisterNewDoctor';
import SuperUserAccess from './SearchDoctor';
import WelcomePage from './WelcomePage';

type MainSubRightComponentProps = {
	curr: 'search_user' | 'register_new_doctor' | 'search_doctor' | 'welcome';
};

const MainSubRightComponent = ({ curr }: MainSubRightComponentProps) => {
	// write all conditions here
	if (curr === 'search_user') {
		return (
			<div>
				<ApproveCitizens />
			</div>
		);
	} else if (curr === 'register_new_doctor') {
		return (
			<div>
				<RegisterNewDoctor />
			</div>
		);
	} else if (curr === 'search_doctor') {
		return (
			<div>
				<SuperUserAccess />
			</div>
		);
	} else if (curr === 'welcome') {
		return (
			<div>
				<WelcomePage />
			</div>
		);
	}

	return <div>MainSubRightComponent: {curr}</div>;
};

export default MainSubRightComponent;
