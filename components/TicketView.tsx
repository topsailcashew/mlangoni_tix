import React from 'react';
import { Ticket } from '../types';
import { Download, Share2, Ticket as TicketIcon } from 'lucide-react';

interface TicketViewProps {
  tickets: Ticket[];
  onClose: () => void;
}

export const TicketView: React.FC<TicketViewProps> = ({ tickets, onClose }) => {
  // Empty State
  if (tickets.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4 animate-in fade-in duration-500 transition-colors">
        <div className="w-24 h-24 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-gray-200 dark:border-white/5 shadow-sm">
          <TicketIcon className="w-10 h-10 text-gray-500 dark:text-gray-600" />
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white uppercase mb-4 text-center transition-colors">No Tickets Yet</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10 text-center max-w-md font-medium leading-relaxed transition-colors">
          You haven't purchased any tickets yet. Explore our events to find your next unforgettable experience.
        </p>
        <button 
          onClick={onClose}
          className="bg-brand-orange text-white rounded-full px-10 py-4 font-bold tracking-widest hover:bg-orange-600 transition shadow-[0_0_30px_rgba(255,90,31,0.3)] uppercase"
        >
          Browse Events
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-12 md:py-20 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500 transition-colors">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
           <div className="text-center md:text-left">
             <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tight transition-colors">My Tickets</h2>
             <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium transition-colors">Ready to scan at the entrance.</p>
           </div>
           <button onClick={onClose} className="text-xs font-bold text-zinc-900 dark:text-white border border-gray-300 dark:border-white/20 px-8 py-3 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition uppercase tracking-wider">
             Back to Home
           </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="group relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-xl border border-gray-200 dark:border-white/5 hover:border-brand-orange/50 transition duration-300">
              
              {/* Left Stripe */}
              <div className="w-full md:w-3 bg-brand-orange h-2 md:h-auto"></div>
              
              {/* Content */}
              <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row gap-8">
                
                {/* Info */}
                <div className="flex-1">
                    <div className="flex items-start justify-between mb-6">
                        <div className="bg-brand-teal/10 text-brand-teal px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block mb-2">
                            Confirmed
                        </div>
                        <div className="md:hidden">
                            <span className="font-mono text-xs text-gray-500">#{ticket.id.slice(-6).toUpperCase()}</span>
                        </div>
                    </div>
                   
                   <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white uppercase leading-none mb-6 transition-colors">{ticket.eventTitle}</h3>
                   
                   <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                       <div>
                           <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Date</p>
                           <p className="text-zinc-900 dark:text-white font-bold text-lg transition-colors">{ticket.eventDate}</p>
                       </div>
                       <div>
                           <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Holder</p>
                           <p className="text-zinc-900 dark:text-white font-bold text-lg transition-colors">{ticket.holderName}</p>
                       </div>
                        <div>
                           <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Location</p>
                           <p className="text-zinc-900 dark:text-white font-bold text-lg transition-colors">See Event Details</p>
                       </div>
                       <div className="hidden md:block">
                           <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Order ID</p>
                           <p className="text-zinc-600 dark:text-white font-mono text-sm transition-colors">#{ticket.id.slice(-6).toUpperCase()}</p>
                       </div>
                   </div>
                </div>

                {/* Divider (Dashed) */}
                <div className="relative w-full md:w-px h-px md:h-auto bg-transparent border-t-2 md:border-t-0 md:border-l-2 border-dashed border-gray-200 dark:border-gray-800 my-4 md:my-0 transition-colors">
                    <div className="absolute -left-3 md:-top-3 -top-3 md:left-1/2 md:-translate-x-1/2 w-6 h-6 bg-white dark:bg-zinc-950 rounded-full border-b dark:border-none border-gray-50 dark:border-transparent transition-colors"></div>
                    <div className="absolute -right-3 md:-bottom-3 -top-3 md:top-auto md:left-1/2 md:-translate-x-1/2 w-6 h-6 bg-white dark:bg-zinc-950 rounded-full border-t dark:border-none border-gray-50 dark:border-transparent transition-colors"></div>
                </div>

                {/* QR Code Area */}
                <div className="flex flex-col items-center justify-center min-w-[220px] text-center">
                    <div className="bg-white p-4 rounded-2xl mb-4 border border-gray-200 dark:border-transparent">
                        <img 
                            src={ticket.qrCodeUrl} 
                            alt="QR Code" 
                            className="w-40 h-40 object-contain mix-blend-multiply" 
                        />
                    </div>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Scan for Entry</p>
                    
                    <div className="flex gap-3 mt-6">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition text-gray-400 hover:text-black dark:hover:text-white" title="Download">
                            <Download className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition text-gray-400 hover:text-black dark:hover:text-white" title="Share">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};