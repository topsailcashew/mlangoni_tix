import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EventCard } from './components/EventCard';
import { TicketModal } from './components/TicketModal';
import { TicketView } from './components/TicketView';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginModal } from './components/LoginModal';
import { AboutUs } from './components/AboutUs';
import { LandingContent } from './components/LandingContent';
import { SellerRegistration } from './components/SellerRegistration';
import { EVENTS as INITIAL_EVENTS } from './constants';
import { Event, Ticket, UserProfile, UserRole } from './types';

function App() {
  const [view, setView] = useState<'home' | 'tickets' | 'dashboard' | 'about' | 'register'>('home');
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [myTickets, setMyTickets] = useState<Ticket[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Theme State
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('seatsavvy-theme');
      return (saved === 'light' || saved === 'dark') ? saved : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('seatsavvy-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };
  
  const eventSectionRef = useRef<HTMLDivElement>(null);

  const scrollToEvents = () => {
    eventSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavigate = (newView: 'home' | 'tickets' | 'dashboard' | 'about' | 'register') => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (role: UserRole) => {
    // Simulate Login
    let user: UserProfile;
    if (role === 'admin') {
      user = { id: 'admin1', name: 'System Admin', email: 'admin@seatsavvy.com', role: 'admin' };
      handleNavigate('dashboard');
    } else if (role === 'manager') {
      user = { id: 'manager1', name: 'John Manager', email: 'john@events.com', role: 'manager' };
      handleNavigate('dashboard');
    } else {
      user = { id: 'user1', name: 'Guest User', email: 'guest@gmail.com', role: 'user' };
      handleNavigate('home');
    }
    
    setCurrentUser(user);
    setShowLoginModal(false);
  };

  const handleRegistrationSuccess = (newUser: UserProfile) => {
    setCurrentUser(newUser);
    handleNavigate('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    handleNavigate('home');
  };

  // Event Management Handlers
  const handleAddEvent = (newEvent: Event) => {
    setEvents([...events, newEvent]);
  };

  const handleEditEvent = (updatedEvent: Event) => {
    setEvents(events.map(ev => ev.id === updatedEvent.id ? updatedEvent : ev));
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(ev => ev.id !== id));
  };

  const handlePurchase = (name: string, email: string) => {
    if (!selectedEvent) return;

    // Generate unique ID and rich QR data
    const ticketId = Math.random().toString(36).substring(2, 15);
    
    // Create payload with ticket details and unique identifier
    const qrData = JSON.stringify({
      id: ticketId,
      eventId: selectedEvent.id,
      event: selectedEvent.title,
      date: selectedEvent.date,
      holder: name,
      email: email,
      verified: true
    });
    
    // Generate QR code URL (250x250 with margin)
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}&bgcolor=ffffff&color=000000&margin=2`;

    const newTicket: Ticket = {
      id: ticketId,
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      eventDate: selectedEvent.date,
      holderName: name,
      holderEmail: email,
      qrCodeUrl: qrCodeUrl,
      purchaseDate: new Date().toISOString()
    };

    setMyTickets([...myTickets, newTicket]);
    setSelectedEvent(null);
    handleNavigate('tickets');
  };

  // Render Dashboard View (Auth Guarded)
  if (view === 'dashboard' && currentUser && currentUser.role !== 'user') {
    return (
      <AdminDashboard 
        currentUser={currentUser}
        allEvents={events}
        allSoldTickets={myTickets} // In a real app, this would be fetched based on permissions
        onAddEvent={handleAddEvent}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    );
  }

  // Render Registration View
  if (view === 'register') {
      return (
          <SellerRegistration 
            onRegister={handleRegistrationSuccess}
            onLoginClick={() => setShowLoginModal(true)}
            onBack={() => handleNavigate('home')}
          />
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans selection:bg-brand-orange selection:text-white transition-colors duration-300">
      
      {view !== 'dashboard' && (
        <>
          {/* Navbar is hidden on Registration page, but shown elsewhere */}
          <Navbar 
            currentUser={currentUser}
            onNavigateHome={() => handleNavigate('home')} 
            onNavigateMyTickets={() => handleNavigate('tickets')}
            onNavigateDashboard={() => handleNavigate('dashboard')}
            onNavigateAbout={() => handleNavigate('about')}
            onLoginClick={() => setShowLoginModal(true)}
            cartCount={myTickets.length}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          
          {view === 'home' && (
            <main>
              <Hero 
                onScrollDown={scrollToEvents} 
                onStartSelling={() => handleNavigate('register')}
              />
              
              <div ref={eventSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                 <div className="flex justify-between items-end mb-16">
                   <h2 className="text-5xl font-black uppercase text-zinc-900 dark:text-white transition-colors">
                     Upcoming <br/>
                     <span className="text-gray-400 dark:text-gray-500">Events</span>
                   </h2>
                   <div className="hidden md:block">
                     <span className="inline-block animate-bounce text-brand-orange text-3xl">↓</span>
                   </div>
                 </div>
  
                 {events.length === 0 ? (
                   <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm">
                      <p className="text-gray-500 font-bold uppercase tracking-widest">No events currently scheduled.</p>
                   </div>
                 ) : (
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                      {events.map(event => (
                        <EventCard 
                          key={event.id} 
                          event={event} 
                          onClick={setSelectedEvent} 
                        />
                      ))}
                   </div>
                 )}
              </div>

               {/* New Landing Content (Benefits for Organizers/Attendees) */}
               <LandingContent />

               {/* Footer Simple */}
               <footer className="border-t border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-900 py-12 text-center transition-colors">
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">© 2025 MlangoniTix. All rights reserved.</p>
               </footer>
            </main>
          )}

          {view === 'about' && (
            <AboutUs onBack={() => handleNavigate('home')} />
          )}
        </>
      )}

      {view === 'tickets' && (
        <TicketView 
          tickets={myTickets} 
          onClose={() => handleNavigate('home')} 
        />
      )}

      {selectedEvent && (
        <TicketModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)}
          onPurchase={handlePurchase}
        />
      )}

      {showLoginModal && (
        <LoginModal 
          onLogin={handleLogin} 
          onClose={() => setShowLoginModal(false)} 
        />
      )}

    </div>
  );
}

export default App;