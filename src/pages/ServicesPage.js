import React from 'react';
import { Services } from '@/components/Services';
import { Contact } from '@/components/Contact';
import { PageHero } from '@/components/PageHero';

export const ServicesPage = ({ onContactClick }) => {
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
