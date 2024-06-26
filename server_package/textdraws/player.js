const {
    CreatePlayerTextDraw, PlayerTextDrawLetterSize, PlayerTextDrawTextSize, 
    PlayerTextDrawAlignment, PlayerTextDrawColor, PlayerTextDrawUseBox, PlayerTextDrawBoxColor, 
    PlayerTextDrawSetShadow, PlayerTextDrawSetOutline, PlayerTextDrawBackgroundColor, 
    PlayerTextDrawFont, PlayerTextDrawSetProportional, PlayerTextDrawSetSelectable, PlayerTextDrawSetPreviewModel,
    PlayerTextDrawSetPreviewRot
} = require("../libs/samp");

module.exports = {
    gangWarInfo1: {},
    gangWarInfo2: {},
    spec: {},
    targets_points: {},
    date: {},
    
    Load(player) {
        // => Gang War Info 1
        this.gangWarInfo1[player.playerid] = CreatePlayerTextDraw(player.playerid, 634.000000, 417.000000, "");
        PlayerTextDrawLetterSize(player.playerid, this.gangWarInfo1[player.playerid], 0.350000, 1.900000);
        PlayerTextDrawTextSize(player.playerid, this.gangWarInfo1[player.playerid], 1280.000000, 1280.000000);
        PlayerTextDrawAlignment(player.playerid, this.gangWarInfo1[player.playerid], 3);
        PlayerTextDrawColor(player.playerid, this.gangWarInfo1[player.playerid], 0xFFFFFFAA);
        PlayerTextDrawUseBox(player.playerid, this.gangWarInfo1[player.playerid], 0);
        PlayerTextDrawBoxColor(player.playerid, this.gangWarInfo1[player.playerid], 0x80808080);
        PlayerTextDrawSetShadow(player.playerid, this.gangWarInfo1[player.playerid], 1);
        PlayerTextDrawSetOutline(player.playerid, this.gangWarInfo1[player.playerid], 0);
        PlayerTextDrawBackgroundColor(player.playerid, this.gangWarInfo1[player.playerid], 0x000000FF);
        PlayerTextDrawFont(player.playerid, this.gangWarInfo1[player.playerid], 1);
        PlayerTextDrawSetProportional(player.playerid, this.gangWarInfo1[player.playerid], 1);
        PlayerTextDrawSetSelectable(player.playerid, this.gangWarInfo1[player.playerid], 0);

        // => Gang War Info 2
        this.gangWarInfo2[player.playerid] = CreatePlayerTextDraw(player.playerid, 634.000000, 402.000000, "");
        PlayerTextDrawLetterSize(player.playerid, this.gangWarInfo2[player.playerid], 0.350000, 1.900000);
        PlayerTextDrawTextSize(player.playerid, this.gangWarInfo2[player.playerid], 1280.000000, 1280.000000);
        PlayerTextDrawAlignment(player.playerid, this.gangWarInfo2[player.playerid], 3);
        PlayerTextDrawColor(player.playerid, this.gangWarInfo2[player.playerid], 0xFFFFFFAA);
        PlayerTextDrawUseBox(player.playerid, this.gangWarInfo2[player.playerid], 0);
        PlayerTextDrawBoxColor(player.playerid, this.gangWarInfo2[player.playerid], 0x80808080);
        PlayerTextDrawSetShadow(player.playerid, this.gangWarInfo2[player.playerid], 1);
        PlayerTextDrawSetOutline(player.playerid, this.gangWarInfo2[player.playerid], 0);
        PlayerTextDrawBackgroundColor(player.playerid, this.gangWarInfo2[player.playerid], 0x000000FF);
        PlayerTextDrawFont(player.playerid, this.gangWarInfo2[player.playerid], 1);
        PlayerTextDrawSetProportional(player.playerid, this.gangWarInfo2[player.playerid], 1);
        PlayerTextDrawSetSelectable(player.playerid, this.gangWarInfo2[player.playerid], 0);

        // => Spec
        this.spec[player.playerid] = CreatePlayerTextDraw(player.playerid, 325.000000, 345.000000, "");
        PlayerTextDrawLetterSize(player.playerid, this.spec[player.playerid], 0.280000, 1.600000);
        PlayerTextDrawTextSize(player.playerid, this.spec[player.playerid], 1280.000000, 1280.000000);
        PlayerTextDrawAlignment(player.playerid, this.spec[player.playerid], 2);
        PlayerTextDrawColor(player.playerid, this.spec[player.playerid], 0xFFFFFFFF);
        PlayerTextDrawUseBox(player.playerid, this.spec[player.playerid], 0);
        PlayerTextDrawBoxColor(player.playerid, this.spec[player.playerid], 0x80808080);
        PlayerTextDrawSetShadow(player.playerid, this.spec[player.playerid], 2);
        PlayerTextDrawSetOutline(player.playerid, this.spec[player.playerid], 1);
        PlayerTextDrawBackgroundColor(player.playerid, this.spec[player.playerid], 0x000000FF);
        PlayerTextDrawFont(player.playerid, this.spec[player.playerid], 1);
        PlayerTextDrawSetProportional(player.playerid, this.spec[player.playerid], 1);
        PlayerTextDrawSetSelectable(player.playerid, this.spec[player.playerid], 0);

        // => Targets Points
        this.targets_points[player.playerid] = CreatePlayerTextDraw(player.playerid, 637.000000, 396.000000, "~r~~h~Points: ~w~~h~0");
        PlayerTextDrawLetterSize(player.playerid, this.targets_points[player.playerid], 0.359999, 1.599999);
        PlayerTextDrawTextSize(player.playerid, this.targets_points[player.playerid], 1280.000000, 1280.000000);
        PlayerTextDrawAlignment(player.playerid, this.targets_points[player.playerid], 3);
        PlayerTextDrawColor(player.playerid, this.targets_points[player.playerid], 0xFF0000FF);
        PlayerTextDrawUseBox(player.playerid, this.targets_points[player.playerid], 0);
        PlayerTextDrawBoxColor(player.playerid, this.targets_points[player.playerid], 0x80808080);
        PlayerTextDrawSetShadow(player.playerid, this.targets_points[player.playerid], 1);
        PlayerTextDrawSetOutline(player.playerid, this.targets_points[player.playerid], 0);
        PlayerTextDrawBackgroundColor(player.playerid, this.targets_points[player.playerid], 0x000000FF);
        PlayerTextDrawFont(player.playerid, this.targets_points[player.playerid], 3);
        PlayerTextDrawSetProportional(player.playerid, this.targets_points[player.playerid], 1);
        PlayerTextDrawSetSelectable(player.playerid, this.targets_points[player.playerid], 0);

        // => Date
        const d = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.date[player.playerid] = CreatePlayerTextDraw(player.playerid, 634.000000, 5.000000, `${("0" + d.getDate()).slice(-2)} ${monthNames[d.getMonth()]} ${d.getFullYear()}`);
        PlayerTextDrawLetterSize(player.playerid, this.date[player.playerid], 0.249999, 1.100000);
        PlayerTextDrawTextSize(player.playerid, this.date[player.playerid], 1280.000000, 1280.000000);
        PlayerTextDrawAlignment(player.playerid, this.date[player.playerid], 3);
        PlayerTextDrawColor(player.playerid, this.date[player.playerid], 0xFFFFFFFF);
        PlayerTextDrawUseBox(player.playerid, this.date[player.playerid], 0);
        PlayerTextDrawBoxColor(player.playerid, this.date[player.playerid], 0x80808080);
        PlayerTextDrawSetShadow(player.playerid, this.date[player.playerid], 1);
        PlayerTextDrawSetOutline(player.playerid, this.date[player.playerid], 0);
        PlayerTextDrawBackgroundColor(player.playerid, this.date[player.playerid], 0x000000FF);
        PlayerTextDrawFont(player.playerid, this.date[player.playerid], 3);
        PlayerTextDrawSetProportional(player.playerid, this.date[player.playerid], 1);
        PlayerTextDrawSetSelectable(player.playerid, this.date[player.playerid], 0);
    }
}