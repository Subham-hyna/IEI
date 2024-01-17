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


    const logoutHandler = () => {
        dispatch(logout());
        navigate("/");
    }

  return (
    <section className='profile'>
        <MetaData title="MY PROFILE" />
        <div className='p-main'>
            <div className='p-left' style={{left: mobileProfileMenu ? '0px' : ''}}>
                <ul>
                    <li className={ activeLink === 'overview' ? 'active-link' : ''} onClick={()=>(setUpdateActiveLink('overview'))}>Overview</li>
                    <li className={ activeLink === 'edit Profile' ? 'active-link' : ''} onClick={()=>(setUpdateActiveLink('edit Profile'))}>Edit Profile</li>
                    <li className={ activeLink === 'change Password' ? 'active-link' : ''} onClick={()=>(setUpdateActiveLink('change Password'))}>Change Password</li>
                    <li className={ activeLink === 'delete Account' ? 'active-link' : ''} onClick={()=>(setUpdateActiveLink('delete Account'))}>Delete Account</li>
                    <li onClick={logoutHandler}>Log out</li>
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