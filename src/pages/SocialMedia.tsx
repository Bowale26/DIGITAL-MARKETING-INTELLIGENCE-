import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Share2, 
  Calendar, 
  Target, 
  Zap, 
  MessageSquare, 
  TrendingUp, 
  Plus, 
  ChevronRight, 
  AlertTriangle,
  Camera,
  PlayCircle,
  Hash,
  Users,
  Layout,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { socialMediaStrategy, toneDefinitions } from '../data/creativeToolsData';
import { LoyaltyAgentService } from '../services/loyaltyAgentService';

export default function SocialMedia() {
  const [activeTab, setActiveTab] = useState<'scheduler' | 'voice' | 'crisis'>('scheduler');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleAction = async (action: string) => {
    setIsSyncing(true);
    await LoyaltyAgentService.getInstance().processAction(action);
    setIsSyncing(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 font-sans text-slate-900 dark:text-white">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pt-6">
        <div>
           <h1 className="text-4xl font-display font-bold tracking-tight uppercase">Social Empire</h1>
           <p className="text-slate-500 dark:text-slate-400 text-lg mt-2 font-medium">Algorithmic dominance and omnichannel brand resonance.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            id="BTN-POST-003"
            disabled={isSyncing}
            onClick={() => handleAction('Schedule Social Deployment: Brand Resonance Mapping')}
            className="btn-primary relative group overflow-hidden disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-white transform translate-y-full group-active:translate-y-0 transition-transform duration-75 opacity-20" />
            <Plus size={18} className={cn(isSyncing && "animate-spin")} /> 
            {isSyncing ? 'Deploying...' : 'Schedule Deployment'}
          </button>
          <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl">
             {(['scheduler', 'voice', 'crisis'] as const).map(tab => (
               <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                  activeTab === tab ? "bg-[#FF6B00] text-white shadow-lg shadow-orange-500/20" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                )}
               >
                 {tab}
               </button>
             ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
           <AnimatePresence mode="wait">
              {activeTab === 'scheduler' ? (
                <motion.div key="scheduler" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                   <div className="flex items-center justify-between px-2">
                      <h3 className="text-xl font-bold uppercase tracking-tight">Deployment Calendar</h3>
                      <div className="flex gap-2">
                         <button className="p-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-400"><Calendar size={18} /></button>
                         <button className="p-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-400"><Layout size={18} /></button>
                      </div>
                   </div>

                   <div className="grid grid-cols-7 gap-1">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => (
                        <div key={d} className="text-center py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d}</div>
                      ))}
                      {Array.from({ length: 28 }).map((_, i) => (
                        <div key={i} className={cn(
                          "aspect-square bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-xl p-2 relative group cursor-pointer hover:border-orange-500/50 transition-all",
                          i === 12 || i === 15 ? "border-orange-500/30" : ""
                        )}>
                           <span className="text-[8px] font-bold text-slate-300 group-hover:text-orange-500">{i + 1}</span>
                           {(i === 12 || i === 15) && <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full" />}
                        </div>
                      ))}
                   </div>

                   <div className="card-agency p-8 space-y-6">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Upcoming High-Impact Drops</h4>
                      <div className="space-y-4">
                         <ScheduleItem platform="Instagram" type="Reel" time="Today, 11:15 AM" title="The Future of E-comm" status="Ready" />
                         <ScheduleItem platform="LinkedIn" type="Article" time="Tomorrow, 09:00 AM" title="Neural Scaling 101" status="Drafting" />
                         <ScheduleItem platform="TikTok" type="Video" time="Monday, 07:30 PM" title="Shopify Secrets Exposed" status="Review" />
                      </div>
                   </div>
                </motion.div>
              ) : activeTab === 'voice' ? (
                <motion.div key="voice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                   {toneDefinitions.map((tone, i) => (
                     <div key={i} className="card-agency p-8 hover:border-[#00AEEF]/30 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                           <h4 className="text-lg font-bold uppercase tracking-tighter text-slate-900 dark:text-white">{tone.style}</h4>
                           <CheckCircle2 size={16} className="text-slate-100 dark:text-slate-800 group-hover:text-emerald-500 transition-colors" />
                        </div>
                        <p className="text-[10px] font-bold text-[#00AEEF] uppercase tracking-widest mb-4">{tone.keywords}</p>
                        <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl italic text-xs text-slate-500 leading-relaxed">
                           "{tone.example}"
                        </div>
                     </div>
                   ))}
                </motion.div>
              ) : (
                <motion.div key="crisis" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-agency p-10 space-y-8">
                   <div className="flex items-center gap-4 text-orange-500 mb-8">
                      <AlertTriangle size={32} />
                      <div>
                        <h3 className="text-2xl font-bold uppercase tracking-tight">Crisis Protocols</h3>
                        <p className="text-sm text-slate-500 font-medium">Standard Operating Procedures for Brand Protection.</p>
                      </div>
                   </div>
                   <div className="space-y-6">
                      {socialMediaStrategy.crisisProtocol.map((step, i) => (
                         <div key={i} className="flex items-start gap-6 pb-6 border-b border-slate-100 dark:border-slate-900 last:border-0 last:pb-0">
                            <span className="w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center font-bold text-slate-300 shrink-0">{i + 1}</span>
                            <div>
                               <h4 className="font-bold uppercase tracking-widest text-[#FF6B00] text-xs">{step.stage}</h4>
                               <p className="text-sm text-slate-500 mt-1 font-medium">{step.action}</p>
                            </div>
                         </div>
                      ))}
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="card-agency p-8 bg-slate-900 text-white border-transparent">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Target size={20} className="text-orange-500" /> Optimal Windows
              </h3>
              <div className="space-y-6">
                 {socialMediaStrategy.postingTimes.map((item, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center">
                         <p className="text-xs font-bold">{item.platform}</p>
                         <p className="text-[10px] text-white/40 font-bold uppercase tracking-tighter">EST</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl text-[10px] font-bold text-orange-500 uppercase tracking-widest">
                         {item.bestTime}
                      </div>
                      <p className="text-[9px] text-white/50">{item.reason}</p>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-slate-100 dark:bg-slate-950 rounded-[32px] p-8 border border-slate-200 dark:border-slate-800">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 px-1 flex items-center gap-2">
                 <Hash size={14} /> Neural Hashtag Engine
              </h4>
              <div className="flex flex-wrap gap-2">
                 {['#ShopifyScaling', '#NeuralD2C', '#PPCKings', '#SEOAuthority', '#AlgorithmHacks', '#D2CDomination'].map(tag => (
                   <span key={tag} className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-[10px] font-bold text-slate-400 cursor-pointer hover:border-[#00AEEF] hover:text-[#00AEEF] transition-all">
                      {tag}
                   </span>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function ScheduleItem({ platform, type, time, title, status }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl group cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 transition-all border border-transparent hover:border-orange-500/10">
       <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-slate-300 group-hover:text-orange-500 transition-all">
            {platform === 'Instagram' ? <Camera size={18} /> : platform === 'LinkedIn' ? <Users size={18} /> : <PlayCircle size={18} />}
          </div>
          <div>
            <p className="text-sm font-bold truncate max-w-[150px]">{title}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase">{platform} {type} • {time}</p>
          </div>
       </div>
       <span className={cn(
         "text-[8px] font-bold px-2 py-0.5 rounded-full uppercase",
         status === 'Ready' ? "bg-emerald-500/10 text-emerald-500" : status === 'Drafting' ? "bg-slate-200 text-slate-400" : "bg-orange-500/10 text-orange-600"
       )}>{status}</span>
    </div>
  );
}
