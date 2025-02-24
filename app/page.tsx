import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#2D0B5A] to-[#1B0B3B]">
      {/* Navigation */}
      <nav className="fixed w-full bg-[#1F0940]/90 backdrop-blur-sm border-b border-purple-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">
                CIRCUIT
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/pricing" 
                className="text-purple-100 hover:text-white px-3 py-2 rounded-md transition-all duration-200 hover:scale-105">
                Pricing
              </Link>
              <Link href="/docs" 
                className="text-purple-100 hover:text-white px-3 py-2 rounded-md transition-all duration-200 hover:scale-105">
                Documentation
              </Link>
              <Link href="/dashboard" 
                className="text-purple-100 hover:text-white px-3 py-2 rounded-md transition-all duration-200 hover:scale-105">
                Console
              </Link>
              <Link href="/api/auth/signin" 
                className="relative group bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] p-[2px] rounded-md hover:from-[#FFE66D] hover:to-[#FF6B6B] transition-all duration-300">
                <div className="bg-[#1F0940] rounded-md group-hover:bg-transparent transition-all duration-300">
                  <span className="block px-4 py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] group-hover:text-[#1F0940]">
                    Start Free
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center px-4 pt-32 pb-16 text-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -top-32 -left-32 animate-pulse"></div>
          <div className="absolute w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -bottom-32 -right-32 animate-pulse delay-1000"></div>
        </div>
        
        <h1 className="relative text-6xl font-black tracking-tight text-white sm:text-7xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">
            Next-Gen
          </span>
          <br />
          Matchmaking API
        </h1>
        <p className="mt-6 text-xl leading-8 text-purple-100 max-w-2xl">
          Supercharge your game's matchmaking with our AI-powered API. Built by gaming engineers, for gaming engineers.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/docs"
            className="relative group bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] p-[2px] rounded-md hover:from-[#FFE66D] hover:to-[#FF6B6B] transition-all duration-300"
          >
            <div className="bg-[#1F0940] rounded-md group-hover:bg-transparent transition-all duration-300">
              <span className="block px-6 py-3 text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] group-hover:text-[#1F0940]">
                Quick Start
              </span>
            </div>
          </Link>
          <Link href="#features" 
            className="text-lg font-bold text-purple-100 hover:text-white transition-all duration-200 hover:scale-105">
            View Features <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-[#1F0940]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Developer Features
            </h2>
            <p className="mt-4 text-xl text-purple-100">
              Everything you need to build epic matchmaking systems
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'RESTful API',
                description: 'Simple, stateless API with 99.99% uptime SLA and comprehensive documentation.',
                gradient: 'from-[#FF6B6B] to-[#FF8E53]'
              },
              {
                title: 'AI-Powered Matching',
                description: 'OpenAI-powered algorithms for sophisticated player compatibility analysis and grouping.',
                gradient: 'from-[#FF8E53] to-[#FFE66D]'
              },
              {
                title: 'Performance Analytics',
                description: 'Real-time metrics, match quality scoring, and player satisfaction tracking.',
                gradient: 'from-[#FFE66D] to-[#4ECB71]'
              },
              {
                title: 'SDK Support',
                description: 'Official SDKs for Unity, Unreal Engine, and major programming languages.',
                gradient: 'from-[#4ECB71] to-[#64B6FF]'
              },
              {
                title: 'Scalable Infrastructure',
                description: 'Handle millions of concurrent players with sub-100ms response times.',
                gradient: 'from-[#64B6FF] to-[#C961FF]'
              },
              {
                title: 'Advanced Controls',
                description: 'Fine-tune matching parameters, regional settings, and optimization goals.',
                gradient: 'from-[#C961FF] to-[#FF6B6B]'
              },
            ].map((feature) => (
              <div key={feature.title} 
                className="relative group bg-gradient-to-br p-[2px] rounded-xl hover:scale-105 transition-all duration-300"
                style={{ backgroundImage: `linear-gradient(to bottom right, ${feature.gradient.split(' ')[1]}, ${feature.gradient.split(' ')[3]})` }}>
                <div className="h-full bg-[#1F0940] rounded-xl p-6 transition-colors duration-300 group-hover:bg-[#1F0940]/90">
                  <h3 className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${feature.gradient}`}>
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-purple-100 group-hover:text-white transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Integration Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Integration Ready
            </h2>
            <p className="mt-4 text-xl text-purple-100 max-w-2xl mx-auto">
              Five lines of code to better matchmaking. Deploy to production in hours, not months.
            </p>
          </div>

          <div className="mt-12 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#1F0940] rounded-lg p-6">
              <pre className="text-sm text-purple-100 overflow-x-auto">
                <code>{`// Initialize matchmaking for your game
const circuit = new CircuitAPI('YOUR_API_KEY');

const match = await circuit.createMatch({
  players: playerPool,
  options: {
    groupSize: 4,
    regions: ['na-east', 'na-west'],
    gameMode: 'battle-royale',
    skillBased: true,
    optimizationGoal: 'balanced'
  }
});`}</code>
              </pre>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { stat: '99.99%', label: 'Uptime SLA' },
              { stat: '<100ms', label: 'Response Time' },
              { stat: '10M+', label: 'Daily Matches' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">
                  {item.stat}
                </div>
                <div className="mt-2 text-purple-100">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 