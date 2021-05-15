// var ActorFile = require('./data/Actors.json')
var HeroClass = require('./Classes/hero.js').class
var SwordsmanClass = require('./Classes/swordsman').class
var RangerClass = require('./Classes/ranger').class
var BasicEnemy = require('./Enemies/Basic').enemy
var FileParsing = require('./FileParsing')
var CombatFunctions = require('./GameScripts/CombatFunctions');

/**
 * Utilities
 */

// Damage Calculation
var regularDamage = CombatFunctions.regularDamage 
var convertSpeed = function(a) {
    return a.agi/100;
}
var sum = (a,b) => a+b;

// Get Class Stats 1
var printDamage = function(classFile, level, enemyStats) {
    var class1Stats = FileParsing.getClassStatsFromFile(classFile, level)
    damagePerTurn = (classFile.dptFormula(
        class1Stats,
        enemyStats,
        regularDamage,
        convertSpeed
        )
    )
    // console.log(classFile.className + ":")
    // console.log("Base Damage:")
    // console.log(regularDamage(class1Stats,enemyStats))
    // console.log("Damage per turn:")
    // console.log(damagePerTurn + "\n")
    return damagePerTurn
}

var printEnemyDamage = function(eName, partyStats) {
    var enemyStats = FileParsing.getEnemyStatsFromFile(eName)
    damagePerTurn = (BasicEnemy.dptFormula(
        enemyStats,
        partyStats,
        regularDamage,
        convertSpeed
        )
    )
    // console.log(eName + ":")
    // console.log(enemyStats)
    // console.log("Base Damage:")
    // console.log(regularDamage(enemyStats, partyStats))
    // console.log("Damage per turn:")
    // console.log(damagePerTurn + "\n")
    return damagePerTurn
}

var getStatsAsGroupStats = function(enemiesArr) {
    stats = enemiesArr[0];
    stats.hp = enemiesArr.reduce((a, b) => a + b.hp, 0);
    stats.def = enemiesArr.reduce((a, b) => a + b.def, 0)/enemiesArr.length;
    stats.mdf = enemiesArr.reduce((a, b) => a + b.mdf, 0)/enemiesArr.length;
    return stats;
}
/**
 * Script
 */
// ENEMY DATA
var blueWolf = 'Blue Wolf';
var blueCrab = 'Blue Crab';
var evilTree = 'Evil Tree';
var blueHydra = 'Blue Hydra';
var redLizard = 'Red Lizard';
var fireGoblin = 'Fire Goblin';
var livingFire = 'Living Fire';
var aquaDevil = 'Aqua Boss';
var enemies = [blueHydra];
var enemyStats = getStatsAsGroupStats(enemies.map(enemy => FileParsing.getEnemyStatsFromFile(enemy)));

// PARTY DATA
var lvl = 5
var party = [HeroClass, SwordsmanClass, RangerClass]

var getPartyCalculations = function(partyArr, lvl, enemyArr) {
    var enemyStats = getStatsAsGroupStats(enemyArr.map(enemy => FileParsing.getEnemyStatsFromFile(enemy)));
    var partyDMG = partyArr.map(cl => printDamage(cl, lvl, enemyStats));
    var rawGroupDPT = partyDMG.reduce(sum, 0);
    var bonusMult = partyArr.find((cl) => cl === RangerClass) ? RangerClass.groupBonusDmg : 1;
    var totalGroupDPT = rawGroupDPT * bonusMult;
    var bonusDPT = totalGroupDPT - rawGroupDPT
    var ttk = enemyStats.hp / totalGroupDPT
    return {
        rawPartyDPT: rawGroupDPT,
        totalPartyDPT: totalGroupDPT,
        bonusDPT: bonusDPT,
        ttk: ttk
    }
}
var getEnemyCalculations = function(partyArr, lvl, enemyArr) {
    var partyStats = getStatsAsGroupStats(partyArr.map(cl => FileParsing.getClassStatsFromFile(cl, lvl)))
    var rawEnemyDPT = enemyArr
        .map(e => printEnemyDamage(e, partyStats))
        .reduce(sum, 0);
    return {
        partyStats: partyStats,
        rawEnemyDPT: rawEnemyDPT,
        ttk: partyStats.hp / rawEnemyDPT
    }
}

var CombatSimulation = function(partyArr, lvl, enemyArr, log=false) {
    combatSim = {
        partyCalculations: getPartyCalculations(partyArr, lvl, enemyArr),
        enemyCalculations: getEnemyCalculations(partyArr, lvl, enemyArr)
    }
    if (log) { logStats(combatSim) }
    return combatSim
}

var logStats = function(combatSim) {
    console.log("------------- PARTY DAMGE --------------")
    console.log("Raw group dpt: " + combatSim.partyCalculations.rawPartyDPT)
    console.log("Total group dpt: " + combatSim.partyCalculations.totalPartyDPT)
    console.log("Bonus DPT: " + combatSim.partyCalculations.bonusDPT)
    console.log("TTK: " + combatSim.partyCalculations.ttk)
    console.log("------------- ENEMY DAMAGE --------------")
    console.log("Party stats:")
    console.log(combatSim.enemyCalculations.partyStats)
    console.log("Raw Enemy dpt: " + combatSim.enemyCalculations.rawEnemyDPT);
    console.log("TTK: " + combatSim.enemyCalculations.ttk)

}
module.exports = {CombatSimulation}