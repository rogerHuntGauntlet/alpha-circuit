import type { PlayerProfile, PlayerGroup } from '@/lib/openai';

/**
 * Calculate compatibility score between two players
 * 
 * This is a simple implementation that could be enhanced with ML.
 */
export function calculateCompatibility(player1: PlayerProfile, player2: PlayerProfile): number {
  let score = 0;
  
  // Interest overlap
  const sharedInterests = player1.interests.filter(interest => 
    player2.interests.includes(interest)
  ).length;
  score += (sharedInterests / Math.max(player1.interests.length, player2.interests.length)) * 25;
  
  // Language match
  if (player1.language === player2.language) {
    score += 15;
  }
  
  // Platform preference
  if (player1.platformPreference === player2.platformPreference) {
    score += 10;
  }
  
  // Theme preference
  if (player1.themePreference === player2.themePreference) {
    score += 10;
  }
  
  // Skill level compatibility (closer is better)
  const skillDifference = Math.abs(player1.skillLevel - player2.skillLevel);
  score += Math.max(0, 15 - (skillDifference * 3));
  
  // Content tolerance compatibility (closer is better)
  const toleranceDifference = Math.abs(player1.contentTolerance - player2.contentTolerance);
  score += Math.max(0, 15 - (toleranceDifference * 3));
  
  // Play time overlap - simplified version
  const hasTimeOverlap = player1.playTimes.some(time => player2.playTimes.includes(time));
  if (hasTimeOverlap) {
    score += 10;
  }
  
  return Math.min(score, 100);
}

/**
 * Basic matching algorithm for player grouping
 * 
 * This is a fallback if the OpenAI-based algorithm fails.
 */
export function createPlayerGroups(
  players: PlayerProfile[], 
  groupSize: number,
  optimizationGoal: 'social' | 'skill' | 'balanced'
): PlayerGroup[] {
  // Create compatibility matrix
  const compatibilityMatrix: Record<string, Record<string, number>> = {};
  
  for (let i = 0; i < players.length; i++) {
    const player1 = players[i];
    compatibilityMatrix[player1.id] = {};
    
    for (let j = 0; j < players.length; j++) {
      if (i === j) continue;
      const player2 = players[j];
      
      compatibilityMatrix[player1.id][player2.id] = calculateCompatibility(player1, player2);
    }
  }
  
  // Create groups based on optimization goal
  const groups: PlayerGroup[] = [];
  const remainingPlayers = [...players];
  
  while (remainingPlayers.length >= groupSize) {
    let selectedPlayers: PlayerProfile[];
    
    if (optimizationGoal === 'social') {
      // For social cohesion, try to maximize compatibility
      selectedPlayers = selectSocialGroup(remainingPlayers, compatibilityMatrix, groupSize);
    } else if (optimizationGoal === 'skill') {
      // For skill balance, create teams with similar average skill
      selectedPlayers = selectSkillBalancedGroup(remainingPlayers, groupSize);
    } else {
      // For balanced approach, consider both factors
      selectedPlayers = selectBalancedGroup(remainingPlayers, compatibilityMatrix, groupSize);
    }
    
    // Remove selected players from the pool
    for (const player of selectedPlayers) {
      const index = remainingPlayers.findIndex(p => p.id === player.id);
      remainingPlayers.splice(index, 1);
    }
    
    // Calculate group compatibility score
    let groupScore = 0;
    for (let i = 0; i < selectedPlayers.length; i++) {
      for (let j = i + 1; j < selectedPlayers.length; j++) {
        groupScore += compatibilityMatrix[selectedPlayers[i].id][selectedPlayers[j].id];
      }
    }
    
    // Average the score
    const pairCount = (selectedPlayers.length * (selectedPlayers.length - 1)) / 2;
    groupScore = Math.round(groupScore / pairCount);
    
    // Identify potential risk factors
    const riskFactors: string[] = [];
    
    // Check for language barriers
    const languages = new Set(selectedPlayers.map(p => p.language));
    if (languages.size > 1) {
      riskFactors.push('Language barriers may exist');
    }
    
    // Check for platform differences
    const platforms = new Set(selectedPlayers.map(p => p.platformPreference));
    if (platforms.size > 1) {
      riskFactors.push('Platform differences may affect collaboration');
    }
    
    // Check for toxicity risks
    const toxicPlayers = selectedPlayers.filter(
      p => p.pastBehavior && p.pastBehavior.toxicityReports > 2
    );
    if (toxicPlayers.length > 0) {
      riskFactors.push('Group contains players with history of toxicity reports');
    }
    
    // Check for skill gaps
    const skillLevels = selectedPlayers.map(p => p.skillLevel);
    const maxSkill = Math.max(...skillLevels);
    const minSkill = Math.min(...skillLevels);
    if (maxSkill - minSkill > 4) {
      riskFactors.push('Large skill gap may affect experience');
    }
    
    // Add group to results
    groups.push({
      players: selectedPlayers.map(p => p.id),
      compatibilityScore: groupScore,
      riskFactors
    });
  }
  
  return groups;
}

