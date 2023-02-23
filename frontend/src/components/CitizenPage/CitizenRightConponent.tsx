import React from 'react';

type MainSubRightComponentProps = {
	curr:
		| 'approve_citizens'
		| 'register_new_doctor'
		| 'superuser_access'
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
						Main sub right component
					</div>
				</div>
			</div>
		</div>
	);
};

export default CitizenPageRightComponent;
