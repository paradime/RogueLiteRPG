var EventFunctions = require('../utils/GameScripts/EventFunctions');

describe('Event Functions', () => {
  describe("filterPartyMembers", () => {
    it('returns a list of party members if any exist in the party', () => {
      data = emptyArr()
      data[5] = true;
      const gameSwitches = { _data: data }
      const gameParty = { _actors: [1,2] }
      var partyToFilter = EventFunctions.generateFilterPartyMembers(gameParty, gameSwitches);
      expect(partyToFilter).toEqual([1,2])
    })
    it('filters out 2 if they havent been added yet', () => {
      data = emptyArr()
      data[5] = false;
      const gameSwitches = { _data: data }
      const gameParty = { _actors: [1] }
      var partyToFilter = EventFunctions.generateFilterPartyMembers(gameParty, gameSwitches);
      expect(partyToFilter).toEqual([1,2])
    })
  })

  describe('ChooseRandomPartyMember', () => {
    it('returns the original list with an empty filter', () =>{
      const filteredArr = []
      var expected = EventFunctions.partyMembers;
      var possibilities = EventFunctions.filterRandomPartyMember(filteredArr);
      expect(possibilities).toEqual(expected)
    })
    it('removes values from the original list with a filter', () =>{
      const filteredArr = [1,2]
      var possibilities = EventFunctions.filterRandomPartyMember(filteredArr);
      expect(possibilities).toEqual([3,4,6,7,8])
    })
  })
})

var emptyArr = () => [...Array(6).keys()].map(k => undefined);
