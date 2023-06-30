import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
const NavbarComponent = () => {
    return (
        <Navbar  style={{marginTop:'100px',position:'absolute',paddingLeft:'115px',paddingRight:'1039px'}} bg="dark" data-bs-theme="dark">
            
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='ms-auto' />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav  className="me-auto">
                        <NavLink to="/products" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Products</NavLink>
                        <NavLink to="/shipments" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Shipments</NavLink>
                        <NavLink to="/traceProduct" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Assign Shipment to Product</NavLink>
                    </Nav>
                </Navbar.Collapse>
            
        </Navbar>
    );
}

export default NavbarComponent;