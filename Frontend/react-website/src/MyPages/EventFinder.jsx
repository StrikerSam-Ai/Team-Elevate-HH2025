import React, { useState } from 'react';
import './style.css';
import Footer from './Footer';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import Jaya from './Jaya.jpg';
import Profile from './Profile';
import SlideTransition from './SlideTransition';
import Movies from './Movies.jpg';        
import BhavadGita from './BhavadGita.jpg';
import Satsang from './Satsang.jpg';
import HealthWorkshop from './HealthWorkshop.jpg';
import Cooking from './Cooking.jpg';
import Temple from './Temple.jpg';
import Grandparents from './Grandparents.jpg';
import kirtan from './kirtan.jpg';
import StoryTelling from './StoryTelling.jpg';  
import EventPage1 from './EventPage1.jpg';
import EventPage2 from './EventPage2 .jpg';

const EventFinder = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    }
  };

  const carouselItems = [
    {
      background: "#f8f9fa",
      video: "https://www.youtube.com/embed/BWs5S58E3aY?si=JFt76tpW7UcGdVfV"
    },
    {
      //title: "Cooking Classes for Traditional Recipes",
      //description: "Learn to prepare authentic traditional recipes with expert guidance. Perfect for preserving family recipes.",
      background: "#e9ecef",
      image: EventPage1
    },
    {
      //title: "Health Workshop",
      //description: "Comprehensive session covering diabetes management, joint care, and mental wellness for seniors",
      background: "#dee2e6",
      image: EventPage2
    }
  ];

  return (
    <>
      <SlideTransition />
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
          {/* Replace Link with div for profile photo */}
          <div className="profile-photo" onClick={() => setIsProfileOpen(true)}>
            <img src={Jaya} alt="Profile" />
          </div>
        </nav>
  
        <div className="event-finder-container">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={false}
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
                {item.video ? (
                  <div className="video-container">
                    <iframe 
                      width="560" 
                      height="250"  
                      src="https://www.youtube.com/embed/BWs5S58E3aY?si=JFt76tpW7UcGdVfV"
                      title="YouTube Live Stream"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen>
                    </iframe>
                  </div>
                ) : item.image ? (
                  <div className="carousel-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                ) : null}
                <h1>{item.title}</h1>
                <p>{item.description}</p>
              </div>
            ))}
          </Carousel>
        </div>
  
        <section className="upcoming-events">
          <h2>Upcoming Events</h2>
          
                <div className="event-cards">
                    {[
                      {
                        title: "Storytelling Evening",
                        date: "21-05-2025",
                        description: "share memories or stories from the past",
                        image: StoryTelling  // Update this line
                      },
                      {
                        title: "Classic Hindi Movie Night",
                        date: "18-05-2025",
                        description: "Relive the golden era of Bollywood!",
                        image: Movies
                      },
                      {
                        title: "Bhagavad Gita Workshop",
                        date: "10-05-2025",
                        description: "Wisdom for the soul, peace for the mind.",
                        image: BhavadGita
                      }
                    ].map((event, index) => (
                      <div key={index} className="event-card">
                        <div className="event-image">
                          {event.image && <img src={event.image} alt={event.title} />}
                        </div>
                        <h3>{event.title}</h3>
                        <p>Date: {event.date}</p>
                        <p>{event.description}</p>
                        <button className="register-btn">Register Now</button>
                      </div>
                    ))}
                  </div>
        </section>
  
        <div className="events-grid">
          <section className="online-events">
            <h2>Online Events</h2>
            <div className="event-list">
              {[
                {
                  title: "Virtual Satsangs",
                  date: "15-07-2025",
                  time: "09:00 AM",
                  status: "Registered",
                  image: Satsang
                },
                {
                  title: "Health Workshop",
                  date: "18-06-2025",
                  time: "11:00 AM",
                  status: "Registration Open",
                  image: HealthWorkshop
                },
                {
                  title: "Cooking Classes for Traditional Recipes",
                  date: "20-06-2025",
                  time: "07:00 AM",
                  status: "Registration Open",
                  image: Cooking
                }
              ].map((event, index) => (
                <div key={index} className="event-item">
                  <div className="event-item-image">
                    <img src={event.image} alt={event.title} />
                  </div>
                  <h3>{event.title}</h3>
                  <p>Date: {event.date}</p>
                  <p>Time: {event.time}</p>
                  <div className="registration-status">{event.status}</div>
                </div>
              ))}
            </div>
          </section>

          
                    <section className="offline-events">
                      <h2>Offline Events</h2>
                      <div className="event-list">
                        <div className="event-item">
                          <div className="event-item-image">
                            <img src={Temple} alt="Local Temple Visits" />
                          </div>
                          <h3>Local Temple Visits</h3>
                          <p>Date: 15-08-2025</p>
                          <p>Location: Mangalagiri</p>
                          <div className="registration-status">Registration Open</div>
                        </div>
                        <div className="event-item">
                          <div className="event-item-image">
                            <img src={Grandparents} alt="Grandparents's Day" />
                          </div>
                          <h3>Grandparents's Day</h3>
                          <p>Date: 07-09-2025</p>
                          <p>Location: Community Center</p>
                          <div className="registration-status">Registration Open</div>
                        </div>

                                    <div className="event-item">
                                      <div className="event-item-image">
                                        <img src={kirtan} alt="Rahin Sabhai kirtan" />  
                                      </div>
                                      <h3>Rahin Sabhai kirtan</h3>
                                      <p>Date: 21-06-2025</p>
                                      <p>Devi Maa Temple</p>
                                      <div className="registration-status">Registration Open</div>
                                    </div>
                                  </div>
                                </section>
        </div>
  
        <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        <Footer />
      </div>
    </>
  );
};

export default EventFinder;
