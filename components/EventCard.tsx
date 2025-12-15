import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  return (
    <div 
      className="group relative bg-white dark:bg-brand-card rounded-[32px] overflow-hidden cursor-pointer hover:shadow-2xl shadow-lg hover:shadow-brand-orange/10 transition-all duration-500 transform hover:-translate-y-2"
      onClick={() => onClick(event)}
    >
      {/* Image Half */}
      <div className="h-64 sm:h-80 w-full overflow-hidden relative">
         <img 
           src={event.image} 
           alt={event.title} 
           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 dark:from-black/80"></div>
         
         <div className="absolute top-4 right-4 bg-brand-orange text-white text-lg font-bold px-4 py-2 rounded-full transform rotate-3 group-hover:rotate-0 transition-transform shadow-lg">
            ${event.price}
         </div>
      </div>

      {/* Content Half */}
      <div className="p-6 sm:p-8 relative">
        <div className="flex justify-between items-start mb-4">
           <div>
              <p className="text-brand-teal text-sm font-bold uppercase tracking-wide mb-1">{event.category}</p>
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase leading-none mb-2 break-words transition-colors">
                {event.title}
              </h3>
           </div>
           <div className="bg-gray-100 dark:bg-white text-black rounded-full p-2 group-hover:bg-brand-orange group-hover:text-white transition-colors">
              <ArrowUpRight className="w-6 h-6" />
           </div>
        </div>

        <div className="flex justify-between items-end border-t border-gray-100 dark:border-white/10 pt-4 mt-4 transition-colors">
           <div>
              <p className="text-gray-400 dark:text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">Date</p>
              <p className="text-zinc-900 dark:text-white font-bold">{event.date}</p>
           </div>
           
           <div className="hidden sm:block">
              {/* Decorative shapes */}
              <div className="flex space-x-1">
                 <div className="w-2 h-2 rounded-full bg-brand-teal"></div>
                 <div className="w-2 h-2 rounded-full bg-brand-orange"></div>
                 <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-white transition-colors"></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};