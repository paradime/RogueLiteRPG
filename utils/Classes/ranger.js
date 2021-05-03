exports.class = {
  className: 'Ranger',
  // stats: {},
  groupBonusDmg: 1.25,
  dptFormula: function(classStats, enemyStats, regularDamageFun, speedFun) {
    totalTurns = 21;
    hitPercent = .97;
    critDamageMult = 1.5;
    critPercent = .05;
    return (25*regularDamageFun(classStats, enemyStats)
      * speedFun(classStats)
      * hitPercent
      * ((1-critPercent) + (critDamageMult * critPercent)))
      /totalTurns;
  }
}
