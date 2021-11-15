module.exports = {
    Info: {},
    ResetVariables: function(player) {
        this.Info[player.playerid] = {
            LoggedIn: false,
            Mail: ""
        }
    }
};