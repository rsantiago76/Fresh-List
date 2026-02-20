import { motion } from 'motion/react';
import { Card } from './Card';
import { Badge } from './Badge';
import { 
  Smartphone, 
  Users, 
  Zap, 
  ShoppingCart, 
  Camera,
  MessageSquare,
  Globe,
  Clock,
  Sparkles
} from 'lucide-react';

interface Enhancement {
  icon: React.ElementType;
  title: string;
  description: string;
  status: 'in-progress' | 'planned' | 'research';
  eta: string;
  color: string;
  bgColor: string;
}

const enhancements: Enhancement[] = [
  {
    icon: Smartphone,
    title: 'Native Mobile Apps',
    description: 'iOS and Android apps with offline support and barcode scanning',
    status: 'in-progress',
    eta: 'Q2 2024',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Camera,
    title: 'AI Receipt Scanner',
    description: 'Snap a photo of your receipt and auto-populate your grocery list',
    status: 'in-progress',
    eta: 'Q2 2024',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Users,
    title: 'Family Sharing',
    description: 'Collaborate on lists with family members in real-time',
    status: 'planned',
    eta: 'Q3 2024',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: ShoppingCart,
    title: 'Store Integration',
    description: 'Direct ordering from partner grocery stores and delivery services',
    status: 'planned',
    eta: 'Q3 2024',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Zap,
    title: 'Meal Plan Generator',
    description: 'AI-powered weekly meal plans based on your Fresh Ratio goals',
    status: 'planned',
    eta: 'Q4 2024',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
  {
    icon: MessageSquare,
    title: 'Community Features',
    description: 'Share recipes, tips, and success stories with other users',
    status: 'research',
    eta: 'Q4 2024',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    icon: Globe,
    title: 'Multi-Language Support',
    description: 'FreshList in 10+ languages with regional food databases',
    status: 'research',
    eta: '2025',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
  },
  {
    icon: Clock,
    title: 'Smart Reminders',
    description: 'Get notified when it\'s time to restock or when items expire',
    status: 'research',
    eta: '2025',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
];

const statusConfig = {
  'in-progress': {
    label: 'In Progress',
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    icon: '🚧',
  },
  'planned': {
    label: 'Planned',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    icon: '📋',
  },
  'research': {
    label: 'Research',
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    icon: '🔬',
  },
};

export function ComingSoon() {
  return (
    <section className="py-20 px-6 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, var(--primary-500) 1px, transparent 1px),
            linear-gradient(0deg, var(--primary-500) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Animated Gradient Blob */}
      <motion.div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle, var(--accent-400) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium mb-4 border border-purple-200">
            <Sparkles className="w-4 h-4" />
            Coming Soon
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The Future of FreshList
          </h2>
          
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            We're constantly innovating to bring you powerful new features 
            that make healthy eating even easier. Here's what's on the horizon.
          </p>
        </motion.div>

        {/* Enhancements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {enhancements.map((enhancement, index) => (
            <motion.div
              key={enhancement.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
              }}
            >
              <Card
                variant="bordered"
                padding="md"
                className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group relative overflow-hidden"
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-lime-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig[enhancement.status].color}`}>
                      <span>{statusConfig[enhancement.status].icon}</span>
                      {statusConfig[enhancement.status].label}
                    </span>
                    <span className="text-xs text-[var(--text-tertiary)] font-medium">
                      {enhancement.eta}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 mb-4 rounded-xl ${enhancement.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <enhancement.icon className={`w-6 h-6 ${enhancement.color}`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-semibold text-base mb-2 group-hover:text-emerald-600 transition-colors">
                    {enhancement.title}
                  </h3>
                  
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {enhancement.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Progress Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <Card variant="gradient" padding="lg">
            <h3 className="font-semibold text-lg mb-6 text-center">
              Development Roadmap 2024-2025
            </h3>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
              {/* Progress Line */}
              <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-emerald-200 via-blue-200 to-purple-200 rounded-full" />
              
              {['Q2 2024', 'Q3 2024', 'Q4 2024', '2025'].map((quarter, index) => {
                const itemsInQuarter = enhancements.filter(e => e.eta === quarter).length;
                return (
                  <motion.div
                    key={quarter}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex flex-col items-center relative z-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-white border-4 border-emerald-200 flex items-center justify-center font-bold text-emerald-600 shadow-lg mb-2">
                      {itemsInQuarter}
                    </div>
                    <p className="text-sm font-medium">{quarter}</p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {itemsInQuarter} feature{itemsInQuarter !== 1 ? 's' : ''}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <Card 
            variant="bordered" 
            padding="lg"
            className="max-w-2xl mx-auto bg-gradient-to-br from-emerald-50 to-lime-50 border-emerald-200"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-5xl">💡</div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="font-semibold text-lg mb-2">
                  Have a Feature Request?
                </h4>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  We'd love to hear your ideas! Your feedback helps shape the future of FreshList.
                </p>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium shadow-lg hover:shadow-xl">
                  <MessageSquare className="w-4 h-4" />
                  Submit Feedback
                </button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Fun Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Features Planned', value: '8+', emoji: '🚀' },
            { label: 'Active Development', value: '2', emoji: '⚡' },
            { label: 'User Requests', value: '50+', emoji: '💬' },
            { label: 'Launch Timeline', value: '2024', emoji: '📅' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + index * 0.05 }}
              className="text-center p-4 rounded-xl bg-white border border-[var(--neutral-200)] hover:shadow-lg transition-all duration-300"
            >
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="text-2xl font-bold bg-gradient-to-br from-emerald-600 to-lime-500 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-[var(--text-secondary)]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
