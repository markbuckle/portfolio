import React, { useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import emailjs from '@emailjs/browser';



export const Contact = () => {
  const form = useRef();

  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});
  
  // handler function
  const sendEmail = (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID; 
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID; 
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    
    // send email using EmailJS
    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
    .then(
      (response) => {
        setButtonText('Send');
        setStatus({ 
          message: 'Email sent successfully!', 
          success: true 
        });
        // Optional: Clear form after success
        form.current.reset();
      },
      (error) => {
        setButtonText('Send');
        setStatus({ 
          message: 'Failed to send email. Please try again or email Mark directly.', 
          success: false 
        });
      },
    );
};

  return (
    <section className="contact" id="connect">
      <Container>
        <div className="align-items-center">
          <h1 className="contact-title">Let's Connect</h1>
          <p className="contact-text">
            If you have an idea you want to bring to life or just a question, my inbox is open. I'll try my best to get back to you asap!
          </p>
          <Row>
            <Col size={12} md={6}>
              <div>
                <TrackVisibility>
                  {({ isVisible }) =>
                    <form ref={form} onSubmit={sendEmail} className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                      <Row>
                        <div className="contact-form-container px-1">
                          <label className="contact-form-label">Name</label>
                          <input 
                            type="text" 
                            name="user_name" 
                            placeholder="First and Last Name" 
                          />
                          <label className="contact-form-label">Email</label>
                          <input 
                            type="email" 
                            name="email" 
                            placeholder="Email Address" 
                          />
                          <label className="contact-form-label">Subject</label>
                          <input 
                            type="text" 
                            name="subject" 
                            placeholder="Subject" 
                          />
                          <label className="contact-form-label">Message</label>
                          <textarea 
                            type="text" 
                            rows="6" 
                            name="message" 
                            placeholder="Message" 
                          />
                          <div className="contact-button-container"><button type="submit"><span>{buttonText}</span></button></div>
                        </div>
                        {
                          status.message &&
                          <div>
                            <p className={status.success ? "success" : "danger"}>{status.message}</p>
                          </div>
                        }
                      </Row>
                    </form>
                  }
                </TrackVisibility>
              </div>
            </Col>
            <Col size={12} md={6}>
              <TrackVisibility>
                {({ isVisible }) =>
                  <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
                }
              </TrackVisibility>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};
