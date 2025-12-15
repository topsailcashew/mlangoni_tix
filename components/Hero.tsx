import React from 'react';
import { ArrowDownRight } from 'lucide-react';

interface HeroProps {
  onScrollDown: () => void;
  onStartSelling: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollDown, onStartSelling }) => {
  return (
    <div className="relative w-full py-20 overflow-hidden border-b border-gray-200 dark:border-white/10">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] text-zinc-900 dark:text-white mb-8 transition-colors uppercase">
              Mlangoni<span className="text-brand-teal">Tix</span> <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600 dark:from-white dark:to-gray-500 text-5xl sm:text-6xl md:text-7xl">Digital Ticketing</span> <br/>
              <span className="text-zinc-900 dark:text-white transition-colors text-4xl sm:text-5xl md:text-6xl">For The New Era</span>
            </h1>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-12">
               <div className="flex items-start gap-3 max-w-sm border-l-2 border-brand-orange pl-4">
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-relaxed transition-colors">
                    Secure, transparent, and seamless verification—from payment to Mlangoni (the Gate).
                  </p>
               </div>
               
               <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                 <button 
                  onClick={onStartSelling}
                  className="bg-brand-orange text-white rounded-full px-8 py-4 font-bold tracking-wider hover:bg-orange-600 transition shadow-[0_0_30px_rgba(255,90,31,0.3)] whitespace-nowrap"
                 >
                   Start Selling
                 </button>
                 <button 
                  onClick={onScrollDown}
                  className="bg-transparent border border-gray-300 dark:border-white/20 text-zinc-900 dark:text-white rounded-full px-8 py-4 font-bold tracking-wider hover:bg-gray-100 dark:hover:bg-white/10 transition whitespace-nowrap"
                 >
                   Find Events
                 </button>
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-end">
             <div className="hidden lg:block text-right">
                <ArrowDownRight className="text-gray-300 dark:text-gray-700 w-32 h-32 ml-auto" />
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};