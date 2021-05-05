const regularDmg = (a, b) => a.atk - (b.def/2)
const regularMagicDmg = (a, b) => a.mat - (b.mdf/2)

const CombatFunctions = {
    regularDamage: regularDmg,
    regularMagicDamage: regularMagicDmg,
    aoeRegularPhysDamage: (a,b) => regularDmg(a,b) * (3/4),
    aoeRegularMagicDamage: (a,b) => regularMagicDmg(a,b) * (3/4),
    rogue: {
        shadowStrike: (a,b) => CombatFunctions.regularDamage(a,b) * 1.1,
        eviscerate: (a,b) => CombatFunctions.regularDamage(a,b) * 4
    }
};

module.exports = CombatFunctions