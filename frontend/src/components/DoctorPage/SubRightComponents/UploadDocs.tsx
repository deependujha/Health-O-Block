import React, { useState } from 'react';
import { Button } from '@nextui-org/react';

const UploadNewDoc = () => {
	const [url, setUrl] = useState('');

	// Handle the `onChange` event of the `file` input
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const files = e.target.files;
		files.length > 0 && setUrl(URL.createObjectURL(files[0]));
	};

	const uploadFile = async () => {
		if (!url) {
			alert('Please select a file to upload');
			return;
		}
		console.log('uploading file');
	};

	return (
		<div>
			<div className="text-2xl font-bold text-pink-500 text-center py-28">
				Upload your health document:
			</div>
			<div>
				<div className="flex justify-center">
					<input type="file" accept=".pdf" onChange={onChange} />
				</div>
				<div className="flex justify-center py-3">
					<Button size="lg" color="secondary" onPress={uploadFile}>
						Upload
					</Button>
				</div>
				<div>
					{url && (
						<div
							className="flex justify-center py-4"
							style={{
								border: '1px solid rgba(0, 0, 0, 0.3)',
								height: '100%',
							}}
						>
							<embed src={url} width="80%" height="820"></embed>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default UploadNewDoc;
