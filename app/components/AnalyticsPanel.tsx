import React from 'react';
import styles from './AnalyticsPanel.module.css';

interface Analytics {
  averageCompatibility: number;
  totalRiskFactors: number;
  groupCount: number;
}

interface Props {
  analytics: Analytics;
}

export const AnalyticsPanel: React.FC<Props> = ({ analytics }) => {
  return (
    <div className={styles.analyticsPanel}>
      <h3>Matchmaking Analytics</h3>
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <label>Average Compatibility</label>
          <div className={styles.statValue}>
            <div 
              className={styles.progressBar}
              style={{ 
                width: `${analytics.averageCompatibility}%`,
                backgroundColor: `hsl(${analytics.averageCompatibility * 1.2}, 70%, 50%)`
              }}
            />
            <span>{analytics.averageCompatibility.toFixed(1)}%</span>
          </div>
        </div>

        <div className={styles.statItem}>
          <label>Risk Factors</label>
          <div className={styles.statValue}>
            <span className={`${styles.riskIndicator} ${
              analytics.totalRiskFactors > 0 ? styles.hasRisks : ''
            }`}>
              {analytics.totalRiskFactors}
            </span>
            <span>Total Risks</span>
          </div>
        </div>

        <div className={styles.statItem}>
          <label>Groups</label>
          <div className={styles.statValue}>
            <span className={styles.groupCount}>
              {analytics.groupCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}; 