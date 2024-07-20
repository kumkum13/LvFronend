import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from './Url';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  // MDBCheckbox,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./Contact.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
 
function Contact() {
  useEffect(() => {
    AOS.init();
  }, [])

  const [user, setUser] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [country, setCountry] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectrole, setSelectrole] = useState("");
  // const [termsAgreed, setTermsAgreed] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      axios
        .get(`${baseURL}/current_user`, { withCredentials: true })
        .then((response) => {
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }

    // Fetch languages
    axios
      .get(`${baseURL}/lang/lang-items`)
      .then((response) => {
        setLanguages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching languages:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      email: user?.email,
      contactNumber,
      country,
      selectedLanguage,
      selectrole,
      // termsAgreed,
    };

    axios
      .post(`${baseURL}/contact/submit`, formData)
      .then((response) => {
        console.log("Form submitted successfully:", response.data);
        setAlertMessage({
          type: "success",
          text: "Form submitted successfully",
        });
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((error) => {
        setAlertMessage({
          type: "danger",
          text: "Please Login First! then Submit Form",
        });
        setTimeout(() => navigate("../login"), 2000);
      });
  };

  return (
    <div className="contact-background">
      <MDBContainer className="d-flex flex-column align-items-center justify-content-center min-vh-100" data-aos="zoom-in-up">
        <MDBRow className="d-flex justify-content-center w-100">
          <MDBCol md="8" lg="6">
            <div className="form-container">
              <h2 className="text-center mb-5">Join Our Online Course</h2>
              <form
                onSubmit={handleSubmit}
                style={{ fontWeight: "500", color: "black" }}
              >
                <div className="mb-5">
                  <MDBInput
                    label="First Name"
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-5">
                  <MDBInput
                    label="Last Name"
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    
                  />
                </div>
                <div className="mb-5">
                  <MDBInput
                    label="Email"
                    id="email"
                    type="email"
                    value={user?.email || "Please Register First!"}
                    readOnly
                    backgroundColor="rgb(209, 231, 221)"
                  />
                </div>
                <div className="mb-5">
                  <MDBInput
                    label="Contact Number"
                    id="contactNumber"
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <MDBInput
                    label="Country Name"
                    id="country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label
                    className="form-label"
                    style={{
                      color: "black",
                      fontWeight: "500",
                      fontSize: "21px",
                    }}
                  >
                    Preferred Language & Role
                  </label>
                  <select
                    className="form-select"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    required
                  >
                    <option value="">Select Language</option>
                    {languages.map((lang) => (
                      <option key={lang._id} value={lang.title}>
                        {lang.title}
                      </option>
                    ))}
                  </select> <br />
                  <select
                    className="form-select"
                    value={selectrole}
                    onChange={(e) => setSelectrole(e.target.value)}
                    required
                  >
                    <option value="">Select Role</option>
                      <option value="student">
                       As a Student
                      </option>
                      <option  value="teacher">
                       As a Teacher
                      </option>
                  </select>
                </div>
                {/* <div className="mb-4 check">
                  <MDBCheckbox
                    name="termsAgreed"
                    value=""
                    id="termsAgreed"
                    label="I agree to the terms and conditions"
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                    required
                  />
                  <a href="/">Read Here</a>
                 
                </div> */}

                {alertMessage && (
                  <MDBContainer
                    className={`alert alert-${alertMessage.type} mb-4`}
                  >
                    {alertMessage.text}
                    {/* <button
                      type="button"
                      className="close"
                      onClick={() => setAlertMessage(null)}
                    >
                      <span>&times;</span>
                    </button> */}
                  </MDBContainer>
                )}
                <MDBBtn type="submit" block>
                  Submit
                </MDBBtn>
               
              </form>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <br />
    </div>
  );
}

export default Contact;
