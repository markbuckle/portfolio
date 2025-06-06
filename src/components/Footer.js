import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logo.png";
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon5 from '../assets/img/nav-icon5.svg';

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col  >
            <img src={logo} alt="Logo" class="footer-logo"/>
          </Col>
          <Col className="social-icon-layout">
            <div className="social-icon">
                  <a href="https://www.linkedin.com/in/mark-buckle-146316326"><img src={navIcon1} alt="" /></a>
                  <a href="https://github.com/markbuckle/portfolio"><img src={navIcon5} alt="" /></a>
              </div>
            <div class="email2">{'markbuckle92@gmail.com'}</div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}