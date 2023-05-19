import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({children}) => {
    return (
        <div style={{backgroundColor:"#121212",paddingTop:"10px",minHeight:"100vh"}}>
        <Navbar/>
        {children}
         <Footer/>   
        </div>
    );
};

export default Layout;