import React from 'react';
import { User, LayoutDashboard, LogIn, Sun, Moon } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentUser: UserProfile | null;
  onNavigateHome: () => void;
  onNavigateMyTickets: () => void;
  onNavigateDashboard: () => void;
  onNavigateAbout: () => void;
  onLoginClick: () => void;
  cartCount: number;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentUser,
  onNavigateHome, 
  onNavigateMyTickets, 
  onNavigateDashboard,
  onNavigateAbout,
  onLoginClick,
  cartCount,
  theme,
  toggleTheme
}) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-brand-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={onNavigateHome}
          >
            <div className="relative flex items-baseline pl-2">
              {/* Decorative Brand Arrow */}
              <svg 
                className="absolute -top-3 -left-5 w-14 h-14 text-brand-teal pointer-events-none" 
                viewBox="0 0 100 100" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="6" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {/* Curve path arching over the M */}
                <path d="M 10 70 C 15 30 40 20 65 30" />
                {/* Arrow head */}
                <path d="M 50 25 L 65 30 L 55 45" />
              </svg>

              <span className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white relative z-10 transition-colors">
                Mlangoni
              </span>
              <span className="text-2xl font-black tracking-tighter text-brand-teal relative z-10">
                Tix
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-8">
            <button onClick={onNavigateHome} className="text-sm font-bold tracking-widest text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white uppercase transition-colors">Home</button>
            <button onClick={onNavigateAbout} className="text-sm font-bold tracking-widest text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white uppercase transition-colors">About Us</button>
            <button onClick={onNavigateHome} className="text-sm font-bold tracking-widest text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white uppercase transition-colors">Events</button>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
             {/* Theme Toggle */}
             <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10 transition-colors"
                title="Toggle Theme"
             >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>

             {/* Only show My Tickets for regular users or if logged out (guest) */}
             {(!currentUser || currentUser.role === 'user') && (
                <button 
                  onClick={onNavigateMyTickets}
                  className="relative flex items-center space-x-2 border border-gray-200 dark:border-white/20 rounded-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-zinc-900 dark:text-white"
                >
                  <User className="w-4 h-4 text-brand-teal" />
                  <span className="text-sm font-bold">MY TICKETS</span>
                  {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange text-white text-[10px] font-bold">
                        {cartCount}
                      </span>
                  )}
                </button>
             )}

             {/* Dynamic Login/Dashboard Button */}
             {currentUser && currentUser.role !== 'user' ? (
               <button 
                  onClick={onNavigateDashboard}
                  className="flex items-center gap-2 rounded-full bg-brand-teal text-black border border-brand-teal px-6 py-2 text-sm font-bold hover:bg-teal-400 transition shadow-[0_0_15px_rgba(45,212,191,0.3)]"
               >
                  <LayoutDashboard className="w-4 h-4" />
                  DASHBOARD
               </button>
             ) : (
               <button 
                  onClick={onLoginClick}
                  className="hidden sm:flex items-center gap-2 rounded-full bg-transparent border border-brand-orange text-brand-orange px-6 py-2 text-sm font-bold hover:bg-brand-orange hover:text-white transition"
               >
                  <LogIn className="w-4 h-4" />
                  LOGIN
               </button>
             )}
          </div>

        </div>
      </div>
    </nav>
  );
};