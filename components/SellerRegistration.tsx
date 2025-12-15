import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Loader2, Store, Mail, Phone, Lock } from 'lucide-react';
import { UserProfile } from '../types';

interface SellerRegistrationProps {
  onRegister: (user: UserProfile) => void;
  onLoginClick: () => void;
  onBack: () => void;
}

export const SellerRegistration: React.FC<SellerRegistrationProps> = ({ onRegister, onLoginClick, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newUser: UserProfile = {
        id: `manager-${Math.random().toString(36).substr(2, 9)}`,
        name: formData.businessName,
        email: formData.email,
        role: 'manager'
      };
      setIsLoading(false);
      onRegister(newUser);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col lg:flex-row animate-in fade-in duration-500">
      
      {/* Left: Brand & Benefits */}
      <div className="lg:w-1/2 bg-zinc-900 dark:bg-black relative overflow-hidden p-12 flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-teal/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

        <div className="relative z-10">
            <div 
              className="flex items-center gap-2 cursor-pointer w-fit"
              onClick={onBack}
            >
                <div className="flex items-baseline">
                    <span className="text-2xl font-black tracking-tighter text-white">Mlangoni</span>
                    <span className="text-2xl font-black tracking-tighter text-brand-teal">Tix</span>
                </div>
            </div>
            
            <div className="mt-20">
                <h1 className="text-5xl font-black text-white uppercase leading-tight mb-6">
                    Start Your <br/>
                    <span className="text-brand-orange">Digital Empire.</span>
                </h1>
                <p className="text-gray-400 text-lg max-w-md leading-relaxed mb-12">
                    Join hundreds of Tanzanian event organizers who have switched to secure, cashless, and data-driven ticketing.
                </p>

                <div className="space-y-6">
                    <BenefitRow text="Instant payouts via Mobile Money" />
                    <BenefitRow text="Real-time check-in analytics" />
                    <BenefitRow text="Bank-grade fraud protection" />
                    <BenefitRow text="Free marketing tools included" />
                </div>
            </div>
        </div>

        <div className="relative z-10 mt-12 text-sm text-gray-500">
            © 2023 MlangoniTix. Built for Tanzania.
        </div>
      </div>

      {/* Right: Registration Form */}
      <div className="lg:w-1/2 p-8 lg:p-12 xl:p-24 flex flex-col justify-center bg-white dark:bg-zinc-950 transition-colors">
        <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase mb-2">Create Account</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Enter your business details to get started.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Business / Organizer Name</label>
                    <div className="relative">
                        <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                            type="text" 
                            required
                            placeholder="e.g. Bongoflava Events Ltd"
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-12 py-3.5 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange transition-colors"
                            value={formData.businessName}
                            onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                            type="email" 
                            required
                            placeholder="name@business.com"
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-12 py-3.5 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange transition-colors"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                            type="tel" 
                            required
                            placeholder="+255 7XX XXX XXX"
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-12 py-3.5 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange transition-colors"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                            type="password" 
                            required
                            placeholder="••••••••"
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-12 py-3.5 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange transition-colors"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-brand-orange text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-orange-600 transition shadow-lg shadow-brand-orange/20 flex items-center justify-center gap-2 mt-4"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                        <>
                            Create Account <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                    Already have an account?{' '}
                    <button 
                        onClick={onLoginClick}
                        className="text-brand-teal font-bold hover:underline"
                    >
                        Log in here
                    </button>
                </p>
            </div>
        </div>
      </div>

    </div>
  );
};

const BenefitRow = ({ text }: { text: string }) => (
    <div className="flex items-center gap-3">
        <div className="p-1 rounded-full bg-brand-teal/20">
            <CheckCircle2 className="w-5 h-5 text-brand-teal" />
        </div>
        <span className="text-white font-medium">{text}</span>
    </div>
);