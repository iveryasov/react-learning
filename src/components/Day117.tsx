import { useState } from 'react';
import './Day117.css';

// SaaS Subscription & Billing Card

function Day117() {
    type Plan = 'Free' | 'Pro' | 'Enterprise';

    const [plan, setPlan] = useState<Plan>('Free');
    const [isYearly, setIsYearly] = useState<boolean>(false);
    const [isAutoRenew, setIsAutoRenew] = useState<boolean>(true);

  return (
    <div>
        <div className={plan === 'Free' ? 'badge-free' : plan === 'Pro' ? 'badge-pro' : 'badge-premium'}>
            <p>Your current plan: {plan}</p>
            {plan === 'Free' ? null : (
                <div>
                    <p>Plan type: {isYearly === true ? 'Yearly' : 'Monthly'}</p>
                    <p>Auto-renew: {isAutoRenew === true ? 'Active 🟢' : 'Paused ⏸️'}</p>
                    <button onClick={() => setIsAutoRenew(!isAutoRenew)}>Auto-renew</button>
                </div>
            )}
        </div>
        <div>
            {plan === 'Free' ? null : plan === 'Pro' ? (
                <div>
                    <button onClick={() => setIsYearly(true)}>Yearly $290/yr. 20% discount</button>
                    <button onClick={() => setIsYearly(false)}>Monthly $29/mo</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => setIsYearly(true)}>Yearly $990/yr</button>
                    <button onClick={() => setIsYearly(false)}>Monthly $99/mo</button>
                </div>
            )}
        </div>
        <div>
            <button onClick={() => setPlan('Free')}>Switch to Free</button>
            <button onClick={() => setPlan('Pro')}>Switch to Pro</button>
            <button onClick={() => setPlan('Enterprise')}>Switch to Enterprise</button>
        </div>
    </div>
  );
}

export default Day117;