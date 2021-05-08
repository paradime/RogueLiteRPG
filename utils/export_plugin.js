const fs = require('fs')

var header = `/*:
* @target MZ
* @plugindesc Makes it so the default title screen is skipped when booting up the game and after a gameover.
* @author
*/

(function() {
`

fs.readFile('./utils/GameScripts/CombatFunctions.js', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  var asLines = data.split('\n')
  var footer = `
  window.CombatFunctions = CombatFunctions
  })();
  `
  var newData = header + asLines.slice(0, asLines.length-1).join('\n') + footer
  fs.writeFileSync('./Game/js/plugins/CombatFunctions.js', newData)
});

fs.readFile('./utils/GameScripts/EventFunctions.js', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  var asLines = data.split('\n')
  var footer = `
  window.EventFunctions = EventFunctions
  })();
  `
  var newData = header + asLines.slice(0, asLines.length-1).join('\n') + footer
  fs.writeFileSync('./Game/js/plugins/EventFunctions.js', newData)
});