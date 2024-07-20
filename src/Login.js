import React, { useState, useContext } from "react";
import {
  MDBContainer,
  MDBCardImage,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { UserContext } from "./UserContext";
import { baseURL } from './Url';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertColor, setAlertColor] = useState("danger");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${baseURL}/login`,
        { email, password },
        { withCredentials: true }
      )
      .then((result) => {
        const { status, user } = result.data;

        if (status === "Success") {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user); // Set the user context
          setAlertMessage("Login Successful!");
          setAlertColor("success");
          setTimeout(() => {
            navigate("/");
          }, 1000);
          
        } 
        else if(status === "No Password"){
          setAlertMessage("Your Password Is Not Set, Please Set it or Login with Google");
        }else if (status === "The Password is Incorrect") {
          setAlertMessage("Your Password Is Incorrect, Please Try Again");
        } else if (status === "No Record Exist") {
          setAlertMessage("Your Mail is Not Registered! Please Register First");
          setTimeout(() => navigate("../register"), 2000);
        } else {
          console.error("Unexpected response:", result.data);
          setAlertMessage(
            "An unexpected error occurred. Please try again later."
          );
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        setAlertMessage("An error occurred. Please try again later.");
      });
  };

  const handleGoogleLogin = () => {
    window.open(`${baseURL}/auth/google`, "_self");
  };
  document.body.style.overflowX = "hidden";
  return (
    <MDBContainer
      fluid
      style={{  borderRadius: "25px" }}
      className="text-black "
    >
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol col="10" md="5">
            <MDBCardImage
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              fluid
            />
          </MDBCol>
          <MDBCol col="4" md="6" style={{ marginTop: "8%" }}>
            {alertMessage && (
              <div className={`alert alert-${alertColor}`} role="alert">
                {alertMessage}
              </div>
            )}
            <div className="d-flex flex-row align-items-center">
              <MDBIcon fas icon="envelope me-3" size="lg" />
              <MDBInput
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>{" "}
            <br />
            <div className="d-flex flex-row align-items-center">
              <MDBIcon fas icon="lock me-3" size="lg" />
              <MDBInput
                label="Password"
                id="formControlLg"
                type={showPassword ? "text" : "password"}
                size="lg"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="btn btn-outline-secondary ms-2"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>{" "}
            <br />
            <div className="d-flex justify-content-between mb-4">
              <Link to="/forgetpassword">Forgot password?</Link>
            </div>
            <div className="text-center  mt-4 pt-2">
              <MDBBtn type="submit" className="mb-3 px-5 login">
                Login
              </MDBBtn>
              <MDBBtn
                
                type="button"
                className="google-login-btn gbtn"
                onClick={handleGoogleLogin}
              >
                <img
                  src="/img/google.webp"
                  alt="Google logo"
                  className="google-logo"
                />
                Continue With Google
              </MDBBtn>
              <br /> <br />
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?{" "}
                <Link to="/Register" className="link-danger">
                  Register
                </Link>
              </p>
            </div>
          </MDBCol>
        </MDBRow>
      </form> <br /> <br />
    </MDBContainer>
   
  );
}

export default Login;
