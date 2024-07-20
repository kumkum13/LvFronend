import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
   
} from "mdb-react-ui-kit";
import "./dashboard.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { baseURL } from './Url';
 

function Dashboard() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    AOS.init();
  }, [])

  useEffect(() => {
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
  }, []);
  console.log(user);

  return (
    <section className="vh" style={{ backgroundColor: "#f4f5f7" }}>
      <MDBContainer className="py-5 h-100" data-aos="zoom-in">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
              <MDBRow className="g-0">
                <MDBCol
                  md="4"
                  className="gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <MDBCardImage
                    src={user && user.image ? user.image : "/img/userpic.jpg"}
                    alt="Avatar"
                    className="my-5 uimg"
                    style={{ width: "80px" }}
                    fluid
                  />
                  <MDBTypography
                    tag="h5"
                    style={{ color: "white", fontSize: "23px" }}
                  >
                    {user && user.name ? user.name : "User"}
                  </MDBTypography>
                  {/* <MDBCardText>Web Designer</MDBCardText>
                  <MDBIcon far icon="edit mb-5" /> */}
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">User Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBCol className="pt-1">
                      <MDBRow size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">
                          {user && user.email ? user.email : "No Email"}
                        </MDBCardText>
                      </MDBRow>
                      <MDBRow size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">
                          {user && user.phone ? user.phone : "Not Available"}
                        </MDBCardText>
                      </MDBRow>
                    </MDBCol>

                     
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default Dashboard;
