import React, { useState } from 'react';
import { format } from 'date-fns';

interface Scenario {
  id: string;
  timestamp: string;
  request: {
    players: any[];
    groupSize: number;
    optimizationGoal: string;
    systemPrompt?: string;
  };
  response: {
    aiPowered: boolean;
    quality: number;
    groups: any[];
  };
}

interface Props {
  scenarios: Scenario[];
  onLoadScenario: (scenario: Scenario) => void;
}

export const ScenarioHistory: React.FC<Props> = ({ scenarios, onLoadScenario }) => {
  const [expandedScenario, setExpandedScenario] = useState<string | null>(null);

  const toggleScenario = (id: string) => {
    setExpandedScenario(expandedScenario === id ? null : id);
  };

  if (scenarios.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No scenarios have been run yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {scenarios.map((scenario) => (
        <div
          key={scenario.id}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          {/* Header */}
          <div
            className="bg-white px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50"
            onClick={() => toggleScenario(scenario.id)}
          >
            <div className="flex items-center space-x-4">
              <div className={`px-2 py-1 text-sm rounded-full ${
                scenario.response.aiPowered 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {scenario.response.aiPowered ? 'AI-Powered' : 'Basic Algorithm'}
              </div>
              <div className="text-sm text-gray-500">
                {format(new Date(scenario.timestamp), 'MMM d, yyyy HH:mm:ss')}
              </div>
              <div className="text-sm font-medium">
                {scenario.request.players.length} Players • {scenario.request.groupSize} per Group
              </div>
              <div className="text-sm text-gray-500">
                Quality: {scenario.response.quality}%
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLoadScenario(scenario);
                }}
                className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100"
              >
                Load
              </button>
              <svg
                className={`w-5 h-5 text-gray-400 transform transition-transform ${
                  expandedScenario === scenario.id ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Expanded Content */}
          {expandedScenario === scenario.id && (
            <div className="border-t border-gray-200 px-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Request */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Request</h4>
                  <pre className="bg-gray-50 p-3 rounded-md text-xs overflow-auto max-h-96">
                    {JSON.stringify(scenario.request, null, 2)}
                  </pre>
                </div>

                {/* Response */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Response</h4>
                  <pre className="bg-gray-50 p-3 rounded-md text-xs overflow-auto max-h-96">
                    {JSON.stringify(scenario.response, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Analytics */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Analytics</h4>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-xs text-gray-500">Total Players</div>
                    <div className="text-lg font-medium">{scenario.request.players.length}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-xs text-gray-500">Groups Formed</div>
                    <div className="text-lg font-medium">{scenario.response.groups.length}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-xs text-gray-500">Avg Group Size</div>
                    <div className="text-lg font-medium">
                      {(scenario.request.players.length / scenario.response.groups.length).toFixed(1)}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-xs text-gray-500">Match Quality</div>
                    <div className="text-lg font-medium">{scenario.response.quality}%</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}; 