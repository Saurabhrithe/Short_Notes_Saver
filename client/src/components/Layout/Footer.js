
import React, { useState } from "react";
import { Modal, Form, Input, message} from "antd";
import axios from "axios";
import Loading from "../Loading";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import "../Style/Layout.css"

const Footer = () => {
	const [showModal, setShowModal] = useState(false)
	const [loading, setLoading] = useState(false)

	const deleteUser = async (values) => {
		try {
			setLoading(true);
			const user = JSON.parse(localStorage.getItem("user"))
			const res = await axios.post("/api/v1/notes/getNotes", {
				userid: user._id,
			});
			const len = res.data.length
			if (len === 0) {
				await axios.post("/api/v1/users/deleteUser", {
					userId: user._id,
					email: user.email,
					password: values.password
				});
				message.success("Account deleted successfully");
				localStorage.removeItem("user");
				setLoading(false);
				window.location = '/login'
			}
			else {
				message.error("Please delete all your existing notes")
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
			message.error("Wrong Password, please try again");
		}
	}
	const deleteRequest = () => {
		setShowModal(true)
	}
	const cancelRequest = () => {
		setShowModal(false)
	}
	return (
		<div className='footer bg-dark text-light p-4'>
			<div className="d-flex flex-column">
				<p>Delete this account? </p>
				<p>(Before you proceed make sure you deleted all your existing notes)</p>
				<button className="btn1" onClick={deleteRequest}>Delete Account</button>
				<h6 className="text-center py-2">Copyright &copy; <i>Short Notes Saver</i></h6>
			</div>
			<Modal
				title={"Delete Account"}
				open={showModal}
				onCancel={cancelRequest}
				footer={false}
			>
				{loading && <Loading/>}
				<Form layout="vertical" onFinish={deleteUser}>
					<Form.Item label="Enter your password" name="password">
						<Input.Password 
						iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
						autoComplete="on" required />
					</Form.Item>
					<div className="d-flex justify-content-end">
						<button type="submit" className="btn btn-secondary ">
							Confirm
						</button>
					</div>
				</Form>
			</Modal>
		</div>
	)
}

export default Footer