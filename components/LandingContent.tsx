import React from 'react';
import { BarChart3, ShieldCheck, Smartphone, Ticket, CreditCard, Zap } from 'lucide-react';

export const LandingContent: React.FC = () => {
  return (
    <div className="py-20 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-zinc-900/30 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight transition-colors">The Ecosystem</h2>
                <p className="text-gray-500 dark:text-gray-400">Connecting organizers and attendees seamlessly.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Organizer Card */}
                <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/5 shadow-sm hover:border-brand-orange/30 transition-colors group">
                    <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-orange/10 text-brand-orange">
                        <BarChart3 className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase mb-4 transition-colors">For Organizers</h3>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <ShieldCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">100% Fraud Prevention with encrypted QR codes.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <BarChart3 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                            <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">Real-time revenue tracking and analytics.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Smartphone className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                            <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">Instant verification via Mlangoni Scanner App.</span>
                        </li>
                    </ul>
                </div>

                {/* Attendee Card */}
                <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/5 shadow-sm hover:border-brand-teal/30 transition-colors group">
                    <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-teal/10 text-brand-teal">
                        <Ticket className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase mb-4 transition-colors">For Attendees</h3>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <CreditCard className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                            <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">Secure payments via M-Pesa, Tigo Pesa & Cards.</span>
                        </li>
                         <li className="flex items-start gap-3">
                            <Smartphone className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">Instant E-Ticket delivery to your phone.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Zap className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                            <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">Fast entry lanes with quick scanning.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  );
};