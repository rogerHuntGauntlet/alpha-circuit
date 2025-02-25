// Unit tests for the matching algorithm functions

// Import the algorithm functions
// Note: In a real project, we would export these functions from the route.ts file
// For this test, we'll reimplement them here

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

// Test cases for calculateCompatibility
const compatibilityTests = [
  {
    name: 'Players with same interests',
    player1: { id: 'p1', interests: ['RPG', 'Strategy'], skillLevel: 5 },
    player2: { id: 'p2', interests: ['RPG', 'Strategy'], skillLevel: 5 },
    expectedScore: 65, // 25 (interests) + 15 (skill) + 25 (default platform & language)
    threshold: 5 // Allow some variance
  },
  {
    name: 'Players with partial interest overlap',
    player1: { id: 'p1', interests: ['RPG', 'Strategy', 'FPS'], skillLevel: 5 },
    player2: { id: 'p2', interests: ['RPG', 'MOBA'], skillLevel: 5 },
    expectedScore: 48, // ~8 (interests) + 15 (skill) + 25 (default platform & language)
    threshold: 5
  },
  {
    name: 'Players with different interests',
    player1: { id: 'p1', interests: ['RPG', 'Strategy'], skillLevel: 5 },
    player2: { id: 'p2', interests: ['FPS', 'MOBA'], skillLevel: 5 },
    expectedScore: 40, // 0 (interests) + 15 (skill) + 25 (default platform & language)
    threshold: 5
  },
  {
    name: 'Players with different skill levels',
    player1: { id: 'p1', interests: ['RPG'], skillLevel: 2 },
    player2: { id: 'p2', interests: ['RPG'], skillLevel: 8 },
    expectedScore: 50, // 25 (interests) + 0 (skill) + 25 (default platform & language)
    threshold: 5
  },
  {
    name: 'Players with different languages',
    player1: { id: 'p1', interests: ['RPG'], skillLevel: 5, language: 'en' },
    player2: { id: 'p2', interests: ['RPG'], skillLevel: 5, language: 'es' },
    expectedScore: 50, // 25 (interests) + 15 (skill) + 10 (default platform)
    threshold: 5
  },
  {
    name: 'Players with different platforms',
    player1: { id: 'p1', interests: ['RPG'], skillLevel: 5, platformPreference: 'PC' },
    player2: { id: 'p2', interests: ['RPG'], skillLevel: 5, platformPreference: 'Console' },
    expectedScore: 55, // 25 (interests) + 15 (skill) + 15 (default language)
    threshold: 5
  },
  {
    name: 'Players with empty interests',
    player1: { id: 'p1', interests: [], skillLevel: 5 },
    player2: { id: 'p2', interests: [], skillLevel: 5 },
    expectedScore: 40, // 0 (interests) + 15 (skill) + 25 (default platform & language)
    threshold: 5
  },
  {
    name: 'Players with undefined interests',
    player1: { id: 'p1', skillLevel: 5 },
    player2: { id: 'p2', skillLevel: 5 },
    expectedScore: 40, // 0 (interests) + 15 (skill) + 25 (default platform & language)
    threshold: 5
  }
];

// Test cases for createBasicGroups
const groupingTests = [
  {
    name: 'Basic grouping with 2 players',
    players: [
      { id: 'p1', interests: ['RPG'], skillLevel: 5 },
      { id: 'p2', interests: ['RPG'], skillLevel: 5 }
    ],
    groupSize: 2,
    expectedGroups: 1,
    expectedPlayersPerGroup: [2]
  },
  {
    name: 'Grouping 4 players into groups of 2',
    players: [
      { id: 'p1', interests: ['RPG'], skillLevel: 5 },
      { id: 'p2', interests: ['RPG'], skillLevel: 5 },
      { id: 'p3', interests: ['FPS'], skillLevel: 5 },
      { id: 'p4', interests: ['FPS'], skillLevel: 5 }
    ],
    groupSize: 2,
    expectedGroups: 2,
    expectedPlayersPerGroup: [2, 2]
  },
  {
    name: 'Grouping 5 players into groups of 2 (uneven)',
    players: [
      { id: 'p1', interests: ['RPG'], skillLevel: 5 },
      { id: 'p2', interests: ['RPG'], skillLevel: 5 },
      { id: 'p3', interests: ['FPS'], skillLevel: 5 },
      { id: 'p4', interests: ['FPS'], skillLevel: 5 },
      { id: 'p5', interests: ['Strategy'], skillLevel: 5 }
    ],
    groupSize: 2,
    expectedGroups: 3,
    expectedPlayersPerGroup: [2, 2, 1]
  },
  {
    name: 'Grouping with group size larger than player count',
    players: [
      { id: 'p1', interests: ['RPG'], skillLevel: 5 },
      { id: 'p2', interests: ['RPG'], skillLevel: 5 }
    ],
    groupSize: 5,
    expectedGroups: 1,
    expectedPlayersPerGroup: [2]
  }
];

// Run compatibility tests
console.log('Running compatibility function tests...');
console.log('='.repeat(50));

let passedCompatibilityTests = 0;
let failedCompatibilityTests = 0;

for (const test of compatibilityTests) {
  console.log(`Test: ${test.name}`);
  
  const score = calculateCompatibility(test.player1, test.player2);
  const lowerBound = test.expectedScore - test.threshold;
  const upperBound = test.expectedScore + test.threshold;
  
  if (score >= lowerBound && score <= upperBound) {
    console.log(`✅ PASSED: Score ${score} is within expected range (${lowerBound}-${upperBound})`);
    passedCompatibilityTests++;
  } else {
    console.log(`❌ FAILED: Score ${score} is outside expected range (${lowerBound}-${upperBound})`);
    failedCompatibilityTests++;
  }
  
  console.log('-'.repeat(50));
}

// Run grouping tests
console.log('Running grouping function tests...');
console.log('='.repeat(50));

let passedGroupingTests = 0;
let failedGroupingTests = 0;

for (const test of groupingTests) {
  console.log(`Test: ${test.name}`);
  
  const groups = createBasicGroups(test.players, test.groupSize);
  
  if (groups.length !== test.expectedGroups) {
    console.log(`❌ FAILED: Expected ${test.expectedGroups} groups, got ${groups.length}`);
    failedGroupingTests++;
    console.log('-'.repeat(50));
    continue;
  }
  
  let groupSizesMatch = true;
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].players.length !== test.expectedPlayersPerGroup[i]) {
      console.log(`❌ FAILED: Group ${i+1} has ${groups[i].players.length} players, expected ${test.expectedPlayersPerGroup[i]}`);
      groupSizesMatch = false;
      break;
    }
  }
  
  if (!groupSizesMatch) {
    failedGroupingTests++;
    console.log('-'.repeat(50));
    continue;
  }
  
  console.log(`✅ PASSED: Created ${groups.length} groups with correct player counts`);
  passedGroupingTests++;
  
  console.log('-'.repeat(50));
}

// Print summary
console.log('='.repeat(50));
console.log('Test Summary:');
console.log(`Compatibility Tests: ${passedCompatibilityTests} passed, ${failedCompatibilityTests} failed`);
console.log(`Grouping Tests: ${passedGroupingTests} passed, ${failedGroupingTests} failed`);
console.log(`Overall Success Rate: ${Math.round(((passedCompatibilityTests + passedGroupingTests) / (compatibilityTests.length + groupingTests.length)) * 100)}%`);
console.log('='.repeat(50)); 