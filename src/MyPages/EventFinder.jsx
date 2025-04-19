import React from 'react';
import './style.css';
import Footer from './Footer';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import Jaya from './Jaya.jpg';

const EventFinder = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    }
  };

  const carouselItems = [
    {
      title: "Event Finder",
      description: "Discover amazing events happening around you",
      background: "#f8f9fa"
    },
    {
      title: "Join Activities",
      description: "Participate in engaging community events",
      background: "#e9ecef"
    },
    {
      title: "Stay Connected",
      description: "Meet new friends and stay active",
      background: "#dee2e6"
    }
  ];

  return (
    <div className="community-container">
      <nav className="navbar">
         <div className="nav-content">
          <div className="logo">Logo</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/community">Community</Link>
            <Link to="/events">Events</Link>
          </div>
        </div>
        <Link to="/profile">
          <div className="profile-photo">
            <img src={Jaya} alt="Profile" />  
          </div>
        </Link>
      </nav>

      <div className="event-finder-container">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          className="event-carousel"
          customLeftArrow={<button className="carousel-arrow left">‹</button>}
          customRightArrow={<button className="carousel-arrow right">›</button>}
        >
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className="carousel-item"
              style={{ background: item.background }}
            >
              <h1>{item.title}</h1>
              <p>{item.description}</p>
            </div>
          ))}
        </Carousel>
      </div>

      <section className="upcoming-events">
        <h2>Upcoming Events</h2>
        <div className="event-cards">
          {[1, 2, 3].map((item) => (
            <div key={item} className="event-card">
              <div className="event-image"></div>
              <h3>Event Title {item}</h3>
              <p>Date: XX-MM-YY</p>
              <p>A brief description of the event goes here</p>
              <button className="register-btn">Register Now</button>
            </div>
          ))}
        </div>
      </section>

      <div className="events-grid">
        <section className="online-events">
          <h2>Online Events</h2>
          <div className="event-list">
            <div className="event-item">
              <h3>Yoga Session</h3>
              <p>Date: 15-07-2025</p>
              <p>Time: 09:00 AM</p>
              <div className="registration-status">Registered</div>
            </div>
            <div className="event-item">
              <h3>Health Workshop</h3>
              <p>Date: 18-06-2025</p>
              <p>Time: 11:00 AM</p>
              <div className="registration-status">Registration Open</div>
            </div>
            <div className="event-item">
              <h3>Meditation Class</h3>
              <p>Date: 20-06-2025</p>
              <p>Time: 07:00 AM</p>
              <div className="registration-status">Registration Open</div>
            </div>
          </div>
        </section>

        <section className="offline-events">
          <h2>Offline Events</h2>
          <div className="event-list">
            <div className="event-item">
              <h3>Morning Walk</h3>
              <p>Date: 15-08-2025</p>
              <p>Location: City Park</p>
              <div className="registration-status">Registration Open</div>
            </div>
            <div className="event-item">
              <h3>Chess Tournament</h3>
              <p>Date: 19-07-2025</p>
              <p>Location: Community Center</p>
              <div className="registration-status">Registration Open</div>
            </div>
            <div className="event-item">
              <h3>Group Exercise</h3>
              <p>Date: 21-06-2025</p>
              <p>Location: Senior Fitness Center</p>
              <div className="registration-status">Registration Open</div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default EventFinder;
