import React from 'react';
import Link from 'next/link';

const ApiReferencePage = () => {
  const endpoints = [
    {
      category: 'Players',
      items: [
        {
          method: 'POST',
          path: '/v1/players',
          description: 'Create a new player profile',
          responseCode: 201,
        },
        {
          method: 'GET',
          path: '/v1/players/{playerId}',
          description: 'Get player details',
          responseCode: 200,
        },
        {
          method: 'PUT',
          path: '/v1/players/{playerId}',
          description: 'Update player details',
          responseCode: 200,
        },
        {
          method: 'DELETE',
          path: '/v1/players/{playerId}',
          description: 'Delete a player',
          responseCode: 204,
        },
      ],
    },
    {
      category: 'Matches',
      items: [
        {
          method: 'POST',
          path: '/v1/matches',
          description: 'Create a new match',
          responseCode: 201,
        },
        {
          method: 'GET',
          path: '/v1/matches/{matchId}',
          description: 'Get match details',
          responseCode: 200,
        },
        {
          method: 'PUT',
          path: '/v1/matches/{matchId}',
          description: 'Update match status',
          responseCode: 200,
        },
        {
          method: 'GET',
          path: '/v1/matches',
          description: 'List all matches',
          responseCode: 200,
        },
      ],
    },
    {
      category: 'Teams',
      items: [
        {
          method: 'POST',
          path: '/v1/teams',
          description: 'Create a new team',
          responseCode: 201,
        },
        {
          method: 'GET',
          path: '/v1/teams/{teamId}',
          description: 'Get team details',
          responseCode: 200,
        },
        {
          method: 'PUT',
          path: '/v1/teams/{teamId}/players',
          description: 'Add players to team',
          responseCode: 200,
        },
        {
          method: 'DELETE',
          path: '/v1/teams/{teamId}/players/{playerId}',
          description: 'Remove player from team',
          responseCode: 204,
        },
      ],
    },
    {
      category: 'Sessions',
      items: [
        {
          method: 'POST',
          path: '/v1/sessions',
          description: 'Create a new session',
          responseCode: 201,
        },
        {
          method: 'GET',
          path: '/v1/sessions/{sessionId}',
          description: 'Get session details',
          responseCode: 200,
        },
        {
          method: 'PUT',
          path: '/v1/sessions/{sessionId}',
          description: 'Update session status',
          responseCode: 200,
        },
        {
          method: 'DELETE',
          path: '/v1/sessions/{sessionId}',
          description: 'End a session',
          responseCode: 204,
        },
      ],
    },
    {
      category: 'Analytics',
      items: [
        {
          method: 'GET',
          path: '/v1/analytics/matches',
          description: 'Get match statistics',
          responseCode: 200,
        },
        {
          method: 'GET',
          path: '/v1/analytics/players',
          description: 'Get player statistics',
          responseCode: 200,
        },
        {
          method: 'GET',
          path: '/v1/analytics/regions',
          description: 'Get region statistics',
          responseCode: 200,
        },
        {
          method: 'GET',
          path: '/v1/analytics/quality',
          description: 'Get match quality metrics',
          responseCode: 200,
        },
      ],
    },
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'POST':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'PUT':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'DELETE':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#2D0B5A] to-[#1B0B3B] min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">
              API Reference
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-purple-100">
            Complete documentation for the Circuit API endpoints.
          </p>
        </div>

        {/* API Base URL */}
        <div className="mt-12 bg-[#1F0940] rounded-xl p-6 border border-purple-500/20">
          <h2 className="text-xl font-bold text-white">Base URL</h2>
          <div className="mt-4 bg-[#1B0B3B] p-4 rounded-lg border border-purple-500/20 font-mono text-purple-100">
            https://api.circuit-api.com
          </div>
          <p className="mt-4 text-purple-100">
            All API requests must use HTTPS. The API is versioned, with the current version being v1.
          </p>
        </div>

        {/* Authentication */}
        <div className="mt-8 bg-[#1F0940] rounded-xl p-6 border border-purple-500/20">
          <h2 className="text-xl font-bold text-white">Authentication</h2>
          <p className="mt-4 text-purple-100">
            All API requests require authentication using an API key. Include your API key in the request header:
          </p>
          <div className="mt-4 bg-[#1B0B3B] p-4 rounded-lg border border-purple-500/20 font-mono text-purple-100 overflow-x-auto">
            <code>Authorization: Bearer YOUR_API_KEY</code>
          </div>
          <p className="mt-4 text-purple-100">
            You can generate API keys in your <Link href="/dashboard" className="text-[#FF6B6B] hover:text-[#FFE66D]">dashboard</Link>.
          </p>
        </div>

        {/* Endpoints */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-8">Endpoints</h2>
          
          <div className="space-y-12">
            {endpoints.map((category) => (
              <div key={category.category} className="bg-[#1F0940] rounded-xl p-6 border border-purple-500/20">
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">
                  {category.category}
                </h3>
                
                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full divide-y divide-purple-500/20">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-purple-100 uppercase tracking-wider">Method</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-purple-100 uppercase tracking-wider">Endpoint</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-purple-100 uppercase tracking-wider">Description</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-purple-100 uppercase tracking-wider">Response</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-500/20">
                      {category.items.map((endpoint, index) => (
                        <tr key={index} className="hover:bg-purple-500/10 transition-colors duration-200">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium border ${getMethodColor(endpoint.method)}`}>
                              {endpoint.method}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap font-mono text-sm text-purple-100">
                            {endpoint.path}
                          </td>
                          <td className="px-4 py-4 text-sm text-purple-100">
                            {endpoint.description}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md font-medium bg-purple-500/20 text-purple-100 border border-purple-500/30">
                              {endpoint.responseCode}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 text-right">
                  <Link 
                    href={`/docs/api/${category.category.toLowerCase()}`}
                    className="text-[#FF6B6B] hover:text-[#FFE66D] font-medium"
                  >
                    View detailed documentation →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rate Limiting */}
        <div className="mt-12 bg-[#1F0940] rounded-xl p-6 border border-purple-500/20">
          <h2 className="text-xl font-bold text-white">Rate Limiting</h2>
          <p className="mt-4 text-purple-100">
            API requests are rate limited based on your plan. The current limits are:
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-purple-500/20">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-purple-100 uppercase tracking-wider">Plan</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-purple-100 uppercase tracking-wider">Rate Limit</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-purple-100 uppercase tracking-wider">Burst Limit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/20">
                <tr>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-purple-100">Free</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-purple-100">100 requests/minute</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-purple-100">200 requests</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-purple-100">Pro</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-purple-100">1,000 requests/minute</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-purple-100">2,000 requests</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-purple-100">Enterprise</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-purple-100">Custom</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-purple-100">Custom</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-purple-100">
            Rate limit headers are included in all API responses:
          </p>
          <div className="mt-4 bg-[#1B0B3B] p-4 rounded-lg border border-purple-500/20 font-mono text-sm text-purple-100 overflow-x-auto">
            <code>X-RateLimit-Limit: 1000</code><br />
            <code>X-RateLimit-Remaining: 999</code><br />
            <code>X-RateLimit-Reset: 1623869430</code>
          </div>
        </div>

        {/* Error Handling */}
        <div className="mt-12 bg-[#1F0940] rounded-xl p-6 border border-purple-500/20">
          <h2 className="text-xl font-bold text-white">Error Handling</h2>
          <p className="mt-4 text-purple-100">
            The API uses standard HTTP status codes to indicate the success or failure of requests. Error responses include a JSON body with details:
          </p>
          <div className="mt-4 bg-[#1B0B3B] p-4 rounded-lg border border-purple-500/20 font-mono text-sm text-purple-100 overflow-x-auto">
            <pre>{`{
  "error": {
    "code": "invalid_request",
    "message": "The request was invalid",
    "details": "Player ID is required"
  }
}`}</pre>
          </div>
        </div>

        {/* SDK Links */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white">SDKs & Libraries</h2>
          <p className="mt-4 text-purple-100 max-w-2xl mx-auto">
            We provide official SDKs for popular programming languages and game engines.
          </p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'JavaScript', href: '/docs/sdks/javascript' },
              { name: 'Python', href: '/docs/sdks/python' },
              { name: 'Unity', href: '/docs/sdks/unity' },
              { name: 'Unreal', href: '/docs/sdks/unreal' },
              { name: 'Go', href: '/docs/sdks/go' },
              { name: 'C#', href: '/docs/sdks/csharp' },
              { name: 'Java', href: '/docs/sdks/java' },
              { name: 'Ruby', href: '/docs/sdks/ruby' },
            ].map((sdk) => (
              <Link
                key={sdk.name}
                href={sdk.href}
                className="bg-[#1F0940] p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
              >
                <span className="text-purple-100 hover:text-white">{sdk.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiReferencePage; 