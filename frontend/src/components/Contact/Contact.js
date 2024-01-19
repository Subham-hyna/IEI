import React, { useEffect, useRef, useState } from "react";
import "./Contact.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import Tilt from 'react-parallax-tilt'
import { motion } from 'framer-motion'
import {toast} from "react-hot-toast";
import MetaData from "../Layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, clearMessages, contactUs } from "../../redux/actions/mailAction";
import { contactReset } from "../../redux/reducers/mailReducer";

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

    // emailjs.sendForm('service_bjwh3pw', 'template_0vhor0h', form.current, 'qXyZfGBeFdpegHycE')
    //   .then((result) => {
    //       console.log(result.text);
    //       setDone(true);
    //   }, (err) => {
    //       toast.error(err);
    //   });

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
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content
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
              <h3>93657-65523</h3>
            </div>
          </div>
          <div>
            <i>
              <EmailIcon />
            </i>
            <div>
              <h2>Email</h2>
              <h3>subhamdutta460@gmail.com</h3>
            </div>
          </div>
        </motion.div>
        <Tilt><motion.div 
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
                placeholder="Enter Your Name"
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div>
              <label>Message</label>
              <textarea
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
        </Tilt>
      </div>
    </div>
  );
};

export default Contact;
