import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Event, EventCategory } from '../types';

interface AdminEventModalProps {
  initialData?: Event | null;
  onSave: (event: Event) => void;
  onClose: () => void;
}

export const AdminEventModal: React.FC<AdminEventModalProps> = ({ initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState<Partial<Event>>({
    title: '',
    category: EventCategory.CONCERT,
    date: '',
    price: 0,
    location: '',
    image: 'https://picsum.photos/600/600',
    description: '',
    longDescription: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, validation would happen here
    const eventToSave = {
      ...formData,
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
    } as Event;
    
    onSave(eventToSave);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 dark:bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-colors">
        
        <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-zinc-800/50 transition-colors">
          <h2 className="text-xl font-black text-zinc-900 dark:text-white uppercase transition-colors">
            {initialData ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto p-8">
          <form id="event-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest transition-colors">Event Title</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-gray-100 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-teal transition-colors"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. SUMMER FEST"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest transition-colors">Category</label>
                <select 
                  className="w-full bg-gray-100 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-teal transition-colors appearance-none"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as EventCategory})}
                >
                  {Object.values(EventCategory).map(cat => (
                    <option key={cat} value={cat} className="bg-white dark:bg-zinc-900 text-black dark:text-white">{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest transition-colors">Date</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-gray-100 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-teal transition-colors"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  placeholder="DD.MM.YYYY"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest transition-colors">Price ($)</label>
                <input 
                  type="number" 
                  required
                  min="0"
                  step="0.01"
                  className="w-full bg-gray-100 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-teal transition-colors"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                />
              </div>
            </div>

             <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest transition-colors">Location</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-gray-100 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-teal transition-colors"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  placeholder="Venue Name, City"
                />
              </div>

             <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest transition-colors">Image URL</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-gray-100 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-teal transition-colors"
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                />
              </div>

             <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest transition-colors">Short Description</label>
                <textarea 
                  required
                  rows={2}
                  className="w-full bg-gray-100 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-teal transition-colors"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Brief summary for the card view..."
                />
              </div>

             <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest transition-colors">Full Description (AI Context)</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full bg-gray-100 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-teal transition-colors"
                  value={formData.longDescription}
                  onChange={e => setFormData({...formData, longDescription: e.target.value})}
                  placeholder="Detailed description for the event page and AI concierge..."
                />
              </div>

          </form>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-zinc-800/50 flex justify-end gap-4 transition-colors">
           <button 
             onClick={onClose}
             className="px-6 py-3 rounded-xl border border-gray-300 dark:border-white/20 text-zinc-900 dark:text-white font-bold uppercase tracking-wider hover:bg-gray-100 dark:hover:bg-white/5 transition"
           >
             Cancel
           </button>
           <button 
             type="submit"
             form="event-form"
             className="px-8 py-3 rounded-xl bg-brand-orange text-white font-bold uppercase tracking-wider hover:bg-orange-600 transition shadow-lg shadow-brand-orange/20"
           >
             Save Event
           </button>
        </div>

      </div>
    </div>
  );
};