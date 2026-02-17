import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { FeatureCard } from '../components/FeatureCard';
import { 
  Sparkles, ArrowRight, Check, Zap, BarChart3, 
  Leaf, ListChecks, TrendingUp, Lightbulb, Star,
  Users, Shield, Heart, CheckCircle2
} from 'lucide-react';
import { useState, useEffect } from 'react';

export function HomePage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="min-h-screen">
      
      {/* Hero Section with Animated Mesh Gradient */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-6 overflow-hidden">
        {/* Animated Mesh Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-50)] via-white to-[var(--accent-50)]">
          {/* Mesh Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(90deg, var(--primary-100) 1px, transparent 1px),
                linear-gradient(0deg, var(--primary-100) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>
        
        {/* Animated Gradient Blobs */}
        <motion.div
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--primary-400) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--accent-500) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -120, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-[550px] h-[550px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--secondary-400) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Hero Content */}
        <motion.div 
          className="relative z-10 max-w-6xl mx-auto text-center"
          style={{ opacity, scale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Badge variant="accent" size="lg" dot className="mb-8 shadow-lg">
              <Sparkles className="w-4 h-4" />
              AI-Powered Grocery Intelligence
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
            style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', 
              lineHeight: '1.1',
              fontWeight: 'var(--font-extrabold)'
            }}
          >
            Transform Your{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[var(--primary-500)] via-[var(--accent-500)] to-[var(--secondary-500)] bg-clip-text text-transparent">
                Grocery Habits
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primary-500)] via-[var(--accent-500)] to-[var(--secondary-500)] rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </span>
            <br />
            One Item at a Time
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[var(--text-xl)] md:text-[var(--text-2xl)] text-[var(--text-secondary)] mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Build healthier shopping lists with real-time insights and AI-powered suggestions. 
            See your progress instantly and make smarter choices effortlessly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/demo">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="primary" size="lg" className="text-lg">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Try Interactive Demo
                </Button>
              </motion.div>
            </Link>
            <Link to="/dashboard">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="text-lg">
                  View Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-6 md:gap-12 flex-wrap text-[var(--text-sm)] text-[var(--text-secondary)]"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[var(--primary-500)]" />
              <span>No signup required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[var(--primary-500)]" />
              <span>100% free forever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[var(--primary-500)]" />
              <span>Privacy-first design</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Interactive Demo Teaser */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--neutral-50)] to-white" />
        
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge variant="primary" size="lg" className="mb-4">
              <Zap className="w-4 h-4" />
              See It In Action
            </Badge>
            <h2 className="mb-4">Watch Your Fresh Ratio Come to Life</h2>
            <p className="text-[var(--text-lg)] text-[var(--text-secondary)] max-w-2xl mx-auto">
              Add a few items and watch the magic happen in real-time
            </p>
          </motion.div>

          <MiniGroceryWidget />
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-50)] via-white to-[var(--accent-50)] opacity-50" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="accent" size="lg" className="mb-4">
                Features
              </Badge>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4"
            >
              Everything You Need to Build Healthier Habits
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[var(--text-xl)] text-[var(--text-secondary)] max-w-2xl mx-auto"
            >
              Powerful, intelligent features that make healthy shopping effortless
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <FeatureCard
              icon={Sparkles}
              title="Smart Grocery Builder"
              description="Intuitive list building with real-time processing level tracking. Color-coded badges make healthy choices obvious."
              gradient="from-[var(--primary-400)] to-[var(--primary-600)]"
              glowColor="var(--primary-500)"
              delay={0}
            />

            <FeatureCard
              icon={Zap}
              title="Instant AI Suggestions"
              description="Get personalized tips as you shop. Our AI notices patterns and suggests healthier alternatives on the fly."
              gradient="from-[var(--accent-400)] to-[var(--accent-600)]"
              glowColor="var(--accent-500)"
              delay={0.1}
            />

            <FeatureCard
              icon={BarChart3}
              title="Beautiful Analytics"
              description="Track your progress with stunning charts. See trends, celebrate wins, and stay motivated week after week."
              gradient="from-[var(--secondary-400)] to-[var(--secondary-600)]"
              glowColor="var(--secondary-500)"
              delay={0.2}
            />
          </div>

          {/* Additional Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Privacy First', desc: 'Your data never leaves your device' },
              { icon: Heart, title: 'Health Focused', desc: 'Science-backed food categorization' },
              { icon: Users, title: 'Family Friendly', desc: 'Perfect for household shopping' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card variant="bordered" padding="lg" className="h-full hover:shadow-lg transition-all duration-300 hover:border-[var(--primary-300)]">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--primary-400)] to-[var(--primary-600)] flex items-center justify-center text-white flex-shrink-0">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{feature.title}</h4>
                      <p className="text-[var(--text-sm)] text-[var(--text-secondary)]">{feature.desc}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" size="lg" className="mb-4">
                How It Works
              </Badge>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4"
            >
              Three Simple Steps to Healthier Shopping
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: ListChecks,
                title: 'Build Your List',
                description: 'Add items and categorize them by processing level. Our smart interface makes it quick and easy.',
                color: 'primary',
              },
              {
                step: '02',
                icon: TrendingUp,
                title: 'See Your Ratio',
                description: 'Watch your Fresh Ratio update in real-time. The circular meter shows your progress instantly.',
                color: 'accent',
              },
              {
                step: '03',
                icon: Lightbulb,
                title: 'Get Smart Tips',
                description: 'Receive personalized suggestions to improve your ratio and build healthier habits over time.',
                color: 'secondary',
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card 
                  variant="gradient" 
                  padding="xl"
                  className="h-full relative overflow-hidden group hover:shadow-xl transition-all duration-500"
                >
                  {/* Step Number */}
                  <div className="absolute top-6 right-6 text-6xl font-black text-[var(--neutral-100)] group-hover:text-[var(--neutral-200)] transition-colors">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <motion.div 
                    className={`relative z-10 w-16 h-16 rounded-[var(--radius-2xl)] bg-gradient-to-br from-[var(--${step.color}-400)] to-[var(--${step.color}-600)] flex items-center justify-center text-white shadow-lg mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <step.icon className="w-8 h-8" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-[var(--text-2xl)] font-bold mb-3">{step.title}</h3>
                  <p className="text-[var(--text-base)] text-[var(--text-secondary)] leading-relaxed">
                    {step.description}
                  </p>

                  {/* Hover Glow */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br from-[var(--${step.color}-400)] to-[var(--${step.color}-600)] opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-[var(--primary-50)] via-white to-[var(--accent-50)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="primary" size="lg" className="mb-4">
                <Star className="w-4 h-4" />
                Testimonials
              </Badge>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4"
            >
              Loved by Thousands of Health-Conscious Shoppers
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Busy Mom of 3',
                avatar: '👩‍🦰',
                quote: 'FreshList transformed how I shop for my family. The Fresh Ratio meter keeps me accountable, and my kids are eating healthier!',
                rating: 5,
              },
              {
                name: 'Marcus Chen',
                role: 'Fitness Coach',
                avatar: '🧑‍💼',
                quote: 'I recommend FreshList to all my clients. The visual feedback is powerful and makes nutrition planning so much easier.',
                rating: 5,
              },
              {
                name: 'Emily Rodriguez',
                role: 'Health Blogger',
                avatar: '👱‍♀️',
                quote: 'The smart suggestions are incredible. It\'s like having a nutritionist in your pocket. My grocery bills went down too!',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card variant="bordered" padding="lg" className="h-full hover:shadow-xl hover:border-[var(--primary-300)] transition-all duration-300">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[var(--accent-500)] text-[var(--accent-500)]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-[var(--text-base)] text-[var(--text-primary)] mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[var(--neutral-200)]">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary-400)] to-[var(--accent-500)] flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h5 className="font-semibold">{testimonial.name}</h5>
                      <p className="text-[var(--text-sm)] text-[var(--text-secondary)]">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[var(--radius-2xl)] shadow-[var(--shadow-2xl)]"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-500)] via-[var(--accent-500)] to-[var(--secondary-500)]" />
            
            {/* Animated Pattern */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
              animate={{
                backgroundPosition: ['0px 0px', '40px 40px'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Floating Elements */}
            <motion.div
              className="absolute top-10 right-10 text-6xl"
              animate={{ 
                rotate: [0, 10, -10, 0],
                y: [0, -10, 0],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              🥗
            </motion.div>
            <motion.div
              className="absolute bottom-10 left-10 text-5xl"
              animate={{ 
                rotate: [0, -10, 10, 0],
                y: [0, 10, 0],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              🥑
            </motion.div>

            {/* Content */}
            <div className="relative z-10 p-12 md:p-16 text-center text-white">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-6xl mb-6"
              >
                🎉
              </motion.div>
              
              <h2 className="text-white mb-6">
                Ready to Build Healthier Habits?
              </h2>
              
              <p className="text-[var(--text-xl)] text-white/95 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands making smarter grocery choices every day. 
                Start your journey to healthier eating—no signup required.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/demo">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="bg-white text-[var(--primary-600)] border-white hover:bg-white/95 shadow-xl text-lg"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Try Demo Now — It's Free
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/pricing">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="ghost" 
                      size="lg"
                      className="text-white hover:bg-white/20 text-lg"
                    >
                      View Pricing
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-8 flex-wrap text-[var(--text-sm)] text-white/80">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Free Forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>No Credit Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Privacy First</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

// Mini Interactive Grocery Widget Component
function MiniGroceryWidget() {
  const [items, setItems] = useState<Array<{ id: number; name: string; quality: 'fresh' | 'moderate' | 'processed' }>>([]);
  const [freshRatio, setFreshRatio] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const sampleItems = [
    { id: 1, name: 'Organic Spinach', quality: 'fresh' as const },
    { id: 2, name: 'Greek Yogurt', quality: 'moderate' as const },
    { id: 3, name: 'Fresh Salmon', quality: 'fresh' as const },
  ];

  const addSampleItems = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setItems([]);
    setFreshRatio(0);

    // Add items one by one with delay
    sampleItems.forEach((item, index) => {
      setTimeout(() => {
        setItems(prev => [...prev, item]);
        
        // Calculate fresh ratio after adding item
        const totalItems = index + 1;
        const freshCount = sampleItems.slice(0, totalItems).filter(i => i.quality === 'fresh').length;
        const ratio = Math.round((freshCount / totalItems) * 100);
        setFreshRatio(ratio);

        if (index === sampleItems.length - 1) {
          setTimeout(() => setIsAnimating(false), 500);
        }
      }, index * 800);
    });
  };

  const reset = () => {
    setItems([]);
    setFreshRatio(0);
    setIsAnimating(false);
  };

  useEffect(() => {
    // Auto-play on mount
    const timer = setTimeout(() => addSampleItems(), 500);
    return () => clearTimeout(timer);
  }, []);

  const qualityColors = {
    fresh: { bg: 'bg-[var(--primary-50)]', border: 'border-[var(--primary-200)]', text: 'text-[var(--primary-700)]', badge: 'primary' },
    moderate: { bg: 'bg-[var(--accent-50)]', border: 'border-[var(--accent-200)]', text: 'text-[var(--accent-700)]', badge: 'accent' },
    processed: { bg: 'bg-[var(--secondary-50)]', border: 'border-[var(--secondary-200)]', text: 'text-[var(--secondary-700)]', badge: 'secondary' },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card variant="gradient" padding="xl" className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left: Mini List */}
          <div>
            <h4 className="text-[var(--text-lg)] font-semibold mb-4 flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-[var(--primary-600)]" />
              Sample Grocery List
            </h4>
            
            <div className="space-y-2 mb-6">
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    layout
                  >
                    <div className={`p-3 rounded-[var(--radius-lg)] border-2 ${qualityColors[item.quality].border} ${qualityColors[item.quality].bg} flex items-center justify-between`}>
                      <span className="font-medium">{item.name}</span>
                      <Badge variant={qualityColors[item.quality].badge as any} size="sm">
                        {item.quality === 'fresh' ? '🥬' : item.quality === 'moderate' ? '🍞' : '🍪'}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {items.length === 0 && (
                <div className="p-6 text-center text-[var(--text-secondary)] border-2 border-dashed border-[var(--neutral-200)] rounded-[var(--radius-lg)]">
                  Click "Try It" to see the magic ✨
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button 
                variant="primary" 
                size="sm" 
                fullWidth
                onClick={addSampleItems}
                disabled={isAnimating}
              >
                {items.length === 0 ? 'Try It' : 'Play Again'}
              </Button>
              {items.length > 0 && (
                <Button variant="ghost" size="sm" onClick={reset}>
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Right: Fresh Ratio Meter */}
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-[var(--text-lg)] font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[var(--accent-600)]" />
              Live Fresh Ratio
            </h4>

            {/* Circular Progress */}
            <div className="relative w-40 h-40">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="var(--neutral-200)"
                  strokeWidth="8"
                />
                
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#miniGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                  animate={{ 
                    strokeDashoffset: 2 * Math.PI * 40 * (1 - freshRatio / 100) 
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                
                <defs>
                  <linearGradient id="miniGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary-400)" />
                    <stop offset="100%" stopColor="var(--accent-500)" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.p
                  key={freshRatio}
                  initial={{ scale: 1.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl font-bold bg-gradient-to-br from-[var(--primary-600)] to-[var(--accent-600)] bg-clip-text text-transparent"
                >
                  {freshRatio}%
                </motion.p>
                <p className="text-[var(--text-xs)] text-[var(--text-secondary)]">Fresh</p>
              </div>
            </div>

            {items.length > 0 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center text-[var(--text-sm)] text-[var(--text-secondary)]"
              >
                {freshRatio >= 60 ? '🎉 Great choices!' : freshRatio >= 40 ? '👍 Good balance!' : '🥬 Try adding more fresh items'}
              </motion.p>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}