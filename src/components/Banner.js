import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/spacedeveloper.png";
import 'animate.css';
// import headerImg from "./assets/img/header-img.svg";
// import { ArrowRightCircle } from 'react-bootstrap-icons';
// import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
//   Component needs to show the current text. Only indicates the portion of the word being displayed
  const [text, setText] = useState('');
//   A state to determine how fast one letter comes after the first one is typed
  const [delta, setDelta] = useState(50 - Math.random() * 50);
  const toRotate = [ "Product Designer", "Software Developer"];
//   Indicates how much time passes between one extra ledger being typed out
  const period = 100;

//   A function that takes care of typing or deleting
  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(200);
    }
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7} className="wow fadeIn" data-wow-duration="1.5s">
            <h2>{`Hello, I'm`}</h2>
            <h1>{`Mark Buckle`}</h1>
            <h3><span className="txt-rotate" data-period="100" data-rotate='[ "Software Developer", "Product Designer"]'>
              <span className="wrap">{text}</span></span></h3>
            <p className="slogan">I do product design and full-stack solutions.</p>
              {/* <button className="vvd" onClick={() => console.log('connect')}>Let’s Connect <ArrowRightCircle size={25} /></button> */}
            <span className="tagline">Welcome to my Portfolio</span>
          </Col>
          <Col xs={12} md={6} xl={5} className="wow zoomIn" data-wow-duration="1.5s">
            <img src={headerImg} alt="Header Img"/>
          </Col>
        </Row>
      </Container>
    </section>
  )
}