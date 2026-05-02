import React from 'react';
import { motion } from 'motion/react';
import { Check, Zap, Star, Shield, ArrowRight, Clock } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { checkout } from '../lib/stripe';

export default function Pricing() {
  const { user, updatePlan, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = React.useState<string | null>(null);

  const handleSelectPlan = async (planId: 'monthly' | 'yearly') => {
    if (!isAuthenticated) {
      navigate(`/auth?redirect=pricing`);
      return;
    }

    setIsProcessing(planId);
    try {
      // 1. Determine the correct Stripe Price ID based on selection
      const priceId = planId === 'monthly' ? 'price_1TSOJLBMbxh6jv0C9aEJBKRt' : 'price_1TSOKGBMbxh6jv0CMhUwlHYX';
      
      // 2. Use Intelligent Checkout Helper
      await checkout(priceId, {
        serviceId: planId === 'monthly' ? 'PROTOCOL' : 'ELITE_ENTERPRISE',
        email: user?.email || undefined
      });
      
    } catch (error) {
      console.error("Checkout initialization failed:", error);
      // Resilience: Fallback to manual plan update if stripe is unavailable
      updatePlan(planId === 'monthly' ? 'pro' : 'enterprise');
      navigate('/billing');
    } finally {
      setIsProcessing(null);
    }
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
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-sm font-black text-orange-500 uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <Clock size={16} /> All plans start with a 7-day free trial.
          </motion.p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto items-stretch">
        {/* Protocol */}
        <div className="p-10 rounded-[48px] bg-white dark:bg-slate-900 border-2 border-[#FF6B00] shadow-2xl shadow-orange-500/10 space-y-12 h-full flex flex-col relative z-10 transition-transform hover:scale-[1.02]">
           <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF6B00] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
              Standard Intelligence
           </div>
           <div className="space-y-6 flex-1">
              <div className="space-y-2">
                 <h4 className="text-[10px] font-black text-[#FF6B00] uppercase tracking-widest pl-1">Stage 1</h4>
                 <h3 className="text-3xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tighter">PROTOCOL</h3>
              </div>
              <div className="flex items-baseline gap-1">
                 <span className="text-5xl font-display font-black text-slate-900 dark:text-white">
                    $19.99
                 </span>
                 <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">/ Month</span>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Everything you need to initiate market dominance. Includes a 7-day free trial on activation.</p>
              <ul className="space-y-4">
                 {['Unlimited Strategy Labs', 'Priority AI Routing', 'Analytics Dashboard', 'Custom Domain Sync', 'Priority Support'].map(f => (
                   <li key={f} className="flex items-center gap-3 text-[10px] font-black text-slate-900 dark:text-slate-200 uppercase tracking-wide">
                      <Star size={14} className="text-orange-500 shrink-0" /> {f}
                   </li>
                 ))}
              </ul>
           </div>
           <button 
             disabled={isProcessing === 'monthly'}
             onClick={() => handleSelectPlan('monthly')} 
             className="w-full py-6 bg-[#FF6B00] text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-orange-500/20 disabled:opacity-50"
           >
              {isProcessing === 'monthly' ? 'Initializing Secure Protocol...' : 'Subscribe Protocol ($19.99/mo)'}
           </button>
        </div>

        {/* Elite Enterprise */}
        <div className="p-10 rounded-[48px] bg-slate-900 text-white space-y-12 h-full flex flex-col transition-transform hover:scale-[1.02]">
           <div className="space-y-6 flex-1">
              <div className="space-y-2">
                 <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest pl-1">Stage X</h4>
                 <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter">ELITE ENTERPRISE</h3>
              </div>
              <div className="flex items-baseline gap-1">
                 <span className="text-5xl font-display font-black text-white">
                    $199.99
                 </span>
                 <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">/ Year</span>
              </div>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">Maximum power for enterprise-scale marketing dominance. Advanced API hooks and dedicated nodes.</p>
              <ul className="space-y-4">
                 {['Everything in Protocol', 'White-label Portal', 'Dedicated Strategist', 'V4 Compliance Engine', '24/7 Neural Support'].map(f => (
                   <li key={f} className="flex items-center gap-3 text-[10px] font-black text-blue-100 uppercase tracking-wide">
                      <Shield size={14} className="text-blue-500 shrink-0" /> {f}
                   </li>
                 ))}
              </ul>
           </div>
           <button 
             disabled={isProcessing === 'yearly'}
             onClick={() => handleSelectPlan('yearly')} 
             className="w-full py-6 bg-white text-slate-900 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all disabled:opacity-50"
           >
              {isProcessing === 'yearly' ? 'Configuring Elite Tier...' : 'Subscribe Elite Enterprise ($199.99/yr)'}
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
