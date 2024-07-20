import React, { useState, useEffect, useCallback, useContext } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import { UserContext } from "./UserContext";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./styles.css";
import { baseURL } from './Url';
function Crousel() {
  const [index, setIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetchCarouselItems();
  }, []);

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

  const fetchCarouselItems = () => {
    axios
      .get(`${baseURL}/crousel/carousel-items`)
      .then((response) => {
        setCarouselItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching carousel items:", error);
      });
  };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const deleteCarouselItem = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .post(`${baseURL}/crousel/delete-carousel-item`, { itemId })
        .then((response) => {
          console.log("Carousel item deleted:", response.data);
          setAlertMessage({
            type: "success",
            text: "Carousel item deleted successfully",
          });
          // Update carouselItems state or fetch items again if needed
          fetchCarouselItems(); // Fetch items again after deletion
        })
        .catch((error) => {
          console.error("Error deleting carousel item:", error);
          setAlertMessage({
            type: "danger",
            text: "Failed to delete carousel item",
          });
        });
    }
  };

  return (
    <div>
      {alertMessage && (
        <div className={`alert alert-${alertMessage.type}`} role="alert">
          {alertMessage.text}
        </div>
      )}

      <Carousel activeIndex={index} onSelect={handleSelect}>
        {carouselItems.map((item, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100"
              src={item.imageUrl}
              alt={`${item.label} slide`}
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption style={{color:"white"}}>
              <h3>{item.label}</h3>
              <p>{item.text}</p>
              {user && (user.role === "admin" || user.role === "owner") && (
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCarouselItem(item._id)}
                >
                  Delete
                </button>
              )}
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Crousel;