// Helper functions for group selection

function selectSocialGroup(
  players: PlayerProfile[], 
  compatibilityMatrix: Record<string, Record<string, number>>,
  groupSize: number
): PlayerProfile[] {
  // Start with a random player
  const selectedPlayers = [players[Math.floor(Math.random() * players.length)]];
  
  // Add players with highest compatibility scores
  while (selectedPlayers.length < groupSize) {
    const lastPlayer = selectedPlayers[selectedPlayers.length - 1];
    
    // Find most compatible player among remaining
    let bestScore = -1;
    let bestPlayer: PlayerProfile | null = null;
    
    for (const player of players) {
      // Skip if already selected
      if (selectedPlayers.some(p => p.id === player.id)) continue;
      
      // Calculate average compatibility with all selected players
      let totalScore = 0;
      for (const selectedPlayer of selectedPlayers) {
        totalScore += compatibilityMatrix[selectedPlayer.id][player.id];
      }
      const avgScore = totalScore / selectedPlayers.length;
      
      if (avgScore > bestScore) {
        bestScore = avgScore;
        bestPlayer = player;
      }
    }
    
    if (bestPlayer) {
      selectedPlayers.push(bestPlayer);
    } else {
      // Fallback if something went wrong
      const remainingPlayers = players.filter(
        p => !selectedPlayers.some(sp => sp.id === p.id)
      );
      if (remainingPlayers.length > 0) {
        selectedPlayers.push(remainingPlayers[0]);
      }
    }
  }
  
  return selectedPlayers;
}

function selectSkillBalancedGroup(
  players: PlayerProfile[],
  groupSize: number
): PlayerProfile[] {
  // Sort players by skill level
  const sortedPlayers = [...players].sort((a, b) => a.skillLevel - b.skillLevel);
  
  // Select players to create a balanced team
  const selectedPlayers: PlayerProfile[] = [];
  
  // Pattern: high, low, high, low, etc.
  for (let i = 0; i < groupSize; i++) {
    if (i % 2 === 0) {
      // Take from end (high skill)
      selectedPlayers.push(sortedPlayers.pop()!);
    } else {
      // Take from beginning (low skill)
      selectedPlayers.push(sortedPlayers.shift()!);
    }
  }
  
  return selectedPlayers;
}

function selectBalancedGroup(
  players: PlayerProfile[],
  compatibilityMatrix: Record<string, Record<string, number>>,
  groupSize: number
): PlayerProfile[] {
  // This is a simple 50/50 mix of both approaches
  if (Math.random() > 0.5) {
    return selectSocialGroup(players, compatibilityMatrix, groupSize);
  } else {
    return selectSkillBalancedGroup(players, groupSize);
  }
} 