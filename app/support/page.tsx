import React from 'react';
import Link from 'next/link';

const SupportPage = () => {
  // Mock data for support options
  const supportOptions = [
    {
      title: 'Documentation',
      description: 'Comprehensive guides, API references, and examples to help you integrate and use Circuit API.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      link: '/docs',
      linkText: 'Browse Documentation'
    },
    {
      title: 'FAQ',
      description: 'Find answers to commonly asked questions about Circuit API, pricing, integration, and more.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      link: '/faq',
      linkText: 'View FAQ'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other developers, share knowledge, and get help from the Circuit API community.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      link: '/community/forum',
      linkText: 'Join the Community'
    },
    {
      title: 'Email Support',
      description: 'Contact our support team directly for personalized assistance with your integration.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      link: 'mailto:support@circuitapi.com',
      linkText: 'Email Support'
    },
    {
      title: 'Status Page',
      description: 'Check the current status of Circuit API services and view incident history.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      link: '/status',
      linkText: 'View Status'
    },
    {
      title: 'Developer Discord',
      description: 'Join our Discord server for real-time support, discussions, and community events.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      link: 'https://discord.gg/circuitapi',
      linkText: 'Join Discord'
    }
  ];

  // Mock data for support plans
  const supportPlans = [
    {
      name: 'Community',
      price: 'Free',
      description: 'Basic support for developers getting started with Circuit API.',
      features: [
        'Access to documentation',
        'Community forum support',
        'Email support (48-hour response time)',
        'Status page updates'
      ],
      cta: 'Get Started',
      ctaLink: '/signup',
      highlighted: false
    },
    {
      name: 'Developer',
      price: '$99',
      period: 'per month',
      description: 'Enhanced support for professional developers and small teams.',
      features: [
        'All Community features',
        'Priority email support (24-hour response time)',
        'Discord channel access',
        'Monthly office hours',
        'Implementation guidance'
      ],
      cta: 'Upgrade Now',
      ctaLink: '/pricing',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Dedicated support for large-scale implementations and mission-critical applications.',
      features: [
        'All Developer features',
        'Dedicated support engineer',
        'Slack channel access',
        'Phone support',
        '4-hour response time SLA',
        'Custom implementation assistance',
        'Quarterly business reviews'
      ],
      cta: 'Contact Sales',
      ctaLink: '/contact',
      highlighted: false
    }
  ];

  return (
    <div className="bg-gradient-to-b from-[#2D0B5A] to-[#1B0B3B] min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            We're Here to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">Help</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-purple-100">
            Get the support you need to succeed with Circuit API.
          </p>
        </div>

        {/* Support Options */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8">Support Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <div key={index} className="bg-[#1F0940] rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                <div className="h-16 w-16 rounded-lg bg-[#2D0B5A] flex items-center justify-center mb-4 text-[#FF6B6B]">
                  {option.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{option.title}</h3>
                <p className="text-purple-100 mb-6">{option.description}</p>
                <Link 
                  href={option.link}
                  className="inline-flex items-center text-[#FF6B6B] hover:text-[#FFE66D] font-medium transition-colors duration-300"
                >
                  {option.linkText}
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-24 bg-[#1F0940] rounded-xl overflow-hidden border border-purple-500/20">
          <div className="lg:flex">
            <div className="lg:w-1/2 p-8 lg:p-12">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Support</h2>
              <p className="text-purple-100 mb-8">
                Can't find what you're looking for? Our support team is ready to assist you. Fill out the form and we'll get back to you as soon as possible.
              </p>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-purple-100">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full px-4 py-2 rounded-md border-purple-500/30 bg-[#1B0B3B] text-purple-100 focus:border-[#FF6B6B] focus:ring-[#FF6B6B]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-purple-100">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full px-4 py-2 rounded-md border-purple-500/30 bg-[#1B0B3B] text-purple-100 focus:border-[#FF6B6B] focus:ring-[#FF6B6B]"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-purple-100">Subject</label>
                  <select
                    id="subject"
                    className="mt-1 block w-full px-4 py-2 rounded-md border-purple-500/30 bg-[#1B0B3B] text-purple-100 focus:border-[#FF6B6B] focus:ring-[#FF6B6B]"
                  >
                    <option>Technical Support</option>
                    <option>Account & Billing</option>
                    <option>API Integration</option>
                    <option>Feature Request</option>
                    <option>Bug Report</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-purple-100">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="mt-1 block w-full px-4 py-2 rounded-md border-purple-500/30 bg-[#1B0B3B] text-purple-100 focus:border-[#FF6B6B] focus:ring-[#FF6B6B]"
                    placeholder="Describe your issue or question in detail..."
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-[#1B0B3B] bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] hover:from-[#FFE66D] hover:to-[#FF6B6B] transition-all duration-300"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
            <div className="lg:w-1/2 bg-[#2D0B5A] p-8 lg:p-12">
              <h2 className="text-2xl font-bold text-white mb-6">Support Hours</h2>
              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="text-lg font-medium text-white">Email Support</h3>
                  <p className="text-purple-100">Monday - Friday: 9am - 6pm ET</p>
                  <p className="text-purple-100">Weekend: Limited coverage for urgent issues</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Live Chat</h3>
                  <p className="text-purple-100">Monday - Friday: 10am - 4pm ET</p>
                  <p className="text-purple-100">Available for Developer and Enterprise plans</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Phone Support</h3>
                  <p className="text-purple-100">Monday - Friday: 9am - 5pm ET</p>
                  <p className="text-purple-100">Available for Enterprise plans only</p>
                </div>
              </div>
              <div className="border-t border-purple-500/20 pt-8">
                <h3 className="text-lg font-medium text-white mb-4">Emergency Support</h3>
                <p className="text-purple-100 mb-4">
                  For critical production issues outside of regular support hours, Enterprise customers can use our emergency support line:
                </p>
                <a href="tel:+18005551234" className="text-[#FF6B6B] hover:text-[#FFE66D] font-medium">+1 (800) 555-1234</a>
              </div>
            </div>
          </div>
        </div>

        {/* Support Plans */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Support Plans</h2>
            <p className="text-purple-100 max-w-2xl mx-auto">
              Choose the support plan that best fits your needs and budget.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-[#1F0940] rounded-xl overflow-hidden border ${
                  plan.highlighted 
                    ? 'border-[#FF6B6B] shadow-lg shadow-[#FF6B6B]/10' 
                    : 'border-purple-500/20'
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] py-1 px-4 text-center">
                    <span className="text-sm font-bold text-[#1F0940]">Most Popular</span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="ml-2 text-sm text-purple-100">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-purple-100 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6B6B] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-purple-100">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.ctaLink}
                    className={`block w-full text-center px-6 py-3 rounded-md font-medium ${
                      plan.highlighted
                        ? 'text-[#1B0B3B] bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] hover:from-[#FFE66D] hover:to-[#FF6B6B]'
                        : 'text-white border border-purple-500/50 hover:bg-[#2D0B5A]'
                    } transition-all duration-300`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Support Questions</h2>
            <p className="text-purple-100 max-w-2xl mx-auto mb-12">
              Quick answers to common support-related questions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'What are your support hours?',
                answer: 'Our standard support hours are Monday through Friday, 9am to 6pm Eastern Time. Enterprise customers have access to extended support hours and emergency support.'
              },
              {
                question: 'How quickly will I receive a response?',
                answer: 'Response times vary by support plan. Community plan users can expect responses within 48 hours, Developer plan within 24 hours, and Enterprise plan within 4 hours for critical issues.'
              },
              {
                question: 'Do you offer implementation assistance?',
                answer: 'Yes, implementation guidance is available for Developer plan subscribers, and Enterprise customers receive custom implementation assistance from a dedicated support engineer.'
              },
              {
                question: 'Can I upgrade my support plan later?',
                answer: 'Yes, you can upgrade your support plan at any time. The new plan and benefits will take effect immediately upon upgrade.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-[#1F0940] rounded-xl p-6 border border-purple-500/20">
                <h3 className="text-xl font-bold text-white mb-3">{item.question}</h3>
                <p className="text-purple-100">{item.answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center text-[#FF6B6B] hover:text-[#FFE66D] font-medium"
            >
              View all FAQs
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage; 