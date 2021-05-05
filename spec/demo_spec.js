var CombatFunctions = require('./testFile');
describe("Combat Functions", function() {

  describe("regular damage", () => {
    it("calculates correctly", () => {
      a = {atk: 100};
      b = {def: 100};
      result = CombatFunctions.regularDamage(a, b);
      expect(result).toBe(50);
    })
  })

  describe("regular magic damage", () => {
    it("calculates correctly", () => {
      a = {mat: 100};
      b = {mdf: 100};
      result = CombatFunctions.regularMagicDamage(a, b);
      expect(result).toBe(50);
    })
  })
  
  describe("regular aoe phys damage", () => {
    it("calculates correctly", () => {
      a = {atk: 85};
      b = {def: 10};
      result = CombatFunctions.aoeRegularPhysDamage(a, b);
      expect(result).toBe(60);
    })
  })

  describe("regular aoe magic damage", () => {
    it("calculates correctly", () => {
      a = {mat: 85};
      b = {mdf: 10};
      result = CombatFunctions.aoeRegularMagicDamage(a, b);
      expect(result).toBe(60);
    })
  })

  describe("Rogue", () => {
    describe("shadow strike", () => {
      it("calculates correctly", () => {
        a = {atk: 100};
        b = {def: 0};
        result = Math.round(CombatFunctions.rogue.shadowStrike(a,b))
        expect(result).toBe(110)
      })
    })
    describe("eviscerate", () => {
      it("calculates correctly", () => {
        a = {atk: 100};
        b = {def: 100};
        result = CombatFunctions.rogue.eviscerate(a,b)
        expect(result).toBe(200);
      })

    })
  })

  describe("Druid", () => {
    describe("Lifebloom Ticks", () => {
      it("calculates 1 tick correctly", () => {
        a = {mat: 9}
        result = CombatFunctions.druid.lifebloomTick(a)
        expect(result).toBe(6)
      })
    })
    describe("Wild Growth Ticks", () => {
      it("calculates 1 tick correctly", () => {
        a = {mat: 9}
        result = CombatFunctions.druid.wildGrowthTick(a)
        expect(result).toBe(1)
      })
    })
    describe("Regrowth", () => {
      it("calculates correctly", () => {
        a = {mat: 10}
        result = CombatFunctions.druid.regrowth(a)
        expect(result).toBe(5)
      })
    })
  })

  describe("Hero", () => {
    describe("Flash Of Light", () => {
      it("calculates correctly", () => {
        a = {mat: 10}
        result = CombatFunctions.hero.flashOfLight(a)
        expect(result).toBe(10)
      })
    })
  })

  describe("Swordsman", () => {
    describe("Enrage", () => {
      it("calculates correctly", () => {
        a = {mhp: 100}
        result = CombatFunctions.swordsman.enrage(a)
        expect(result).toBe(5)
      })
    })
  })

  describe("Ranger", () => {
    describe("Aimed Shot", () => {
      it("calculates correctly", () => {
        a = {atk: 100};
        b = {def: 100};
        result = CombatFunctions.ranger.aimedShot(a,b)
        expect(result).toBe(250)
      })
    })
  })

  describe("Cleric", () => {
    describe("Flash Heal", () => {
      it("calculates correctly", () => {
        a = {mat: 10}
        result = CombatFunctions.cleric.flashHeal(a)
        expect(result).toBe(10)
      })
    })

    describe("Holy Light", () => {
      it("calculates correctly", () => {
        a = {mat: 10}
        result = CombatFunctions.cleric.holyLight(a)
        expect(result).toBe(30)
      })
    })
  })
});