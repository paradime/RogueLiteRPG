exports.class = {
  className: 'Hero',
  // stats: {},
  dptFormula: function(classStats, enemyStats, regularDamageFun, speedFun) {
    totalTurns = 1;
    hitPercent = .97;
    critDamageMult = 1.5;
    critPercent = .05;
    return regularDamageFun(classStats, enemyStats)
      * speedFun(classStats)
      * totalTurns
      * hitPercent
      * ((1-critPercent) + (critDamageMult * critPercent));
  }
}
