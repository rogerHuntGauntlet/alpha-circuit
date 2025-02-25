import React from 'react';
import Link from 'next/link';

const ContactPage = () => {
  return (
    <div className="bg-gradient-to-b from-[#2D0B5A] to-[#1B0B3B] min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">
              Contact Us
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-purple-100">
            Have questions or need help? We're here for you.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {/* Contact Form */}
          <div className="bg-[#1F0940] rounded-xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-bold text-white">Send Us a Message</h2>
            <p className="mt-2 text-purple-100">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
            <form className="mt-6 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-purple-100">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-md border-purple-500/30 bg-[#1B0B3B] text-purple-100 shadow-sm focus:border-[#FF6B6B] focus:ring-[#FF6B6B]"
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-purple-100">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-md border-purple-500/30 bg-[#1B0B3B] text-purple-100 shadow-sm focus:border-[#FF6B6B] focus:ring-[#FF6B6B]"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-purple-100">
                  Company
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    className="block w-full rounded-md border-purple-500/30 bg-[#1B0B3B] text-purple-100 shadow-sm focus:border-[#FF6B6B] focus:ring-[#FF6B6B]"
                    placeholder="Your company"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-purple-100">
                  Subject
                </label>
                <div className="mt-1">
                  <select
                    id="subject"
                    name="subject"
                    className="block w-full rounded-md border-purple-500/30 bg-[#1B0B3B] text-purple-100 shadow-sm focus:border-[#FF6B6B] focus:ring-[#FF6B6B]"
                  >
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Sales Question</option>
                    <option>Partnership Opportunity</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-purple-100">
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="block w-full rounded-md border-purple-500/30 bg-[#1B0B3B] text-purple-100 shadow-sm focus:border-[#FF6B6B] focus:ring-[#FF6B6B]"
                    placeholder="How can we help you?"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-[#1F0940] font-bold bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] hover:from-[#FFE66D] hover:to-[#FF6B6B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B6B] transition-all duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-[#1F0940] rounded-xl p-8 border border-purple-500/20">
              <h2 className="text-2xl font-bold text-white">Contact Information</h2>
              <div className="mt-6 space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Email</p>
                    <p className="text-purple-100">contact@circuit-api.com</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Phone</p>
                    <p className="text-purple-100">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Address</p>
                    <p className="text-purple-100">123 Gaming Street</p>
                    <p className="text-purple-100">San Francisco, CA 94107</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1F0940] rounded-xl p-8 border border-purple-500/20">
              <h2 className="text-2xl font-bold text-white">Support Hours</h2>
              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-sm font-medium text-white">Technical Support</p>
                  <p className="text-purple-100">Monday - Friday: 9am - 8pm ET</p>
                  <p className="text-purple-100">Saturday: 10am - 6pm ET</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Sales Inquiries</p>
                  <p className="text-purple-100">Monday - Friday: 9am - 6pm ET</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1F0940] rounded-xl p-8 border border-purple-500/20">
              <h2 className="text-2xl font-bold text-white">Connect With Us</h2>
              <div className="mt-6 flex space-x-4">
                {[
                  { name: 'Twitter', href: 'https://twitter.com' },
                  { name: 'LinkedIn', href: 'https://linkedin.com' },
                  { name: 'GitHub', href: 'https://github.com' },
                  { name: 'Discord', href: 'https://discord.com' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-purple-100 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{social.name}</span>
                    <div className="h-10 w-10 bg-[#1B0B3B] rounded-full flex items-center justify-center border border-purple-500/20 hover:border-purple-500/50 transition-all duration-200">
                      {social.name[0]}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-[#1F0940] rounded-xl p-8 border border-purple-500/20">
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {[
              {
                question: 'How quickly will I receive a response?',
                answer: 'We aim to respond to all inquiries within 24 hours during business days. For urgent technical issues, premium support customers receive priority response times.'
              },
              {
                question: 'Do you offer technical support for all plans?',
                answer: 'Yes, all plans include access to our support team. However, response times and support channels vary by plan. Enterprise customers receive dedicated support with faster SLAs.'
              },
              {
                question: 'Can I schedule a demo with your team?',
                answer: 'Absolutely! We offer personalized demos for teams interested in our Pro and Enterprise plans. Please select "Sales Question" in the contact form to schedule a demo.'
              },
              {
                question: 'Where can I find documentation?',
                answer: 'Our comprehensive documentation is available at docs.circuit-api.com. It includes guides, API references, and code examples for all supported languages and platforms.'
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-purple-500/20 pb-4">
                <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                <p className="mt-2 text-purple-100">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white">Ready to get started?</h2>
          <p className="mt-4 text-purple-100 max-w-2xl mx-auto">
            Create an account today and start building better matchmaking for your game.
          </p>
          <div className="mt-6">
            <Link
              href="/api/auth/signin"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#1F0940] bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] hover:from-[#FFE66D] hover:to-[#FF6B6B] transition-all duration-300"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 