import React from 'react';
import MissionStatement from '../../components/About/MissionStatement';
import TeamSection from '../../components/About/TeamSection';
import ImpactSection from '../../components/About/ImpactSection';
import ContactSection from '../../components/About/ContactSection';

const About = () => {
  return (
    <div>
      <MissionStatement />
      <TeamSection />
      <ImpactSection />
      <ContactSection />
    </div>
  );
};

export default About;