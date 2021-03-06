const SWITCH_SWORDSMAN_ADDED = 5;
const HERO_ID = 1;
const SWORDSMAN_ID = 2;
const ROGUE_ID = 3;
const RANGER_ID = 4;
const MAGE_ID = 6;
const DRUID_ID = 7;
const CLERIC_ID = 8;
const VARIABLE_PARTY_MEMBER_TO_ADD = 7;

var generateFilterPartyMembers = function(gameParty, gameSwitches) {
  var filterArr = []
  filterArr.push(...gameParty._actors);
  if(gameSwitches._data[SWITCH_SWORDSMAN_ADDED] !== true) {
    filterArr.push(SWORDSMAN_ID);
  }
  return filterArr;
}

var filterRandomPartyMember = function(filterArr) {
  var partyMembersToAdd = EventFunctions.partyMembers
  var partyMembersToAddFiltered = partyMembersToAdd.filter(p => !filterArr.includes(p))
  return partyMembersToAddFiltered
}

var pickRandomPartyMember = function(possibleMembersArr){
  var dblPossibilities = [...possibleMembersArr, ...possibleMembersArr]
  var rnd = Math.floor(Math.random() * dblPossibilities.length)
  return dblPossibilities[rnd]
}

var addRandomPartyMember = function(gameVariables, gameSwitches, gameParty) {
  const filteredMembers = EventFunctions.generateFilterPartyMembers(gameParty, gameSwitches);
  const possibleMembers = EventFunctions.filterRandomPartyMember(filteredMembers);
  const pickedPartyMember = EventFunctions.pickRandomPartyMember(possibleMembers);
  gameVariables.setValue(VARIABLE_PARTY_MEMBER_TO_ADD, pickedPartyMember)
}

var autoAnalyzeEquipped = function(gameActors) {
  return undefined != gameActors._data.find(a => {
    if (a == undefined) { return false; }
    return a.equips().find(e => {
      if (e == undefined) { return false; }
      return e.id === 105
    });
  });
}

var autoAnalyze = function(gameActors, gameSwitches) {
  const SWITCH_ANALYZE = 7
  gameSwitches.setValue(SWITCH_ANALYZE, autoAnalyzeEquipped(gameActors));
}

var analyzeFunction = function(gameTroop, gameMessage) {
  for(var enemy of gameTroop._enemies) { 
    if(enemy._hidden || enemy._hp == 0){
    } else {
      gameMessage.setBackground(1);
      gameMessage.setPositionType(2);
      const percentLeft = Math.round((enemy._hp / enemy.mhp)*100)
      gameMessage.add(
          `${enemy.name()}${enemy._letter} has ${enemy._hp}(${percentLeft}%) hp left!`
      )
    }
  }
}

var setUnaddedXp = function(gameVariables, gameTroop, dataEnemies) {
  const VARIABLE_UNADDED_XP = 2
  var unaddedXp = 0;
  gameVariables.setValue(VARIABLE_UNADDED_XP, unaddedXp)
  gameTroop._enemies.forEach(enemy => {
    enemyData = dataEnemies[enemy._enemyId]
    if(enemy._hp === 0) { // full credit
      unaddedXp += enemyData.exp
    } else { // partial credit
      unaddedXp += Math.round(
        (1-(enemy._hp / enemy.mhp)) * (enemyData.exp/2)
      );
    }
  })
  gameVariables.setValue(VARIABLE_UNADDED_XP, unaddedXp);
}

var unlearnAllClassSkillsForActor = function(actorId, dataClasses, gameActors) {
  var classId = gameActors._data[actorId]._classId
  dataClasses[classId].learnings.forEach( skill => gameActors._data[actorId].forgetSkill(skill.skillId))
}

const EventFunctions = {
  partyMembers: [
    HERO_ID,
    SWORDSMAN_ID,
    ROGUE_ID,
    RANGER_ID,
    MAGE_ID,
    DRUID_ID,
    CLERIC_ID
  ],
  SWITCH_SWORDSMAN_ADDED: SWITCH_SWORDSMAN_ADDED,
  generateFilterPartyMembers: generateFilterPartyMembers,
  filterRandomPartyMember: filterRandomPartyMember,
  pickRandomPartyMember: pickRandomPartyMember,
  addRandomPartyMember: addRandomPartyMember,
  autoAnalyze: autoAnalyze,
  setUnaddedXp: setUnaddedXp,
  analyzeFunction: analyzeFunction,
  unlearnAllClassSkillsForActor: unlearnAllClassSkillsForActor
}

module.exports = EventFunctions