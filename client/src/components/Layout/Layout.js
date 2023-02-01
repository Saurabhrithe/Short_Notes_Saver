import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../Style/Layout.css';
const Layout = ({ children }) => {
	return (
		<div className='wrapper'>
			<Header />
			<div className='main'>{children}</div>
			<div className="footer">
				<Footer />
			</div>
		</div>
	)
}

export default Layout;
