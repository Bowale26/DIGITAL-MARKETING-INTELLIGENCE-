import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp,
  Rocket,
  Video,
  Image as ImageIcon,
  ShieldCheck,
  Code2,
  DollarSign,
  ShoppingBag, 
  Share2, 
  Users, 
  Target, 
  Search, 
  PenTool, 
  Globe, 
  Monitor,
  Server, 
  Sparkles, 
  Layers,
  ChevronRight,
  Settings,
  X,
  CreditCard,
  LifeBuoy,
  Folder,
  BarChart3,
  Zap,
  Trophy,
  Shield,
  Calendar,
  FlaskConical,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const services = [
  { name: 'Competitor Node', icon: Users, path: '/services/leads' },
  { name: 'Trend Node', icon: TrendingUp, path: '/services/social' },
  { name: 'SEO Node', icon: Search, path: '/services/seo/lab' },
  { name: 'Crisis Node', icon: AlertTriangle, path: '/services/ppc' },
  { name: 'Content Lab', icon: PenTool, path: '/services/content/lab' },
  { name: 'Web Design', icon: Monitor, path: '/services/web/lab' },
  { name: 'Web Hosting', icon: Server, path: '/services/hosting' },
  { name: 'AI Strategy', icon: Zap, path: '/strategy' },
];

