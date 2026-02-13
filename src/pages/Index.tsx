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
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <svg className="absolute w-[200%] h-full opacity-[0.07]" style={{ animation: 'waveFloat1 25s ease-in-out infinite' }} viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path d="M0,300 C320,450 520,150 720,300 C920,450 1120,150 1440,300 L1440,900 L0,900 Z" fill="hsl(18,80%,60%)" />
        </svg>
        <svg className="absolute w-[200%] h-full opacity-[0.05]" style={{ animation: 'waveFloat2 30s ease-in-out infinite' }} viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path d="M0,400 C240,550 480,250 720,400 C960,550 1200,250 1440,400 L1440,900 L0,900 Z" fill="hsl(25,95%,65%)" />
        </svg>
        <svg className="absolute w-[200%] h-full opacity-[0.04]" style={{ animation: 'waveFloat3 35s ease-in-out infinite' }} viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path d="M0,500 C360,350 600,550 900,450 C1100,380 1300,550 1440,500 L1440,900 L0,900 Z" fill="hsl(30,8%,85%)" />
        </svg>
        <div className="absolute inset-0 backdrop-blur-[80px] saturate-[1.2] bg-[rgba(10,14,26,0.6)]" />
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