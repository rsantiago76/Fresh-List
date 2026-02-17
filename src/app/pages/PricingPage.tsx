import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Check, Sparkles, Zap, Crown, Loader2 } from 'lucide-react';
import { createCheckoutSession } from '../../utils/checkout';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out FreshList',
    icon: Sparkles,
    gradient: 'from-slate-500 to-slate-600',
    iconBg: 'bg-gradient-to-br from-slate-500 to-slate-600',
    features: [
      'Up to 20 items per list',
      'Basic Fresh Ratio tracking',
      'Category organization',
      'Mobile responsive',
      'Browser storage',
    ],
    cta: 'Try Demo',
    ctaVariant: 'outline' as const,
    ctaLink: '/demo',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: 'per month',
    description: 'For serious health-conscious shoppers',
    icon: Zap,
    gradient: 'from-emerald-500 to-lime-500',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-lime-500',
    features: [
      'Unlimited items',
      'Advanced analytics dashboard',
      '7-day trend tracking',
      'Smart suggestions & insights',
      'Cloud sync across devices',
      'Export to CSV',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    ctaVariant: 'primary' as const,
    ctaLink: '/demo',
    popular: true,
  },
  {
    name: 'Family',
    price: '$19',
    period: 'per month',
    description: 'Perfect for households',
    icon: Crown,
    gradient: 'from-purple-500 to-pink-500',
    iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
    features: [
      'Everything in Pro',
      'Up to 5 family members',
      'Shared grocery lists',
      'Recipe recommendations',
      'Meal planning tools',
      'Nutrition tracking',
      'Custom categories',
      'API access',
    ],
    cta: 'Start Free Trial',
    ctaVariant: 'outline' as const,
    ctaLink: '/demo',
    popular: false,
  },
];

const faqs = [
  {
    question: 'Can I switch plans later?',
    answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! Pro and Family plans come with a 14-day free trial. No credit card required.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and Apple Pay.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, you can cancel your subscription at any time. No questions asked.',
  },
];

export function PricingPage() {
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handlePlanClick = async (planName: string) => {
    const planId = planName.toLowerCase() as 'free' | 'pro' | 'family';
    
    // Free plan goes to demo
    if (planId === 'free') {
      navigate('/demo');
      return;
    }

    // Paid plans go to checkout
    setLoadingPlan(planId);
    
    try {
      const { url } = await createCheckoutSession(planId);
      navigate(url);
    } catch (error) {
      toast.error('Unable to start checkout. Please try again.');
      console.error('Checkout error:', error);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="primary" size="lg" dot className="mb-4">
              Simple, Transparent Pricing
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Start free, upgrade as you grow. All plans include our core features to help you build healthier grocery habits.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                    <Badge variant="primary" size="md">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card 
                  variant={plan.popular ? 'gradient' : 'bordered'} 
                  padding="lg"
                  className={`h-full ${plan.popular ? 'border-2 border-emerald-200 shadow-xl' : ''}`}
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${plan.iconBg} flex items-center justify-center text-white shadow-lg mb-6`}>
                    <plan.icon className="w-7 h-7" />
                  </div>

                  {/* Plan Info */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-4">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-5xl font-bold bg-gradient-to-br ${plan.gradient} bg-clip-text text-transparent`}>
                        {plan.price}
                      </span>
                      <span className="text-[var(--text-secondary)]">
                        /{plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-emerald-600" />
                        </div>
                        <span className="text-sm text-[var(--text-secondary)]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button 
                    variant={plan.ctaVariant} 
                    size="lg" 
                    fullWidth
                    onClick={() => handlePlanClick(plan.name)}
                    disabled={loadingPlan === plan.name.toLowerCase()}
                  >
                    {loadingPlan === plan.name.toLowerCase() ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      plan.cta
                    )}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-sm text-[var(--text-tertiary)] mb-4">
              Trusted by health-conscious shoppers worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-[var(--text-secondary)]">14-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-[var(--text-secondary)]">Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-[var(--text-secondary)]">Secure payment</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 px-6 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Everything you need to know about FreshList pricing
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Card variant="bordered" padding="lg">
                  <h4 className="text-lg font-semibold mb-2">{faq.question}</h4>
                  <p className="text-[var(--text-secondary)]">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-12 text-center"
          >
            <Card variant="gradient" padding="lg">
              <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                Our team is here to help you choose the right plan
              </p>
              <Button variant="primary" size="lg">
                Contact Sales
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}