import React from 'react';
import Link from 'next/link';

const PricingPage = () => {
  const pricingTiers = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for testing and development',
      features: [
        '10,000 API calls per month',
        'Basic matchmaking algorithms',
        'Single region support',
        'Community support',
        '99.5% uptime SLA',
      ],
      cta: 'Get Started',
      ctaLink: '/api/auth/signin',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$99',
      period: 'per month',
      description: 'For growing games and studios',
      features: [
        '1 million API calls per month',
        'Advanced AI matchmaking',
        'Multi-region support',
        'Email support',
        '99.9% uptime SLA',
        'Detailed analytics',
        'Custom parameters',
      ],
      cta: 'Start Free Trial',
      ctaLink: '/api/auth/signin?plan=pro',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large-scale games and studios',
      features: [
        'Unlimited API calls',
        'Premium AI matchmaking',
        'Global region support',
        'Dedicated support',
        '99.99% uptime SLA',
        'Advanced analytics',
        'Custom integration',
        'Dedicated infrastructure',
      ],
      cta: 'Contact Sales',
      ctaLink: '/contact',
      highlighted: false,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#2D0B5A] to-[#1B0B3B] min-h-screen pt-24 pb-16">
      {/* Navigation is in the layout */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Simple, Transparent{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">
              Pricing
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-purple-100">
            Choose the plan that's right for your game. All plans include access to our core API.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.name}
              className={`relative rounded-2xl ${
                tier.highlighted 
                  ? 'bg-gradient-to-br from-[#FF6B6B] to-[#FFE66D] p-[2px]' 
                  : 'border border-purple-500/20'
              }`}
            >
              <div className="h-full rounded-2xl bg-[#1F0940] p-8 flex flex-col">
                <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="ml-1 text-xl text-purple-100">/{tier.period}</span>
                  )}
                </div>
                <p className="mt-2 text-purple-100">{tier.description}</p>
                
                <ul className="mt-6 space-y-4 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <svg className="h-6 w-6 text-[#4ECB71] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-purple-100">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <Link
                    href={tier.ctaLink}
                    className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md ${
                      tier.highlighted
                        ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] text-[#1F0940] hover:from-[#FFE66D] hover:to-[#FF6B6B]'
                        : 'bg-[#1F0940] text-white border border-purple-500/50 hover:bg-[#2D0B5A]'
                    } transition-all duration-300`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[#1F0940]/50 rounded-xl p-8 border border-purple-500/20">
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {[
              {
                question: 'How do I calculate my API usage?',
                answer: 'API usage is calculated based on the number of matchmaking requests made to our API. Each request counts as one API call, regardless of the complexity of the matchmaking algorithm used.'
              },
              {
                question: 'Can I upgrade or downgrade my plan?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
              },
              {
                question: 'Do you offer a free trial?',
                answer: 'Yes, all paid plans come with a 14-day free trial. No credit card required to start.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.'
              },
            ].map((faq) => (
              <div key={faq.question} className="border-b border-purple-500/20 pb-4">
                <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                <p className="mt-2 text-purple-100">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white">Need a custom solution?</h2>
          <p className="mt-4 text-purple-100 max-w-2xl mx-auto">
            Our team can work with you to create a custom plan that fits your specific needs.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#1F0940] bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] hover:from-[#FFE66D] hover:to-[#FF6B6B] transition-all duration-300"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage; 