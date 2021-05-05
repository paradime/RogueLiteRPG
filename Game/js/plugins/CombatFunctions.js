/*:
 * @target MZ
 * @plugindesc Makes it so the default title screen is skipped when booting up the game and after a gameover.
 * @author
 */

(function() {
    const regularDmg = (a, b) => a.atk - (b.def/1)
    const regularMagicDmg = (a, b) => a.mat - (b.mdf/1)
    
    const CombatFunctions = {
        regularDamage: regularDmg,
        regularMagicDamage: regularMagicDmg,
        aoeRegularPhysDamage: (a,b) => regularDmg(a,b) * (2/4),
        aoeRegularMagicDamage: (a,b) => regularMagicDmg(a,b) * (2/4),
        rogue: {
            shadowStrike: (a,b) => CombatFunctions.regularDamage(a,b) * 0.1,
            eviscerate: (a,b) => CombatFunctions.regularDamage(a,b) * 3
        }
    };
    window.CombatFunctions = CombatFunctions 
})();