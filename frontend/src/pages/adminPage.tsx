import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import AdminPageLeftComponent from '@/components/AdminPage/AdminPageLeftComponent';
import AyushmanBharatLogo from '@/components/CustomComponents/AyushmanBharatLogo';
import { Divider } from '@nextui-org/react';
import AdminPageRightComponent from '@/components/AdminPage/AdminPageRightComponent';

type currPossibleValues =
	| 'approve_citizens'
	| 'register_new_doctor'
	| 'superuser_access'
	| 'welcome';

const AdminPage = () => {
	const { allowed } = useSelector((state: RootState) => state.adminPanel);
	const [curr, setCurr] = useState<currPossibleValues>('welcome');

	// if (!allowed) {
	// 	return (
	// 		<div
	// 			className={`bg-[url('/bg_img/bg3.jpg')] flex justify-center h-screen`}
	// 			style={{ height: '100vh', width: '100vw' }}
	// 		>
	// 			<div className="text-3xl font-bold text-red-600 text-center my-auto">
	// 				<AyushmanBharatLogo />
	// 				<Divider color={'error'} />
	// 				<div className='pt-8'>You're not authorized to access the 'Admin' page.</div>
	// 			</div>
	// 		</div>
	// 	);
	// }

	return (
		<div
			className={`bg-[url('/bg_img/bg3.jpg')] text-white`}
			style={{ height: '100vh', width: '100vw' }}
		>
			<div className="flex justify-around">
				<AdminPageLeftComponent setCurr={setCurr} />
				<AdminPageRightComponent curr={curr} />
			</div>
		</div>
	);
};

export default AdminPage;
