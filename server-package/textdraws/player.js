const {
    CreatePlayerTextDraw, PlayerTextDrawLetterSize, PlayerTextDrawTextSize, 
    PlayerTextDrawAlignment, PlayerTextDrawColor, PlayerTextDrawUseBox, PlayerTextDrawBoxColor, 
    PlayerTextDrawSetShadow, PlayerTextDrawSetOutline, PlayerTextDrawBackgroundColor, 
    PlayerTextDrawFont, PlayerTextDrawSetProportional, PlayerTextDrawSetSelectable
} = require("samp-node-lib");

module.exports = {
    date: null,
    Load: function(player) {
        /* Date TextDraw */
        const d = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        this.date = CreatePlayerTextDraw(player.playerid, 634.000000, 5.000000, `${("0" + d.getDate()).slice(-2)} ${monthNames[d.getMonth()]} ${d.getFullYear()}`);
        PlayerTextDrawLetterSize(player.playerid, this.date, 0.249999, 1.100000);
        PlayerTextDrawTextSize(player.playerid, this.date, 1280.000000, 1280.000000);
        PlayerTextDrawAlignment(player.playerid, this.date, 3);
        PlayerTextDrawColor(player.playerid, this.date, 0xFFFFFFFF);
        PlayerTextDrawUseBox(player.playerid, this.date, 0);
        PlayerTextDrawBoxColor(player.playerid, this.date, 0x80808080);
        PlayerTextDrawSetShadow(player.playerid, this.date, 1);
        PlayerTextDrawSetOutline(player.playerid, this.date, 0);
        PlayerTextDrawBackgroundColor(player.playerid, this.date, 0x000000FF);
        PlayerTextDrawFont(player.playerid, this.date, 3);
        PlayerTextDrawSetProportional(player.playerid, this.date, 1);
        PlayerTextDrawSetSelectable(player.playerid, this.date, 0);
    }
}