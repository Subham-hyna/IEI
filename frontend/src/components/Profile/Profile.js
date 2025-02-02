import React, { useState } from 'react'
import './Profile.css'
import Overview from './Overview/Overview'
import EditProfile from './EditProfile/EditProfile'
import ChangePassword from './ChangePassword/ChangePassword'
import DeleteAccount from './DeleteAccount/DeleteAccount'
import WestIcon from '@mui/icons-material/West';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/actions/userAction'
import { useNavigate } from 'react-router-dom'
import MetaData from '../Layout/MetaData'

const Profile = () => {

    const[activeLink , setActiveLink] = useState('overview');
    const[mobileProfileMenu, setMobileProfileMenu] = useState(false);

    const { user } = useSelector((state)=>state.user)
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setUpdateActiveLink = (value) => {
        setActiveLink(value);
        setMobileProfileMenu(false);
    }

    const handleClose = () => {
        if(mobileProfileMenu){
            setMobileProfileMenu(false)
        }
    }

    const logoutHandler = () => {
        dispatch(logout());
        localStorage.setItem("token","");
        navigate("/");
    }

  return (
    <section className='profile' onClick={handleClose}>
        <MetaData title="MY PROFILE" />
        <div className='p-main'>
            <div className='p-left' style={{left: mobileProfileMenu ? '0px' : ''}}>
                <ul>
                    <li className={ activeLink === 'overview' ? 'active-link' : ''} onClick={()=>(setUpdateActiveLink('overview'))}><svg fill="#ffffff" width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="dashboard" class="icon glyph" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><rect x="2" y="2" width="9" height="11" rx="2"></rect><rect x="13" y="2" width="9" height="7" rx="2"></rect><rect x="2" y="15" width="9" height="7" rx="2"></rect><rect x="13" y="11" width="9" height="11" rx="2"></rect></g></svg>&nbsp;Overview</li>
                    <li className={ activeLink === 'edit Profile' ? 'active-link' : ''} onClick={()=>(setUpdateActiveLink('edit Profile'))}><svg fill="#fff" width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2,21H8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20,1,1,0,0,0,2,21ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5ZM20.207,9.293a1,1,0,0,0-1.414,0l-6.25,6.25a1.011,1.011,0,0,0-.241.391l-1.25,3.75A1,1,0,0,0,12,21a1.014,1.014,0,0,0,.316-.051l3.75-1.25a1,1,0,0,0,.391-.242l6.25-6.25a1,1,0,0,0,0-1.414Zm-5,8.583-1.629.543.543-1.629L19.5,11.414,20.586,12.5Z"></path></g></svg>&nbsp;Edit Profile</li>
                    <li className={ activeLink === 'change Password' ? 'active-link' : ''} onClick={()=>(setUpdateActiveLink('change Password'))}><svg fill="#fff" height="25px" width="25px" version="1.1" id="Icon" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xmlSpace="preserve" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M24,19v-2h-2.14c-0.09-0.36-0.24-0.7-0.42-1.02l1.52-1.52l-1.41-1.41l-1.52,1.52c-0.32-0.19-0.66-0.33-1.02-0.42V12h-2v2.14 c-0.36,0.09-0.7,0.24-1.02,0.42l-1.52-1.52l-1.41,1.41l1.52,1.52c-0.19,0.32-0.33,0.66-0.42,1.02H12v2h2.14 c0.09,0.36,0.24,0.7,0.42,1.02l-1.52,1.52l1.41,1.41l1.52-1.52c0.32,0.19,0.66,0.33,1.02,0.42V24h2v-2.14 c0.36-0.09,0.7-0.24,1.02-0.42l1.52,1.52l1.41-1.41l-1.52-1.52c0.19-0.32,0.33-0.66,0.42-1.02H24z M18,20c-1.1,0-2-0.9-2-2 s0.9-2,2-2s2,0.9,2,2S19.1,20,18,20z M11,7.41l3.29,3.29l1.41-1.41L12.41,6L13,5.41l2.29,2.29l1.41-1.41L14.41,4L15,3.41l3.29,3.29 l1.41-1.41L16.41,2l0.29-0.29l-1.41-1.41L6.89,8.7C6.19,8.26,5.38,8,4.5,8C2.02,8,0,10.02,0,12.5S2.02,17,4.5,17S9,14.98,9,12.5 c0-0.88-0.26-1.69-0.7-2.39L11,7.41z M4.5,15C3.12,15,2,13.88,2,12.5S3.12,10,4.5,10S7,11.12,7,12.5S5.88,15,4.5,15z"></path> </g></svg>&nbsp;Change Password</li>
                    <li className={ activeLink === 'delete Account' ? 'active-link' : ''} onClick={()=>(setUpdateActiveLink('delete Account'))}><svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M17 6.5C17 9.53757 14.7614 12 12 12C9.23858 12 7 9.53757 7 6.5C7 3.46243 9.23858 1 12 1C14.7614 1 17 3.46243 17 6.5ZM9 6.5C9 8.32254 10.3431 9.8 12 9.8C13.6569 9.8 15 8.32254 15 6.5C15 4.67746 13.6569 3.2 12 3.2C10.3431 3.2 9 4.67746 9 6.5Z" fill="#fff"></path> <path d="M11.6759 14.9952C10.7868 14.9679 10.1945 14.8277 9.72609 14.6447C9.26355 14.464 8.89822 14.237 8.41685 13.9378C8.32296 13.8795 8.22448 13.8183 8.12019 13.7543C7.07587 13.1132 5.73464 13.2622 4.86415 14.1419C4.48443 14.5256 4.04036 15.0219 3.6849 15.5626C3.34603 16.0781 3 16.7638 3 17.5V20.0003C3 21.6574 4.34334 23 6 23H13.101C12.5151 22.4259 12.0297 21.7496 11.6736 21H6C5.44752 21 5 20.5524 5 20.0003V17.5C5 17.3549 5.08549 17.073 5.35613 16.6613C5.61017 16.2748 5.95358 15.8844 6.28579 15.5487C6.49412 15.3381 6.81106 15.2974 7.07389 15.4588C7.15661 15.5095 7.24087 15.5621 7.32694 15.6159C7.80938 15.9171 8.34918 16.254 8.99836 16.5076C9.58761 16.7378 10.2519 16.8974 11.0761 16.9645C11.1791 16.2695 11.3843 15.6078 11.6759 14.9952Z" fill="#fff"></path> <path d="M16 17C15.4477 17 15 17.4477 15 18C15 18.5523 15.4477 19 16 19H20C20.5523 19 21 18.5523 21 18C21 17.4477 20.5523 17 20 17H16Z" fill="#fff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M18 24C21.3137 24 24 21.3137 24 18C24 14.6863 21.3137 12 18 12C14.6863 12 12 14.6863 12 18C12 21.3137 14.6863 24 18 24ZM18 22.0181C15.7809 22.0181 13.9819 20.2191 13.9819 18C13.9819 15.7809 15.7809 13.9819 18 13.9819C20.2191 13.9819 22.0181 15.7809 22.0181 18C22.0181 20.2191 20.2191 22.0181 18 22.0181Z" fill="#fff"></path> </g></svg>&nbsp;Delete Account</li>
                    <li onClick={logoutHandler}><svg width="30px" height="30px" viewBox="0 0 96 96" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><style type="text/css">{`.st0{display:none;}.st1{fill:#FFFFFF;}.st2{fill:none;stroke:#fff;stroke-width:5.28;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}.st3{fill:#FFF8FA;}.st4{stroke:#fff;stroke-width:5.28;stroke-miterlimit:10;}.st5{fill:none;stroke:#fff;stroke-miterlimit:10;}.st6{fill:none;stroke:#fff;stroke-width:5.28;stroke-linecap:round;stroke-miterlimit:10;}`}</style><g id="koper"><g><path className="st4" d="M48.5,25.3c0.7,0,1,0.3,1,0.3l0,18.8c0,0.1-0.4,0.4-1,0.4h-0.1c-0.6,0-0.9-0.3-1-0.3l0-18.9C47.5,25.5,47.9,25.3,48.5,25.3z"></path><path className="st4" d="M48,74.4c-11.6,0-21.1-9.5-21.1-21.1c0-8.3,4.3-15.5,11.2-19c0.1,0,0.2-0.1,0.3-0.1c0.1,0,0.1,0,0.2,0c0.2,0.1,0.3,0.2,0.4,0.4c0.1,0.2,0.1,0.4,0,0.5c-0.1,0.2-0.2,0.3-0.4,0.4c-6.4,3.2-10.4,10-10.4,17.7c0,10.9,8.8,19.7,19.7,19.7s19.7-8.8,19.7-19.7c0-7.7-4-14.4-10.3-17.7c-0.3-0.2-0.5-0.6-0.3-0.9c0.2-0.3,0.6-0.5,0.9-0.3c6.8,3.5,11.1,10.7,11.1,18.9C69.1,65,59.6,74.4,48,74.4z"></path></g></g></g></svg>
                    &nbsp;Log out</li>
                    
                </ul>
            </div>
            <div className='p-right'>
                <div className='p-upper'>
                    <div className='p-arrow'><WestIcon onClick={()=>{setMobileProfileMenu(true)}} /></div>
                    <span>{activeLink.toUpperCase()}</span>
                </div>
                    <div className='p-lower'>
                           { activeLink === 'overview' &&  <span><Overview user={user} /></span>}
                           { activeLink === 'edit Profile' &&  <span><EditProfile /></span>}
                           { activeLink === 'change Password' &&  <span><ChangePassword user={user} /></span>}
                           { activeLink === 'delete Account' &&  <span><DeleteAccount user={user} /></span>}
                        </div>
            </div>

        </div>
    </section>
  )
}

export default Profile