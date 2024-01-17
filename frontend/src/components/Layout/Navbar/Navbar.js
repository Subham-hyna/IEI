import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import Avatar from '@mui/material/Avatar';
import LoginIcon from '@mui/icons-material/Login';
import logo from '../../../assets/IEI_logo.svg'
import Button from '@mui/material/Button';

const Navbar = ({ isAuthenticated , user }) => {

    const[mobileMenu, setMobileMenu] = useState(false);
    
  return (
    <nav className='n-wrapper'>
        <div className='n-left'>
        <Link to='/' ><img alt="IEI_logo" src={logo} size = 'lg' className='n-logo'/></Link>
        </div>
        <div className='n-right'>
            <div className='n-list'  style={{right: mobileMenu ? '0px' : ''}}>
                <ul>
                    <li className='n-cross'> <ClearIcon onClick={()=>{setMobileMenu(false)}} /> </li>
                    <li> <Link to='/' onClick={()=>{setMobileMenu(false)}}>Home</Link></li>
                    <li> <Link to='/#about' onClick={()=>{setMobileMenu(false)}}>About Us</Link></li>
                    <li> <Link to='/gallery' onClick={()=>{setMobileMenu(false)}}>Gallery</Link></li>
                    <li> <Link to='/team' onClick={()=>{setMobileMenu(false)}}>Our Team</Link></li>
                    <li> <Link to='/events' onClick={()=>{setMobileMenu(false)}}>Events</Link></li>
                    <li> <Link to='/contact' onClick={()=>{setMobileMenu(false)}}>Contact Us</Link></li>
                </ul>
            </div>
            
            <div className='n-account'>
                { user && user.role === "admin" && <Link to="/admin/mail" >Mail</Link>}
                <Link to={ isAuthenticated ? "/me" : "/login"} >
                    { isAuthenticated ? <Button variant="outlined" sx={{ border : "0" , color : "#6846f8"}} endIcon={<Avatar src={user && user.avatar.url}/>}>{user&&user.name.split(" ")[0]}</Button> : <Button variant="contained" sx={{ backgroundColor : "#8269ec" }} disableElevation endIcon={<LoginIcon />}>Login</Button> }
                </Link>
            <div className='n-bars'><MenuIcon onClick={()=>{setMobileMenu(true)}} /></div>
            </div>
        </div>

    </nav>
  )
}

export default Navbar