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

$gameVariables.setValue(101, `
    var mat = $gameActors._data.find(actor => (actor != null) ? actor._name === "Druid" : false).mat;
    $gameVariables.setValue(102, Math.round(mat*2*(1/3)));
`);
$gameVariables.setValue(106, `
  this._result.clear();
  this._result.used = this._result.success = this._result.hpAffected = true;
  this.gainHp($gameVariables._data[107]);
  this.startDamagePopup();
  $gameVariables.setValue(107, 0);
  $gameTemp.requestBattleRefresh();
`);
hpToAdd += this.states().find(st => st.id === 34) ? $gameVariables._data[105] : 0; // wild growth
hpToAdd += this.states().find(st => st.id === 33) ? $gameVariables._data[102] : 0; // life bloom
                this._result.clear();
                this._result.used = this._result.success = this._result.hpAffected = true;
                hpToAdd = 0;
                hpToAdd += this.states().find(st => st.id === 34) ? $gameVariables._data[105] : 0; // wild growth
                hpToAdd += this.states().find(st => st.id === 33) ? $gameVariables._data[102] : 0; // life bloom  
                if(hpToAdd > 0) {
                    this.gainHp(hpToAdd);
                    this.startDamagePopup();
                    $gameTemp.requestBattleRefresh();
                }

for(var enemy of $gameTroop._enemies) {
    traits = $dataEnemies[enemy._enemyId].traits
    for(var trait of traits) {
        if (trait.code === 13) {
            enemy.addNewState(trait.dataId)
        }
    }
}


// Initialize Choices Array
var choicez = ["choice1", "choice2", "choice3", "choice4"];
// Set Message Choices
$gameMessage.setChoices(choicez, 0, -1);
// Set Message Background
$gameMessage.setChoiceBackground(0);
// Set Message Position
$gameMessage.setChoicePositionType(1);
// Record Outcome in a Variable
$gameMessage.setChoiceCallback(n => {
    console.log(n)
    console.log(choicez)
    //this._branch[this._indent] = n;
    // $gameVariables.setValue(variableIndex, n);
});

// You must add this in a new script call
this.setWaitMode("message");

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

$gameVariables.setValue(2, 0)
var unaddedXp = 0;
for(var enemy of $gameTroop._enemies) { 
    if(enemy._hp === 0) {
        unaddedXp += $dataEnemies[enemy._enemyId].exp
    }
}
$gameVariables.setValue(2, unaddedXp);


for(var enemy of $gameTroop._enemies) { 
    $gameMessage.setBackground(1);
    $gameMessage.setPositionType(2);
    const percentLeft = Math.round((enemy._hp / enemy.mhp)*100)
    $gameMessage.add(
        `${enemy.name()}${enemy._letter} has ${enemy._hp}(${percentLeft}%) hp left!`
    )
}

// unlearn all skills from current class
// (actorId) -> {executeUnlearning}
var actorId=1;
var classId = $gameActors._data[actorId]._classId
$dataClasses[classId].learnings.forEach( skill => $gameActors._data[actorId].forgetSkill(skill.skillId))