import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'Founder & CEO',
      bio: 'Former lead engineer at Epic Games with 15+ years of experience in game development and matchmaking systems.',
      imagePath: '/team/alex.jpg',
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      bio: 'AI researcher and backend architect who previously built matchmaking systems for major esports titles.',
      imagePath: '/team/sarah.jpg',
    },
    {
      name: 'Marcus Williams',
      role: 'Head of Product',
      bio: 'Game designer turned product leader with a passion for creating exceptional player experiences.',
      imagePath: '/team/marcus.jpg',
    },
    {
      name: 'Priya Patel',
      role: 'Lead Engineer',
      bio: 'Distributed systems expert who has scaled services to support millions of concurrent users.',
      imagePath: '/team/priya.jpg',
    },
  ];

  const values = [
    {
      title: 'Player-First',
      description: 'We believe great matchmaking is the foundation of player satisfaction and retention.',
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Developer Experience',
      description: 'We obsess over creating APIs that are intuitive, well-documented, and a joy to integrate.',
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: 'Reliability',
      description: 'Our infrastructure is built for 99.99% uptime because every match matters.',
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Innovation',
      description: 'We continuously research and implement cutting-edge AI techniques to improve match quality.',
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#2D0B5A] to-[#1B0B3B] min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">Circuit</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-purple-100">
            We're a team of gamers and engineers on a mission to revolutionize matchmaking for game developers.
          </p>
        </div>

        {/* Our Story */}
        <div className="mt-16 bg-[#1F0940] rounded-xl p-8 border border-purple-500/20">
          <h2 className="text-2xl font-bold text-white">Our Story</h2>
          <div className="mt-6 text-purple-100 space-y-4">
            <p>
              Circuit was born out of frustration. As game developers ourselves, we struggled with the complexity of building and scaling matchmaking systems that could deliver consistently great player experiences.
            </p>
            <p>
              In 2021, our founding team left their roles at major game studios to build the matchmaking API we always wished we had - one that combines sophisticated algorithms with a simple, developer-friendly interface.
            </p>
            <p>
              Today, Circuit powers matchmaking for games with millions of players, from indie studios to AAA publishers. Our AI-driven approach has been proven to increase player retention by creating more balanced, enjoyable matches.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white text-center">Our Values</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="bg-[#1F0940] rounded-xl p-6 border border-purple-500/20">
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">
                  {value.icon}
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">{value.title}</h3>
                <p className="mt-2 text-purple-100">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white text-center">Our Team</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-[#1F0940] rounded-xl overflow-hidden border border-purple-500/20">
                <div className="h-48 w-full relative bg-purple-500/20">
                  {/* Note: In a real implementation, you would have actual team member images */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] flex items-center justify-center">
                      <span className="text-3xl font-bold text-[#1F0940]">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-[#FF6B6B]">{member.role}</p>
                  <p className="mt-2 text-purple-100">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investors Section */}
        <div className="mt-16 bg-[#1F0940] rounded-xl p-8 border border-purple-500/20">
          <h2 className="text-2xl font-bold text-white">Backed By</h2>
          <p className="mt-4 text-purple-100">
            We're proud to be backed by investors who believe in our vision for the future of matchmaking.
          </p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Venture Alpha', 'Gaming Ventures', 'Tech Pioneers', 'Future Fund'].map((investor) => (
              <div key={investor} className="flex items-center justify-center h-16 bg-[#1B0B3B] rounded-lg border border-purple-500/20">
                <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">
                  {investor}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Join Us Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white">Join Our Team</h2>
          <p className="mt-4 text-purple-100 max-w-2xl mx-auto">
            We're always looking for talented individuals who are passionate about gaming and technology.
          </p>
          <div className="mt-6">
            <Link
              href="/careers"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#1F0940] bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] hover:from-[#FFE66D] hover:to-[#FF6B6B] transition-all duration-300"
            >
              View Open Positions
            </Link>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-[#1F0940] rounded-xl p-8 border border-purple-500/20">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Get in Touch</h2>
              <p className="mt-4 text-purple-100">
                Have questions about Circuit? We'd love to hear from you.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="ml-3 text-purple-100">contact@circuit-api.com</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="ml-3 text-purple-100">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="ml-3 text-purple-100">123 Gaming Street, San Francisco, CA 94107</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Follow Us</h2>
              <p className="mt-4 text-purple-100">
                Stay up to date with the latest news and updates from Circuit.
              </p>
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
                    className="px-4 py-2 bg-[#1B0B3B] rounded-md border border-purple-500/20 text-purple-100 hover:text-white hover:border-purple-500/50 transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 