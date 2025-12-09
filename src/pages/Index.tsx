import { useState } from 'react';
import Navigation from '@/components/sections/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import RoomsSection from '@/components/sections/RoomsSection';
import BookingSection from '@/components/sections/BookingSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import ContactsSection from '@/components/sections/ContactsSection';
import Footer from '@/components/sections/Footer';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    roomType: '',
    guests: 2
  });

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookRoom = (roomType: string) => {
    setBookingData({ ...bookingData, roomType });
    scrollToSection('booking');
  };

  const handleBookingChange = (data: Partial<typeof bookingData>) => {
    setBookingData({ ...bookingData, ...data });
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="wave-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 0 100 Q 25 80, 50 100 T 100 100 T 150 100 T 200 100" stroke="#d4670e" strokeWidth="2" fill="none" opacity="0.3"/>
            <path d="M 0 120 Q 30 100, 60 120 T 120 120 T 180 120 T 200 120" stroke="#d4670e" strokeWidth="1.5" fill="none" opacity="0.2"/>
            <path d="M 0 80 Q 20 60, 40 80 T 80 80 T 120 80 T 160 80 T 200 80" stroke="#d4670e" strokeWidth="1" fill="none" opacity="0.15"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#wave-pattern)" />
        </svg>
      </div>
      
      <div className="relative z-10">
        <Navigation onNavigate={scrollToSection} />
        <HeroSection onNavigate={scrollToSection} />
        <RoomsSection onBookRoom={handleBookRoom} />
        <BookingSection bookingData={bookingData} onBookingChange={handleBookingChange} />
        <ReviewsSection />
        <ContactsSection />
        <Footer />
      </div>
    </div>
  );
}