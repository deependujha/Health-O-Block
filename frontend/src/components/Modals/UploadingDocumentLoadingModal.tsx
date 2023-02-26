import React from 'react';
import {
	Modal,
	Button,
	Text,
	Input,
	Row,
	Checkbox,
	Loading,
	Divider,
} from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type Props = {
	visible: boolean;
};
export default function UploadingDocumentLoadingModal({ visible }: Props) {
	return (
		<div>
			<Modal blur preventClose aria-labelledby="modal-title" open={visible}>
				<Modal.Header>
					<div className="text-2xl font-bold font-mono text-green-800">
						uploading document...
					</div>
				</Modal.Header>
				<div>
					<Divider />
				</div>
				<Modal.Body>
					<div>
						<div className="flex justify-center my-4">
							<Loading />
						</div>
						<div className="text-center text-purple-700">
							Please wait while we upload your document. This may take a few
							seconds..
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}
