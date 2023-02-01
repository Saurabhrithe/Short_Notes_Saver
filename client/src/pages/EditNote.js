import React, { useState } from "react";
import { Modal, Form, Input, message } from "antd";
import axios from "axios";
const EditNote = (props) => {

	const [showModal, setShowModal] = useState(true);

	const handleCancel = () => {
		setShowModal(false);
		window.location = '/'
	};
	const handleSubmit = async (values) => {
		try {
			const user = JSON.parse(localStorage.getItem("user"));
			await axios.post("/api/v1/notes/editNotes", {
				payload: {
					...values,
					userId: user._id,
				},
				noteId: props.data._id,
			});
			message.success("Notes updated successfully");
			setShowModal(false);
			window.location = '/'
		} catch (error) {
			message.error("Failed to Add");
		}
	};
	return (
		<div className="Modal">
			<Modal title="Edit Note" open={showModal} onCancel={handleCancel} footer={false}>
				<Form
					layout="vertical"
					onFinish={handleSubmit}
					initialValues={props.data}
				>
					<Form.Item label="Title" name="title">
						<Input type="text" autoComplete="on" required />
					</Form.Item>
					<Form.Item label="Description" name="description">
						<Input.TextArea autoSize="true" type="text" autoComplete="on" required />
					</Form.Item>
					<div className="d-flex justify-content-center">
						<button type="submit" className="btn btn-primary ">
							Save
						</button>
					</div>
				</Form>
			</Modal>
		</div>
	)
}
export default EditNote;