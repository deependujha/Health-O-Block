import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import AdminPageLeftComponent from '@/components/AdminPage/AdminPageLeftComponent';
import AyushmanBharatLogo from '@/components/CustomComponents/AyushmanBharatLogo';
import { Divider } from '@nextui-org/react';

const AdminPage = () => {
	const { allowed } = useSelector((state: RootState) => state.adminPanel);

	if (!allowed) {
		return (
			<div
				className={`bg-[url('/bg_img/bg3.jpg')] flex justify-center h-screen`}
				style={{ height: '100vh', width: '100vw' }}
			>
				<div className="text-3xl font-bold text-red-600 text-center my-auto">
					<AyushmanBharatLogo />
					<Divider color={'error'} />
					<div className='pt-8'>You're not authorized to access the 'Admin' page.</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`bg-[url('/bg_img/bg3.jpg')] text-white`}
			style={{ height: '100vh', width: '100vw' }}
		>
			<div className="">
				<AdminPageLeftComponent />
			</div>
		</div>
	);
};

export default AdminPage;