export default function Sidebar({ onNavClick, isMobile }: { onNavClick?: () => void, isMobile?: boolean }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-900 overflow-hidden shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF6B00] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20">
            <Sparkles className="text-white" size={24} />
          </div>
          {(!isCollapsed || isMobile) && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="font-display font-bold text-slate-900 dark:text-white text-lg leading-tight uppercase tracking-tight">Digital Marketing</span>
              <span className="text-[10px] text-[#00AEEF] font-bold uppercase tracking-[0.2em]">Intelligence</span>
            </motion.div>
          )}
        </div>
        {isMobile && onNavClick && (
          <button onClick={onNavClick} className="ml-auto text-slate-400 hover:text-slate-900 dark:hover:text-white">
            <X size={24} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-8">
        <div>
          {(!isCollapsed || isMobile) && <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em] px-3 mb-4">Command & Strategy</p>}
          <div className="space-y-1">
            <NavItem to="/" icon={LayoutDashboard} label="Command Center" collapsed={isCollapsed && !isMobile} onClick={onNavClick} />
            <NavItem to="/marketing-suite" icon={Zap} label="Marketing Suite" collapsed={isCollapsed && !isMobile} onClick={onNavClick} />
            <NavItem to="/marketing-calendar" icon={Calendar} label="Omni-Calendar" collapsed={isCollapsed && !isMobile} onClick={onNavClick} />
            <NavItem to="/ecosystem" icon={Layers} label="Service Ecosystem" collapsed={isCollapsed && !isMobile} onClick={onNavClick} />
            <NavItem to="/intelligence" icon={Globe} label="Market Intelligence" collapsed={isCollapsed && !isMobile} onClick={onNavClick} />
            <NavItem to="/strategy" icon={Sparkles} label="Strategy AI" collapsed={isCollapsed && !isMobile} onClick={onNavClick} />
            <NavItem to="/ab-testing" icon={FlaskConical} label="A/B Testing Lab" collapsed={isCollapsed && !isMobile} onClick={onNavClick} />
            <NavItem to="/analytics" icon={BarChart3} label="ROI Analytics" collapsed={isCollapsed && !isMobile} onClick={onNavClick} />
          </div>
        </div>

        <div>
          {(!isCollapsed || isMobile) && <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em] px-3 mb-4">Growth & Revenue</p>}
          <div className="space-y-1">
            <NavItem to="/pipeline" icon={Target} label="Lead Pipeline" collapsed={isCollapsed && !isMobile} onClick={onNavClick} />
            <NavItem to="/campaigns" icon={Rocket} label="Ad Orchestrator" collapsed={isCollapsed && !isMobile} onClick={onNavClick} />
            <NavItem to="/revenue" icon={DollarSign} label="Revenue Studio" collapsed={isCollapsed && !isMobile} onClick={onNavClick} />
            <NavItem to="/engagement" icon={Trophy} label="Engagement Hub" collapsed={isCollapsed && !isMobile} onClick={onNavClick} />
          </div>
        </div>

        <div>
          {(!isCollapsed || isMobile) && <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em] px-3 mb-4">Execution Lab</p>}
          <div className="space-y-1">
            <NavItem to="/build" icon={ShoppingBag} label="Build Center" collapsed={isCollapsed && !isMobile} onClick={onNavClick} />
            <NavItem to="/media" icon={ImageIcon} label="Media Studio" collapsed={isCollapsed && !isMobile} onClick={onNavClick} />
            <NavItem to="/stream" icon={Video} label="Stream Hub" collapsed={isCollapsed && !isMobile} onClick={onNavClick} />
            <NavItem to="/automations" icon={Zap} label="Workflows" collapsed={isCollapsed && !isMobile} onClick={onNavClick} />
            <NavItem to="/code" icon={Code2} label="Code Lab" collapsed={isCollapsed && !isMobile} onClick={onNavClick} />
          </div>
        </div>

        <div>
          {(!isCollapsed || isMobile) && <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em] px-3 mb-4">Maintenance</p>}
          <div className="space-y-1">
            <NavItem to="/governance" icon={ShieldCheck} label="AI Governance" collapsed={isCollapsed && !isMobile} onClick={onNavClick} />
            <NavItem to="/vault" icon={Folder} label="Project Vault" collapsed={isCollapsed && !isMobile} onClick={onNavClick} />
            <NavItem to="/training" icon={Settings} label="Training Lab" collapsed={isCollapsed && !isMobile} onClick={onNavClick} />
            <NavItem to="/legal" icon={Shield} label="Legal Center" collapsed={isCollapsed && !isMobile} onClick={onNavClick} />
          </div>
        </div>

        <div>
           {(!isCollapsed || isMobile) && <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em] px-3 mb-4">Service Ecosystem</p>}
           <div className="space-y-1">
            {services.map((s) => (
              <NavItem key={s.path} to={s.path} icon={s.icon} label={s.name} collapsed={isCollapsed && !isMobile} onClick={onNavClick} />
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      {!isMobile && (
        <div className="p-4 border-t border-slate-100 dark:border-slate-900 shrink-0">
          <div className="space-y-1">
            <NavItem to="/pricing" icon={Target} label="Pricing & Plans" collapsed={isCollapsed} />
            <NavItem to="/billing" icon={CreditCard} label="Billing Central" collapsed={isCollapsed} />
            <NavItem to="/support" icon={LifeBuoy} label="Support Center" collapsed={isCollapsed} />
            <NavItem to="/settings" icon={Settings} label="System Config" collapsed={isCollapsed} />
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-all group"
            >
              <div className={cn("transition-transform duration-300", isCollapsed && "rotate-180")}>
                <ChevronRight size={20} />
              </div>
              {!isCollapsed && <span className="text-sm font-medium">Compress Menu</span>}
            </button>
          </div>
        </div>
      )}
    </>
  );

  if (isMobile) {
    return <div className="h-full flex flex-col">{sidebarContent}</div>;
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="h-screen bg-white dark:bg-slate-950 border-r border-slate-100 dark:border-slate-900 flex flex-col z-50 sticky top-0"
    >
      {sidebarContent}
    </motion.aside>
  );
}

function NavItem({ to, icon: Icon, label, collapsed, onClick }: { to: string, icon: any, label: string, collapsed: boolean, onClick?: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group relative",
        isActive 
          ? "bg-orange-500/10 text-[#FF6B00]" 
          : "text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
      )}
    >
      <Icon size={20} className="shrink-0" />
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
      {collapsed && (
        <div className="absolute left-full ml-4 px-2 py-1 bg-[#0F172A] text-white text-[10px] rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 border border-slate-800 font-bold uppercase tracking-widest">
          {label}
        </div>
      )}
    </NavLink>
  );
}
