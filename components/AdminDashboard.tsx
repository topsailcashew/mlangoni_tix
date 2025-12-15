import React, { useState } from 'react';
import { Plus, Trash2, Edit2, BarChart3, Users, Ticket as TicketIcon, Search, CheckCircle2, XCircle, LogOut, Settings, LayoutDashboard, Sun, Moon, AlertTriangle, Loader2 } from 'lucide-react';
import { Event, Ticket, UserProfile } from '../types';
import { AdminEventModal } from './AdminEventModal';

interface DashboardProps {
  currentUser: UserProfile;
  allEvents: Event[];
  allSoldTickets: Ticket[];
  onAddEvent: (event: Event) => void;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (id: string) => void;
  onLogout: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const AdminDashboard: React.FC<DashboardProps> = ({ 
  currentUser,
  allEvents, 
  allSoldTickets, 
  onAddEvent, 
  onEditEvent, 
  onDeleteEvent,
  onLogout,
  theme,
  toggleTheme
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'scanner' | 'users'>('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [scanInput, setScanInput] = useState('');
  const [scanResult, setScanResult] = useState<'valid' | 'invalid' | null>(null);
  
  // Cancel Event State
  const [eventToCancel, setEventToCancel] = useState<Event | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const isAdmin = currentUser.role === 'admin';

  // Filter Data based on Role
  const displayedEvents = isAdmin 
    ? allEvents 
    : allEvents.filter(e => e.organizerId === currentUser.id);
  
  const displayedTickets = isAdmin 
    ? allSoldTickets 
    : allSoldTickets.filter(t => displayedEvents.some(e => e.id === t.eventId));

  // Stats Calculation
  const totalRevenue = displayedTickets.reduce((acc, ticket) => {
    const event = allEvents.find(e => e.id === ticket.eventId);
    return acc + (event ? event.price : 0);
  }, 0);

  const handleEditClick = (event: Event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleAddNewClick = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleModalSave = (event: Event) => {
    if (!isAdmin) {
      event.organizerId = currentUser.id;
    } 
    if (!event.organizerId) {
       event.organizerId = currentUser.id;
    }

    if (editingEvent) {
      onEditEvent(event);
    } else {
      onAddEvent(event);
    }
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleVerifyTicket = () => {
    const ticket = allSoldTickets.find(t => t.id === scanInput);
    if (!ticket) {
      setScanResult('invalid');
      return;
    }
    const event = allEvents.find(e => e.id === ticket.eventId);
    if (!isAdmin && event?.organizerId !== currentUser.id) {
       setScanResult('invalid');
       return;
    }
    setScanResult('valid');
  };

  const handleCancelClick = (event: Event) => {
      setEventToCancel(event);
  };

  const confirmCancelEvent = () => {
      if (!eventToCancel) return;
      setIsCancelling(true);

      // Simulate API call to notify users and process refunds
      setTimeout(() => {
          onDeleteEvent(eventToCancel.id);
          setIsCancelling(false);
          setEventToCancel(null);
      }, 2000);
  };

  const affectedTicketCount = eventToCancel 
    ? allSoldTickets.filter(t => t.eventId === eventToCancel.id).length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-zinc-900 dark:text-white animate-in fade-in duration-500 transition-colors">
      
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
             <div className="flex items-center gap-3">
               <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isAdmin ? 'bg-brand-teal' : 'bg-brand-orange'} shadow-sm`}>
                 <LayoutDashboard className="text-black w-6 h-6" />
               </div>
               <div>
                  <h1 className="text-xl font-black tracking-tight text-zinc-900 dark:text-white uppercase transition-colors">
                    {isAdmin ? 'System Admin' : 'Event Manager'}
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Logged in as {currentUser.name}</p>
               </div>
             </div>

             <div className="flex items-center gap-6">
                <nav className="hidden md:flex gap-1 bg-gray-100 dark:bg-white/5 p-1 rounded-full transition-colors">
                   <button 
                     onClick={() => setActiveTab('overview')}
                     className={`px-6 py-2 rounded-full text-sm font-bold uppercase transition ${activeTab === 'overview' ? 'bg-white dark:bg-white text-black shadow-lg' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
                   >
                     Overview
                   </button>
                   <button 
                     onClick={() => setActiveTab('events')}
                     className={`px-6 py-2 rounded-full text-sm font-bold uppercase transition ${activeTab === 'events' ? 'bg-white dark:bg-white text-black shadow-lg' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
                   >
                     {isAdmin ? 'All Events' : 'My Events'}
                   </button>
                   {isAdmin && (
                    <button 
                        onClick={() => setActiveTab('users')}
                        className={`px-6 py-2 rounded-full text-sm font-bold uppercase transition ${activeTab === 'users' ? 'bg-white dark:bg-white text-black shadow-lg' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
                    >
                        Users
                    </button>
                   )}
                   <button 
                     onClick={() => setActiveTab('scanner')}
                     className={`px-6 py-2 rounded-full text-sm font-bold uppercase transition ${activeTab === 'scanner' ? 'bg-white dark:bg-white text-black shadow-lg' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
                   >
                     Scanner
                   </button>
                </nav>
                
                <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10 transition-colors"
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <button 
                  onClick={onLogout}
                  className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase hidden sm:block">Logout</span>
                </button>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* VIEW: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                  title={isAdmin ? "Platform Revenue" : "My Revenue"}
                  value={`$${totalRevenue.toFixed(2)}`} 
                  icon={<BarChart3 className={isAdmin ? "text-brand-teal" : "text-brand-orange"} />}
                  trend="+12% from last week"
                />
                <StatCard 
                  title={isAdmin ? "Total Tickets Sold" : "My Tickets Sold"}
                  value={displayedTickets.length.toString()} 
                  icon={<TicketIcon className="text-purple-500" />}
                  trend="New sales today"
                />
                <StatCard 
                  title={isAdmin ? "Total Events" : "My Active Events"} 
                  value={displayedEvents.length.toString()} 
                  icon={<Users className="text-blue-500" />}
                  trend="Currently listed"
                />
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-200 dark:border-white/5 transition-colors shadow-sm">
                   <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 uppercase transition-colors">Recent Sales</h3>
                   <div className="space-y-4">
                      {displayedTickets.length === 0 ? (
                        <p className="text-gray-500 italic">No tickets sold yet.</p>
                      ) : (
                        displayedTickets.slice(-5).reverse().map(ticket => (
                          <div key={ticket.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-transparent transition-colors">
                             <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-brand-teal' : 'bg-brand-orange'}`}></div>
                                <div>
                                   <p className="text-sm font-bold text-zinc-900 dark:text-white">{ticket.holderName}</p>
                                   <p className="text-xs text-gray-500">purchased {ticket.eventTitle}</p>
                                </div>
                             </div>
                             <span className="text-xs font-mono text-gray-600">{new Date(ticket.purchaseDate).toLocaleDateString()}</span>
                          </div>
                        ))
                      )}
                   </div>
                </div>

                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-900 rounded-3xl p-8 border border-gray-200 dark:border-white/5 relative overflow-hidden transition-colors shadow-sm">
                   <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none ${isAdmin ? 'bg-brand-teal/10' : 'bg-brand-orange/10'}`}></div>
                   <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 uppercase transition-colors">Quick Actions</h3>
                   <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => handleAddNewClick()}
                        className={`p-6 text-white rounded-2xl flex flex-col items-center justify-center gap-3 transition group ${isAdmin ? 'bg-brand-teal hover:bg-teal-500 text-black' : 'bg-brand-orange hover:bg-orange-600'}`}
                      >
                         <Plus className="w-8 h-8 group-hover:scale-110 transition" />
                         <span className="font-bold uppercase tracking-wide">Add Event</span>
                      </button>
                      <button 
                        onClick={() => setActiveTab('scanner')}
                        className="p-6 bg-gray-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-gray-200 dark:hover:bg-zinc-700 transition group"
                      >
                         <TicketIcon className="w-8 h-8 group-hover:scale-110 transition" />
                         <span className="font-bold uppercase tracking-wide">Scan Ticket</span>
                      </button>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* VIEW: EVENTS */}
        {activeTab === 'events' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center">
              <div>
                  <h2 className="text-3xl font-black uppercase text-zinc-900 dark:text-white transition-colors">{isAdmin ? 'System Events' : 'My Events'}</h2>
                  <p className="text-gray-500 dark:text-gray-400 transition-colors">Manage listings shown on the platform.</p>
              </div>
              <button 
                onClick={handleAddNewClick}
                className={`text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wide transition flex items-center gap-2 ${isAdmin ? 'bg-brand-teal text-black hover:bg-teal-400' : 'bg-brand-orange hover:bg-orange-600'}`}
              >
                <Plus className="w-5 h-5" />
                Add New
              </button>
            </div>

            {displayedEvents.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-white/5 transition-colors shadow-sm">
                    <p className="text-gray-500 font-bold uppercase tracking-widest">No events found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedEvents.map(event => (
                    <div key={event.id} className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20 transition group shadow-sm">
                        <div className="h-48 relative overflow-hidden">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        <div className="absolute inset-0 bg-black/40"></div>
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase border border-white/20">
                            {event.category}
                        </div>
                        {isAdmin && (
                            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-mono px-2 py-1 rounded">
                                ID: {event.organizerId}
                            </div>
                        )}
                        </div>
                        <div className="p-6">
                        <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase leading-none mb-2 truncate transition-colors">{event.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 transition-colors">{event.date} • {event.location}</p>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-white/10 transition-colors">
                            <span className={`font-bold text-lg ${isAdmin ? 'text-brand-teal' : 'text-brand-orange'}`}>${event.price}</span>
                            <div className="flex gap-2">
                                <button 
                                onClick={() => handleEditClick(event)}
                                className="p-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/20 rounded-lg text-zinc-900 dark:text-white transition"
                                title="Edit Event"
                                >
                                <Edit2 className="w-4 h-4" />
                                </button>
                                <button 
                                onClick={() => handleCancelClick(event)}
                                className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition"
                                title="Cancel Event"
                                >
                                <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>
                ))}
                </div>
            )}
          </div>
        )}

        {/* VIEW: USERS (Admin Only Mock) */}
        {activeTab === 'users' && isAdmin && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4">
                <div>
                  <h2 className="text-3xl font-black uppercase text-zinc-900 dark:text-white transition-colors">User Management</h2>
                  <p className="text-gray-500 dark:text-gray-400 transition-colors">System administrators and event managers.</p>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-white/5 transition-colors shadow-sm">
                    <div className="p-4 grid grid-cols-4 gap-4 border-b border-gray-200 dark:border-white/10 text-xs font-bold uppercase text-gray-500 tracking-widest transition-colors">
                        <div>User</div>
                        <div>Role</div>
                        <div>Status</div>
                        <div>Action</div>
                    </div>
                    {[
                        { name: "System Admin", role: "admin", status: "Active" },
                        { name: "John Manager", role: "manager", status: "Active" },
                        { name: "Sarah Events", role: "manager", status: "Active" },
                        { name: "Test User", role: "user", status: "Offline" }
                    ].map((u, i) => (
                        <div key={i} className="p-4 grid grid-cols-4 gap-4 items-center hover:bg-gray-50 dark:hover:bg-white/5 transition border-b border-gray-200 dark:border-white/5 last:border-0">
                            <div className="font-bold text-zinc-900 dark:text-white transition-colors">{u.name}</div>
                            <div>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${u.role === 'admin' ? 'bg-brand-teal/20 text-brand-teal' : u.role === 'manager' ? 'bg-brand-orange/20 text-brand-orange' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300'}`}>
                                    {u.role}
                                </span>
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 text-sm transition-colors">{u.status}</div>
                            <div>
                                <button className="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white transition">
                                    <Settings className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* VIEW: SCANNER */}
        {activeTab === 'scanner' && (
           <div className="max-w-2xl mx-auto py-12 text-center animate-in slide-in-from-bottom-4">
              <h2 className="text-4xl font-black uppercase mb-4 text-zinc-900 dark:text-white transition-colors">Ticket Validator</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-12 transition-colors">Enter the ticket ID manually to verify validity.</p>

              <div className="bg-white dark:bg-zinc-900 p-8 rounded-[3rem] border border-gray-200 dark:border-white/5 shadow-2xl relative overflow-hidden transition-colors">
                 {/* Decor */}
                 <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${isAdmin ? 'from-brand-teal to-blue-500' : 'from-brand-orange to-red-500'}`}></div>
                 
                 <div className="mb-8">
                    <div className="relative">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                       <input 
                         type="text" 
                         value={scanInput}
                         onChange={(e) => {
                           setScanInput(e.target.value);
                           setScanResult(null);
                         }}
                         placeholder="Enter Ticket ID"
                         className={`w-full bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-zinc-900 dark:text-white text-lg focus:outline-none focus:border-${isAdmin ? 'brand-teal' : 'brand-orange'} transition font-mono text-center uppercase`}
                       />
                    </div>
                 </div>

                 <button 
                   onClick={handleVerifyTicket}
                   className="w-full bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition mb-8"
                 >
                   Verify Ticket
                 </button>

                 {scanResult && (
                    <div className={`p-6 rounded-2xl border flex items-center justify-center gap-4 animate-in zoom-in duration-300 ${scanResult === 'valid' ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-red-500/10 border-red-500 text-red-500'}`}>
                       {scanResult === 'valid' ? (
                         <>
                           <CheckCircle2 className="w-8 h-8" />
                           <div className="text-left">
                              <p className="font-black text-xl uppercase">Valid Ticket</p>
                              <p className="text-sm opacity-80">Access Granted</p>
                           </div>
                         </>
                       ) : (
                         <>
                           <XCircle className="w-8 h-8" />
                           <div className="text-left">
                              <p className="font-black text-xl uppercase">Invalid Ticket</p>
                              <p className="text-sm opacity-80">Access Denied</p>
                           </div>
                         </>
                       )}
                    </div>
                 )}
              </div>
           </div>
        )}

      </div>

      {isModalOpen && (
        <AdminEventModal 
          initialData={editingEvent} 
          onSave={handleModalSave} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}

      {/* Cancel Confirmation Modal */}
      {eventToCancel && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/50 dark:bg-black/90 backdrop-blur-sm" onClick={() => !isCancelling && setEventToCancel(null)}></div>
              
              <div className="relative bg-white dark:bg-zinc-900 w-full max-w-md rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl p-8 overflow-hidden animate-in zoom-in-95">
                  <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-500 rounded-full flex items-center justify-center mb-6">
                          <AlertTriangle className="w-8 h-8" />
                      </div>
                      
                      <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase mb-2">Cancel Event?</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-6">
                          Are you sure you want to cancel <span className="font-bold text-zinc-900 dark:text-white">"{eventToCancel.title}"</span>?
                      </p>

                      <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-4 w-full mb-8 border border-gray-100 dark:border-white/5">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">This action will:</p>
                          <ul className="text-left text-xs text-gray-500 dark:text-gray-400 space-y-2">
                              <li className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                  Remove the event from public listings
                              </li>
                              <li className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                  Notify <span className="font-bold text-zinc-900 dark:text-white">{affectedTicketCount}</span> confirmed attendees
                              </li>
                              <li className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                  Initiate refunds automatically
                              </li>
                          </ul>
                      </div>

                      <div className="flex gap-4 w-full">
                          <button 
                            disabled={isCancelling}
                            onClick={() => setEventToCancel(null)}
                            className="flex-1 bg-transparent border border-gray-200 dark:border-white/10 text-zinc-900 dark:text-white font-bold uppercase py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition"
                          >
                              Keep Event
                          </button>
                          <button 
                            disabled={isCancelling}
                            onClick={confirmCancelEvent}
                            className="flex-1 bg-red-600 text-white font-bold uppercase py-3 rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
                          >
                              {isCancelling ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Processing
                                  </>
                              ) : (
                                  'Yes, Cancel'
                              )}
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

// Helper Components
const StatCard = ({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) => (
  <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-white/5 flex flex-col justify-between h-32 hover:border-gray-300 dark:hover:border-white/10 transition shadow-sm">
    <div className="flex justify-between items-start">
      <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest transition-colors">{title}</span>
      <div className="p-2 bg-gray-100 dark:bg-white/5 rounded-lg transition-colors">{icon}</div>
    </div>
    <div>
      <h4 className="text-3xl font-black text-zinc-900 dark:text-white transition-colors">{value}</h4>
      <p className="text-xs opacity-70 mt-1 font-medium text-gray-600 dark:text-gray-400 transition-colors">{trend}</p>
    </div>
  </div>
);