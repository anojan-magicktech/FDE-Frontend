import React from 'react';
import { Services } from 'components/sections/Services';
import { Contact } from 'components/sections/Contact';
import { PageHero } from 'components/layout/PageHero';

interface ServicesPageProps {
  onContactClick: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onContactClick }) => {
  return (
    <>
      <PageHero
        title={
          <>
            <span className="block">Our Services</span>
            <span className="block text-gold mt-2">Built for the Future</span>
          </>
        }
        subtitle="Comprehensive Construction Solutions"
      />
      <div className="pt-0">
        <Services hideHeader={true} />
        <Contact onContactClick={onContactClick} />
      </div>
    </>
  );
};
