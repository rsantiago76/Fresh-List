import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { 
  getCheckoutSession, 
  completeCheckoutSession, 
  formatAmount,
  PLAN_DETAILS 
} from '../../utils/checkout';
import { 
  CreditCard, 
  Lock, 
  CheckCircle, 
  ArrowLeft,
  Loader2 
} from 'lucide-react';

export function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const session = sessionId ? getCheckoutSession(sessionId) : null;

  useEffect(() => {
    // Simulate loading checkout session
    const timer = setTimeout(() => {
      if (!sessionId || !session) {
        setError('Invalid checkout session');
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [sessionId, session]);

  const handlePayment = async () => {
    if (!sessionId || !session) return;

    setProcessing(true);

    // Simulate payment processing (2-3 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Complete the session
    completeCheckoutSession(sessionId);

    // Redirect to success page
    navigate(`/success?session_id=${sessionId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-[var(--text-secondary)]">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <Card variant="bordered" padding="xl" className="max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">❌</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Checkout Error</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              {error || 'Something went wrong. Please try again.'}
            </p>
            <Button variant="primary" onClick={() => navigate('/pricing')}>
              Back to Pricing
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const planDetails = PLAN_DETAILS[session.plan];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/pricing')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Pricing
          </Button>

          <div className="flex items-center gap-3 mb-2">
            <Lock className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-600">Secure Checkout</span>
          </div>
          <h1 className="mb-2">Complete Your Purchase</h1>
          <p className="text-[var(--text-secondary)] text-lg">
            You're subscribing to {planDetails.name}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left - Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card variant="bordered" padding="xl">
              
              {/* Demo Notice */}
              <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎭</span>
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-1">Demo Mode</h4>
                    <p className="text-sm text-amber-800">
                      This is a demo checkout. No real payment will be processed. 
                      Click "Complete Purchase" to see the success flow.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mock Payment Form */}
              <div className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-[var(--text-secondary)]">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    defaultValue="demo@freshlist.com"
                    disabled={processing}
                    className="w-full h-12 px-4 bg-white border-2 border-[var(--neutral-200)] rounded-xl 
                    transition-all duration-250 focus:outline-none focus:border-emerald-500 focus:ring-4 
                    focus:ring-emerald-100 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-[var(--text-secondary)]">
                    Card Information
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      defaultValue="4242 4242 4242 4242"
                      disabled={processing}
                      className="w-full h-12 px-4 pl-12 bg-white border-2 border-[var(--neutral-200)] rounded-xl 
                      transition-all duration-250 focus:outline-none focus:border-emerald-500 focus:ring-4 
                      focus:ring-emerald-100 disabled:opacity-50"
                    />
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-[var(--text-secondary)]">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      defaultValue="12 / 28"
                      disabled={processing}
                      className="w-full h-12 px-4 bg-white border-2 border-[var(--neutral-200)] rounded-xl 
                      transition-all duration-250 focus:outline-none focus:border-emerald-500 focus:ring-4 
                      focus:ring-emerald-100 disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-[var(--text-secondary)]">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      defaultValue="123"
                      disabled={processing}
                      className="w-full h-12 px-4 bg-white border-2 border-[var(--neutral-200)] rounded-xl 
                      transition-all duration-250 focus:outline-none focus:border-emerald-500 focus:ring-4 
                      focus:ring-emerald-100 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-[var(--text-secondary)]">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    defaultValue="Demo User"
                    disabled={processing}
                    className="w-full h-12 px-4 bg-white border-2 border-[var(--neutral-200)] rounded-xl 
                    transition-all duration-250 focus:outline-none focus:border-emerald-500 focus:ring-4 
                    focus:ring-emerald-100 disabled:opacity-50"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handlePayment}
                  disabled={processing}
                  className="mt-8"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Complete Purchase
                    </>
                  )}
                </Button>

                {/* Security Notice */}
                <div className="flex items-center justify-center gap-2 text-xs text-[var(--text-tertiary)] pt-4">
                  <Lock className="w-3 h-3" />
                  <span>Secured by Stripe • 256-bit SSL encryption</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right - Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="gradient" padding="lg" className="sticky top-24">
              <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

              {/* Plan Details */}
              <div className="mb-6 p-4 bg-white rounded-xl border-2 border-[var(--primary-200)]">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-base">{planDetails.name}</h4>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      Monthly subscription
                    </p>
                  </div>
                  <span className="text-lg font-bold text-emerald-600">
                    {formatAmount(session.amount)}
                  </span>
                </div>

                {/* Features included */}
                <div className="pt-3 border-t border-[var(--neutral-200)]">
                  <p className="text-xs font-medium text-[var(--text-secondary)] mb-2">
                    Includes:
                  </p>
                  <ul className="space-y-1.5">
                    {planDetails.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="text-[var(--text-secondary)]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-[var(--neutral-200)]">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Subtotal</span>
                  <span className="font-medium">{formatAmount(session.amount)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Tax</span>
                  <span className="font-medium">$0.00</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-semibold">Total due today</span>
                <span className="text-2xl font-bold text-emerald-600">
                  {formatAmount(session.amount)}
                </span>
              </div>

              {/* Benefits */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-xl">
                  <span className="text-xl">✨</span>
                  <div>
                    <p className="text-xs font-medium text-emerald-900">Cancel Anytime</p>
                    <p className="text-xs text-emerald-700 mt-0.5">No long-term commitment</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                  <span className="text-xl">🎯</span>
                  <div>
                    <p className="text-xs font-medium text-blue-900">30-Day Money Back</p>
                    <p className="text-xs text-blue-700 mt-0.5">Full refund guarantee</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl">
                  <span className="text-xl">⚡</span>
                  <div>
                    <p className="text-xs font-medium text-purple-900">Instant Access</p>
                    <p className="text-xs text-purple-700 mt-0.5">Start using immediately</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
