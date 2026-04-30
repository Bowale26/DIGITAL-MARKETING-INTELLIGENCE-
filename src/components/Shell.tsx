import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet, NavLink } from 'react-router-dom';
import { Bell, Search, User, Zap, LayoutDashboard, Sparkles, Target, Settings, Menu, X, Mail, Globe, Share2, Users, AlertTriangle, Clock } from 'lucide-react';
import { ThemeProvider } from './ThemeToggle';
import ThemeToggle from './ThemeToggle';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import AIAssistant from './AIAssistant';
import { useAuth } from '../services/authService';
import SubscriptionGate from './SubscriptionGate';

export default function Shell() {
  const { user, signOut, simulateExpiration } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <SubscriptionGate />
      <div className="flex min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile Nav Top */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-900 z-50 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF6B00] rounded-lg flex items-center justify-center shrink-0">
              <Sparkles className="text-white" size={18} />
            </div>
            <span className="font-display font-bold text-slate-900 dark:text-white">Agency</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Side Drawer Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] lg:hidden"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                className="fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-slate-950 z-[60] lg:hidden p-6 shadow-2xl"
              >
                <Sidebar onNavClick={() => setIsMobileMenuOpen(false)} isMobile />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="flex-1 flex flex-col min-w-0 relative">
          <AIAssistant />
          
          {/* Trial Banner */}
          <AnimatePresence>
            {user?.status === 'TRIAL' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-[#FF6B00] text-white overflow-hidden relative z-[45]"
              >
                <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[10px]">
                  <div className="flex items-center gap-3">
                    <Clock size={14} />
                    <span>
                      Trial Protocol Ending Soon — {user.projectsCreated} Projects At Risk
                    </span>
                  </div>
                  <NavLink to="/pricing" className="bg-white text-[#FF6B00] px-5 py-2 rounded-xl hover:bg-orange-50 transition-all font-black text-[10px]">
                    Upgrade to Pro
                  </NavLink>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Header */}
          <header className="h-20 border-b border-slate-100 dark:border-slate-900 px-8 hidden lg:flex items-center justify-between sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl z-40">
            <div className="flex items-center gap-4 flex-1 max-w-xl">
              <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#FF6B00] transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Universal search..." 
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl pl-12 pr-4 py-2.5 text-sm outline-none focus:border-[#FF6B00]/50 focus:ring-4 focus:ring-orange-500/5 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 ml-8">
              {!user ? (
                <div className="flex items-center gap-3">
                  <NavLink to="/auth" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">Sign In</NavLink>
                  <NavLink to="/pricing" className="px-5 py-2.5 bg-orange-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2">
                    7-Day Free Trial
                  </NavLink>
                </div>
              ) : (
                <>
                  <div className="hidden xl:flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full">
                    <Zap size={14} className="text-[#FF6B00]" />
                    <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-tighter capitalize">{user.plan} Plan</span>
                  </div>
                  
                  <ThemeToggle />
                  
                  <button className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-all relative group">
                    <Bell size={18} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950" />
                  </button>
                  
                  <div className="h-8 w-px bg-slate-100 dark:bg-slate-900 mx-1" />
                  
                  <div className="relative group">
                    <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{user.name}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{user.plan === 'free' ? 'Trial Protocol' : 'Elite Strategist'}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                        <User size={20} className="text-slate-400" />
                      </div>
                    </button>
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all z-50 p-2 space-y-1">
                       {user.status === 'TRIAL' && (
                         <button 
                           onClick={() => simulateExpiration()}
                           className="w-full flex items-center gap-3 px-4 py-3 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                         >
                           <AlertTriangle size={16} /> Simulate Expiration
                         </button>
                       )}
                       <button 
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                       >
                         <X size={16} /> Sign Out
                       </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </header>

          <main className="flex-1 p-6 lg:p-10 mt-16 lg:mt-0">
            <Outlet />
          </main>

          {/* Global Footer */}
          <footer className="border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-[#020617] px-8 py-12 pb-32 lg:pb-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-display font-black text-slate-900 dark:text-white uppercase tracking-tighter">Flux Agency</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Next-Gen Growth Engine</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 max-w-xs text-center md:text-left leading-relaxed">
                  Orchestrating high-performance digital ecosystems through specialized A2A protocol nodes.
                </p>
              </div>

              <div className="flex flex-col items-center md:items-end gap-6">
                <div className="flex items-center gap-6">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">© 2026 Flux Agency OS</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[9px] font-bold text-slate-500 uppercase">System Status: Nominal</span>
                  </div>
                </div>
              </div>
            </div>
          </footer>

          {/* Mobile Bottom Nav */}
          <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 px-6 flex items-center justify-between z-50">
            <MobileNavItem to="/" icon={LayoutDashboard} label="Home" />
            <MobileNavItem to="/strategy" icon={Sparkles} label="AI Strategy" />
            <MobileNavItem to="/pipeline" icon={Target} label="Leads" />
            <MobileNavItem to="/settings" icon={Settings} label="Settings" />
          </nav>
        </div>
      </div>
    </ThemeProvider>
  );
}

function MobileNavItem({ to, icon: Icon, label }: { to: string, icon: any, label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex flex-col items-center gap-1 transition-all duration-300",
        isActive ? "text-[#FF6B00]" : "text-slate-400"
      )}
    >
      <Icon size={24} />
      <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </NavLink>
  );
}

// Re-exporting for convenience
export { default as Sidebar } from './Sidebar';
