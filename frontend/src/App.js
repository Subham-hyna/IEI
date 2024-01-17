import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import toast, {Toaster} from 'react-hot-toast';
import Navbar from './components/Layout/Navbar/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Layout/Footer/Footer';
import Profile from './components/Profile/Profile';
import Team from './components/Team/Team';
import Gallery from './components/Gallery/Gallery';
import Event from './components/Event/Event';
import EventDetails from './components/Event/EventDetails/EventDetails';
import Auth from './components/Authenticate//Auth'
import PasswordForgot from './components/Authenticate/PasswordForgot/PasswordForgot';
import ResetPassword from './components/Authenticate/ResetPassword/ResetPassword';
import Mail from './components/Mail/Mail';
import Contact from './components/Contact/Contact';
import DevTeam from './components/DevTeam/DevTeam';
import ScrollToTop from './components/utils/ScrollToTop';
import { useDispatch , useSelector } from 'react-redux';
import { clearErrors, clearMessages, loadUser } from './redux/actions/userAction';
import { ProtectedRoute } from "protected-route-react";
import ErrorPage from './components/ErrorPage/ErrorPage';

const App = () => {

const dispatch = useDispatch();
let { isAuthenticated, error, user, message } = useSelector((state)=>state.user);

useEffect(()=>{
  dispatch(loadUser());
},[dispatch])

useEffect(()=>{
  if(error){
    dispatch(clearErrors());
  }
  if(message){
      toast.success(message);
      dispatch(clearMessages());
  }
},[dispatch,error,message])



  return (
    <Router>
      <ScrollToTop />
        <Navbar isAuthenticated={isAuthenticated} user={user} />
        <Routes>
        <Route exact path="/" element={<Home />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route exact path="/me" element={<Profile />} />
        <Route exact path="/event/:id" element={<EventDetails />} />
        </Route>
        <Route exact path="/team" element={<Team />} />
        <Route exact path="/gallery" element={<Gallery />} />
        <Route exact path="/gallery/:keyword" element={<Gallery />} />
        <Route exact path="/events" element={<Event />} />
        <Route exact path="/events/:keyword" element={<Event />} />
        <Route exact path="/login" element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/me">
              <Auth />
            </ProtectedRoute>} />
        <Route exact path="/password/forgot" element={<PasswordForgot />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/devteam" element={<DevTeam />} />

        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user && user.role === "admin"}
              redirectAdmin="/me"
            />
          }
        >
        <Route exact path="/admin/mail" element={<Mail />} />
        </Route>
        <Route exact path="*" element={<ErrorPage/>} />
        </Routes>
        <Footer />
        <Toaster 
        position='top-right'
        />
    </Router>
  )
}

export default App


//BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna