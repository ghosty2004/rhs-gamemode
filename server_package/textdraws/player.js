const {
    CreatePlayerTextDraw, PlayerTextDrawLetterSize, PlayerTextDrawTextSize, 
    PlayerTextDrawAlignment, PlayerTextDrawColor, PlayerTextDrawUseBox, PlayerTextDrawBoxColor, 
    PlayerTextDrawSetShadow, PlayerTextDrawSetOutline, PlayerTextDrawBackgroundColor, 
    PlayerTextDrawFont, PlayerTextDrawSetProportional, PlayerTextDrawSetSelectable
} = require("samp-node-lib");

module.exports = {
    spec: null,
    targets_points: null,
    date: null,
    Load: function(player) {
        /* Spec TextDraw */
        this.spec = CreatePlayerTextDraw(player.playerid, 325.000000, 345.000000, "");
        PlayerTextDrawLetterSize(player.playerid, this.spec, 0.280000, 1.600000);
        PlayerTextDrawTextSize(player.playerid, this.spec, 1280.000000, 1280.000000);
        PlayerTextDrawAlignment(player.playerid, this.spec, 2);
        PlayerTextDrawColor(player.playerid, this.spec, 0xFFFFFFFF);
        PlayerTextDrawUseBox(player.playerid, this.spec, 0);
        PlayerTextDrawBoxColor(player.playerid, this.spec, 0x80808080);
        PlayerTextDrawSetShadow(player.playerid, this.spec, 2);
        PlayerTextDrawSetOutline(player.playerid, this.spec, 1);
        PlayerTextDrawBackgroundColor(player.playerid, this.spec, 0x000000FF);
        PlayerTextDrawFont(player.playerid, this.spec, 1);
        PlayerTextDrawSetProportional(player.playerid, this.spec, 1);
        PlayerTextDrawSetSelectable(player.playerid, this.spec, 0);

        /* Targets Points TextDraw */
        this.targets_points = CreatePlayerTextDraw(player.playerid, 637.000000, 396.000000, "~r~~h~Points: ~w~~h~0");
        PlayerTextDrawLetterSize(player.playerid, this.targets_points, 0.359999, 1.599999);
        PlayerTextDrawTextSize(player.playerid, this.targets_points, 1280.000000, 1280.000000);
        PlayerTextDrawAlignment(player.playerid, this.targets_points, 3);
        PlayerTextDrawColor(player.playerid, this.targets_points, 0xFF0000FF);
        PlayerTextDrawUseBox(player.playerid, this.targets_points, 0);
        PlayerTextDrawBoxColor(player.playerid, this.targets_points, 0x80808080);
        PlayerTextDrawSetShadow(player.playerid, this.targets_points, 1);
        PlayerTextDrawSetOutline(player.playerid, this.targets_points, 0);
        PlayerTextDrawBackgroundColor(player.playerid, this.targets_points, 0x000000FF);
        PlayerTextDrawFont(player.playerid, this.targets_points, 3);
        PlayerTextDrawSetProportional(player.playerid, this.targets_points, 1);
        PlayerTextDrawSetSelectable(player.playerid, this.targets_points, 0);

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