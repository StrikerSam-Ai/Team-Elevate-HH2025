import React from 'react';
import styles from './About.module.css';

const ImpactSection = () => {
  const stats = [
    {
      number: '10,000+',
      label: 'Active Members',
      description: 'Seniors actively participating in our community'
    },
    {
      number: '500+',
      label: 'Local Groups',
      description: 'Community groups organized by interests'
    },
    {
      number: '2,000+',
      label: 'Monthly Events',
      description: 'Both virtual and in-person activities'
    },
    {
      number: '95%',
      label: 'Satisfaction Rate',
      description: 'Members reporting improved social connection'
    }
  ];

  const testimonials = [
    {
      quote: "This platform has completely changed how I connect with others. I've made wonderful friends who share my interests.",
      author: "Margaret, 72",
      location: "Seattle, WA"
    },
    {
      quote: "The events and activities keep me engaged and looking forward to each day. It's like having a second family.",
      author: "Robert, 68",
      location: "Boston, MA"
    }
  ];

  return (
    <div className={styles.impactSection}>
      <h2>Our Impact</h2>
      
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <span className={styles.statNumber}>{stat.number}</span>
            <h3 className={styles.statLabel}>{stat.label}</h3>
            <p className={styles.statDescription}>{stat.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.testimonialSection}>
        <h3>Community Voices</h3>
        <div className={styles.testimonialGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <blockquote className={styles.testimonialQuote}>
                {testimonial.quote}
              </blockquote>
              <div className={styles.testimonialAuthor}>
                <span className={styles.authorName}>{testimonial.author}</span>
                <span className={styles.authorLocation}>{testimonial.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.impactCTA}>
        <h3>Join Our Growing Community</h3>
        <p>Be part of a movement that's transforming senior social connection</p>
        <button className={styles.ctaButton}>Get Started Today</button>
      </div>
    </div>
  );
};

export default ImpactSection;