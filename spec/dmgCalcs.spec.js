const dmg = require('../utils/dmg');
var HeroClass = require('../utils/Classes/hero').class
var SwordsmanClass = require('../utils/Classes/swordsman').class
var RangerClass = require('../utils/Classes/ranger').class
describe("Damage Calculations", () => {
  describe("dungeon 1", () => {
    describe("boss 1", () => {
      it("is winnable", () => {
        blueHydra = 'Blue Hydra';
        const sim = dmg.CombatSimulation(
          [HeroClass, SwordsmanClass, RangerClass], 
          5,
          [blueHydra]
        )
        expect(sim.enemyCalculations.ttk > sim.partyCalculations.ttk).toBeTrue()
        expect(sim.enemyCalculations.ttk < sim.partyCalculations.ttk + 2).toBeTrue()
      })
    })
  })

})