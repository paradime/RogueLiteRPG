var partyMembersToAdd = [1,2,3,4,6,7,8]
for(var actorId of $gameParty._actors) {
    partyMembersToAdd = partyMembersToAdd.filter(p => p != actorId)
}
if($gameSwitches._data[5] !== true) {
    partyMembersToAdd = partyMembersToAdd.filter(p => p != 2);
}
var rnd = Math.floor(Math.random() * partyMembersToAdd.length)
console.log(partyMembersToAdd)
$gameVariables.setValue(7,partyMembersToAdd[rnd]);

for(var enemy of $gameTroop._enemies) { 
    $gameMessage.setBackground(1);
    $gameMessage.setPositionType(2);
    $gameMessage.add(
        $dataEnemies[enemy._enemyId].name + enemy._letter + " has " + enemy._hp + " hp left!") 
}

$gameVariables.setValue(3, 0)
var unaddedXp = 0;
for(var enemy of $gameTroop._enemies) { 
    if(enemy._hp === 0) {
        unaddedXp += $dataEnemies[enemy._enemyId].exp
    }
}
$gameVariables.setValue(2, unaddedXp)

var partyMemberToAdd = Math.randomInt(5)+1;
if (partyMemberToAdd == 1) {
    $gameParty.addActor()
}

let Http = new XMLHttpRequest();
let url='https://baconipsum.com/api/?type=meat-and-filler';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
  console.log(Http.responseText.slice(0,5))
    $gameMessage.setBackground(1);
    $gameMessage.setPositionType(2);
    $gameMessage.add(Http.responseText.slice(0,5));
}
/*:
 * @target MZ
 * @plugindesc 
 * @author 
 *
 * @help .js
 *
 * This plugin provides a command to call a common event when a picture is
 * clicked.
 *
 * Use it in the following procedure.
 *   1. Execute "Show Picture" to display your button image.
 *   2. Call the plugin command "Set Button Picture".
 *
 * @command set
 * @text Set Button Picture
 * @desc Makes the specified picture clickable.
 *
 * @arg pictureId
 * @type number
 * @min 1
 * @max 100
 * @default 1
 * @text Picture Number
 * @desc Control number of the picture.
 *
 * @arg commonEventId
 * @type common_event
 * @default 1
 * @text Common Event
 * @desc Common event to call when the picture is clicked.
 */
(() => {

})