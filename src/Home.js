import { useState, useEffect } from "react";
import Footer from "./Footer";
import Crousel from "./Crousel";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import AOS from 'aos';
import 'aos/dist/aos.css';
function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    AOS.init();
  }, [])
  useEffect(() => {
    // Simulate a delay to demonstrate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the delay as needed (in milliseconds)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-container">
      {loading ? (
        <div className="loading-container">
          <img src= './loading.gif' alt="Loading..." />
          <p>Loading...</p>
        </div>
      ) : (
        <div className="content">
          <Crousel />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Home;
