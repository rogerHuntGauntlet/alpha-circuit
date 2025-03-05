import React, { useState, useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { PlayerGroup } from '../../../lib/openai';
import { PlayerCard } from '../PlayerCard';
import { AnalyticsPanel } from '../AnalyticsPanel';
import styles from './MatchmakingVisualizer.module.css';
import { AlgorithmStatus } from '@/app/lib/matching-utils';

interface Props {
  groups: PlayerGroup[];
  onGroupsUpdate: (newGroups: PlayerGroup[]) => void;
  algorithmStatus?: {
    attempted: AlgorithmStatus[];
    final: AlgorithmStatus['type'];
  };
}

export const MatchmakingVisualizer: React.FC<Props> = ({ 
  groups, 
  onGroupsUpdate,
  algorithmStatus 
}) => {
  const [showJson, setShowJson] = useState(false);
  
  // Track the current groups state internally for drag and drop
  const [currentGroups, setCurrentGroups] = useState(groups);

  // Calculate overall analytics
  const analytics = useMemo(() => {
    return {
      averageCompatibility: currentGroups.reduce((acc, group) => 
        acc + (group.compatibilityScore || 0), 0) / currentGroups.length,
      totalRiskFactors: currentGroups.reduce((acc, group) => 
        acc + (Array.isArray(group.riskFactors) ? group.riskFactors.length : 0), 0),
      groupCount: currentGroups.length,
      algorithmStatus
    };
  }, [currentGroups, algorithmStatus]);

  // Handle player swaps between groups
  const handlePlayerSwap = (sourceGroupIndex: number, sourcePlayerIndex: number, 
                          targetGroupIndex: number, targetPlayerIndex: number) => {
    const newGroups = [...currentGroups];
    const sourceGroup = [...newGroups[sourceGroupIndex].players];
    const targetGroup = [...newGroups[targetGroupIndex].players];
    
    // Swap players
    [sourceGroup[sourcePlayerIndex], targetGroup[targetPlayerIndex]] = 
    [targetGroup[targetPlayerIndex], sourceGroup[sourcePlayerIndex]];
    
    newGroups[sourceGroupIndex] = {
      ...newGroups[sourceGroupIndex],
      players: sourceGroup
    };
    
    newGroups[targetGroupIndex] = {
      ...newGroups[targetGroupIndex],
      players: targetGroup
    };
    
    setCurrentGroups(newGroups);
    onGroupsUpdate(newGroups);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Matchmaking Results</h2>
          <button
            className={styles.viewToggle}
            onClick={() => setShowJson(!showJson)}
          >
            {showJson ? 'Show Visual' : 'Show JSON'}
          </button>
        </div>

        {showJson ? (
          <pre className={styles.jsonView}>
            {JSON.stringify(currentGroups, null, 2)}
          </pre>
        ) : (
          <div className={styles.visualizer}>
            <div className={styles.groupsContainer}>
              {currentGroups.map((group, groupIndex) => (
                <div key={groupIndex} className={styles.group}>
                  <h3>Group {groupIndex + 1}</h3>
                  <div className={styles.groupStats}>
                    <span>Compatibility: {group.compatibilityScore || 0}%</span>
                  </div>
                  <div className={styles.players}>
                    {group.players.map((playerId, playerIndex) => (
                      <PlayerCard
                        key={playerId}
                        playerId={playerId}
                        groupIndex={groupIndex}
                        playerIndex={playerIndex}
                        onSwap={handlePlayerSwap}
                      />
                    ))}
                  </div>
                  {Array.isArray(group.riskFactors) && group.riskFactors.length > 0 && (
                    <div className={styles.riskFactors}>
                      <h4>Risk Factors:</h4>
                      <ul>
                        {group.riskFactors.map((risk, index) => (
                          <li key={index}>{risk}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <AnalyticsPanel analytics={analytics} />
          </div>
        )}
      </div>
    </DndProvider>
  );
}; 