import React from 'react';
import Link from 'next/link';

const DocsPage = () => {
  const docSections = [
    {
      title: 'Getting Started',
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      description: 'Learn how to set up and integrate Circuit API into your game.',
      links: [
        { name: 'Quick Start Guide', href: '/docs/quick-start' },
        { name: 'API Keys', href: '/docs/api-keys' },
        { name: 'Authentication', href: '/docs/authentication' },
        { name: 'SDKs & Libraries', href: '/docs/sdks' },
      ],
    },
    {
      title: 'Core Concepts',
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      description: 'Understand the fundamental concepts behind matchmaking.',
      links: [
        { name: 'Matchmaking Basics', href: '/docs/matchmaking-basics' },
        { name: 'Player Attributes', href: '/docs/player-attributes' },
        { name: 'Match Quality', href: '/docs/match-quality' },
        { name: 'Regions & Latency', href: '/docs/regions' },
      ],
    },
    {
      title: 'API Reference',
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      description: 'Detailed documentation for all API endpoints.',
      links: [
        { name: 'Players API', href: '/docs/api/players' },
        { name: 'Matches API', href: '/docs/api/matches' },
        { name: 'Sessions API', href: '/docs/api/sessions' },
        { name: 'Analytics API', href: '/docs/api/analytics' },
      ],
    },
    {
      title: 'Guides',
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      description: 'Step-by-step tutorials for common use cases.',
      links: [
        { name: 'Skill-Based Matching', href: '/docs/guides/skill-based' },
        { name: 'Team Balancing', href: '/docs/guides/team-balancing' },
        { name: 'Custom Rules', href: '/docs/guides/custom-rules' },
        { name: 'Handling Edge Cases', href: '/docs/guides/edge-cases' },
      ],
    },
    {
      title: 'Best Practices',
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      description: 'Recommendations for optimal API usage and performance.',
      links: [
        { name: 'Rate Limiting', href: '/docs/best-practices/rate-limiting' },
        { name: 'Error Handling', href: '/docs/best-practices/error-handling' },
        { name: 'Caching Strategies', href: '/docs/best-practices/caching' },
        { name: 'Security', href: '/docs/best-practices/security' },
      ],
    },
    {
      title: 'Resources',
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      description: 'Additional resources to help you succeed.',
      links: [
        { name: 'Sample Projects', href: '/docs/resources/samples' },
        { name: 'Community Forums', href: '/docs/resources/community' },
        { name: 'Changelog', href: '/docs/resources/changelog' },
        { name: 'FAQ', href: '/docs/resources/faq' },
      ],
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#2D0B5A] to-[#1B0B3B] min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">
              Documentation
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-purple-100">
            Everything you need to know about integrating and using Circuit API.
          </p>
        </div>

        {/* Quick links */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {['Quick Start', 'API Reference', 'SDKs', 'Guides', 'Examples'].map((link) => (
            <Link
              key={link}
              href={`/docs/${link.toLowerCase().replace(' ', '-')}`}
              className="px-4 py-2 rounded-full bg-[#1F0940] border border-purple-500/20 text-purple-100 hover:text-white hover:border-purple-500/50 transition-all duration-200"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Documentation sections */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {docSections.map((section) => (
            <div key={section.title} className="bg-[#1F0940] rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center">
                <div className="flex-shrink-0 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">
                  {section.icon}
                </div>
                <h2 className="ml-4 text-xl font-bold text-white">{section.title}</h2>
              </div>
              <p className="mt-4 text-purple-100">{section.description}</p>
              <ul className="mt-6 space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-purple-100 hover:text-white flex items-center"
                    >
                      <svg className="h-4 w-4 mr-2 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Code example */}
        <div className="mt-16 bg-[#1F0940]/50 rounded-xl p-8 border border-purple-500/20">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Example</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Create a Match</h3>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-[#1F0940] rounded-lg p-4">
                  <pre className="text-sm text-purple-100 overflow-x-auto">
                    <code>{`// Initialize the Circuit API client
const circuit = new CircuitAPI('YOUR_API_KEY');

// Define player data
const players = [
  { id: 'player1', skill: 1200, region: 'na-east' },
  { id: 'player2', skill: 1150, region: 'na-east' },
  // ... more players
];

// Create a match
const match = await circuit.createMatch({
  players,
  options: {
    groupSize: 4,
    balanceTeams: true,
    maxSkillGap: 300
  }
});

console.log(match.teams);`}</code>
                  </pre>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Response</h3>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-[#1F0940] rounded-lg p-4">
                  <pre className="text-sm text-purple-100 overflow-x-auto">
                    <code>{`{
  "matchId": "match_8f7d9c2e",
  "status": "created",
  "createdAt": "2023-06-15T18:30:45Z",
  "teams": [
    {
      "id": "team_1",
      "players": [
        { "id": "player1", "skill": 1200 },
        { "id": "player3", "skill": 950 }
      ],
      "averageSkill": 1075
    },
    {
      "id": "team_2",
      "players": [
        { "id": "player2", "skill": 1150 },
        { "id": "player4", "skill": 1000 }
      ],
      "averageSkill": 1075
    }
  ],
  "region": "na-east",
  "quality": 0.95
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Getting help */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white">Need Help?</h2>
          <p className="mt-4 text-purple-100 max-w-2xl mx-auto">
            Our support team is available to help you with any questions or issues.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/support"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#1F0940] bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] hover:from-[#FFE66D] hover:to-[#FF6B6B] transition-all duration-300"
            >
              Contact Support
            </Link>
            <Link
              href="/docs/resources/community"
              className="inline-flex items-center px-6 py-3 border border-purple-500/50 text-base font-medium rounded-md text-white hover:bg-[#2D0B5A] transition-all duration-300"
            >
              Join Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage; 