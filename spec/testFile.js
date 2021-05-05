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
    },
    druid: {
        lifebloomTick: (a) => a.mat * 2 * (1/3), // coefficient * ticks
        wildGrowthTick: (a) => a.mat/(3*3), // ticks * targets,
        regrowth: (a) => a.mat * (1/2)
    },
    hero: {
        flashOfLight: (a) => a.mat
    },
    swordsman: {
        enrage: (a) => a.mhp * .05
    },
    ranger: {
        aimedShot: (a,b) => regularDmg(a,b) * 5
    },
    cleric: {
        flashHeal: (a) => a.mat,
        holyLight: (a) => a.mat * 3
    },
    commonEvents: {
        calculateHots: function() {
            $gameVariables.setValue(106, `
                hpToAdd = 0;
                hpToAdd += this.states().find(st => st.id === 34) ? $gameVariables._data[105] : 0; // wild growth
                hpToAdd += this.states().find(st => st.id === 33) ? $gameVariables._data[102] : 0; // life bloom  
                if(hpToAdd > 0) {
                    this._result.clear();
                    this._result.used = this._result.success = this._result.hpAffected = true;
                    this.gainHp(hpToAdd);
                    this.startDamagePopup();
                    $gameTemp.requestBattleRefresh();
                }
            `);
        },
        snapshotWildGrowth: function() {
            $gameVariables.setValue(104, `
                var actor = $gameActors._data.find(actor => (actor != null) ? actor._name === "Druid" : false);
                var val = Math.round(CombatFunctions.druid.wildGrowthTick(actor))
                $gameVariables.setValue(105, val);
            `);
        },
        snapshotLifebloom: function() {
            $gameVariables.setValue(101, `
                var actor = $gameActors._data.find(actor => (actor != null) ? actor._name === "Druid" : false);
                $gameVariables.setValue(102, Math.round(CombatFunctions.druid.lifebloomTick(actor)));
            `);
        }
    }
};

module.exports = CombatFunctions