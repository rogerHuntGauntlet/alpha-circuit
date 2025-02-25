import React from 'react';
import Link from 'next/link';

const CaseStudiesPage = () => {
  // Mock data for case studies
  const featuredCaseStudy = {
    id: 'epic-games',
    title: 'How Epic Games Improved Matchmaking by 40%',
    description: 'Epic Games integrated Circuit API to enhance their matchmaking system, resulting in 40% faster match creation and a 25% increase in player satisfaction.',
    industry: 'Gaming',
    logo: '/images/case-studies/epic-games-logo.png',
    image: '/images/case-studies/epic-games.jpg',
    metrics: [
      { label: 'Faster Matchmaking', value: '40%' },
      { label: 'Player Satisfaction', value: '+25%' },
      { label: 'Server Cost Reduction', value: '30%' }
    ]
  };

  const caseStudies = [
    {
      id: 'fintech-startup',
      title: 'FinTech Startup Increases Conversion by 200%',
      description: 'How a leading fintech startup used Circuit API to match customers with financial products, resulting in a 200% increase in conversion rates.',
      industry: 'Finance',
      logo: '/images/case-studies/fintech-logo.png',
      metrics: [
        { label: 'Conversion Rate', value: '+200%' },
        { label: 'Customer Satisfaction', value: '+45%' }
      ]
    },
    {
      id: 'dating-app',
      title: 'Dating App Reduces Churn by 35%',
      description: 'A popular dating application implemented Circuit API to improve match quality, leading to a significant reduction in user churn and increased engagement.',
      industry: 'Social',
      logo: '/images/case-studies/dating-app-logo.png',
      metrics: [
        { label: 'Churn Reduction', value: '35%' },
        { label: 'Message Rate', value: '+60%' }
      ]
    },
    {
      id: 'e-commerce',
      title: 'E-Commerce Platform Boosts Sales with Personalized Recommendations',
      description: 'How a major e-commerce platform leveraged Circuit API to deliver highly personalized product recommendations, increasing average order value by 28%.',
      industry: 'Retail',
      logo: '/images/case-studies/ecommerce-logo.png',
      metrics: [
        { label: 'Average Order Value', value: '+28%' },
        { label: 'Repeat Purchases', value: '+40%' }
      ]
    },
    {
      id: 'healthcare',
      title: 'Healthcare Provider Improves Patient Matching',
      description: 'A healthcare provider used Circuit API to match patients with the right specialists, reducing wait times by 50% and improving patient outcomes.',
      industry: 'Healthcare',
      logo: '/images/case-studies/healthcare-logo.png',
      metrics: [
        { label: 'Wait Time Reduction', value: '50%' },
        { label: 'Patient Satisfaction', value: '+35%' }
      ]
    },
    {
      id: 'education',
      title: 'EdTech Platform Personalizes Learning Paths',
      description: 'An education technology company implemented Circuit API to create personalized learning paths for students, resulting in improved test scores and engagement.',
      industry: 'Education',
      logo: '/images/case-studies/edtech-logo.png',
      metrics: [
        { label: 'Test Score Improvement', value: '+22%' },
        { label: 'Student Engagement', value: '+45%' }
      ]
    },
    {
      id: 'hr-tech',
      title: 'HR Tech Company Revolutionizes Recruitment',
      description: 'How an HR technology company used Circuit API to match job seekers with the perfect opportunities, reducing time-to-hire by 60%.',
      industry: 'HR & Recruitment',
      logo: '/images/case-studies/hr-tech-logo.png',
      metrics: [
        { label: 'Time-to-Hire Reduction', value: '60%' },
        { label: 'Candidate Quality', value: '+40%' }
      ]
    }
  ];

  const industries = [
    'All Industries',
    'Gaming',
    'Finance',
    'Social',
    'Retail',
    'Healthcare',
    'Education',
    'HR & Recruitment'
  ];

  return (
    <div className="bg-gradient-to-b from-[#2D0B5A] to-[#1B0B3B] min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Customer <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">Success</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-purple-100">
            See how leading companies are using Circuit API to transform their businesses.
          </p>
        </div>

        {/* Industry Filter */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-2">
            {industries.map((industry) => (
              <button
                key={industry}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  industry === 'All Industries'
                    ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] text-[#1B0B3B]'
                    : 'bg-[#1F0940] text-purple-100 hover:bg-[#2D0B5A] border border-purple-500/20'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Case Study */}
        <div className="mt-12">
          <div className="bg-[#1F0940] rounded-xl overflow-hidden border border-purple-500/20">
            <div className="lg:flex">
              <div className="lg:w-1/2 relative h-64 lg:h-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1F0940] to-transparent z-10 lg:hidden"></div>
                <div className="relative h-full w-full bg-purple-900">
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-br from-[#3D1B6A] to-[#1B0B3B] flex items-center justify-center">
                      <span className="text-purple-300 text-lg">Featured Case Study Image</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 p-8 lg:p-12">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#FF6B6B]/20 text-[#FF6B6B] border border-[#FF6B6B]/30">
                    Featured
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#2D0B5A] text-purple-100 border border-purple-500/20">
                    {featuredCaseStudy.industry}
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  {featuredCaseStudy.title}
                </h2>
                <p className="text-purple-100 mb-6">
                  {featuredCaseStudy.description}
                </p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {featuredCaseStudy.metrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">
                        {metric.value}
                      </div>
                      <div className="text-sm text-purple-100">{metric.label}</div>
                    </div>
                  ))}
                </div>
                <Link 
                  href={`/case-studies/${featuredCaseStudy.id}`}
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-[#1B0B3B] bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] hover:from-[#FFE66D] hover:to-[#FF6B6B] transition-all duration-300"
                >
                  Read Case Study
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <Link 
              key={study.id} 
              href={`/case-studies/${study.id}`}
              className="bg-[#1F0940] rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 flex flex-col"
            >
              <div className="h-48 relative bg-purple-900">
                {/* Placeholder for logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-[#3D1B6A] to-[#1B0B3B] flex items-center justify-center">
                    <span className="text-purple-300 text-sm">{study.title} Logo</span>
                  </div>
                </div>
              </div>
              <div className="p-6 flex-grow">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#2D0B5A] text-purple-100 border border-purple-500/20">
                    {study.industry}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {study.title}
                </h3>
                <p className="text-purple-100 mb-6">
                  {study.description}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {study.metrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">
                        {metric.value}
                      </div>
                      <div className="text-xs text-purple-100">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-6 pb-6 mt-auto">
                <div className="flex items-center justify-between">
                  <span className="text-[#FF6B6B] hover:text-[#FFE66D] text-sm font-medium">
                    Read case study →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Results Summary */}
        <div className="mt-24 bg-[#1F0940] rounded-xl p-8 md:p-12 border border-purple-500/20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Proven Results</h2>
            <p className="text-purple-100 max-w-3xl mx-auto mb-12">
              Companies across industries are achieving remarkable results with Circuit API. Here's what our customers are experiencing on average:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '45%', label: 'Increase in Match Quality' },
                { value: '60%', label: 'Faster Implementation' },
                { value: '30%', label: 'Reduction in Costs' },
                { value: '3x', label: 'Return on Investment' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-purple-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "Circuit API has been a game-changer for our matchmaking system. The implementation was smooth, and the results were immediate. Our players are happier, and our servers are more efficient.",
                author: "Sarah Johnson",
                role: "CTO",
                company: "Epic Games"
              },
              {
                quote: "We evaluated several matchmaking solutions, but Circuit API stood out for its flexibility and AI capabilities. It's helped us create more personalized experiences for our users.",
                author: "Michael Chen",
                role: "VP of Engineering",
                company: "FinTech Innovations"
              },
              {
                quote: "The support team at Circuit has been exceptional. They worked closely with us to optimize our integration and helped us achieve results beyond our expectations.",
                author: "Emily Rodriguez",
                role: "Product Manager",
                company: "ConnectMe Dating App"
              },
              {
                quote: "Circuit API's scalability has been crucial for our growing platform. We've been able to handle 10x the traffic without any performance issues.",
                author: "David Kim",
                role: "Lead Engineer",
                company: "ShopSmart E-Commerce"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-[#1F0940] rounded-xl p-8 border border-purple-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#FF6B6B]/30 mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-purple-100 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
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
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 bg-gradient-to-r from-[#3D1B6A] to-[#2D0B5A] rounded-xl p-8 md:p-12 border border-purple-500/20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Ready to achieve similar results?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-purple-100">
              Join the growing list of companies transforming their businesses with Circuit API.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#1F0940] bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] hover:from-[#FFE66D] hover:to-[#FF6B6B] transition-all duration-300"
              >
                Talk to Sales
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center px-6 py-3 border border-purple-500/50 text-base font-medium rounded-md text-white hover:bg-[#2D0B5A] transition-all duration-300"
              >
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesPage; 