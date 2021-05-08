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
  addRandomPartyMember: addRandomPartyMember
}

module.exports = EventFunctions