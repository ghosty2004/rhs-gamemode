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
        
        this.date = CreatePlayerTextDraw(playerid, 634.000000, 5.000000, "16 November 2021"); `${d.getTime()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
        PlayerTextDrawLetterSize(playerid, this.date, 0.249999, 1.100000);
        PlayerTextDrawTextSize(playerid, this.date, 1280.000000, 1280.000000);
        PlayerTextDrawAlignment(playerid, this.date, 3);
        PlayerTextDrawColor(playerid, this.date, 0xFFFFFFFF);
        PlayerTextDrawUseBox(playerid, this.date, 0);
        PlayerTextDrawBoxColor(playerid, this.date, 0x80808080);
        PlayerTextDrawSetShadow(playerid, this.date, 1);
        PlayerTextDrawSetOutline(playerid, this.date, 0);
        PlayerTextDrawBackgroundColor(playerid, this.date, 0x000000FF);
        PlayerTextDrawFont(playerid, this.date, 3);
        PlayerTextDrawSetProportional(playerid, this.date, 1);
        PlayerTextDrawSetSelectable(playerid, this.date, 0);
    }
}