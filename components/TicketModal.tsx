import React, { useState } from 'react';
import { X, Check, Loader2, Sparkles, ArrowUpRight } from 'lucide-react';
import { Event, Ticket } from '../types';
import { askEventConcierge } from '../services/geminiService';

interface TicketModalProps {
  event: Event;
  onClose: () => void;
  onPurchase: (name: string, email: string) => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ event, onClose, onPurchase }) => {
  const [step, setStep] = useState<'details' | 'form'>('details');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [isAskingAi, setIsAskingAi] = useState(false);

  const handleAskAi = async () => {
    if (!question.trim()) return;
    setIsAskingAi(true);
    const answer = await askEventConcierge(question, event);
    setAiAnswer(answer);
    setIsAskingAi(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onPurchase(name, email);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 dark:bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white dark:bg-zinc-900 w-full max-w-4xl h-auto max-h-[90vh] rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-gray-200 dark:border-white/10 transition-colors">
        
        {/* Left: Event Visuals & AI */}
        <div className="w-full md:w-1/2 relative bg-gray-50 dark:bg-zinc-800 p-8 flex flex-col justify-between overflow-y-auto transition-colors">
          <div>
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-48 object-cover rounded-2xl mb-6 shadow-lg"
            />
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase leading-none mb-2 transition-colors">{event.title}</h2>
            <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400 text-sm font-medium mb-6 transition-colors">
               <span>{event.date}</span>
               <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
               <span>{event.location}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm transition-colors">
              {event.longDescription}
            </p>
          </div>

          {/* Gemini AI Widget */}
          <div className="mt-8 bg-white dark:bg-black/30 p-4 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm transition-colors">
             <div className="flex items-center gap-2 mb-3">
               <Sparkles className="w-4 h-4 text-brand-teal" />
               <h4 className="text-brand-teal text-xs font-bold uppercase tracking-wider">Ask AI Concierge</h4>
             </div>
             
             {aiAnswer ? (
               <div className="mb-3 animate-in fade-in slide-in-from-bottom-2">
                 <p className="text-zinc-900 dark:text-white text-sm bg-brand-teal/10 p-3 rounded-lg border border-brand-teal/20 transition-colors">
                   {aiAnswer}
                 </p>
                 <button onClick={() => setAiAnswer('')} className="text-xs text-gray-500 mt-1 hover:text-black dark:hover:text-white underline transition-colors">Ask another question</button>
               </div>
             ) : (
               <div className="flex gap-2">
                 <input 
                   type="text" 
                   value={question}
                   onChange={(e) => setQuestion(e.target.value)}
                   placeholder="e.g. Is there parking?"
                   className="flex-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-brand-teal/50 transition-colors"
                   onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
                 />
                 <button 
                   onClick={handleAskAi}
                   disabled={isAskingAi}
                   className="bg-brand-teal text-black p-2 rounded-lg hover:bg-brand-teal/80 transition disabled:opacity-50"
                 >
                   {isAskingAi ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUpRight className="w-4 h-4" />}
                 </button>
               </div>
             )}
          </div>
        </div>

        {/* Right: Checkout Flow */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col bg-white dark:bg-zinc-900 transition-colors">
           <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition">
             <X className="w-5 h-5 text-black dark:text-white" />
           </button>

           <div className="flex-1 flex flex-col justify-center">
             <div className="mb-8">
               <span className="text-brand-orange font-bold tracking-widest text-xs uppercase mb-2 block">Step {step === 'details' ? '1' : '2'} of 2</span>
               <h3 className="text-2xl font-bold text-zinc-900 dark:text-white transition-colors">
                 {step === 'details' ? 'Order Summary' : 'Attendee Details'}
               </h3>
             </div>

             {step === 'details' ? (
               <div className="space-y-6">
                 <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-white/10 transition-colors">
                   <span className="text-gray-500 dark:text-gray-400">General Admission</span>
                   <span className="text-zinc-900 dark:text-white font-bold text-xl transition-colors">${event.price}</span>
                 </div>
                 <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-white/10 transition-colors">
                   <span className="text-gray-500 dark:text-gray-400">Processing Fee</span>
                   <span className="text-zinc-900 dark:text-white font-bold text-xl transition-colors">$5.00</span>
                 </div>
                 <div className="flex justify-between items-center py-4">
                   <span className="text-zinc-900 dark:text-white font-bold uppercase transition-colors">Total</span>
                   <span className="text-brand-orange font-black text-3xl">${(event.price + 5).toFixed(2)}</span>
                 </div>
                 
                 <button 
                   onClick={() => setStep('form')}
                   className="w-full bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-wider py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition mt-4 shadow-lg"
                 >
                   Checkout
                 </button>
               </div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                   <label className="block text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Full Name</label>
                   <input 
                     type="text" 
                     required
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange transition-colors"
                     placeholder="John Doe"
                   />
                 </div>
                 <div>
                   <label className="block text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
                   <input 
                     type="email" 
                     required
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange transition-colors"
                     placeholder="john@example.com"
                   />
                 </div>
                 
                 <div className="pt-4 flex gap-3">
                   <button 
                     type="button"
                     onClick={() => setStep('details')}
                     className="flex-1 bg-transparent border border-gray-300 dark:border-white/20 text-zinc-900 dark:text-white font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                   >
                     Back
                   </button>
                   <button 
                     type="submit"
                     className="flex-[2] bg-brand-orange text-white font-black uppercase tracking-wider py-4 rounded-xl hover:bg-orange-600 transition shadow-[0_0_20px_rgba(255,90,31,0.4)]"
                   >
                     Pay & Get Ticket
                   </button>
                 </div>
               </form>
             )}
           </div>
        </div>

      </div>
    </div>
  );
};