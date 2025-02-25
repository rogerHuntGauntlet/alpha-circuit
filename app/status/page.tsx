import React from 'react';
import Link from 'next/link';

const StatusPage = () => {
  // Mock data for system status
  const systemStatus = {
    overall: 'operational',
    lastUpdated: '2 minutes ago',
    uptime: '99.99%',
    incidents: [],
    components: [
      {
        name: 'API',
        status: 'operational',
        uptime: '99.99%',
        regions: [
          { name: 'North America', status: 'operational', latency: '45ms' },
          { name: 'Europe', status: 'operational', latency: '65ms' },
          { name: 'Asia Pacific', status: 'operational', latency: '120ms' },
          { name: 'South America', status: 'operational', latency: '110ms' },
          { name: 'Australia', status: 'operational', latency: '150ms' },
        ]
      },
      {
        name: 'Dashboard',
        status: 'operational',
        uptime: '99.98%',
      },
      {
        name: 'Analytics',
        status: 'operational',
        uptime: '99.95%',
      },
      {
        name: 'Authentication',
        status: 'operational',
        uptime: '100%',
      },
      {
        name: 'Webhooks',
        status: 'operational',
        uptime: '99.97%',
      },
      {
        name: 'Documentation',
        status: 'operational',
        uptime: '100%',
      },
    ],
    recentIncidents: [
      {
        date: 'June 15, 2023',
        title: 'API Degraded Performance',
        status: 'resolved',
        duration: '23 minutes',
        description: 'We experienced elevated latency in our Asia Pacific region due to a network issue with our cloud provider. The issue has been resolved and all systems are operating normally.',
      },
      {
        date: 'May 3, 2023',
        title: 'Scheduled Maintenance',
        status: 'completed',
        duration: '45 minutes',
        description: 'We performed a scheduled database upgrade to improve performance and reliability. The maintenance was completed successfully with no service disruption.',
      },
    ],
    scheduledMaintenance: [
      {
        date: 'July 10, 2023',
        time: '2:00 AM - 4:00 AM UTC',
        title: 'Database Optimization',
        description: 'We will be performing routine database optimization to improve query performance. No service disruption is expected, but you may experience slightly elevated response times during this period.',
        affectedComponents: ['API', 'Analytics']
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'operational':
        return 'text-green-400';
      case 'degraded':
        return 'text-yellow-400';
      case 'partial outage':
        return 'text-orange-400';
      case 'major outage':
        return 'text-red-400';
      default:
        return 'text-purple-100';
    }
  };

  const getStatusBadge = (status: string) => {
    const color = {
      operational: 'bg-green-500/20 text-green-300 border-green-500/30',
      degraded: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      'partial outage': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      'major outage': 'bg-red-500/20 text-red-300 border-red-500/30',
      resolved: 'bg-green-500/20 text-green-300 border-green-500/30',
      completed: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    }[status.toLowerCase()] || 'bg-purple-500/20 text-purple-300 border-purple-500/30';

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium border ${color}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-gradient-to-b from-[#2D0B5A] to-[#1B0B3B] min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">Status</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-purple-100">
            Current status of the Circuit API and related services.
          </p>
        </div>

        {/* Current Status */}
        <div className="mt-12 bg-[#1F0940] rounded-xl p-8 border border-purple-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className={`h-4 w-4 rounded-full ${systemStatus.overall === 'operational' ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <h2 className="ml-3 text-2xl font-bold text-white">All Systems {systemStatus.overall}</h2>
            </div>
            <div className="text-purple-100">
              <span>Last updated: {systemStatus.lastUpdated}</span>
              <span className="mx-2">•</span>
              <span>Uptime: {systemStatus.uptime}</span>
            </div>
          </div>
        </div>

        {/* Component Status */}
        <div className="mt-8 bg-[#1F0940] rounded-xl overflow-hidden border border-purple-500/20">
          <div className="px-8 py-6 border-b border-purple-500/20">
            <h2 className="text-xl font-bold text-white">Component Status</h2>
          </div>
          <div className="divide-y divide-purple-500/20">
            {systemStatus.components.map((component) => (
              <div key={component.name} className="px-8 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full ${component.status === 'operational' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    <h3 className="ml-3 text-lg font-medium text-white">{component.name}</h3>
                  </div>
                  <div className="flex items-center">
                    <span className="text-purple-100 mr-3">Uptime: {component.uptime}</span>
                    {getStatusBadge(component.status)}
                  </div>
                </div>

                {component.regions && (
                  <div className="mt-4 pl-6">
                    <h4 className="text-sm font-medium text-purple-100 mb-2">Regions</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {component.regions.map((region) => (
                        <div key={region.name} className="bg-[#1B0B3B] rounded-lg p-3 border border-purple-500/10">
                          <div className="flex justify-between items-center">
                            <span className="text-white">{region.name}</span>
                            <div className={`h-2 w-2 rounded-full ${region.status === 'operational' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          </div>
                          <div className="mt-1 text-sm text-purple-100">
                            Latency: {region.latency}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="mt-8 bg-[#1F0940] rounded-xl overflow-hidden border border-purple-500/20">
          <div className="px-8 py-6 border-b border-purple-500/20">
            <h2 className="text-xl font-bold text-white">Recent Incidents</h2>
          </div>
          {systemStatus.recentIncidents.length === 0 ? (
            <div className="px-8 py-6 text-center">
              <p className="text-purple-100">No incidents reported in the last 90 days.</p>
            </div>
          ) : (
            <div className="divide-y divide-purple-500/20">
              {systemStatus.recentIncidents.map((incident, index) => (
                <div key={index} className="px-8 py-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-white">{incident.title}</h3>
                      <p className="text-sm text-purple-100">{incident.date} • Duration: {incident.duration}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      {getStatusBadge(incident.status)}
                    </div>
                  </div>
                  <p className="text-purple-100">{incident.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Scheduled Maintenance */}
        <div className="mt-8 bg-[#1F0940] rounded-xl overflow-hidden border border-purple-500/20">
          <div className="px-8 py-6 border-b border-purple-500/20">
            <h2 className="text-xl font-bold text-white">Scheduled Maintenance</h2>
          </div>
          {systemStatus.scheduledMaintenance.length === 0 ? (
            <div className="px-8 py-6 text-center">
              <p className="text-purple-100">No scheduled maintenance at this time.</p>
            </div>
          ) : (
            <div className="divide-y divide-purple-500/20">
              {systemStatus.scheduledMaintenance.map((maintenance, index) => (
                <div key={index} className="px-8 py-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-white">{maintenance.title}</h3>
                      <p className="text-sm text-purple-100">{maintenance.date} • {maintenance.time}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium border bg-blue-500/20 text-blue-300 border-blue-500/30">
                        Scheduled
                      </span>
                    </div>
                  </div>
                  <p className="text-purple-100 mb-3">{maintenance.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-purple-100">Affected components:</span>
                    {maintenance.affectedComponents.map((component) => (
                      <span key={component} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#1B0B3B] text-purple-100 border border-purple-500/20">
                        {component}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Historical Uptime */}
        <div className="mt-8 bg-[#1F0940] rounded-xl p-8 border border-purple-500/20">
          <h2 className="text-xl font-bold text-white mb-6">Historical Uptime</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Last 90 Days</h3>
              <div className="space-y-4">
                {[
                  { name: 'API', uptime: '99.99%' },
                  { name: 'Dashboard', uptime: '99.98%' },
                  { name: 'Analytics', uptime: '99.95%' },
                  { name: 'Authentication', uptime: '100%' },
                ].map((service) => (
                  <div key={service.name} className="flex justify-between items-center">
                    <span className="text-purple-100">{service.name}</span>
                    <span className="text-white font-medium">{service.uptime}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Last 12 Months</h3>
              <div className="space-y-4">
                {[
                  { name: 'API', uptime: '99.97%' },
                  { name: 'Dashboard', uptime: '99.95%' },
                  { name: 'Analytics', uptime: '99.92%' },
                  { name: 'Authentication', uptime: '99.99%' },
                ].map((service) => (
                  <div key={service.name} className="flex justify-between items-center">
                    <span className="text-purple-100">{service.name}</span>
                    <span className="text-white font-medium">{service.uptime}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Subscribe to Updates */}
        <div className="mt-12 bg-[#1F0940] rounded-xl p-8 border border-purple-500/20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Subscribe to Status Updates</h2>
            <p className="mt-2 text-purple-100 max-w-2xl mx-auto">
              Get notified when there are service disruptions or scheduled maintenance.
            </p>
            <div className="mt-6 max-w-md mx-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 rounded-md border-purple-500/30 bg-[#1B0B3B] text-purple-100 focus:border-[#FF6B6B] focus:ring-[#FF6B6B]"
                />
                <button
                  type="submit"
                  className="px-6 py-2 border border-transparent rounded-md text-[#1F0940] font-bold bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] hover:from-[#FFE66D] hover:to-[#FF6B6B] transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* SLA Information */}
        <div className="mt-8 text-center">
          <p className="text-purple-100">
            For more information about our Service Level Agreements, please visit our{' '}
            <Link href="/sla" className="text-[#FF6B6B] hover:text-[#FFE66D]">
              SLA page
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusPage; 