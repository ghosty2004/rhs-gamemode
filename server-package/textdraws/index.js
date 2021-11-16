/* ================ */
/*    TextDraws     */
/* ================ */

const { 
    TextDrawCreate, TextDrawColor, TextDrawBoxColor, 
    TextDrawBackgroundColor, TextDrawAlignment, TextDrawFont,
    TextDrawLetterSize, TextDrawTextSize, TextDrawSetOutline,
    TextDrawSetShadow, TextDrawSetProportional, TextDrawUseBox, OnGameModeInit
} = require("samp-node-lib");

module.exports = {
    connect: {},
    Load: function() {
        /* this.connect TextDraw */
        this.connect[0] = TextDrawCreate(8, 346, "Romania");
        TextDrawColor(this.connect[0], -1);
        TextDrawBoxColor(this.connect[0], -2139062144);
        TextDrawBackgroundColor(this.connect[0], -2139062144);
        TextDrawAlignment(this.connect[0], 2);
        TextDrawFont(this.connect[0], 3);
        TextDrawLetterSize(this.connect[0], 0, 2);
        TextDrawTextSize(this.connect[0], 1280, 1280);
        TextDrawSetOutline(this.connect[0], 1);
        TextDrawSetShadow(this.connect[0], 2);
        TextDrawSetProportional(this.connect[0], 0);

        this.connect[1] = TextDrawCreate(75, 347, "hard");
        TextDrawColor(this.connect[1], -1);
        TextDrawBoxColor(this.connect[1], -2139062144);
        TextDrawBackgroundColor(this.connect[1], -2139062144);
        TextDrawAlignment(this.connect[1], 2);
        TextDrawFont(this.connect[1], 3);
        TextDrawLetterSize(this.connect[1], 0, 2);
        TextDrawTextSize(this.connect[1], 1280, 1280);
        TextDrawSetOutline(this.connect[1], 1);
        TextDrawSetShadow(this.connect[1], 2);
        TextDrawSetProportional(this.connect[1], 0);

        this.connect[2] = TextDrawCreate(117, 347, "Stunt");
        TextDrawColor(this.connect[2], -1);
        TextDrawBoxColor(this.connect[2], -2139062144);
        TextDrawBackgroundColor(this.connect[2], -2139062144);
        TextDrawAlignment(this.connect[2], 2);
        TextDrawFont(this.connect[2], 3);
        TextDrawLetterSize(this.connect[2], 0, 2);
        TextDrawTextSize(this.connect[2], 1280, 1280);
        TextDrawSetOutline(this.connect[2], 1);
        TextDrawSetShadow(this.connect[2], 2);
        TextDrawSetProportional(this.connect[2], 0);
    }
}