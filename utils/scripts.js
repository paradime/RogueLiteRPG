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