import React from 'react';
import MainSubRightComponent from './SubRightComponents.tsx/MainSubRightComponent';
import SimpleBar from 'simplebar-react';

type MainSubRightComponentProps = {
	curr:
		| 'approve_citizens'
		| 'register_new_doctor'
		| 'superuser_access'
		| 'welcome';
};

const AdminPageRightComponent = ({ curr }: MainSubRightComponentProps) => {
	return (
		<div>
			<div className="flex h-screen">
				<div
					className="rounded-3xl my-auto"
					style={{ width: '70vw', borderWidth: '2px', borderColor: 'white' }}
				>
					<div className="" style={{ height: '94vh' }}>
						<SimpleBar style={{ maxHeight: '90vh' }}>
							<MainSubRightComponent curr={curr} />
						</SimpleBar>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminPageRightComponent;
