import React from 'react';
import Link from 'next/link';

const FAQPage = () => {
  // Mock data for FAQ categories and questions
  const faqCategories = [
    {
      id: 'general',
      name: 'General',
      questions: [
        {
          id: 'what-is-circuit',
          question: 'What is Circuit API?',
          answer: 'Circuit API is a powerful matchmaking API service designed specifically for gaming applications. It uses AI-powered algorithms to create balanced, enjoyable matches that keep players engaged. Our API handles all the complex matchmaking logic so you can focus on building great games.'
        },
        {
          id: 'how-does-it-work',
          question: 'How does Circuit API work?',
          answer: 'Circuit API works by analyzing player data that you send to our service, including skill levels, play styles, preferences, and other factors. Our AI algorithms then create optimal matches based on your specified parameters. The API returns match results quickly, allowing you to group players together for the best possible gaming experience.'
        },
        {
          id: 'who-uses-circuit',
          question: 'Who uses Circuit API?',
          answer: 'Circuit API is used by game developers of all sizes, from indie studios to major gaming companies. Our clients include developers of competitive multiplayer games, MMOs, battle royale games, team-based shooters, and any other games that require matching players together.'
        },
        {
          id: 'why-use-circuit',
          question: 'Why should I use Circuit API instead of building my own matchmaking system?',
          answer: 'Building a sophisticated matchmaking system from scratch requires significant time, expertise, and resources. Circuit API provides a ready-made solution that offers advanced AI-powered matching, global infrastructure, comprehensive analytics, and continuous improvements. This allows you to focus on your core game development while providing your players with a superior matchmaking experience.'
        }
      ]
    },
    {
      id: 'technical',
      name: 'Technical',
      questions: [
        {
          id: 'integration',
          question: 'How do I integrate Circuit API with my game?',
          answer: 'Integration is straightforward with our comprehensive SDKs for Unity, Unreal Engine, and all major programming languages. Our documentation provides step-by-step guides, code examples, and best practices. Most developers can implement basic matchmaking functionality in just a few hours.'
        },
        {
          id: 'data-required',
          question: 'What data do I need to send to the API?',
          answer: 'At minimum, you need to send a unique player ID and any matchmaking criteria you want to use (skill rating, region, game mode, etc.). For more sophisticated matching, you can send additional data like player history, preferences, play style metrics, and social connections. Our API is flexible and can work with whatever player data you have available.'
        },
        {
          id: 'response-time',
          question: 'What is the typical response time?',
          answer: 'Circuit API is designed for speed, with typical response times under 100ms globally. Response times may vary slightly based on the complexity of your matching criteria and the size of your player pool, but our infrastructure is optimized to provide fast results even for complex scenarios.'
        },
        {
          id: 'security',
          question: 'How secure is my data?',
          answer: 'Security is a top priority for us. All data is encrypted in transit and at rest. We use industry-standard authentication methods, and our infrastructure undergoes regular security audits. We are compliant with GDPR, CCPA, and other relevant regulations. We also provide detailed documentation on best practices for securing your integration.'
        },
        {
          id: 'customization',
          question: 'Can I customize the matchmaking algorithms?',
          answer: 'Yes, Circuit API offers extensive customization options. You can adjust weights for different matching factors, set specific rules and constraints, define your own skill rating systems, and even create custom matching logic for unique game modes. Our advanced tier also offers the ability to train custom AI models based on your specific player data and game dynamics.'
        }
      ]
    },
    {
      id: 'pricing',
      name: 'Pricing & Plans',
      questions: [
        {
          id: 'pricing-model',
          question: 'How is Circuit API priced?',
          answer: 'Circuit API uses a tiered pricing model based on the number of API calls (matches) per month. We offer a free tier for development and small games, and several paid tiers for games with larger player bases. Custom enterprise plans are available for games with very high volumes. Visit our pricing page for detailed information on all plans and features.'
        },
        {
          id: 'free-tier',
          question: 'Is there a free tier?',
          answer: 'Yes, we offer a generous free tier that includes up to 10,000 matches per month, basic analytics, and access to our standard matching algorithms. This is perfect for development, testing, and small indie games. The free tier does not expire, but it has some feature limitations compared to our paid plans.'
        },
        {
          id: 'contract',
          question: 'Do I need to sign a long-term contract?',
          answer: 'No, our standard plans are billed monthly with no long-term commitment required. You can upgrade, downgrade, or cancel at any time. For enterprise customers, we do offer annual contracts with volume discounts if preferred.'
        },
        {
          id: 'overage',
          question: 'What happens if I exceed my plan limits?',
          answer: 'If you exceed your monthly match limit, you will be charged for overages at the rate specified in your plan. We provide monitoring tools and alerts to help you track your usage and avoid unexpected charges. You can also set hard limits to prevent overages entirely, though this may impact your ability to create matches if limits are reached.'
        }
      ]
    },
    {
      id: 'support',
      name: 'Support & SLA',
      questions: [
        {
          id: 'support-options',
          question: 'What support options are available?',
          answer: 'All plans include access to our comprehensive documentation, community forums, and email support. Paid plans also include priority email support with faster response times. Our higher-tier plans offer dedicated Slack channels and direct access to our engineering team. Enterprise plans include 24/7 support and a dedicated account manager.'
        },
        {
          id: 'sla',
          question: 'What is your uptime SLA?',
          answer: 'We offer a 99.9% uptime SLA for all paid plans, with financial credits if we fail to meet this commitment. Enterprise plans include a 99.99% uptime SLA. Our infrastructure is designed for high availability with redundancy across multiple regions and automatic failover systems.'
        },
        {
          id: 'maintenance',
          question: 'How do you handle maintenance and updates?',
          answer: 'We perform most maintenance and updates with zero downtime. For any scheduled maintenance that might impact service, we provide at least 7 days advance notice through our status page, email notifications, and in-dashboard alerts. Maintenance is typically scheduled during low-usage hours and designed to minimize any potential disruption.'
        },
        {
          id: 'api-changes',
          question: 'How do you handle API changes and versioning?',
          answer: 'We follow semantic versioning principles and maintain backward compatibility within major versions. When we introduce new features, they are added in a non-breaking way. For any breaking changes, we provide a minimum of 6 months notice and detailed migration guides. We support multiple API versions simultaneously to give you ample time to update your integration.'
        }
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-b from-[#2D0B5A] to-[#1B0B3B] min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">Questions</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-purple-100">
            Find answers to common questions about Circuit API.
          </p>
        </div>

        {/* Search */}
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full px-4 py-3 rounded-md border-purple-500/30 bg-[#1B0B3B] text-purple-100 focus:border-[#FF6B6B] focus:ring-[#FF6B6B] pl-10"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-2">
            {faqCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="px-4 py-2 rounded-full text-sm font-medium bg-[#1F0940] text-purple-100 hover:bg-[#2D0B5A] border border-purple-500/20 transition-all duration-300"
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="mt-16 space-y-16">
          {faqCategories.map((category) => (
            <div key={category.id} id={category.id} className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                <span className="h-8 w-8 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] flex items-center justify-center mr-3">
                  <span className="text-sm font-bold text-[#1F0940]">{category.name.charAt(0)}</span>
                </span>
                {category.name} Questions
              </h2>
              <div className="space-y-6">
                {category.questions.map((item) => (
                  <div key={item.id} className="bg-[#1F0940] rounded-xl p-6 border border-purple-500/20">
                    <h3 className="text-xl font-bold text-white mb-3">{item.question}</h3>
                    <p className="text-purple-100">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-24 bg-[#1F0940] rounded-xl p-8 md:p-12 border border-purple-500/20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h2>
            <p className="text-purple-100 max-w-2xl mx-auto mb-8">
              If you couldn't find the answer you were looking for, our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-[#1B0B3B] bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] hover:from-[#FFE66D] hover:to-[#FF6B6B] transition-all duration-300"
              >
                Contact Support
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center px-6 py-3 border border-purple-500/50 rounded-md text-base font-medium text-white hover:bg-[#2D0B5A] transition-all duration-300"
              >
                Read Documentation
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'API Documentation',
                description: 'Comprehensive documentation for all API endpoints, parameters, and response formats.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                link: '/docs/api'
              },
              {
                title: 'Guides & Tutorials',
                description: 'Step-by-step guides and tutorials to help you get the most out of Circuit API.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                link: '/guides'
              },
              {
                title: 'Community Forum',
                description: 'Join our community forum to ask questions, share knowledge, and connect with other developers.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                ),
                link: '/community/forum'
              }
            ].map((resource, index) => (
              <Link 
                key={index} 
                href={resource.link}
                className="bg-[#1F0940] rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="h-16 w-16 rounded-full bg-[#2D0B5A] flex items-center justify-center mb-4">
                  {resource.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{resource.title}</h3>
                <p className="text-purple-100">{resource.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 