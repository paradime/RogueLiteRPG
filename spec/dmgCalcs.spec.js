const dmg = require('../utils/dmg');
var HeroClass = require('../utils/Classes/hero').class
var SwordsmanClass = require('../utils/Classes/swordsman').class
var RangerClass = require('../utils/Classes/ranger').class

const isTuned = function(sim, turnAdjustment = 0) {
  // winnable
  expect(sim.enemyCalculations.ttk)
    .toBeGreaterThan(sim.partyCalculations.ttk + turnAdjustment);
  // not a pushover
  expect(sim.enemyCalculations.ttk)
    .toBeLessThan(sim.partyCalculations.ttk + turnAdjustment + 2);
}

describe("Damage Calculations", () => {
  const party = [HeroClass, SwordsmanClass, RangerClass]
  describe("dungeon 1", () => {
    const blueWolf = 'Blue Wolf';
    const blueCrab = 'Blue Crab';

    describe("encounter 1", () => {
      it("is winnable", () => {
        const enemies = [blueWolf, blueWolf];
        const level = 1;
        const sim = dmg.CombatSimulation(party, level, enemies)
        isTuned(sim, 2)
      })
    })
    describe("boss 1", () => {
      it("is winnable", () => {
        const blueHydra = 'Blue Hydra';
        const enemies = [blueHydra];
        const level = 5;
        const sim = dmg.CombatSimulation(party, level, enemies)
        isTuned(sim)
      })
    })
  })

  describe("dungeon 2", () => {
    const redLizard = 'Red Lizard';
    const fireGoblin = 'Fire Goblin';
    const livingFire = 'Living Fire';

    describe("miniboss 1", () => {
      it("is winnable", () => {
        const aquaBoss = 'Aqua Boss';
        const enemies = [aquaBoss, redLizard, fireGoblin]
        const level = 8;
        const turnAdjustment = 4;
        const sim = dmg.CombatSimulation(party, level, enemies)
        isTuned(sim, turnAdjustment)
      })
    })
  })
})