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
        <h1>Contact Us</h1>
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
