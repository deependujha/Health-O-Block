import React from 'react';
import SharedDocuments from './SharedDocuments';
import UploadDocs from './UploadDocs';
import WelcomePage from './WelcomePage';
import YourDocs from './YourDocs';
import YourProfile from './YourProfile';

type MainSubRightComponentProps = {
	curr: 'shared_docs' | 'your_docs' | 'upload_new_docs' | 'profile' | 'welcome';
};

const MainSubRightComponent = ({ curr }: MainSubRightComponentProps) => {
	// write all conditions here
	if (curr === 'shared_docs') {
		return (
			<div>
				<SharedDocuments />
			</div>
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
