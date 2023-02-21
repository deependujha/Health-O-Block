import Image from 'next/image';
import React from 'react';
import { Button } from '@nextui-org/react';
import HorizontalLine from '../CustomComponents/HorizontalLine';

const LoginPage = () => {
	const loginCitizen = async () => {
		console.log('clicked on login as citizen');
	};

	const loginDoctor = async () => {
		console.log('clicked on login as doctor');
	};

	const register = async () => {
		console.log('clicked on register');
	};

	const adminPanel = async () => {
		console.log('clicked on admin panel');
	};

	return (
		<div
			className={`bg-[url('/bgImg2.jpeg')]`}
			style={{ height: '100vh', width: '100vw' }}
		>
			<div className="flex justify-end text-white px-20 h-screen">
				<div className="my-auto">
					<div
						style={{
							border: '1px solid white',
							borderRadius: '15px',
							padding: '15px',
						}}
					>
						<div className="flex my-5 mx-5 justify-center">
							<h1 className="text-4xl font-bold text-pink-600 my-auto">
								आयुष्मान भारत
							</h1>
							<Image
								src="/health_icon.png"
								alt="health icon"
								width={100}
								height={100}
							/>
						</div>
						<HorizontalLine />
						<div>
							<Button
								color="gradient"
								size={'lg'}
								className="my-6"
								style={{ width: '400px' }}
								onPress={loginCitizen}
							>
								login as citizen
							</Button>

							<Button
								color="gradient"
								size={'lg'}
								className="my-6"
								style={{ width: '400px' }}
								onPress={loginDoctor}
							>
								login as Doctor
							</Button>
							<div className="flex justify-between">
								<div style={{ width: '45%' }} className="pt-3">
									<HorizontalLine />
								</div>
								<div>Or</div>
								<div style={{ width: '45%' }} className="pt-3">
									<HorizontalLine />
								</div>
							</div>
							<Button
								color="secondary"
								size={'lg'}
								className="my-6"
								style={{ width: '400px' }}
								onPress={register}
							>
								Register as a new user
							</Button>
							<div className="flex justify-between">
								<div style={{ width: '40%' }} className="pt-3">
									<HorizontalLine />
								</div>
								<div>Admin</div>
								<div style={{ width: '40%' }} className="pt-3">
									<HorizontalLine />
								</div>
							</div>
							<Button
								color="error"
								size={'lg'}
								className="my-6"
								style={{ width: '400px' }}
								onPress={adminPanel}
							>
								Admin panel
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
