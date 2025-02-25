// Performance tests for the matching algorithm

// Simple function to calculate compatibility between two players
function calculateCompatibility(player1, player2) {
  let score = 0;
  
  // Interest overlap
  const player1Interests = player1.interests || [];
  const player2Interests = player2.interests || [];
  
  const sharedInterests = player1Interests.filter(interest => 
    player2Interests.includes(interest)
  ).length;
  
  const maxInterests = Math.max(player1Interests.length, player2Interests.length);
  score += maxInterests > 0 ? (sharedInterests / maxInterests) * 25 : 0;
  
  // Language match
  if (player1.language === player2.language) {
    score += 15;
  }
  
  // Platform preference
  if (player1.platformPreference === player2.platformPreference) {
    score += 10;
  }
  
  // Skill level compatibility (closer is better)
  const player1Skill = player1.skillLevel || 5;
  const player2Skill = player2.skillLevel || 5;
  const skillDifference = Math.abs(player1Skill - player2Skill);
  score += Math.max(0, 15 - (skillDifference * 3));
  
  return Math.min(score, 100);
}

// Simple function to create player groups
function createBasicGroups(players, groupSize) {
  const groups = [];
  
  // Create groups by simply chunking the players array
  for (let i = 0; i < players.length; i += groupSize) {
    const groupPlayers = players.slice(i, i + groupSize);
    const playerIds = groupPlayers.map(p => p.id);
    
    // Calculate average compatibility score for the group
    let totalScore = 0;
    let pairCount = 0;
    
    for (let j = 0; j < groupPlayers.length; j++) {
      for (let k = j + 1; k < groupPlayers.length; k++) {
        totalScore += calculateCompatibility(groupPlayers[j], groupPlayers[k]);
        pairCount++;
      }
    }
    
    const compatibilityScore = pairCount > 0 ? totalScore / pairCount : 50;
    
    // Find common interests
    let commonInterests = [];
    if (groupPlayers.length > 0) {
      const allInterests = groupPlayers.map(p => p.interests || []);
      if (allInterests.length > 0 && allInterests[0].length > 0) {
        commonInterests = [...allInterests[0]];
        for (let j = 1; j < allInterests.length; j++) {
          commonInterests = commonInterests.filter(interest => 
            allInterests[j].includes(interest)
          );
        }
      }
    }
    
    groups.push({
      groupId: `group${groups.length + 1}`,
      players: playerIds,
      compatibilityScore,
      commonInterests,
      compatibilityFactors: {
        interests: 'medium',
        communicationStyle: 'medium',
        playTimes: 'medium',
        skillLevel: 'medium'
      }
    });
  }
  
  return groups;
}

// Generate random player data
function generateRandomPlayers(count) {
  const interests = ['RPG', 'Strategy', 'FPS', 'MOBA', 'Battle Royale', 'Racing', 'Simulation', 'Sports', 'Puzzle', 'Adventure'];
  const communicationStyles = ['casual', 'competitive', 'silent', 'talkative', 'strategic'];
  const platforms = ['PC', 'Console', 'Mobile', 'Cross-platform'];
  const playTimes = ['morning', 'afternoon', 'evening', 'night', 'weekend', 'weekday'];
  const languages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh'];
  
  return Array.from({ length: count }, (_, i) => {
    // Generate 1-3 random interests
    const playerInterests = [];
    const interestCount = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < interestCount; j++) {
      const interest = interests[Math.floor(Math.random() * interests.length)];
      if (!playerInterests.includes(interest)) {
        playerInterests.push(interest);
      }
    }
    
    // Generate 1-2 random play times
    const playerPlayTimes = [];
    const playTimeCount = Math.floor(Math.random() * 2) + 1;
    for (let j = 0; j < playTimeCount; j++) {
      const playTime = playTimes[Math.floor(Math.random() * playTimes.length)];
      if (!playerPlayTimes.includes(playTime)) {
        playerPlayTimes.push(playTime);
      }
    }
    
    return {
      id: `player${i + 1}`,
      interests: playerInterests,
      communicationStyle: communicationStyles[Math.floor(Math.random() * communicationStyles.length)],
      platformPreference: platforms[Math.floor(Math.random() * platforms.length)],
      playTimes: playerPlayTimes,
      language: languages[Math.floor(Math.random() * languages.length)],
      skillLevel: Math.floor(Math.random() * 10) + 1,
      contentTolerance: Math.floor(Math.random() * 10) + 1
    };
  });
}

// Performance test cases
const performanceTests = [
  { playerCount: 10, groupSize: 2 },
  { playerCount: 50, groupSize: 5 },
  { playerCount: 100, groupSize: 4 },
  { playerCount: 500, groupSize: 5 },
  { playerCount: 1000, groupSize: 10 }
];

// Run performance tests
console.log('Running performance tests...');
console.log('='.repeat(50));

for (const test of performanceTests) {
  console.log(`Test: ${test.playerCount} players in groups of ${test.groupSize}`);
  
  // Generate random players
  const players = generateRandomPlayers(test.playerCount);
  
  // Measure time to create groups
  const startTime = process.hrtime();
  const groups = createBasicGroups(players, test.groupSize);
  const endTime = process.hrtime(startTime);
  
  // Calculate execution time in milliseconds
  const executionTime = (endTime[0] * 1000) + (endTime[1] / 1000000);
  
  console.log(`Created ${groups.length} groups in ${executionTime.toFixed(2)} ms`);
  console.log(`Average time per player: ${(executionTime / test.playerCount).toFixed(2)} ms`);
  console.log(`Average time per group: ${(executionTime / groups.length).toFixed(2)} ms`);
  
  console.log('-'.repeat(50));
}

// Test the algorithm's scalability
console.log('Testing algorithm scalability...');
console.log('='.repeat(50));

// Measure time complexity by increasing player count
const playerCounts = [10, 20, 40, 80, 160, 320];
const timings = [];

for (const count of playerCounts) {
  const players = generateRandomPlayers(count);
  
  const startTime = process.hrtime();
  createBasicGroups(players, 4);
  const endTime = process.hrtime(startTime);
  
  const executionTime = (endTime[0] * 1000) + (endTime[1] / 1000000);
  timings.push(executionTime);
  
  console.log(`${count} players: ${executionTime.toFixed(2)} ms`);
}

// Calculate growth rate
console.log('-'.repeat(50));
console.log('Growth analysis:');

for (let i = 1; i < playerCounts.length; i++) {
  const playerRatio = playerCounts[i] / playerCounts[i - 1];
  const timeRatio = timings[i] / timings[i - 1];
  
  console.log(`${playerCounts[i-1]} → ${playerCounts[i]} players (${playerRatio}x): Time increased by ${timeRatio.toFixed(2)}x`);
}

console.log('='.repeat(50)); 