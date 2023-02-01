import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import "../components/Style/RegisterLogin.css"
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
const Login = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	//form Submit
	const submitHandler = async (values) => {
		try {
			setLoading(true);
			const { data } = await axios.post("/api/v1/users/login", values);
			setLoading(false);
			message.success("login sucess");
			localStorage.setItem(
				"user",
				JSON.stringify({ ...data.user, password: "" })
			);
			navigate("/");
		} catch (error) {
			setLoading(false);
			message.error("Wrong Email or Password");
		}
	};
	useEffect(() => {
		if (localStorage.getItem("user")) {
			navigate("/");
		}
	}, [navigate]);

	const logInHandler = () => {
		navigate("/login")
	}
	const SignUpHandler = () => {
		navigate("/register")
	}
	return (
		<>
			<div>
				<nav className="navbar navbar-expand-lg bg-dark">
					<div className="container-fluid bg-dark ">
						<button
							className="navbar-toggler bg-light px-1 py-1"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarTogglerDemo01"
							aria-controls="navbarTogglerDemo01"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon " />
						</button>

						<div className="collapse navbar-collapse" id="navbarTogglerDemo01">
							<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
								<li className="nav-item px-2 py-2">
									<Link className="navbar-brand text-light  " to="/"><i>Short Notes Saver</i></Link>
								</li>
								<li className="nav-item px-2 py-2">
									<button className="btn h-auto btn-secondary w-100" onClick={logInHandler}>Login</button>
								</li>
								<li className="nav-item h-auto px-2 py-2">
									<button className="btn h-auto btn-success w-100 " onClick={SignUpHandler}>Sign Up</button>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
			<div className="register-page">
				{loading && <Loading />}
				<Form layout="vertical" onFinish={submitHandler} className='login-page'>
					<Form.Item label="Email" name="email">
						<Input type="email" placeholder="Email" prefix={<UserOutlined />} required />
					</Form.Item>
					<Form.Item label="Password" name="password">
						<Input.Password 
							iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
							placeholder="Password"
							required />
					</Form.Item>
					<div>
						Don't have an account?
						<Link to="/register" className="link-info text-decoration-none">click here </Link>
					</div>
					<div className="login-btn py-3">
						<button className="btn btn-primary w-100">Login</button>
					</div>
				</Form>
			</div>
		</>
	);
};

export default Login;