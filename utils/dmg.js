// var ActorFile = require('./data/Actors.json')
var ClassesFile = require('../data/Classes.json')
var EnemiesFile = require('../data/Enemies.json')

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
var heroDptFormula = function(heroStats, enemyStats) {
    return regularDamage(heroStats, enemyStats) * convertSpeed(heroStats) * 1;
}

/**
 * Script
 */
var className = 'Hero';
var enemyName = 'D1 Boss';

// var cleric = ActorFile.find(actor => (actor != null) ? actor.name === 'Cleric' : false)
class1 = findClass(className)

console.log(className + ":")
console.log(getClassStats(class1, 10))
var class1Stats = getClassStats(class1, 10)

var enemy = findEnemy(enemyName)
console.log(enemyName + ":")
console.log(getEnemyStats(enemy))
var crowEnemyStats = getEnemyStats(enemy)

console.log("Damage per turn:")
console.log(heroDptFormula(class1Stats, crowEnemyStats))