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
});