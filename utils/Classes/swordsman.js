exports.class = {
  className: 'Swordsman',
  // stats: {},
  dptFormula: function(classStats, enemyStats, regularDamageFun, speedFun) {
    totalTurns = 4;
    hitPercent = .97;
    critDamageMult = 1.5;
    critPercent = .05;
    return (5*regularDamageFun(classStats, enemyStats)
      * speedFun(classStats)
      * hitPercent
      * ((1-critPercent) + (critDamageMult * critPercent)))
      / totalTurns;
  }
}
