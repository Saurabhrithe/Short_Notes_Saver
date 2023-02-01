import { message } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
	const [loginUser, setLoginUser] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			setLoginUser(user);
		}
	}, []);

	const logoutHandler = () => {
		localStorage.removeItem("user");
		message.success("Logout Successfully");
		navigate("/login");
	};

	return (
		<>
			<nav className="navbar navbar-expand-lg bg-dark">
				<div className="container-fluid bg-dark">
					<button
						className="navbar-toggler bg-light"
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
						<ul className="navbar-nav  mb-2 mb-lg-0">
							<li className="nav-item px-2 py-2">
								<Link className="navbar-brand text-light  " to="/">
									<i>Short Notes Saver</i>
								</Link>
							</li>
						</ul>
						<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
							<li className="nav-item px-2 py-1">
								<p className="nav-link text-light">Welcome! {loginUser.name}</p>
							</li>
							<li className="nav-item h-auto px-2 py-2">
								<button className="btn h-auto btn-danger w-100" onClick={logoutHandler}>
									Logout
								</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Header;
