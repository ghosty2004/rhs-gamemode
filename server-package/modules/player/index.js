module.exports = {
    Info: {},
    ResetVariables: function(player) {
        this.Info[player.playerid] = {
            LoggedIn: false,
            Language: 0,
            Fail_Logins: 0,
            Mail: "",
            Admin: 0,
            VIP: 0
        }
    }
};