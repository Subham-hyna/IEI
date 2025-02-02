import React, { useEffect, useRef, useState } from "react";
import "./Contact.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { motion } from 'framer-motion'
import {toast} from "react-hot-toast";
import MetaData from "../Layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, clearMessages, contactUs } from "../../redux/actions/mailAction";
import { contactReset } from "../../redux/reducers/mailReducer";
import emailjs from '@emailjs/browser';

const Contact = () => {

  const[done, setDone] = useState(false);
  const[name, setName] = useState();
  const[email, setEmail] = useState();
  const[query, setQuery] = useState();

  const form = useRef();
  const dispatch = useDispatch();
  const { loading ,success, message, error } = useSelector(state=>state.mail);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_my8frrc', 'template_dhcmoal', form.current, 'l9h_6jUszy3UD5wTb')
      .then((result) => {
          console.log(result.text);
          setDone(true);
      }, (err) => {
          toast.error(err);
      });

    const formData = new FormData();

    formData.append("name",name);
    formData.append("email",email);
    formData.append("query",query);

    dispatch(contactUs(formData));
  };

  useEffect(()=>{
    if(done && success){
      toast.success(message);
      dispatch(clearMessages);
      dispatch(contactReset());
      setDone(false);
    }
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }
  },[done,success,dispatch,error,message])

  return (
    <div className="contact">
      <MetaData title={"CONTACT US"} />
      <div className="contact-upper">
        <h1>Contact Us <span><svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.5562 12.9062L16.1007 13.359C16.1007 13.359 15.0181 14.4355 12.0631 11.4972C9.10812 8.55901 10.1907 7.48257 10.1907 7.48257L10.4775 7.19738C11.1841 6.49484 11.2507 5.36691 10.6342 4.54348L9.37326 2.85908C8.61028 1.83992 7.13596 1.70529 6.26145 2.57483L4.69185 4.13552C4.25823 4.56668 3.96765 5.12559 4.00289 5.74561C4.09304 7.33182 4.81071 10.7447 8.81536 14.7266C13.0621 18.9492 17.0468 19.117 18.6763 18.9651C19.1917 18.9171 19.6399 18.6546 20.0011 18.2954L21.4217 16.883C22.3806 15.9295 22.1102 14.2949 20.8833 13.628L18.9728 12.5894C18.1672 12.1515 17.1858 12.2801 16.5562 12.9062Z" fill="#512da8"></path> </g></svg></span></h1>
        <p>
        Our team is ever-ready to assist you and solve your queries.We are here to assist you! Thank you for showing interest in our organization. For any inquiries, feedback, or support, please feel free to reach out to us. You may use the contact form below to send us a message. We aim to respond promptly.
        </p>
      </div>
      <div className="contact-lower">
        <motion.div 
        initial={{
            y: "+100%",
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
        className="contact-left">
          <div>
            <i>
              <LocationOnIcon />
            </i>
            <div>
              <h2>Address</h2>
              <h3>NIT SILCHAR, 788010, Assam</h3>
            </div>
          </div>
          <div>
            <i>
              <LocalPhoneIcon />
            </i>
            <div>
              <h2>Phone</h2>
              <h3>78007-48553</h3>
            </div>
          </div>
          <div>
            <i>
              <EmailIcon />
            </i>
            <div>
              <h2>Email</h2>
              <h3>iei.nitsilchar@gmail.com</h3>
            </div>
          </div>
        </motion.div>
        <motion.div 
             initial={{
                x: "-100%",
                opacity: 0,
              }}
              whileInView={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.2,
              }}
        className="contact-right">
          <form ref={form} onSubmit={sendEmail}>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div>
              <label>Message</label>
              <textarea
              name="query"
              placeholder="Write Your Message"
              onChange={(e)=>setQuery(e.target.value)}
              >
              </textarea>
            </div>
            <div>
              <button type="submit">{loading ? <div className="button-loader"></div> : "SEND"}</button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
