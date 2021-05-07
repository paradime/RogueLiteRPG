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

// Get Class Stats 1
var printDamage = function(classFile, level, enemyStats) {
    var class1Stats = FileParsing.getClassStatsFromFile(classFile, level)
    console.log(classFile.className + ":")
    console.log("Base Damage:")
    console.log(regularDamage(class1Stats,enemyStats))
    console.log("Damage per turn:")
    damagePerTurn = (classFile.dptFormula(
        class1Stats,
        enemyStats,
        regularDamage,
        convertSpeed
        )
    )
    console.log(damagePerTurn + "\n")
    return damagePerTurn
}

var printEnemyDamage = function(eName, partyStats) {
    var enemyStats = FileParsing.getEnemyStatsFromFile(eName)
    console.log(eName + ":")
    console.log(enemyStats)
    console.log("Base Damage:")
    console.log(regularDamage(enemyStats, partyStats))
    console.log("Damage per turn:")
    damagePerTurn = (BasicEnemy.dptFormula(
        enemyStats,
        partyStats,
        regularDamage,
        convertSpeed
        )
    )
    console.log(damagePerTurn + "\n")
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

// CALCULATIONS
console.log("------------- PARTY DAMGE --------------")
var partyDMG = party.map(cl => printDamage(cl, lvl, enemyStats));
var rawGroupDPT = partyDMG.reduce((a,b)=> a+b, 0);
console.log("Raw group dpt: " + rawGroupDPT)
var totalGroupDPT = rawGroupDPT * RangerClass.groupBonusDmg;
console.log("Total group dpt: " + totalGroupDPT)
console.log("Bonus DPT: " + (totalGroupDPT - rawGroupDPT))
console.log("TTK: " + enemyStats.hp / totalGroupDPT)

console.log("------------- ENEMY DAMAGE --------------")

var partyStats = getStatsAsGroupStats(party.map(cl => FileParsing.getClassStatsFromFile(cl, lvl)))
console.log("party stats")
console.log(partyStats)
var rawEnemyDPT = enemies
    .map(e => printEnemyDamage(e, partyStats))
    .reduce((a,b) => a+b, 0);
console.log("Raw Enemy dpt: " + rawEnemyDPT);
console.log("TTK: " + partyStats.hp / rawEnemyDPT)
