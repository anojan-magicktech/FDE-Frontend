import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from 'components/ui/dialog';
import { Input } from 'components/ui/input';
import { Textarea } from 'components/ui/textarea';
import { Label } from 'components/ui/label';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { User, Mail, Phone, Building2, MessageSquare, Send } from 'lucide-react';
import { getLenisInstance } from 'lib/lenis';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { submitContactForm, resetContactStatus } from 'store/contactSlice';
import type { ContactFormData } from 'types/contact';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  message: '',
};

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.contact.status);
  const isSubmitting = status === 'loading';

  // Safeguard: Stop Lenis scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      getLenisInstance()?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      getLenisInstance()?.start();
      document.body.style.overflow = '';
    }

    return () => {
      getLenisInstance()?.start();
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(submitContactForm(formData)).unwrap();

      toast.success('Request Received', {
        description: 'Our team will review your project details and contact you shortly.',
        duration: 5000,
      });

      setFormData(initialFormData);
      dispatch(resetContactStatus());
      onClose();
    } catch (error) {
      console.error('Error:', error);

      toast.error('Error', {
        description: 'Something went wrong. Please try again.',
      });
      dispatch(resetContactStatus());
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="flex flex-col bg-zinc-950 border border-gold/20 text-white w-[calc(100vw-1rem)] sm:w-[95vw] max-w-2xl max-h-[calc(100dvh-1rem)] overflow-y-auto overscroll-contain custom-scrollbar p-0 gap-0 shadow-2xl shadow-gold/5 z-[60] rounded-xl"
        data-testid="contact-modal"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-80" />

        <DialogHeader className="p-5 pb-2 sm:p-8 sm:pb-4 text-center sm:text-left">
          <DialogTitle className="font-heading text-2xl sm:text-4xl font-bold text-white tracking-tight flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
            <span>Start Your</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-400">
              Project
            </span>
          </DialogTitle>

          <DialogDescription className="text-white/60 font-body font-light text-sm sm:text-base mt-2">
            Partner with us to bring your vision to life. Fill in the details below for a consultation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-5 pt-2 sm:p-8 sm:pt-4 space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-gold/80 text-xs uppercase tracking-wider font-semibold"
              >
                Full Name
              </Label>

              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-white/40" />

                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="pl-10 bg-zinc-900/60 border-white/5 text-white placeholder:text-white/20 focus:border-gold/50 focus:ring-gold/25 focus:ring-1 h-11 transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-gold/80 text-xs uppercase tracking-wider font-semibold"
              >
                Email Address
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-white/40" />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-10 bg-zinc-900/60 border-white/5 text-white placeholder:text-white/20 focus:border-gold/50 focus:ring-gold/25 focus:ring-1 h-11 transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-gold/80 text-xs uppercase tracking-wider font-semibold"
              >
                Phone Number
              </Label>

              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-white/40" />

                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="pl-10 bg-zinc-900/60 border-white/5 text-white placeholder:text-white/20 focus:border-gold/50 focus:ring-gold/25 focus:ring-1 h-11 transition-all duration-300"
                  placeholder="+94 77 123 4567"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="projectType"
                className="text-gold/80 text-xs uppercase tracking-wider font-semibold"
              >
                Project Type
              </Label>

              <div className="relative">
                <Building2 className="absolute left-3 top-3.5 h-4 w-4 text-white/40 pointer-events-none" />

                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 h-11 bg-zinc-900/60 border border-white/5 text-white rounded-md focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/25 appearance-none transition-all duration-300 text-sm"
                >
                  <option value="" className="bg-zinc-950 text-white/30">
                    Select Project Type
                  </option>
                  <option value="residential" className="bg-zinc-950">
                    Residential Construction
                  </option>
                  <option value="commercial" className="bg-zinc-950">
                    Commercial Project
                  </option>
                  <option value="industrial" className="bg-zinc-950">
                    Industrial Facility
                  </option>
                  <option value="renovation" className="bg-zinc-950">
                    Renovation
                  </option>
                  <option value="consultation" className="bg-zinc-950">
                    Engineering Consultation
                  </option>
                  <option value="other" className="bg-zinc-950">
                    Other
                  </option>
                </select>

                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-white/40">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="message"
              className="text-gold/80 text-xs uppercase tracking-wider font-semibold"
            >
              Project Details
            </Label>

            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-white/40" />

              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={3}
                className="pl-10 min-h-[96px] sm:min-h-[120px] bg-zinc-900/60 border-white/5 text-white placeholder:text-white/20 focus:border-gold/50 focus:ring-gold/25 focus:ring-1 resize-none transition-all duration-300"
                placeholder="Tell us about your project requirements, timeline, and budget..."
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-gold to-gold-dim text-black font-body font-bold text-sm sm:text-base tracking-wide shadow-lg shadow-gold/10 hover:shadow-gold/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-md mt-3 sm:mt-4 transition-all"
            whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
          >
            {isSubmitting ? (
              'Processing...'
            ) : (
              <>
                Submit Request <Send size={16} strokeWidth={2} />
              </>
            )}
          </motion.button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
