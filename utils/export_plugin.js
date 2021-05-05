const fs = require('fs')

fs.readFile('./spec/testFile.js', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  var asLines = data.split('\n')
  var header = `/*:
* @target MZ
* @plugindesc Makes it so the default title screen is skipped when booting up the game and after a gameover.
* @author
*/

(function() {
`
  var footer = `
window.CombatFunctions = CombatFunctions
})();
`
  var newData = header + asLines.slice(0, asLines.length-1).join('\n') + footer
  fs.writeFileSync('./Game/js/plugins/CombatFunctions.js', newData)
});