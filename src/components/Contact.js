"use client";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Contact = () => {
//   const formInitialDetails = {
//     email: '',
//     subject: '',
//     message: ''
//   };

//   const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
//   const [status, setStatus] = useState({});
//   const [emailSubmitted, setEmailSubmitted] = useState(false);

//   const onFormUpdate = (category, value) => {
//     setFormDetails({
//       ...formDetails,
//       [category]: value
//     });
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");

    const data = { 
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/send";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    setButtonText("Send");
    if (response.status === 200) {
      console.log("Message sent.");
//       setEmailSubmitted(true);
//       setStatus({ success: true, message: 'Message sent successfully' });
//       setFormDetails(formInitialDetails);
//     } else {
//       setStatus({ success: false, message: 'Something went wrong, please try again later.' });
//     }
    };
  }
  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
                {({ isVisible }) =>
                    <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                    <h1 className="contact-title">Let's Connect</h1>
                    <p className="contact-text">
                        {" "}
                        I&apos;m currently looking for new opportunities, my inbox is always
                        open. Whether you have a question or just want to say hi, I&apos;ll
                        try my best to get back to you!
                    </p>
                    </div>}
                </TrackVisibility>
                <TrackVisibility className="contact-image-container">
                {({ isVisible }) =>
                    <img className={isVisible ? "animate__animated animate__zoomIn" : "contact-image"} src={contactImg} alt="Contact Us"/>
                }
                </TrackVisibility>
                <div className="contact-icons-container">
                    <div className="social-icons">
                            <a
                            href="https://github.com/markbuckle"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                            >
                            <FaGithub size={35} />
                            </a>
                            <a
                            href="https://www.linkedin.com/in/mark-buckle-146316326/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                            >
                            <FaLinkedin size={35} />
                            </a>
                        </div>
                </div>
            </Col>
            <Col size={12} md={6}>
                <TrackVisibility>
                {({ isVisible }) =>
                    <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                    <h2 className="contact-title">Get In Touch</h2>
                    <form onSubmit={handleSubmit}>
                        <Row>
                        <Col size={12} sm={6} className="px-1">
                            <input 
                            name="email"
                            type="email" 
                            id="email"
                            placeholder="Email Address" 
                            // value={formDetails.email} 
                            // onChange={(e) => onFormUpdate('email', e.target.value)} 
                            />
                        </Col>
                        <Col size={12} sm={6} className="px-1">
                            <input 
                            name="subject"
                            type="text" 
                            id="subject"
                            placeholder="Subject" 
                            // value={formDetails.subject} 
                            // onChange={(e) => onFormUpdate('subject', e.target.value)}
                            />
                        </Col>
                        <Col size={12} className="px-1">
                            <textarea 
                                name="message"
                                id="message"
                                rows="6" 
                                placeholder="Message" 
                                // value={formDetails.message} 
                                // onChange={(e) => onFormUpdate('message', e.target.value)}
                            />
                            <button type="submit" class="contact-button"><span>{buttonText}</span></button>
                        </Col>
                        {/* {
                            status.message &&
                            <Col>
                            <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                            </Col>
                        } */}
                        </Row>
                    </form>
                    </div>}
                </TrackVisibility>
            </Col>
        </Row>
      </Container>
    </section>
  );
}
