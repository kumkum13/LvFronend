import React, { useState, useEffect,useCallback, useContext } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactsTable.css';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import 'react-data-table-component-extensions/dist/index.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserContext } from "./UserContext";
import "./Admin.css";
import { baseURL } from './Url';


import {
  MDBCard,    
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';

function Admin() {
  document.body.style.overflowX = "hidden";

    const [contacts, setContacts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');
  const [message, setMessage] = useState('');

  const handleRoleUpdate = async () => {
    try {
      const response = await fetch(`${baseURL}/updateUserRole`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, role }),
      });
      const data = await response.json();

      if (data.success) {
        setMessage('Role updated successfully!');
        setTimeout(() => {
          setMessage('');
        }, 2000);
       
      } else {
        setMessage(`Failed to update role: ${data.message}`);
        setTimeout(() => {
          setMessage('');
        }, 2000);
      }
    } catch (error) {
      setMessage('Error updating role.');
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
  };

  const fetchCurrentUser = useCallback(() => {
    axios
      .get(`${baseURL}/current_user`, { withCredentials: true })
      .then((response) => {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch((error) => console.error("Error fetching user:", error));
  }, [setUser]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      fetchCurrentUser();
    }
  }, [setUser, fetchCurrentUser]);
console.log(user)
  
    useEffect(() => {
      fetch(`${baseURL}/contact/contacts`)
      .then((response) => response.json())
      .then((data) => {
        const contactsWithSerial = data.map((contact, index) => ({
          ...contact,
          serialNo: index + 1
        }));
        setContacts(contactsWithSerial);
      })
      .catch((error) => console.error('Error fetching contact data:', error));
  }, []);

  useEffect(() => {
    const filteredData = contacts.filter(contact => 
      Object.values(contact).some(value =>
        String(value).toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilteredContacts(filteredData);
  }, [searchText, contacts]);
    const columns = [
      {
        name: 'S.No.',
        selector: (row, index) => index + 1,
        sortable: false,
      },
      {
        name: 'First Name',
        selector: row => row.firstName,
        sortable: true,
      },
      {
        name: 'Last Name',
        selector: row => row.lastName,
        sortable: true,
      },
      {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
      },
      {
        name: 'Contact Number',
        selector: row => row.contactNumber,
        sortable: true,
      },
      {
        name: 'Country',
        selector: row => row.country,
        sortable: true,
      },
      {
        name: 'Role',
        selector: row => row.selectrole,
        sortable: true,
      },
      {
        name: 'Language',
        selector: row => row.selectedLanguage,
        sortable: true,
      },
    ];
    const customStyles = {
      rows: {
        style: {
          minHeight: '72px', // override the row height
          color: 'black', // text color
          fontWeight: 'bold', // bold text
        },
      },
      headCells: {
        style: {
          paddingLeft: '8px', // override the cell padding for head cells
          paddingRight: '8px',
          color: 'black', // text color
          fontWeight: 'bold', // bold text
          borderRight: '1px solid black', // right border for column separation
          borderBottom: '2px solid black',
          borderTop: '2px solid black', // header bottom border
        },
      },
      cells: {
        style: {
          paddingLeft: '8px', // override the cell padding for data cells
          paddingRight: '8px',
          color: 'black', // text color
          fontWeight: 'bold', // bold text
          borderRight: '1px solid black', // right border for column separation
          borderBottom: '1px solid black', // cell bottom border
        },
      },
    };
  

  const [showCarousel, setShowCarousel] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showResource, setShowResource] = useState(false);
  const [label, setLabel] = useState('');
  const [text, setText] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleShowCarousel = () => setShowCarousel(true);
  const handleCloseCarousel = () => setShowCarousel(false);

  const handleShowLanguage = () => setShowLanguage(true);
  const handleCloseLanguage = () => setShowLanguage(false);

  const handleShowResource = () => setShowResource(true);
  const handleCloseResource = () => setShowResource(false);

  const handleSubmitCarousel = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('label', label);
    formData.append('text', text);
    formData.append('image', image);

    axios.post(`${baseURL}/crousel/add-carousel-item`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log('Carousel item added:', response.data);
      setAlertMessage({ type: 'success', text: 'Carousel item added successfully' });
      handleCloseCarousel();
    })
    .catch((error) => {
      console.error('Error adding carousel item:', error);
      setAlertMessage({ type: 'danger', text: 'Failed to add carousel item' });
    });
  };

  const handleSubmitLanguage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', label);
    formData.append('description', text);
    formData.append('image', image);

    axios.post(`${baseURL}/lang/add-lang-item`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log('Language item added:', response.data);
      setAlertMessage({ type: 'success', text: 'Language item added successfully' });
      handleCloseLanguage();
    })
    .catch((error) => {
      console.error('Error adding language item:', error);
      setAlertMessage({ type: 'danger', text: 'Failed to add language item' });
    });
  };

  const handleSubmitResource = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', label);
    formData.append('description', text);
    formData.append('link', link);
    formData.append('image', image);

    axios.post(`${baseURL}/resourses/add-resourses-item`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log('Resource item added:', response.data);
      setAlertMessage({ type: 'success', text: 'Resource item added successfully' });
      handleCloseResource();
    })
    .catch((error) => {
      console.error('Error adding resource item:', error);
      setAlertMessage({ type: 'danger', text: 'Failed to add resource item' });
    });
  };
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Contacts Data', 20, 10);
    
    const tableColumn = columns.map(col => col.name);
    const tableRows = filteredContacts.map(contact => [
      contact.serialNo,
      contact.firstName,
      contact.lastName,
      contact.email,
      contact.contactNumber,
      contact.country,
      contact.selectrole,
      contact.selectedLanguage,
    ]);
  
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });
    doc.save('contacts.pdf');
  };


  return (
    <div>
      <br /><br />
      <h2>Admin Panel</h2>
      <div className="row cardcont">
        <MDBCard  className='admincard'>
          <MDBCardBody>
            <MDBCardTitle>Manage Carousel</MDBCardTitle>
            <MDBCardText>
              Add new items to the carousel by clicking the button below.
            </MDBCardText>
            <MDBBtn onClick={handleShowCarousel}>Add Item</MDBBtn>
          </MDBCardBody>
        </MDBCard>
        <MDBCard  className='admincard'>
          <MDBCardBody>
            <MDBCardTitle>Manage Language</MDBCardTitle>
            <MDBCardText>
              Add new items to the languages by clicking the button below.
            </MDBCardText>
            <MDBBtn onClick={handleShowLanguage}>Add Item</MDBBtn>
          </MDBCardBody>
        </MDBCard>
        <MDBCard className='admincard'>
          <MDBCardBody>
            <MDBCardTitle>Manage Resources</MDBCardTitle>
            <MDBCardText>
              Add new items to the resources by clicking the button below.
            </MDBCardText>
            <MDBBtn onClick={handleShowResource}>Add Item</MDBBtn>
          </MDBCardBody>
        </MDBCard>

       {user.role==="owner" && (
          <div style={{
            background: '#c76232',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            maxWidth: '400px',
            margin: 'auto',
            marginBottom:'4%',
            color:'white'
          }}>
            <h4 style={{ marginBottom: '20px' }}>Manage Role</h4>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                 
                }}
                placeholder='Email'
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Role:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="owner">Owner</option>
              </select>
            </div>
            <button
              onClick={handleRoleUpdate}
              style={{
                padding: '10px 15px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Manage
            </button>
            {message && <p style={{ marginTop: '20px' }}>{message}</p>}
          </div>
       )} 
      </div> <br />

      {alertMessage && (
        <div className={`alert alert-${alertMessage.type}`} role="alert">
          {alertMessage.text}
        </div>
      )}

      <Modal show={showCarousel} onHide={handleCloseCarousel} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "26%" }}>Add Carousel Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitCarousel}>
            <Form.Group controlId="formLabel">
              <h5><Form.Label style={{ color: "black" }}>Label</Form.Label></h5>
              <Form.Control
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formText" className="mt-3">
              <h5 style={{ color: "black" }}><Form.Label style={{ color: "black" }}>Text</Form.Label></h5>
              <Form.Control
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formImage" className="mt-3">
              <h5><Form.Label style={{ color: "black" }}>Image (1480*400)</Form.Label></h5>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3" style={{ marginLeft: "30%" }}>
              Add Carousel Item
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showLanguage} onHide={handleCloseLanguage} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "26%" }}>Add Language Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitLanguage}>
            <Form.Group controlId="formTitle">
              <h5><Form.Label style={{ color: "black" }}>Title</Form.Label></h5>
              <Form.Control
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <h5 style={{ color: "black" }}><Form.Label style={{ color: "black" }}>Description</Form.Label></h5>
              <Form.Control
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formImage" className="mt-3">
              <h5><Form.Label style={{ color: "black" }}>Image (1300*250)</Form.Label></h5>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3" style={{ marginLeft: "30%" }}>
              Add Language Item
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showResource} onHide={handleCloseResource} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "26%" }}>Add Resource Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitResource}>
            <Form.Group controlId="formTitle">
              <h5><Form.Label style={{ color: "black" }}>Title</Form.Label></h5>
              <Form.Control
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <h5 style={{ color: "black" }}><Form.Label style={{ color: "black" }}>Description</Form.Label></h5>
              <Form.Control
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLink" className="mt-3">
              <h5 style={{ color: "black" }}><Form.Label style={{ color: "black" }}>Link of PDF</Form.Label></h5>
              <Form.Control
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formImage" className="mt-3">
              <h5><Form.Label style={{ color: "black" }}>Image (x*250)</Form.Label></h5>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3" style={{ marginLeft: "30%" }}>
              Add Resource Item
            </Button>
          </Form>
        </Modal.Body>
      </Modal>


    
      <div className="contacts-table-container" style={{marginTop:"-2%"}}>
      <h2>Students Data</h2>
      <div className="buttons-container">
        <CSVLink data={contacts} filename="contacts.csv" className="export-button">
          Export CSV
        </CSVLink> <br />
        <button onClick={exportPDF} className="export-button">
          Export PDF
        </button>
        <div className='serchcont'>
        <h4 style={{marginRight:"2%"}}>Search:-</h4>
        <input
     
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="search-input"
        />
        </div>
        
      </div>
      <br />
      <DataTable
        columns={columns}
        data={filteredContacts}
        pagination
        customStyles={customStyles}
        responsive
        highlightOnHover
        striped
      />
    </div>
<br /> <br />
    </div>
  );
}

export default Admin;
