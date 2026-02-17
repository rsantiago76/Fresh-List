// Mock Stripe checkout for demo purposes
// In production, this would call a real Stripe API endpoint

export interface CheckoutSession {
  id: string;
  plan: 'free' | 'pro' | 'family';
  amount: number;
  currency: string;
  status: 'pending' | 'complete' | 'canceled';
  createdAt: Date;
}

export const PLAN_PRICES = {
  free: 0,
  pro: 900, // $9.00 in cents
  family: 1900, // $19.00 in cents
} as const;

export const PLAN_DETAILS = {
  free: {
    name: 'FreshList Free',
    description: 'Perfect for individuals getting started',
    features: [
      'Track up to 50 items',
      'Basic Fresh Ratio tracking',
      'Mobile app access',
      'Email support',
    ],
  },
  pro: {
    name: 'FreshList Pro',
    description: 'Most popular for health-conscious individuals',
    features: [
      'Unlimited items',
      'Advanced analytics dashboard',
      'Smart meal planning',
      'Custom categories',
      'Recipe suggestions',
      'Priority support',
      'Export data (PDF/CSV)',
    ],
  },
  family: {
    name: 'FreshList Family',
    description: 'Best for families and shared shopping',
    features: [
      'Everything in Pro',
      'Up to 6 family members',
      'Shared grocery lists',
      'Individual preferences',
      'Budget tracking per person',
      'Family health insights',
      'Dedicated family support',
    ],
  },
} as const;

/**
 * Mock Stripe checkout session creation
 * In production, this would POST to /api/checkout
 */
export async function createCheckoutSession(
  plan: 'free' | 'pro' | 'family'
): Promise<{ url: string; sessionId: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (plan === 'free') {
    throw new Error('Free plan does not require checkout');
  }

  // Generate mock session ID
  const sessionId = `cs_demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Store session in localStorage for demo
  const session: CheckoutSession = {
    id: sessionId,
    plan,
    amount: PLAN_PRICES[plan],
    currency: 'usd',
    status: 'pending',
    createdAt: new Date(),
  };

  localStorage.setItem(`checkout_session_${sessionId}`, JSON.stringify(session));

  // In production, this would be the Stripe Checkout URL
  // For demo, we'll redirect to our mock checkout page
  const checkoutUrl = `/checkout?session_id=${sessionId}`;

  return {
    url: checkoutUrl,
    sessionId,
  };
}

/**
 * Complete a checkout session (simulates Stripe webhook)
 */
export function completeCheckoutSession(sessionId: string): CheckoutSession | null {
  const sessionData = localStorage.getItem(`checkout_session_${sessionId}`);
  
  if (!sessionData) {
    return null;
  }

  const session: CheckoutSession = JSON.parse(sessionData);
  session.status = 'complete';

  localStorage.setItem(`checkout_session_${sessionId}`, JSON.stringify(session));

  return session;
}

/**
 * Get checkout session by ID
 */
export function getCheckoutSession(sessionId: string): CheckoutSession | null {
  const sessionData = localStorage.getItem(`checkout_session_${sessionId}`);
  
  if (!sessionData) {
    return null;
  }

  return JSON.parse(sessionData);
}

/**
 * Format amount in cents to dollar string
 */
export function formatAmount(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
