import React from 'react';
import AddNominee from './AddNominee';
import Nominee from './Nominee';
import UploadNewDoc from './UploadNewDoc';
import WelcomePage from './WelcomePage';
import YourDocs from './YourDocs';
import YourProfile from './YourProfile';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import NomineeDocs from '@/components/CustomComponents/NomineeDocs';

type MainSubRightComponentProps = {
	curr:
		| 'upload_new_docs'
		| 'your_docs'
		| 'add_nominee'
		| 'nominee'
		| 'profile'
		| 'welcome';
};

const MainSubRightComponent = ({ curr }: MainSubRightComponentProps) => {
	const { address } = useSelector((state: RootState) => state.citizen);
	const { showNomineePdf } = useSelector(
		(state: RootState) => state.showNominee
	);
	// write all conditions here
	if (curr === 'upload_new_docs') {
		return (
			<div>
				<UploadNewDoc />
			</div>
		);
	} else if (curr === 'your_docs') {
		return (
			<div>
				<YourDocs />
			</div>
		);
	} else if (curr === 'add_nominee') {
		return (
			<div>
				<AddNominee />
			</div>
		);
	} else if (curr === 'nominee') {
		return <div>{showNomineePdf ? <NomineeDocs /> : <Nominee />}</div>;
	} else if (curr === 'profile') {
		return (
			<div>
				<YourProfile />
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
