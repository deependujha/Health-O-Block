import HorizontalLine from '@/components/CustomComponents/HorizontalLine';
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const menuItems = [
	{ key: 'none', name: 'None' },
	{ key: 'eye', name: 'Eye Specialist' },
	{ key: 'ear', name: 'Ear Specialist' },
	{ key: 'heart', name: 'Heart Specialist' },
	{ key: 'skin', name: 'Skin Specialist' },
	{ key: 'dental', name: 'Dental Specialist' },
	{ key: 'gastro', name: 'Gastroenterologist' },
	{ key: 'neuro', name: 'Neurologist' },
	{ key: 'gyno', name: 'Gynecologist' },
	{ key: 'ortho', name: 'Orthopedic' },
];

const AddSpecialityComponent = () => {
	const [inputVal, setInputVal] = useState('');
	const [currItem, setCurrItem] = useState('None');

	const selectionChange = (e: any) => {
		setCurrItem(e.target.value);
	};

	const addSpecialityBtn = async () => {
		if (inputVal === '') {
			alert("Please enter doctor's wallet address");
			return;
		}
		if (currItem === 'None') {
			alert('Please select a speciality');
			return;
		}

		axios
			.post('http://localhost:7000/speciality', {
				walletAddress: inputVal,
				speciality: currItem,
			})
			.then((res) => {
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Speciality added successfully',
				});
				setInputVal('');
			})
			.catch((err) => {
				console.log('error is ', err);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!',
				});
			});
	};

	return (
		<div>
			<div className="text-center text-4xl text-pink-500 pt-28">
				Add speciality to Doctor 🩺
			</div>
			<div className="flex justify-center py-4">
				<div style={{ width: '800px' }} className="">
					<HorizontalLine />
				</div>
			</div>
			<div className="flex justify-center py-32">
				<div className="flex justify-around">
					<div>
						<input
							value={inputVal}
							onChange={(e) => setInputVal(e.target.value)}
							placeholder="Doctor's wallet address"
							color="secondary"
							style={{
								width: '450px',
								height: '40px',
								border: '1px solid white',
								padding: '2px',
								borderRadius: '20px',
								color: 'black',
								paddingLeft: '10px',
							}}
						/>
						<div className="text-xl pt-8">
							<form>
								<label htmlFor="doctors">Doctor's Speciality: </label>
								<select
									className="text-black"
									name="speciality"
									id="doctors"
									onChange={selectionChange}
								>
									{menuItems.map((item, idx) => {
										return (
											<option key={idx} value={item.key}>
												{item.name}
											</option>
										);
									})}
								</select>
							</form>
						</div>
						<div className="pt-8 flex justify-center">
							<button
								onClick={addSpecialityBtn}
								className="bg-pink-500 text-white py-2 rounded-lg font-bold px-10"
							>
								Add Speciality
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddSpecialityComponent;
