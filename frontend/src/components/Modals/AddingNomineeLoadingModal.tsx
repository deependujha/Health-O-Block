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

type Props = {
	visible: boolean;
};
export default function AddingNomineeLoadingModal({ visible }: Props) {
	return (
		<div>
			<Modal blur preventClose aria-labelledby="modal-title" open={visible}>
				<Modal.Header>
					<div className="text-2xl font-bold font-mono text-green-800">
						Adding nominee..
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
							Adding nominee may take a few seconds. Please wait..
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}
