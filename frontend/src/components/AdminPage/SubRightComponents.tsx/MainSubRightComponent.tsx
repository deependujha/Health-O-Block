import React from 'react';
import ApproveCitizens from './ApproveCitizens';
import RegisterNewDoctor from './RegisterNewDoctor';
import SuperUserAccess from './SuperUserAccess';
import WelcomePage from './WelcomePage';

type MainSubRightComponentProps = {
	curr:
		| 'approve_citizens'
		| 'register_new_doctor'
		| 'superuser_access'
		| 'welcome';
};

const MainSubRightComponent = ({ curr }: MainSubRightComponentProps) => {
	// write all conditions here
	if (curr === 'approve_citizens') {
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
	} else if (curr === 'superuser_access') {
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
