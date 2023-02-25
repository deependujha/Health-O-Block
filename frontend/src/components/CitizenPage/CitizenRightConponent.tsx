import React from 'react';
import MainSubRightComponent from './SubRightComponents/MainSubRightComponent';
import SimpleBar from 'simplebar-react';

type MainSubRightComponentProps = {
	curr:
		| 'upload_new_docs'
		| 'your_docs'
		| 'add_nominee'
		| 'nominee'
		| 'profile'
		| 'welcome';
};

const CitizenPageRightComponent = ({ curr }: MainSubRightComponentProps) => {
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

export default CitizenPageRightComponent;
