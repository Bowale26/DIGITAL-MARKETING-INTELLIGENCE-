import React from 'react';
import { motion } from 'motion/react';
import { Check, Zap, Star, Shield, ArrowRight, Clock } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function Pricing() {
  const { user, updatePlan, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'yearly'>('yearly');

  const handleSelectPlan = (planId: string) => {
    if (!isAuthenticated) {
      navigate(`/auth?redirect=pricing`);
      return;
    }
    const finalPlan = planId === 'free' ? 'free' : (billingCycle === 'yearly' ? 'annual' : 'monthly');
    updatePlan(finalPlan as any);
    navigate('/billing');
  };

  const getPrice = (monthly: string, yearly: string) => {
    return billingCycle === 'monthly' ? monthly : yearly;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 space-y-20 font-sans">
      <div className="text-center space-y-8 max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full"
        >
          <Zap size={14} className="text-[#FF6B00]" />
          <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-widest">Global Growth Infrastructure</span>
        </motion.div>
        
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-8xl font-display font-black text-slate-900 dark:text-white uppercase leading-[0.9] tracking-tighter"
          >
            CHOOSE YOUR <span className="text-orange-500">POWER</span> LEVEL.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto"
          >
            Transparent pricing for high-performance marketing ecosystems. Join 50,000+ marketers scaling with autonomous intelligence.
          </motion.p>
        </div>

        {/* Billing Toggle */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl relative"
        >
          <button 
            onClick={() => setBillingCycle('monthly')}
            className={cn(
              "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest z-10 transition-colors",
              billingCycle === 'monthly' ? "text-slate-900 dark:text-white" : "text-slate-400"
            )}
          >
            Monthly
          </button>
          <button 
            onClick={() => setBillingCycle('yearly')}
            className={cn(
              "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest z-10 transition-colors flex items-center gap-2",
              billingCycle === 'yearly' ? "text-slate-900 dark:text-white" : "text-slate-400"
            )}
          >
            Yearly <span className="text-[#FF6B00]">Save 17%</span>
          </button>
          <motion.div 
            layoutId="activeCycle"
            className="absolute inset-y-1 left-1 right-1 bg-white dark:bg-slate-800 rounded-xl shadow-sm"
            initial={false}
            animate={{ 
              x: billingCycle === 'monthly' ? 0 : '100%',
              width: '50%'
            }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Trial Genesis */}
        <div className="p-10 rounded-[48px] bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-12 h-full flex flex-col">
           <div className="space-y-6 flex-1">
              <div className="space-y-2">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Stage 0</h4>
                 <h3 className="text-3xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tighter">Trial Genesis</h3>
              </div>
              <div className="flex items-baseline gap-1">
                 <span className="text-5xl font-display font-black">$0</span>
                 <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">/ 7 Days</span>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Experience the full power of Flux Agency for 7 days. No feature locking during initialization.</p>
              <ul className="space-y-4">
                 {['All AI Strategy Labs', 'Lead Gen Initializer', 'Content Lab Templates', 'Standard Edge Hosting'].map(f => (
                   <li key={f} className="flex items-center gap-3 text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                      <Check size={14} className="text-emerald-500 shrink-0" /> {f}
                   </li>
                 ))}
              </ul>
           </div>
           <button onClick={() => handleSelectPlan('free')} className="w-full py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <Clock size={16} /> Start Free Trial
           </button>
        </div>

        {/* Pro Flux */}
        <div className="p-10 rounded-[48px] bg-white dark:bg-slate-900 border-2 border-[#FF6B00] shadow-2xl shadow-orange-500/10 space-y-12 h-full flex flex-col relative scale-105 z-10">
           <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF6B00] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
              Most Popular
           </div>
           <div className="space-y-6 flex-1">
              <div className="space-y-2">
                 <h4 className="text-[10px] font-black text-[#FF6B00] uppercase tracking-widest pl-1">Stage 1</h4>
                 <h3 className="text-3xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tighter">Pro Flux</h3>
              </div>
              <div className="flex items-baseline gap-1 focus-within:">
                 <span className="text-5xl font-display font-black text-slate-900 dark:text-white">
                    ${getPrice('19.99', '14.99')}
                 </span>
                 <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">/ Month</span>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Ideal for scaling businesses. Billed {billingCycle}ly. Cancel anytime.</p>
              <ul className="space-y-4">
                 {['Unlimited Strategy Labs', 'Priority AI Routing', 'Analytics Dashboard', 'Custom Domain Sync', 'Priority Support'].map(f => (
                   <li key={f} className="flex items-center gap-3 text-[10px] font-black text-slate-900 dark:text-slate-200 uppercase tracking-wide">
                      <Star size={14} className="text-orange-500 shrink-0" /> {f}
                   </li>
                 ))}
              </ul>
           </div>
           <button onClick={() => handleSelectPlan('monthly')} className="w-full py-6 bg-[#FF6B00] text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20">
              Start Pro Protocol
           </button>
        </div>

        {/* Elite Growth */}
        <div className="p-10 rounded-[48px] bg-slate-900 text-white space-y-12 h-full flex flex-col">
           <div className="space-y-6 flex-1">
              <div className="space-y-2">
                 <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest pl-1">Stage X</h4>
                 <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Elite Growth</h3>
              </div>
              <div className="flex items-baseline gap-1">
                 <span className="text-5xl font-display font-black text-white">
                    ${getPrice('199.99', '149.99')}
                 </span>
                 <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">/ Month</span>
              </div>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">Maximum power for enterprise-scale marketing dominance. Advanced API hooks available.</p>
              <ul className="space-y-4">
                 {['Everything in Pro', 'White-label Portal', 'Dedicated Strategist', 'V4 Compliance Engine'].map(f => (
                   <li key={f} className="flex items-center gap-3 text-[10px] font-black text-blue-100 uppercase tracking-wide">
                      <Shield size={14} className="text-blue-500 shrink-0" /> {f}
                   </li>
                 ))}
              </ul>
           </div>
           <button onClick={() => handleSelectPlan('annual')} className="w-full py-5 bg-white text-slate-900 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">
              Initialize Elite Tier
           </button>
        </div>
      </div>

      {/* Trustproof Footer */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-slate-100 dark:border-slate-800">
         <div className="flex items-center gap-12 grayscale opacity-50">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Trustpilot 4.8 ★★★★★</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">PCI Compliant</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">VAT Registered</span>
         </div>
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <Shield size={14} />
               </div>
               <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">SSL Secure</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <ArrowRight size={14} />
               </div>
               <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">7-Day Refund</span>
            </div>
         </div>
      </div>
    </div>
  );
}
