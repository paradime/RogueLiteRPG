// var ActorFile = require('./data/Actors.json')
var ClassesFile = require('../data/Classes.json')
var EnemiesFile = require('../data/Enemies.json')
var HeroClass = require('./Classes/hero.js').class
var SwordsmanClass = require('./Classes/swordsman').class
var RangerClass = require('./Classes/ranger').class
var BasicEnemy = require('./Enemies/Basic').enemy

/**
 * Utilities
 */
// File Parsing
var findClass = function(className) {
    return ClassesFile.find(cl => (cl != null) ? cl.name == className : false)
}

var findEnemy = function(enemyName) {
    return EnemiesFile.find(enemy => (enemy != null) ? enemy.name == enemyName : false)
}
// Stat extraction
var getClassStats = function(cl, level) {
    var stats = {}
    statOrder = ['hp', 'mp', 'atk', 'def', 'mat', 'mdf', 'agi', 'luk']
    for(i in statOrder) {
        stats[statOrder[i]] = cl.params[i][level]
    }
    return stats
}

var getEnemyStats = function(enemy) {
    var stats = {}
    statOrder = ['hp', 'mp', 'atk', 'def', 'mat', 'mdf', 'agi', 'luk']
    for(i in statOrder) {
        stats[statOrder[i]] = enemy.params[i]
    }
    return stats
}

// Damage Calculation
var regularDamage = function(a, b) {
    return a.atk - (b.def/2)
}
var convertSpeed = function(a) {
    return a.agi/100;
}

var getClassStatsFromFile = function(classFile, level) {
    class1 = findClass(classFile.className);
    return classStats = getClassStats(class1, level);
}
// Get Class Stats 1
var printDamage = function(classFile, level, enemyStats) {
    var class1Stats = getClassStatsFromFile(classFile, level)
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
    var enemy = findEnemy(eName)
    console.log(eName + ":")
    console.log(getEnemyStats(enemy))
    var enemyStats = getEnemyStats(enemy)
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
var enemyName1 = 'Blue Wolf';
var enemyName2 = 'Blue Crab';
var enemyName3 = 'Evil Tree';
var enemyName4 = 'Blue Hydra';
var enemies = [enemyName4];
var enemyStats = getStatsAsGroupStats(enemies.map(eName => getEnemyStats(findEnemy(eName))));

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

var partyStats = getStatsAsGroupStats(party.map(cl => getClassStatsFromFile(cl, lvl)))
console.log("party stats")
console.log(partyStats)
var rawEnemyDPT = enemies
    .map(e => printEnemyDamage(e, partyStats))
    .reduce((a,b) => a+b, 0);
console.log("Raw Enemy dpt: " + rawEnemyDPT);
console.log("TTK: " + partyStats.hp / rawEnemyDPT)
