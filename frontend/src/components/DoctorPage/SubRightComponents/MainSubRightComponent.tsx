import React from 'react';
import SharedDocuments from './SharedDocuments';
import UploadDocs from './UploadDocs';
import WelcomePage from './WelcomePage';
import YourDocs from './YourDocs';
import YourProfile from './YourProfile';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import DoctorSharedDocs from '@/components/CustomComponents/DoctorSharedDocs';
import AcceptRequest from './AcceptRequest';

type MainSubRightComponentProps = {
	curr:
		| 'shared_docs'
		| 'your_docs'
		| 'upload_new_docs'
		| 'profile'
		| 'welcome'
		| 'accept_request';
};

const MainSubRightComponent = ({ curr }: MainSubRightComponentProps) => {
	const { showNomineePdf } = useSelector(
		(state: RootState) => state.showNominee
	);

	// write all conditions here
	if (curr === 'shared_docs') {
		return (
			<div>{showNomineePdf ? <DoctorSharedDocs /> : <SharedDocuments />}</div>
		);
	}

	if (curr === 'upload_new_docs') {
		return (
			<div>
				<UploadDocs />
			</div>
		);
	}

	if (curr === 'your_docs') {
		return (
			<div>
				<YourDocs />
			</div>
		);
	}

	if (curr === 'accept_request') {
		return (
			<div>
				<AcceptRequest />
			</div>
		);
	}

	if (curr === 'profile') {
		return (
			<div>
				<YourProfile />
			</div>
		);
	}

	return (
		<div>
			<WelcomePage />
		</div>
	);
};

export default MainSubRightComponent;
