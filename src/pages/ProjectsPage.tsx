import React from 'react';
import { Projects } from 'components/sections/Projects';
import { Contact } from 'components/sections/Contact';
import { PageHero } from 'components/layout/PageHero';

interface ProjectsPageProps {
  onContactClick: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onContactClick }) => {
  return (
    <>
      <PageHero
        title={
          <>
            <span className="block">Our Projects</span>
            <span className="block text-gold mt-2">Portfolio of Excellence</span>
          </>
        }
        subtitle="Engineering Masterpieces"
      />
      <div className="pt-0">
        <Projects hideHeader={true} />
        <Contact onContactClick={onContactClick} />
      </div>
    </>
  );
};
