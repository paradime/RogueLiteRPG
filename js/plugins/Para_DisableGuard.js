/*:
 * @target MZ
 * @plugindesc Makes it so the default title screen is skipped when booting up the game and after a gameover.
 * @author
 */

(function() {

    Window_ActorCommand.prototype.makeCommandList = function() {
        if (this._actor) {
            this.addAttackCommand();
            this.addSkillCommands();
            this.addItemCommand();
        }
    };

    Scene_Boot.prototype.startNormalGame = function() {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Map);
    };


})();