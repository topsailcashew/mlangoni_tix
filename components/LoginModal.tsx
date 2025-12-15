import React from 'react';
import { X, UserCircle2, Briefcase, ShieldCheck } from 'lucide-react';
import { UserRole } from '../types';

interface LoginModalProps {
  onLogin: (role: UserRole) => void;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 dark:bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white dark:bg-zinc-900 w-full max-w-lg rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl p-8 animate-in zoom-in-95 duration-200 transition-colors">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black dark:hover:text-white transition-colors">
           <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase mb-2 transition-colors">Welcome Back</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 transition-colors">Select a role to simulate login for this demo.</p>

        <div className="space-y-4">
           {/* Option 1: Manager */}
           <button 
             onClick={() => onLogin('manager')}
             className="w-full bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 border border-gray-200 dark:border-white/5 hover:border-brand-orange/50 p-4 rounded-xl flex items-center gap-4 transition-colors group"
           >
              <div className="w-12 h-12 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center group-hover:scale-110 transition">
                 <Briefcase className="w-6 h-6" />
              </div>
              <div className="text-left">
                 <h3 className="font-bold text-zinc-900 dark:text-white text-lg transition-colors">Event Manager</h3>
                 <p className="text-xs text-gray-500 dark:text-gray-400">Manage your own events and sales</p>
              </div>
           </button>

           {/* Option 2: Admin */}
           <button 
             onClick={() => onLogin('admin')}
             className="w-full bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 border border-gray-200 dark:border-white/5 hover:border-brand-teal/50 p-4 rounded-xl flex items-center gap-4 transition-colors group"
           >
              <div className="w-12 h-12 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center group-hover:scale-110 transition">
                 <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-left">
                 <h3 className="font-bold text-zinc-900 dark:text-white text-lg transition-colors">Administrator</h3>
                 <p className="text-xs text-gray-500 dark:text-gray-400">System-wide control and analytics</p>
              </div>
           </button>

            {/* Option 3: User */}
            <button 
             onClick={() => onLogin('user')}
             className="w-full bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20 p-4 rounded-xl flex items-center gap-4 transition-colors group"
           >
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-white flex items-center justify-center group-hover:scale-110 transition-colors">
                 <UserCircle2 className="w-6 h-6" />
              </div>
              <div className="text-left">
                 <h3 className="font-bold text-zinc-900 dark:text-white text-lg transition-colors">Customer</h3>
                 <p className="text-xs text-gray-500 dark:text-gray-400">Browse and buy tickets</p>
              </div>
           </button>
        </div>
        
        <div className="mt-8 text-center">
           <p className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-600 tracking-widest transition-colors">SeatSavvy Secure Login</p>
        </div>
      </div>
    </div>
  );
};