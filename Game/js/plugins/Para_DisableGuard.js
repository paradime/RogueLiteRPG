/*:
 * @target MZ
 * @plugindesc Makes it so the default title screen is skipped when booting up the game and after a gameover.
 * @author
 */

(function() {

    /**
     * Remove Guard
     
    Window_ActorCommand.prototype.makeCommandList = function() {
        if (this._actor) {
            this.addAttackCommand();
            this.addSkillCommands();
            this.addItemCommand();
        }
    };
     */

    /**
     * Skip title screen
     */
    // Scene_Boot.prototype.startNormalGame = function() {
    //     this.checkPlayerLocation();
    //     DataManager.setupNewGame();
    //     SceneManager.goto(Scene_Map);
    // };

    /**
     * Change Speed function to be linear instead of the default sqrt
     */
    Game_Battler.prototype.tpbSpeed = function() {
        return this.speedFunction(this.agi) + 1;
    };

    Game_Battler.prototype.tpbBaseSpeed = function() {
        const baseAgility = this.paramBasePlus(6);
        return this.speedFunction(baseAgility) + 1;
    };

    Game_Battler.prototype.tpbRequiredCastTime = function() {
        const actions = this._actions.filter(action => action.isValid());
        const items = actions.map(action => action.item());
        const delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);
        return this.speedFunction(delay) / this.tpbSpeed();
    };

    Game_Battler.prototype.speedFunction = function(delay) {
        return delay;
    };

    Game_Action.prototype.applyCritical = function(damage) {
        return damage * 1.5;
    };

})();