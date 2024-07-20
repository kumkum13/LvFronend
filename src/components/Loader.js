import React, { useState, useEffect } from "react";
import '../styles.css'
import "bootstrap/dist/css/bootstrap.min.css";  
import Crousel from "../Crousel";

import AOS from 'aos';
import 'aos/dist/aos.css';
 

function Loader() {
  const [loading, setLoading] = useState(true);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const showGif = true;
  useEffect(() => {
    AOS.init();
  }, [])
  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem("hasLoadedBefore");

    if (hasLoadedBefore) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasLoadedBefore", true);
      }, 4400);

      const welcomeTimer = setTimeout(() => {
        setShowWelcomeMessage(true);
      }, 3000); // Show welcome message after 3000 ms

      return () => {
        clearTimeout(timer);
        clearTimeout(welcomeTimer);
      };
    }
  }, []);

  return (
    <div >
      {loading ? (
        <div className="loading-container">
          {showGif && <img src='./gif.gif' alt="Loading..." />}
          <h2 style={{fontWeight:"bold"}}>Namaste</h2>
          {showWelcomeMessage && (
            <h2 className="welcome-message">Welcome to LinguaVid</h2>
          )}
        </div>
      ) : (
        <div className="content">
          <Crousel />
          <section className="a-section">
          <div className="a1" data-aos="fade-up-right">
          <h2>Welcome to Lingua Vid</h2>
          <p>
            Your ultimate destination for language learning and cultural exploration! Our mission is to foster a deep understanding and appreciation of diverse languages, empowering individuals to connect with the world in new and meaningful ways.
          </p>
          </div>
          <div className="a2"  data-aos="flip-right" >
           <img src="/img/Welcome2.jpg" alt="Welcome" />
          </div>
        </section>
        <section className="team-section" data-aos="zoom-in" >
          <h1>Meet Our Founder</h1>
           
        </section>
        <section className="v-section bg-light">
          <div className="v1" data-aos="flip-right">
          <img src="/img/Akshata.jpg" alt="Vision" />
          </div>
          <div className="v2" data-aos="fade-up-left">
          <h2>Mrs. Akshata</h2>
          <p>
          At Linguavid, we are proud to be led by Mrs. Akshata, a visionary in the field of language education and cultural exchange. With a deep passion for languages and a commitment to making high-quality language learning accessible to all, Akshata has dedicated their career to fostering a global community of learners.
          </p>
          <p>
          Akshata holds B.sc, M.sc, B.ed, CTET, UPTET and has over 8 years of experience in Teaching maths, Science. Their innovative approach to language learning combines traditional methods with modern technology, ensuring that learners receive a well-rounded and engaging educational experience.
          </p>
          <p>
          Driven by a belief in the power of language to connect people and cultures, Akshata founded Linguavid to create a platform where learners can explore the beauty and diversity of languages from around the world. Under their leadership, Linguavid continues to grow and evolve, always staying true to its mission of promoting linguistic and cultural understanding.
          </p>
          <p>
          Join us at Linguavid and be inspired by Akshata's dedication and vision for a world where language is a bridge, not a barrier.
          </p>
          </div>
           
        </section>
        <section className="team-section" data-aos="zoom-in" >
          <h1>Meet Our Sanskrit Educator</h1>
           
        </section>
        <section className="m-section bg-light">
          <div className="m1" data-aos="fade-up-right">
          <h2>Mr. Pradyumna</h2>
          <p>
          We are honored to introduce Pradyumna, our esteemed Sanskrit educator at Linguavid. With a profound expertise in the Sanskrit language and a passion for teaching, Pradyumna brings a wealth of knowledge and inspiration to our learners.
          </p>
          <p>
          Pradyumna holds Graduation in Sanskrit, MA in Sanskrit, Acharya in Shukla Yajurveda, B.ed, and has extensive experience in teaching Sanskrit at various levels. Their dedication to the language and its rich heritage is evident in their engaging and comprehensive teaching style.
          </p>
          <p>
            At Linguavid, Pradyumna is committed to making the learning of Sanskrit an enriching and accessible experience. They expertly guide students through the intricacies of Sanskrit grammar, literature, and philosophy, ensuring a deep and nuanced understanding of this ancient language.
          </p>
          <p>
          Under the guidance of Pradyumna, learners not only gain linguistic skills but also an appreciation for the cultural and historical significance of Sanskrit. Join us at Linguavid and embark on a journey of discovery and enlightenment with Pradyumna, a true advocate for the timeless wisdom of Sanskrit.
          </p>
          </div>
          <div className="m2" data-aos="flip-right"> 
          <img src="/img/Pradyumna.jpg" alt="Mission" />
          </div>
          
        </section>
        <section className="thank-you-section" data-aos="zoom-in" >
          <h2>Thank You</h2>
          <p>
            Thank you for choosing Lingua Vid as your language learning partner. We are excited to be part of your journey towards linguistic proficiency and cultural understanding.
          </p>
        </section>

        </div>
      )}
    </div>
  );
}

export default Loader;
