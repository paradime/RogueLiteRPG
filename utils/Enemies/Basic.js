exports.enemy = {
  // className: 'Swordsman',
  // stats: {},
  dptFormula: function(enemyStats, classStats, regularDamageFun, speedFun) {
    totalTurns = 1;
    hitPercent = .95;
    critDamageMult = 1.5;
    critPercent = .05;
    return (regularDamageFun(enemyStats, classStats)
      * speedFun(enemyStats)
      * hitPercent
      * ((1-critPercent) + (critDamageMult * critPercent)))
      / totalTurns;
  }
}