import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import "./styles.css";
import {Link} from "react-router-dom";
function Footer() {
  return (
    <MDBFooter
      style={{ backgroundColor: "#6f3226" }}
      className="text-center text-lg-start   foot"
    >
      <section
        className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
        style={{ backgroundColor: "#c76232" }}
      >
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="https://www.facebook.com/profile.php?id=61562726766403&mibextid=ZbWKwL" className="me-4 text-reset">
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href="https://x.com/Linguavid15?t=A1g_hvrG_mfWKQmkmPyInA&s=08" className="me-4 text-reset">
            <MDBIcon fab icon="twitter" />
          </a>
          <a href="https://www.instagram.com/linguavidd?igsh=MTkzdWM1MmhrYmg0aA==" className="me-4 text-reset">
            <MDBIcon fab icon="instagram" />
          </a>
          <a href="https://www.linkedin.com/in/lingua-vid-430a08319?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="me-4 text-reset">
            <MDBIcon fab icon="linkedin" />
          </a>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <img
                  src="./img/logo.png"
                  alt="Company Logo"
                  className="me-3"
                  style={{ height: "100px" }}
                />
              </h6>
              <p>
                "Empowering Global Communication through Language Learning:
                Expand Horizons, Connect Cultures, and Achieve Fluency."
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Quick Navigation</h6>
              <p>
                <Link to="/" className="text-reset">
                  Home
                </Link>
              </p>
              <p>
                <Link to="/resources" className="text-reset">
                  Resources
                </Link>
              </p>
              <p>
                <Link to="/languages" className="text-reset">
                  Languages
                </Link>
              </p>
              <p>
                <Link to="/about" className="text-reset">
                  About Us
                </Link>
              </p>
              <p>
                <Link to="/contact" className="text-reset">
                  Contact Us
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <a 
      href="https://www.google.com/maps/search/?api=1&query=119+Gautam+Nagar+near+green+park+metro+station,+New+Delhi" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <p>
        <MDBIcon icon="home" className="me-2" />
        119 Gautam Nagar near green park metro station, New Delhi
      </p>
    </a>
              
              <p>
               
              <a style={{color:"white", textDecoration:"none"}} href="mailto: praksh.linguavid@gmail.com"> <MDBIcon icon="envelope" className="me-3" /> praksh.linguavid@gmail.com</a>
               
              </p>
              <p>
                {/* <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88 */}
              </p>
              
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2024 Copyright:
        <a className="text-reset fw-bold" href="/">
          Linguavid.org
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;
