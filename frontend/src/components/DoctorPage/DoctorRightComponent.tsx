import React from 'react';
import SimpleBar from 'simplebar-react';
import MainSubRightComponent from './SubRightComponents/MainSubRightComponent';

type MainSubRightComponentProps = {
	curr: 'shared_docs' | 'your_docs' | 'upload_new_docs' | 'profile' | 'welcome';
};

const DoctorRightComponent = ({ curr }: MainSubRightComponentProps) => {
	return (
		<div>
			<div className="flex h-screen">
				<div
					className="rounded-3xl my-auto"
					style={{ width: '70vw', borderWidth: '2px', borderColor: 'white' }}
				>
					<div className="" style={{ height: '94vh', overflow: 'hidden' }}>
						<SimpleBar style={{ maxHeight: '90vh' }}>
							<MainSubRightComponent curr={curr} />
						</SimpleBar>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoctorRightComponent;
