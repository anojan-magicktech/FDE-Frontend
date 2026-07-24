import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail, type LucideIcon } from 'lucide-react';

interface ContactProps {
  onContactClick: () => void;
}

interface ContactDetail {
  icon: LucideIcon;
  label: string;
  value: string;
  link: string;
}

const contactDetails: ContactDetail[] = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+94 77 582 4660',
    link: 'tel:+94775824660',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'futuredesignengineering8@gmail.com',
    link: 'mailto:futuredesignengineering8@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Periyapathi Vathiry Karaveddy, Jaffna, Sri Lanka',
    link: 'https://maps.google.com/?q=Periyapathi+Vathiry+Karaveddy+Jaffna+Sri+Lanka',
  },
];

export const Contact: React.FC<ContactProps> = ({ onContactClick }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 bg-zinc-200 text-zinc-900 relative overflow-hidden border-t border-zinc-300"
      ref={ref}
      data-testid="contact-section"
    >
      {/* Decorative ambient background highlight */}
      <div className="absolute right-1/4 bottom-0 w-80 h-80 bg-royal-blue/5 rounded-full blur-3xl opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-1.5 border border-royal-blue/30 bg-royal-blue/10 rounded-full mb-6">
            <span className="text-royal-blue text-xs tracking-[0.2em] font-body font-semibold uppercase">
              CONTACT US
            </span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-zinc-950">
            Let's Build
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-500"> Together</span>
          </h2>
          <p className="text-zinc-650 text-lg sm:text-xl max-w-3xl mx-auto font-body font-light">
            Ready to transform your vision into reality? Get in touch with our team to discuss your
            next construction project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Details side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between space-y-6 transform-gpu"
          >
            <div className="space-y-6">
              {contactDetails.map((detail, index) => {
                const Icon = detail.icon;
                return (
                  <motion.a
                    key={index}
                    href={detail.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-start space-x-6 p-6 bg-white border border-zinc-300 hover:border-zinc-400 hover:shadow-lg hover:shadow-zinc-400/20 rounded-xl transition-all duration-300 group transform-gpu"
                    data-testid={`contact-detail-${index}`}
                  >
                    <div className="flex-shrink-0">
                      <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 group-hover:border-royal-blue/30 group-hover:bg-royal-blue/10 transition-all duration-300">
                        <Icon
                          className="text-gold group-hover:text-royal-blue transition-colors duration-300"
                          size={24}
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-zinc-900 mb-1 group-hover:text-gold transition-colors duration-300">
                        {detail.label}
                      </h3>
                      <p className="text-zinc-650 font-body font-light text-sm sm:text-base leading-relaxed break-words">{detail.value}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="pt-4"
            >
              <button
                onClick={onContactClick}
                className="w-full px-8 py-4 bg-gradient-to-r from-gold to-gold-dim text-black font-body font-semibold text-lg tracking-wide rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                data-testid="contact-cta-button"
              >
                Request Consultation
              </button>
            </motion.div>
          </motion.div>

          {/* Map side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative h-[350px] lg:h-auto min-h-[350px] overflow-hidden border border-zinc-300 rounded-xl shadow-lg transform-gpu"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31553.647542893892!2d80.0!3d9.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNDgnMDAuMCJOIDgwwrAwMCcwMC4wIkU!5e0!3m2!1sen!2slk!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.1) contrast(1.05)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Future Design Engineering Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
