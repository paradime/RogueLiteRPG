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
    const redWorm = 'Red Worm';
    const phoenixGoblin = 'Phoenix Goblin';
    const treasureOgre = 'Fireproof Treasure Ogre'

    describe("trash", () => {
      it("red worm 1 is winnable", () => {
        const enemies = [redWorm]
        const level = 9;
        const turnAdjustment = 4;
        const sim = dmg.CombatSimulation(party, level, enemies)
        isTuned(sim, turnAdjustment)
      })

      it("red worm 1 is winnable", () => {
        const enemies = [redWorm]
        const level = 10;
        const turnAdjustment = 4;
        const sim = dmg.CombatSimulation(party, level, enemies)
        isTuned(sim, turnAdjustment)
      })

      it("fire proof ogre is winnable", () => {
        const enemies = [treasureOgre, treasureOgre]
        const level = 10;
        const turnAdjustment = 3;
        const sim = dmg.CombatSimulation(party, level, enemies)
        isTuned(sim, turnAdjustment)
      })

      it("red worm 2 is winnable", () => {
        const enemies = [redWorm, redWorm]
        const level = 13;
        const turnAdjustment = 1;
        const sim = dmg.CombatSimulation(party, level, enemies)
        isTuned(sim, turnAdjustment)
      })
    })
    describe("miniboss 1", () => {
      it("is winnable", () => {
        const aquaBoss = 'Aqua Boss';
        const enemies = [aquaBoss, redLizard, fireGoblin]
        const level = 9;
        const turnAdjustment = 4;
        const sim = dmg.CombatSimulation(party, level, enemies)
        isTuned(sim, turnAdjustment)
      })
    })

    describe("miniboss 2", () => {
      it("is winnable", () => {
        const pyrix = 'Pyrix';
        const enemies = [pyrix]
        const level = 11;
        const turnAdjustment = 2;
        const sim = dmg.CombatSimulation(party, level, enemies)
        isTuned(sim, turnAdjustment)
      })
    })

    describe("miniboss 3", () => {
      it("red goblins is winnable", () => {
        const enemies = [phoenixGoblin, phoenixGoblin]
        const level = 13;
        const sim = dmg.CombatSimulation(party, level, enemies)
        expect(sim.partyCalculations.ttk).toBeGreaterThan(3)
        expect(sim.partyCalculations.ttk).toBeLessThan(5)
      })
      it("is winnable", () => {
        const phoenix = 'Phoenix'
        const enemies1 = [phoenix]
        const enemies2 = [fireGoblin, fireGoblin]
        const level = 13;
        const turnAdjustment = 1;
        const sim1 = dmg.CombatSimulation(party, level, enemies1)
        const sim2 = dmg.CombatSimulation(party, level, enemies2)
        const totalSim = {
          partyCalculations: {
            ttk: (sim1.partyCalculations.ttk * 2) + sim2.partyCalculations.ttk
          },
          enemyCalculations: {
            ttk: (sim1.enemyCalculations.ttk/2) // 2 phoenixs
          }
        }
        isTuned(totalSim, turnAdjustment)
      })
    })

    describe("boss", () => {
      it("is winnable", () => {
        const redDragon = 'Red Dragon';
        const enemies = [redDragon]
        const level = 15;
        const turnAdjustment = 0; // this should be 0?
        const sim = dmg.CombatSimulation(party, level, enemies)
        isTuned(sim, turnAdjustment)
      })

    })
  })
})