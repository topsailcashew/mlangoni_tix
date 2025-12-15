import React from 'react';
import { Shield, Zap, Globe, Ticket, Lock, Users } from 'lucide-react';

interface AboutUsProps {
  onBack: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onBack }) => {
  const teamMembers = [
    { 
      name: 'Alex Rivera', 
      role: 'CEO & Co-Founder',
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
    },
    { 
      name: 'Sarah Chen', 
      role: 'Chief Technology Officer',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
    },
    { 
      name: 'Marcus Johnson', 
      role: 'Head of Operations',
      img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 animate-in fade-in slide-in-from-bottom-4 duration-500 text-zinc-900 dark:text-white transition-colors">
      {/* Header Section */}
      <div className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-white/10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-block bg-brand-orange/10 text-brand-orange px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Who We Are
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter mb-6 transition-colors">
            Built for the <br/> <span className="text-brand-orange">Tanzanian</span> Event Landscape
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed transition-colors">
             We are making sure that every ticket is real, and every entry is seamless.
          </p>
        </div>
      </div>

      {/* Story & Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Story */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-gray-200 dark:border-white/5 shadow-sm">
             <h3 className="text-2xl font-black uppercase text-zinc-900 dark:text-white mb-6">Our Story</h3>
             <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
               <p>
                 MlangoniTix was born out of the shared frustration of both event organizers losing revenue to ticket fraud and attendees stuck in endless entry queues. We observed that existing international ticketing platforms often fail to integrate smoothly with local payment methods and do not prioritize the unique security and logistical challenges faced by African venues.
               </p>
               <p>
                 We set out to change that by building a modern, digitized system—<span className="font-bold text-brand-orange">MlangoniTix</span>—from the ground up. Our name, derived from the Swahili word for "At the Gate," reflects our commitment to making that final point of entry fast, secure, and reliable for everyone.
               </p>
             </div>
          </div>

          {/* Mission */}
          <div>
             <h3 className="text-2xl font-black uppercase text-zinc-900 dark:text-white mb-6">Our Mission</h3>
             <p className="text-xl font-medium text-zinc-800 dark:text-white leading-relaxed mb-6">
               To professionalize and secure the event industry across Tanzania by providing the most trusted, transparent, and easy-to-use digital ticketing platform.
             </p>
             <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
               We believe that technology should empower local businesses, not complicate them. We aim to be the digital engine that drives event attendance, revenue growth, and an exceptional experience for every organizer and attendee.
             </p>
             
             <div className="mt-8 grid grid-cols-2 gap-4">
               <div className="bg-brand-teal/10 p-4 rounded-xl text-brand-teal font-bold uppercase text-xs tracking-widest text-center">
                 Trusted
               </div>
               <div className="bg-brand-orange/10 p-4 rounded-xl text-brand-orange font-bold uppercase text-xs tracking-widest text-center">
                 Transparent
               </div>
             </div>
          </div>

        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white dark:bg-zinc-900 py-20 border-y border-gray-200 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase mb-4 transition-colors">Why Choose MlangoniTix?</h2>
            <p className="text-gray-500 dark:text-gray-400">Local Focus, Global Standards.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Globe className="w-8 h-8 text-brand-teal" />}
              title="Local Focus"
              desc="We are a local team obsessed with security standards, customer support, and seamless integration with Tanzanian payment systems."
            />
            <FeatureCard 
              icon={<Lock className="w-8 h-8 text-brand-orange" />}
              title="Security First"
              desc="Our proprietary verification system ensures that every ticket is authenticated instantly, eliminating fraud."
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8 text-blue-500" />}
              title="We Grow With You"
              desc="From your first small seminar to your annual festival, our platform scales effortlessly to meet your growing needs."
            />
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-20 text-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-zinc-900 transition-colors">
         <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase mb-8 transition-colors">Ready to explore?</h2>
         <button 
           onClick={onBack}
           className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-lg"
         >
           Browse Events
         </button>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="bg-gray-50 dark:bg-zinc-950 p-8 rounded-3xl border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20 transition group">
    <div className="bg-white dark:bg-zinc-900 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition shadow-sm">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-zinc-900 dark:text-white uppercase mb-3 transition-colors">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed transition-colors">{desc}</p>
  </div>
);