import "./About.css";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";


function About() {
  useEffect(() => {
    AOS.init();
  }, [])
  return(
    <>
      <div className="about-container">
        <div className="main">
        <h1>About Us</h1>
        </div>
        <section className="about-section">
          <div className="about1" data-aos="fade-up-right">
          <h2>Welcome to Lingua Vid</h2>
          <p>
            Your ultimate destination for language learning and cultural exploration! Our mission is to foster a deep understanding and appreciation of diverse languages, empowering individuals to connect with the world in new and meaningful ways.
          </p>
          </div>
          <div className="about2"  data-aos="flip-right" >
           <img src="/img/Welcome.jpg" alt="Welcome" />
          </div>
           
        </section>

        <section className="vision-section bg-light">
          <div className="vision1" data-aos="flip-right">
          <img src="/img/vision.jpg" alt="Vision" />
          </div>
          <div className="vision2" data-aos="fade-up-left">
          <h2>Our Vision</h2>
          <p>
            We envision a world where language barriers are broken down, and people from all walks of life can communicate and share their unique stories. By promoting language learning, we aim to bridge cultural gaps and build a more inclusive global community.
          </p>
          </div>
           
        </section>

        <section className="mission-section">
          <div className="mission1" data-aos="fade-up-right">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide high-quality, accessible language education that inspires and equips learners to achieve their personal and professional goals. Whether you are a beginner or looking to enhance your language skills, we offer resources and support to guide you on your journey.
          </p>
          </div>
          <div className="mission2" data-aos="flip-right"> 
          <img src="/img/Mission.jpg" alt="Mission" />
          </div>
          
        </section>

        <section className="offer-section bg-light">
          <div className="offer1" data-aos="flip-right">
          <img src="/img/offer.webp" alt="Offer" />
          </div>
          <div className="offer2" data-aos="fade-up-left">
          <h2>What We Offer</h2>
          <ul>
            <li>
              <strong>Comprehensive Language Courses:</strong> Our courses cover a wide range of languages, including but not limited to Spanish, French, Mandarin, German, and Japanese, with structured lessons designed by experienced educators.
            </li>
            <li>
              <strong>Interactive Learning Tools:</strong> From quizzes and flashcards to interactive exercises, we provide engaging tools to make language learning fun and effective.
            </li>
            <li>
              <strong>Cultural Insights:</strong> Language is more than just words; it's a gateway to understanding culture. Our content includes cultural notes, traditions, and real-life applications to deepen your learning experience.
            </li>
            <li>
              <strong>Community Support:</strong> Join our vibrant community of learners and language enthusiasts. Share your progress, ask questions, and participate in discussions to enhance your learning journey.
            </li>
          </ul>
          </div>
           
        </section>

        <section className="team-section" data-aos="zoom-in" >
          <h2>Our Team</h2>
          <p>
            Our team comprises passionate linguists, educators, and tech enthusiasts dedicated to creating an enriching language learning experience. We believe in continuous improvement and welcome feedback to ensure we meet your needs and expectations.
          </p>
        </section>

        <section className="why-choose-us-section bg-light">
          <div className="why1" data-aos="fade-up-right">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>
              <strong>Expertise:</strong> Our courses are crafted by experts in the field of language education.
            </li>
            <li>
              <strong>Flexibility:</strong> Learn at your own pace, anytime, anywhere, with our user-friendly platform.
            </li>
            <li>
              <strong>Support:</strong> Access personalized support and guidance from our dedicated team.
            </li>
          </ul>
          </div>
          <div className="why2" data-aos="flip-right">
          <img src="/img/why.jpg" alt="Why Choose Us?" />
          </div>
           
        </section>

        <section className="thank-you-section" data-aos="zoom-in" >
          <h2>Thank You</h2>
          <p>
            Thank you for choosing Lingua Vid as your language learning partner. We are excited to be part of your journey towards linguistic proficiency and cultural understanding.
          </p>
        </section>
      </div>
    </>
  );
}

export default About;
