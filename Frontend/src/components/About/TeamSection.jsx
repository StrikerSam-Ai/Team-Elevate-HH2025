import React from 'react';
import styles from './About.module.css';

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Founder & CEO',
      bio: 'Former geriatric care specialist with 20+ years of experience in senior healthcare and community building.',
      image: null
    },
    {
      name: 'Michael Rodriguez',
      role: 'Head of Community',
      bio: 'Dedicated to creating inclusive spaces and meaningful connections within senior communities.',
      image: null
    },
    {
      name: 'Emma Thompson',
      role: 'Technology Director',
      bio: 'Specialist in creating accessible technology solutions for seniors.',
      image: null
    },
    {
      name: 'David Park',
      role: 'Wellness Coordinator',
      bio: 'Certified wellness coach focused on holistic health programs for seniors.',
      image: null
    }
  ];

  return (
    <div className={styles.teamSection}>
      <h2>Our Team</h2>
      <p className={styles.teamIntro}>
        Meet the dedicated professionals working to create a more connected and 
        engaging community for seniors.
      </p>
      
      <div className={styles.teamGrid}>
        {teamMembers.map((member, index) => (
          <div key={index} className={styles.teamMemberCard}>
            <div className={styles.memberImage}>
              {/* Member image will go here */}
            </div>
            
            <div className={styles.memberInfo}>
              <h3>{member.name}</h3>
              <span className={styles.memberRole}>{member.role}</span>
              <p className={styles.memberBio}>{member.bio}</p>
            </div>

            <div className={styles.memberSocial}>
              <a href="#" className={styles.socialLink} aria-label={`${member.name}'s LinkedIn profile`}>
                LinkedIn
              </a>
              <a href="#" className={styles.socialLink} aria-label={`${member.name}'s Twitter profile`}>
                Twitter
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;