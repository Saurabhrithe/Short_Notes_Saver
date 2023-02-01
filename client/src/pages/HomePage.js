import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Modal, Form, Input, message } from "antd";
import axios from "axios";
import Loading from "../components/Loading";
import "../components/Style/HomePage.css";
import EditNote from "./EditNote";

const HomePage = (props) => {
	const [cards, setCards] = useState("");
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [editable, setEditable] = useState(null);

	//form handling
	const handleSubmit = async (values) => {
		try {
			const user = JSON.parse(localStorage.getItem("user"));
			setLoading(true);
			await axios.post("/api/v1/notes/addNotes", {
				...values,
				userid: user._id,
			});
			message.success("Notes added successfully");
			setLoading(false);
			window.location = "/";
			setShowModal(false);
			setEditable(null);
		} catch (error) {
			message.error("Failed to Add");
		}
	};
	useEffect(() => {
		try {
			const fetchdata = async () => {
				const user = JSON.parse(localStorage.getItem("user"));
				setLoading(true);
				const res = await axios.post("/api/v1/notes/getNotes", {
					userid: user._id,
				});
				setLoading(false);
				setCards(res.data);
			};
			fetchdata();
		} catch (error) { }
	}, []);

	const handleDelete = (product) => {
		try {
			setLoading(true);
			axios.post("/api/v1/notes/deleteNotes", { noteId: product._id });
			message.success("deleted successfully");
			setLoading(false);
			window.location = "/";
		} catch (error) {
			setLoading(false);
			message.error("unable to delete");
		}
	};
	const handleEdit = async (product) => {
		setEditable(product);
	};
	const handleCancel = () => {
		setEditable(null);
		setShowModal(false);
	};

	const handleAdd = () => {
		setShowModal(true);
	};

	return (
		<Layout>
			{loading && <Loading />}
			<div className="page-header px-4 py-4">
				<button className="btn btn-success" onClick={handleAdd}>Add Note</button>
			</div>

			<div className="content">
				{cards.length === 0 && (
					<div className="default-content">
						<h4>Added notes will appear here.</h4>
						<p>Currently you don't have any note to show.</p>
						<button className="btn btn-primary" onClick={handleAdd}>Add First Note</button>
					</div>
				)}
				{cards &&
					cards?.map((product) => (
						<div className="cards" key={product._id}>
							<div className="head">
								<div className="actions">
									<div className="action-btn">{product.date}</div>
									<div className="action-btn">
										<button id="link-edit" className="link-info bg-primary text-light"
											onClick={() => {
												handleEdit(product);
											}}
										>
											Open
										</button>
									</div>

									<div className="action-btn">
										<button id="link-delete" className="link-info bg-danger text-light"
											onClick={() => {
												handleDelete(product);
											}}
										>
											Delete
										</button>
									</div>
								</div>
								<div className="title">{product.title}</div>
							</div>

							<div className="description">
								{product.description.length > 300
									? product.description.slice(0, 300) + "...."
									: product.description}
							</div>
						</div>
					))}

				{editable && <EditNote data={editable} />}
				<Modal
					title={"Add New Note"}
					open={showModal}
					onCancel={handleCancel}
					footer={false}
				>
					<Form layout="vertical" onFinish={handleSubmit}>
						<Form.Item label="Title" name="title">
							<Input
								allowClear="true"
								showCount="true"
								type="text"
								autoComplete="on"
								required
							/>
						</Form.Item>
						<Form.Item label="Description" name="description">
							<Input.TextArea
								allowClear="true"
								showCount="true"
								maxLength="500"
								type="text"
								autoComplete="on"
								required
							/>
						</Form.Item>
						<div className="d-flex justify-content-center">
							<button type="submit" className="btn btn-primary ">Add Note</button>
						</div>
					</Form>
				</Modal>
			</div>
		</Layout>
	);
};

export default HomePage;
