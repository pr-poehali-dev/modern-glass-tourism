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
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1220] to-[#121826]">
      <Navigation onNavigate={scrollToSection} />
      <HeroSection onNavigate={scrollToSection} />
      <RoomsSection onBookRoom={handleBookRoom} />
      <BookingSection bookingData={bookingData} onBookingChange={handleBookingChange} />
      <ReviewsSection />
      <ContactsSection />
      <Footer />
    </div>
  );
}