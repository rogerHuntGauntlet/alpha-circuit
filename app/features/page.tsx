import React from 'react';
import Link from 'next/link';

const FeaturesPage = () => {
  const features = [
    {
      title: 'AI-Powered Matchmaking',
      description: 'Our advanced algorithms use machine learning to create balanced, enjoyable matches that keep players engaged.',
      icon: (
        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      benefits: [
        'Skill-based matching with customizable parameters',
        'Team balancing for competitive play',
        'Personality and play-style compatibility',
        'Continuous learning from match outcomes'
      ]
    },
    {
      title: 'Global Infrastructure',
      description: 'Deploy matches in optimal regions with our globally distributed infrastructure designed for low latency and high reliability.',
      icon: (
        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      benefits: [
        'Servers in 15+ regions worldwide',
        'Automatic region selection based on player latency',
        'Cross-region matchmaking with latency balancing',
        '99.99% uptime SLA for enterprise customers'
      ]
    },
    {
      title: 'Comprehensive Analytics',
      description: 'Gain deep insights into your matchmaking performance with detailed analytics and reporting tools.',
      icon: (
        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      benefits: [
        'Real-time match quality metrics',
        'Player satisfaction tracking',
        'Customizable dashboards and reports',
        'Anomaly detection and alerts'
      ]
    },
    {
      title: 'Flexible Integration',
      description: 'Integrate with any game or platform using our RESTful API and comprehensive SDKs.',
      icon: (
        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      benefits: [
        'SDKs for Unity, Unreal, and major programming languages',
        'Webhook support for event-driven architectures',
        'Customizable match rules and parameters',
        'Seamless integration with existing game servers'
      ]
    },
    {
      title: 'Advanced Security',
      description: 'Protect your players and data with enterprise-grade security features built into our platform.',
      icon: (
        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      benefits: [
        'DDoS protection and rate limiting',
        'End-to-end encryption for sensitive data',
        'Compliance with GDPR, CCPA, and other regulations',
        'Regular security audits and penetration testing'
      ]
    },
    {
      title: 'Scalable Architecture',
      description: 'Our platform scales automatically to handle any number of concurrent players, from indie games to AAA titles.',
      icon: (
        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      benefits: [
        'Handles millions of concurrent players',
        'Automatic scaling based on demand',
        'No infrastructure management required',
        'Cost-effective with pay-as-you-go pricing'
      ]
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#2D0B5A] to-[#1B0B3B] min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">Features</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-purple-100">
            Everything you need to build exceptional matchmaking experiences for your players.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-20 space-y-24">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}
            >
              <div className="w-full md:w-1/2">
                <div className="bg-[#1F0940] rounded-xl p-8 border border-purple-500/20 h-full">
                  <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">
                    {feature.icon}
                  </div>
                  <h2 className="mt-6 text-3xl font-bold text-white">{feature.title}</h2>
                  <p className="mt-4 text-lg text-purple-100">{feature.description}</p>
                  <ul className="mt-6 space-y-3">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start">
                        <svg className="h-6 w-6 text-[#4ECB71] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="ml-3 text-purple-100">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="bg-[#1F0940]/50 rounded-xl aspect-video overflow-hidden relative border border-purple-500/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] flex items-center justify-center">
                      <div className="text-4xl font-bold text-[#1F0940]">{index + 1}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-white text-center">Compare with Alternatives</h2>
          <p className="mt-4 text-lg text-purple-100 text-center max-w-3xl mx-auto">
            See how Circuit stacks up against building your own matchmaking system or using other solutions.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="min-w-full bg-[#1F0940] rounded-xl border border-purple-500/20">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-purple-100 uppercase tracking-wider border-b border-purple-500/20">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-purple-100 uppercase tracking-wider border-b border-purple-500/20">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">Circuit API</span>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-purple-100 uppercase tracking-wider border-b border-purple-500/20">Build Your Own</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-purple-100 uppercase tracking-wider border-b border-purple-500/20">Other Solutions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/20">
                {[
                  { feature: 'Setup Time', circuit: 'Hours', buildOwn: 'Months', other: 'Weeks' },
                  { feature: 'AI-Powered Matching', circuit: '✓', buildOwn: 'Limited', other: 'Varies' },
                  { feature: 'Global Infrastructure', circuit: '✓', buildOwn: 'Requires Setup', other: 'Limited' },
                  { feature: 'Scalability', circuit: 'Unlimited', buildOwn: 'Manual Scaling', other: 'Capped' },
                  { feature: 'Maintenance Required', circuit: 'None', buildOwn: 'Significant', other: 'Moderate' },
                  { feature: 'Cost', circuit: 'Pay-as-you-go', buildOwn: 'High Fixed + Variable', other: 'High Fixed' },
                  { feature: 'Analytics', circuit: 'Comprehensive', buildOwn: 'Custom Built', other: 'Basic' },
                ].map((row) => (
                  <tr key={row.feature} className="hover:bg-purple-500/10">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{row.feature}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100 text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">{row.circuit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100 text-center">{row.buildOwn}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100 text-center">{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-white text-center">What Our Customers Say</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote: "Circuit's API saved us months of development time. Our players are happier with more balanced matches, and we can focus on making our game better.",
                author: "Jane Smith",
                role: "CTO at GameStudio",
                company: "Battle Arena"
              },
              {
                quote: "The analytics alone are worth the price. We've been able to fine-tune our matchmaking parameters based on real data, leading to a 15% increase in player retention.",
                author: "Michael Johnson",
                role: "Lead Engineer",
                company: "Cosmic Clash"
              },
              {
                quote: "We switched from our custom solution to Circuit and immediately saw improvements in match quality and server costs. The integration was seamless.",
                author: "Sarah Williams",
                role: "Product Manager",
                company: "Epic Games Inc."
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-[#1F0940] rounded-xl p-8 border border-purple-500/20">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] flex items-center justify-center">
                    <span className="text-xl font-bold text-[#1F0940]">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="text-white font-bold">{testimonial.author}</p>
                    <p className="text-purple-100 text-sm">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-purple-100 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to get started?</h2>
          <p className="mt-4 text-lg text-purple-100 max-w-2xl mx-auto">
            Join thousands of game developers who are building better matchmaking experiences with Circuit.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/docs"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#1F0940] bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] hover:from-[#FFE66D] hover:to-[#FF6B6B] transition-all duration-300"
            >
              Read the Docs
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center px-6 py-3 border border-purple-500/50 text-base font-medium rounded-md text-white hover:bg-[#2D0B5A] transition-all duration-300"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage; 