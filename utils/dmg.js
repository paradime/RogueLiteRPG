// var ActorFile = require('./data/Actors.json')
var ClassesFile = require('../data/Classes.json')
var EnemiesFile = require('../data/Enemies.json')
var HeroClass = require('./Classes/hero.js').class
var SwordsmanClass = require('./Classes/swordsman').class
var RangerClass = require('./Classes/ranger').class

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

/**
 * Script
 */
// ENEMY
var enemyName = 'D1 Boss';
var enemy = findEnemy(enemyName)
console.log(enemyName + ":")
console.log(getEnemyStats(enemy))
var crowEnemyStats = getEnemyStats(enemy)

// Get Class Stats 1
var printDamage = function(classFile) {
    class1 = findClass(classFile.className)
    console.log(classFile.className + ":")
    // console.log(getClassStats(class1, 15))
    var class1Stats = getClassStats(class1, 15)
    console.log("Base Damage:")
    console.log(regularDamage(class1Stats,crowEnemyStats))
    console.log("Damage per turn:")
    damagePerTurn = (classFile.dptFormula(
        class1Stats,
        crowEnemyStats,
        regularDamage,
        convertSpeed
        )
    )
    console.log(damagePerTurn + "\n")
    return damagePerTurn
}
party1dpt = printDamage(HeroClass);
party2dpt = printDamage(SwordsmanClass);
party3dpt = printDamage(RangerClass);
rawGroupDPT = party1dpt + party2dpt + party3dpt;
console.log("Raw group dpt: " + rawGroupDPT)
totalGroupDPT = rawGroupDPT * RangerClass.groupBonusDmg;
console.log("Total group dpt: " + totalGroupDPT)
console.log("Bonus DPT: " + (totalGroupDPT - rawGroupDPT))
console.log("TTK: " + crowEnemyStats.hp / totalGroupDPT)
