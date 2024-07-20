import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';
import { UserContext } from './UserContext';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { baseURL } from './Url';

import AOS from 'aos';
import 'aos/dist/aos.css';
 

function Languages() {
  useEffect(() => {
    AOS.init();
  }, [])
  const [languages, setLanguages] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [alertMessage, setAlertMessage] = useState(null);

  const fetchLanguageItems = useCallback(() => {
    axios.get(`${baseURL}/lang/lang-items`)
      .then(response => {
        setLanguages(response.data);
      })
      .catch(error => {
        console.error('Error fetching languages:', error);
      });
  }, []);

  const fetchCurrentUser = useCallback(() => {
    axios.get(`${baseURL}/current_user`, { withCredentials: true })
      .then(response => {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      })
      .catch(error => console.error('Error fetching user:', error));
  }, [setUser]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      fetchCurrentUser();
    }
    fetchLanguageItems();
  }, [setUser, fetchCurrentUser, fetchLanguageItems]);

  const deleteLanguageItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      axios.post(`${baseURL}/lang/delete-lang-item`, { itemId })
        .then(response => {
          console.log('Language item deleted:', response.data);
          setAlertMessage({ type: 'success', text: 'Language item deleted successfully' });
          fetchLanguageItems();
        })
        .catch(error => {
          console.error('Error deleting language item:', error);
          setAlertMessage({ type: 'danger', text: 'Failed to delete language item' });
        });
    }
  };

   

  

  return (
    <>
    <div className='bg-light'>
    {alertMessage && (
        <div className={`alert alert-${alertMessage.type}`} role="alert">
          {alertMessage.text}
        </div>
      )}
      <div className='langbanner'>
        <h1  >Languages</h1>
        <h4>"The limits of my language are the limits of my world."</h4>
      </div>
      <div className='language-heading' data-aos="zoom-in">
      <h1>Click the tabs below to learn more about each language!</h1>
      </div>
       
      <Accordion className="mala">
        {languages.map((language, index) => (
          <Accordion.Item eventKey={index.toString()} key={language._id}>
            <Accordion.Header>{language.title}</Accordion.Header>
            
            <Accordion.Body className="sansk">
              <Image style={{ height: '250px', width: '400px' }} className="sans" src={language.image} />
              <p className="sans1">{language.description}</p>
              {user && (user.role === "admin" || user.role === "owner") && (
                <button
                  style={{ height: '50px', marginTop: '6%' }}
                  className="btn btn-danger"
                  onClick={() => deleteLanguageItem(language._id)}
                >
                  Delete
                </button>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      <br /> 
    </div>
      
    </>
  );
}

export default Languages;
