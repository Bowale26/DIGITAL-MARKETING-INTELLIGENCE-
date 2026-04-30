import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Sparkles, Zap, Shield, Clock, ArrowRight, X, AlertTriangle, AlertCircle, Users, Search, Check } from 'lucide-react';
import { useAuth } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function SubscriptionGate() {
  const { user, requestExtension } = useAuth();
  const navigate = useNavigate();

  if (!user || user.status !== 'EXPIRED') return null;

  const handleSubscribe = () => {
    navigate('/pricing');
  };

  const getPersonalizedMessage = () => {
    switch (user.intent) {
      case 'POWER':
        return `You've hit our node capacity. You generated ${user.featureUsage.aiGenerations} AI insights during your trial—unlock unlimited power now.`;
      case 'HIGH':
        return `Don't lose your progress. We saved your ${user.projectsCreated} mission-critical projects for 30 days. Re-sync to continue.`;
      default:
        return `Your 7-day synchronization protocol has completed. Active session suspended.`;
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl"
      >
        <motion.div 
          initial={{ scale: 0.9, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          className="max-w-3xl w-full bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden shadow-2xl relative border border-slate-200 dark:border-slate-800"
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-orange-600 to-red-600 p-10 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-16 opacity-10 rotate-12">
               <Zap size={140} />
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 space-y-4"
            >
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Lock size={32} className="text-white" />
              </div>
              <h2 className="text-4xl font-display font-black uppercase tracking-tighter leading-none">Synchronization <span className="text-orange-200">Suspended</span></h2>
              <p className="text-orange-100 font-bold uppercase tracking-widest text-xs">{getPersonalizedMessage()}</p>
            </motion.div>
          </div>

          <div className="p-12 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-widest flex items-center gap-2">
                    <Shield size={12} /> Loss Aversion Guard
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    Account data remains in <strong>Read-Only Stasis</strong>. Web Design Code, AI Models, and Node Protocols will be recycled in 30 days if not reclaimed.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Locked Specialists</h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Competitor Node', icon: Users, status: 'LOCKED' },
                      { name: 'Trend Analytics', icon: Zap, status: 'LOCKED' },
                      { name: 'AI Copy Lab', icon: Sparkles, status: 'LOCKED' },
                      { name: 'SEO Opportunity', icon: Search, status: 'LOCKED' }
                    ].map(f => (
                      <div key={f.name} className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                          <f.icon size={14} className="text-slate-400" />
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-tight">{f.name}</span>
                        </div>
                        <span className="text-[8px] font-black text-orange-500/50 uppercase tracking-widest">{f.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-8 bg-slate-900 rounded-[32px] text-white space-y-6 shadow-2xl border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                    <Shield size={80} />
                  </div>
                  <h4 className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Growth Recommendation</h4>
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-display font-black">$19.99</span>
                      <span className="text-slate-500 text-[10px] uppercase font-black tracking-widest">/ Month</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                       <Check size={10} className="text-orange-500" /> Save 17% with Yearly Plan
                    </p>
                  </div>
                  <ul className="space-y-3 text-[10px] font-black uppercase tracking-widest text-slate-300">
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Unlimited Real-time Nodes</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Enterprise SEO Discovery</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Grounded Market Intel</li>
                  </ul>
                </div>

                <div className="flex flex-col gap-4">
                  <button 
                    onClick={handleSubscribe}
                    className="w-full py-5 bg-orange-500 text-white rounded-[24px] text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 active:scale-95"
                  >
                    Initialize Subscription
                  </button>
                  <button 
                    onClick={requestExtension}
                    className="w-full py-5 border border-slate-200 dark:border-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-[24px]"
                  >
                    Request 24h Grace Protocol
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-slate-100 dark:border-slate-800">
               <div className="flex items-center gap-6">
                 {[
                   { label: 'SSL Secure', icon: Lock },
                   { label: 'Cancel Anytime', icon: X },
                   { label: '7-Day Refund', icon: Shield }
                 ].map(badge => (
                   <div key={badge.label} className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-widest">
                      <badge.icon size={14} className="text-slate-300" /> {badge.label}
                   </div>
                 ))}
               </div>
               <div className="flex items-center gap-4 text-slate-400 grayscale opacity-40">
                  <span className="text-[10px] font-black uppercase tracking-widest">Trustpilot 4.8 ★★★★★</span>
               </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
