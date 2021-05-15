var ClassesFile = require('../Game/data/Classes.json')
var EnemiesFile = require('../Game/data/Enemies.json')
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

var getClassStatsFromFile = function(classFile, level) {
    class1 = findClass(classFile.className);
    return classStats = getClassStats(class1, level);
}

var getEnemyStats = function(enemy) {
    var stats = {}
    statOrder = ['hp', 'mp', 'atk', 'def', 'mat', 'mdf', 'agi', 'luk']
    for(i in statOrder) {
        stats[statOrder[i]] = enemy.params[i]
    }
    return stats
}

var getEnemyStatsFromFile = function(enemyName) {
  return getEnemyStats(findEnemy(enemyName));
}

module.exports = {
  // findClass, 
  // findEnemy, 
  // getClassStats, 
  // getEnemyStats,
  getClassStatsFromFile, 
  getEnemyStatsFromFile
}