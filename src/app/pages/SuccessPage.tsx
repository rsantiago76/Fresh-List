import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { 
  getCheckoutSession, 
  formatAmount,
  PLAN_DETAILS 
} from '../../utils/checkout';
import { 
  CheckCircle, 
  Download, 
  Mail, 
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  
  const [confettiDone, setConfettiDone] = useState(false);

  const session = sessionId ? getCheckoutSession(sessionId) : null;

  useEffect(() => {
    // Trigger confetti animation
    const timer = setTimeout(() => setConfettiDone(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Missing session ID
  if (!sessionId) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-8 h-8 text-orange-600" />
          <h1 className="text-3xl font-extrabold">Success</h1>
        </div>
        <p className="text-[var(--text-secondary)]">Missing session id.</p>
        <Button 
          variant="primary" 
          className="mt-6"
          onClick={() => navigate('/pricing')}
        >
          Back to Pricing
        </Button>
      </div>
    );
  }

  // Session not found or incomplete
  if (!session || session.status !== 'complete') {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-8 h-8 text-orange-600" />
          <h1 className="text-3xl font-extrabold">Order Not Found</h1>
        </div>
        <p className="text-[var(--text-secondary)] mb-6">
          We couldn't find your order. Please check your email or contact support.
        </p>
        <Button 
          variant="primary"
          onClick={() => navigate('/pricing')}
        >
          Back to Pricing
        </Button>
      </div>
    );
  }

  const planDetails = PLAN_DETAILS[session.plan];

  return (
    <div className="min-h-screen py-12 px-6 relative overflow-hidden">
      
      {/* Animated Background Elements - Confetti */}
      {!confettiDone && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: ['#10b981', '#84cc16', '#f59e0b', '#ec4899'][i % 4],
                left: `${Math.random() * 100}%`,
                top: -20,
              }}
              animate={{
                y: window.innerHeight + 100,
                x: [0, Math.random() * 200 - 100],
                rotate: 360,
                opacity: [1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}

      <div className="mx-auto max-w-2xl relative z-10">
        
        {/* Success Header */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-full flex items-center justify-center shadow-xl">
              <CheckCircle className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold">Payment successful ✅</h1>
          </div>

          <p className="text-lg text-[var(--text-secondary)]">
            Thanks! We received your payment for <strong>{planDetails.name}</strong>.
          </p>
        </motion.div>

        {/* Session Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="rounded-2xl border-2 border-[var(--neutral-200)] bg-white p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-[var(--text-tertiary)] mb-1">Session ID</div>
                <div className="font-mono text-sm text-[var(--text-secondary)] break-all">
                  {session.id}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-[var(--text-tertiary)] mb-1">Payment Status</div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full border border-emerald-200">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {session.status === 'complete' ? 'paid' : session.status}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-sm text-[var(--text-tertiary)] mb-1">Plan</div>
                <div className="text-sm font-medium capitalize">{session.plan}</div>
              </div>

              <div>
                <div className="text-sm text-[var(--text-tertiary)] mb-1">Amount</div>
                <div className="text-lg font-bold text-emerald-600">
                  {formatAmount(session.amount)}
                </div>
              </div>
            </div>

            {/* Demo Notice */}
            <div className="mt-6 pt-6 border-t border-[var(--neutral-200)]">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <span className="text-xl">ℹ️</span>
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-1">Demo Mode</p>
                  <p className="text-blue-700">
                    This is a simulated checkout. In production, this would retrieve real session data from Stripe's API using{' '}
                    <code className="px-1.5 py-0.5 bg-blue-100 rounded text-xs font-mono">
                      stripe.checkout.sessions.retrieve()
                    </code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What's Included */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Card variant="gradient" padding="lg">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              What's Included in {planDetails.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {planDetails.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.05 }}
                  className="flex items-start gap-2 p-3 bg-white rounded-xl border border-[var(--primary-200)]"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <Card variant="bordered" padding="md">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Check Your Email</h4>
                <p className="text-xs text-[var(--text-secondary)]">
                  Confirmation sent to your inbox
                </p>
              </div>
            </div>
          </Card>

          <Card variant="bordered" padding="md">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Download className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Get Mobile App</h4>
                <p className="text-xs text-[var(--text-secondary)]">
                  Available on iOS and Android
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => navigate('/demo')}
          >
            <Sparkles className="w-5 h-5" />
            Start Building Your List
            <ArrowRight className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => navigate('/dashboard')}
          >
            View Dashboard
          </Button>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-[var(--text-secondary)]">
            Need help?{' '}
            <button className="text-emerald-600 font-medium hover:underline">
              Contact Support
            </button>{' '}
            or view our{' '}
            <button className="text-emerald-600 font-medium hover:underline">
              Getting Started Guide
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}