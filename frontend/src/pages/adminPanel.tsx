import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const AdminPanel = () => {
  const { allowed } = useSelector((state: RootState) => state.adminPanel);
  
	if (!allowed) {
		return <div>Not allowed</div>;
	}

	return (
		<div>
			<div>Hello world</div>
		</div>
	);
};

export default AdminPanel;
