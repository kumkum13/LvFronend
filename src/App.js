import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import About from "./About";
import Login from "./Login";
import Register from "./Register";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Logout from "./Logout";
import Dashboard from "./Dashboard";
import ForgetPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import Footer from "./Footer";
 
import Languages from "./Languages";
import Resources from "./Resources";
import Loader from "./components/Loader";
import Admin from "./Admin";
import Contact from "./Contact";


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
         
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Loader/>
              </>
            }
          />
          <Route path="/resources" element={<Resources />} />
          <Route path="/languages" element={<Languages />} />
          <Route path="/about" element={<About></About>} />
          <Route path="/contact" element={<Contact></Contact>} />
          <Route path="/link" />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/register" element={<Register></Register>} />
          <Route path="/logout" element={<Logout></Logout>} />
          <Route path="/dashboard" element={<Dashboard></Dashboard>} />
          <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
          <Route path="/resetpassword" element={<ResetPassword />}></Route>
          <Route path="/admin" element={<Admin/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
