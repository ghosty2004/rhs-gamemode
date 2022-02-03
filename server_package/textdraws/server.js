/* ================ */
/*    TextDraws     */
/* ================ */

const { 
    TextDrawCreate, TextDrawLetterSize, TextDrawTextSize, TextDrawAlignment, TextDrawColor,
    TextDrawUseBox, TextDrawBoxColor, TextDrawSetShadow, TextDrawSetOutline,
    TextDrawBackgroundColor, TextDrawFont, TextDrawSetProportional, TextDrawSetSelectable
} = require("samp-node-lib");
const { SV_NAME, SERVER_WEB } = require("../data/settings");

module.exports = {
    attack_territory: null,
    under_attack_territory: null,
    afk_brb: {},
    reports: null,
    logs: null,
    spawn: {},
    connect: {},
    Load: function() {
        /* Attack Territory TextDraw */
        this.attack_territory = TextDrawCreate(502.000000, 409.000000, "Your gang attack a territory!~n~~w~~h~                 /capture info!");
        TextDrawLetterSize(this.attack_territory, 0.279998, 1.899998);
        TextDrawTextSize(this.attack_territory, 1280.000000, 1280.000000);
        TextDrawAlignment(this.attack_territory, 0);
        TextDrawColor(this.attack_territory, 0xFFFF00FF);
        TextDrawUseBox(this.attack_territory, 0);
        TextDrawBoxColor(this.attack_territory, 0x80808080);
        TextDrawSetShadow(this.attack_territory, 1);
        TextDrawSetOutline(this.attack_territory, 0);
        TextDrawBackgroundColor(this.attack_territory, 0x000000FF);
        TextDrawFont(this.attack_territory, 1);
        TextDrawSetProportional(this.attack_territory, 1);
        TextDrawSetSelectable(this.attack_territory, 0);

        /* Under Attack Territory TextDraw */
        this.under_attack_territory = TextDrawCreate(502.000000, 409.000000, "Your territory is under attack!~n~~w~~h~                 /capture info!");
        TextDrawLetterSize(this.under_attack_territory, 0.279998, 1.899998);
        TextDrawTextSize(this.under_attack_territory, 1280.000000, 1280.000000);
        TextDrawAlignment(this.under_attack_territory, 0);
        TextDrawColor(this.under_attack_territory, 0xFF0000FF);
        TextDrawUseBox(this.under_attack_territory, 0);
        TextDrawBoxColor(this.under_attack_territory, 0x80808080);
        TextDrawSetShadow(this.under_attack_territory, 1);
        TextDrawSetOutline(this.under_attack_territory, 0);
        TextDrawBackgroundColor(this.under_attack_territory, 0x000000FF);
        TextDrawFont(this.under_attack_territory, 1);
        TextDrawSetProportional(this.under_attack_territory, 1);
        TextDrawSetSelectable(this.under_attack_territory, 0);

        /* AFK/Brb TextDraw */
        this.afk_brb[0] = TextDrawCreate(153.000000, 306.000000, "~g~~h~]                ]");
        TextDrawLetterSize(this.afk_brb[0], 0.509999, 1.700000);
        TextDrawTextSize(this.afk_brb[0], 1280.000000, 1280.000000);
        TextDrawAlignment(this.afk_brb[0], 0);
        TextDrawColor(this.afk_brb[0], 0xFFFFFFFF);
        TextDrawUseBox(this.afk_brb[0], 0);
        TextDrawBoxColor(this.afk_brb[0], 0x80808080);
        TextDrawSetShadow(this.afk_brb[0], 1);
        TextDrawSetOutline(this.afk_brb[0], 0);
        TextDrawBackgroundColor(this.afk_brb[0], 0x000000FF);
        TextDrawFont(this.afk_brb[0], 0);
        TextDrawSetProportional(this.afk_brb[0], 1);
        TextDrawSetSelectable(this.afk_brb[0], 0);
        
        this.afk_brb[1] = TextDrawCreate(131.000000, 324.000000, "Type ~g~~h~/Back ~w~~h~to return.");
        TextDrawLetterSize(this.afk_brb[1], 0.509999, 1.900000);
        TextDrawTextSize(this.afk_brb[1], 1280.000000, 1280.000000);
        TextDrawAlignment(this.afk_brb[1], 0);
        TextDrawColor(this.afk_brb[1], 0xFFFFFFFF);
        TextDrawUseBox(this.afk_brb[1], 0);
        TextDrawBoxColor(this.afk_brb[1], 0x80808080);
        TextDrawSetShadow(this.afk_brb[1], 1);
        TextDrawSetOutline(this.afk_brb[1], 0);
        TextDrawBackgroundColor(this.afk_brb[1], 0x000000FF);
        TextDrawFont(this.afk_brb[1], 1);
        TextDrawSetProportional(this.afk_brb[1], 1);
        TextDrawSetSelectable(this.afk_brb[1], 0);

        this.afk_brb[2] = TextDrawCreate(177.000000, 306.000000, "~g~~h~BRB~w~~h~ / ~g~~h~AFK");
        TextDrawLetterSize(this.afk_brb[2], 0.519999, 1.900000);
        TextDrawTextSize(this.afk_brb[2], 1280.000000, 1280.000000);
        TextDrawAlignment(this.afk_brb[2], 0);
        TextDrawColor(this.afk_brb[2], 0xFFFFFFFF);
        TextDrawUseBox(this.afk_brb[2], 0);
        TextDrawBoxColor(this.afk_brb[2], 0x80808080);
        TextDrawSetShadow(this.afk_brb[2], 1);
        TextDrawSetOutline(this.afk_brb[2], 0);
        TextDrawBackgroundColor(this.afk_brb[2], 0x000000FF);
        TextDrawFont(this.afk_brb[2], 1);
        TextDrawSetProportional(this.afk_brb[2], 1);
        TextDrawSetSelectable(this.afk_brb[2], 0);

        this.afk_brb[3] = TextDrawCreate(169.000000, 283.000000, "You ~g~~h~are ~w~~h~now.");
        TextDrawLetterSize(this.afk_brb[3], 0.430000, 2.599999);
        TextDrawTextSize(this.afk_brb[3], 1280.000000, 1280.000000);
        TextDrawAlignment(this.afk_brb[3], 0);
        TextDrawColor(this.afk_brb[3], 0xFFFFFFFF);
        TextDrawUseBox(this.afk_brb[3], 0);
        TextDrawBoxColor(this.afk_brb[3], 0x80808080);
        TextDrawSetShadow(this.afk_brb[3], 1);
        TextDrawSetOutline(this.afk_brb[3], 0);
        TextDrawBackgroundColor(this.afk_brb[3], 0x000000FF);
        TextDrawFont(this.afk_brb[3], 1);
        TextDrawSetProportional(this.afk_brb[3], 1);
        TextDrawSetSelectable(this.afk_brb[3], 0);

        /* Reports TextDraw */
        this.reports = TextDrawCreate(546.000000, 30.000000, "");
        TextDrawLetterSize(this.reports, 0.299997, 1.100000);
        TextDrawTextSize(this.reports, 1280.000000, 1280.000000);
        TextDrawAlignment(this.reports, 0);
        TextDrawColor(this.reports, 0xFF0000FF);
        TextDrawUseBox(this.reports, 0);
        TextDrawBoxColor(this.reports, 0x80808080);
        TextDrawSetShadow(this.reports, 1);
        TextDrawSetOutline(this.reports, 0);
        TextDrawBackgroundColor(this.reports, 0x000000FF);
        TextDrawFont(this.reports, 3);
        TextDrawSetProportional(this.reports, 1);
        TextDrawSetSelectable(this.reports, 0);

        /* Logs TextDraw */
        this.logs = TextDrawCreate(252.000000, 408.000000, "");
        TextDrawLetterSize(this.logs, 0.199994, 1.300000);
        TextDrawTextSize(this.logs, 1280.000000, 1280.000000);
        TextDrawAlignment(this.logs, 0);
        TextDrawColor(this.logs, 0x00FFFFFF);
        TextDrawUseBox(this.logs, 0);
        TextDrawBoxColor(this.logs, 0x80808080);
        TextDrawSetShadow(this.logs, 1);
        TextDrawSetOutline(this.logs, 0);
        TextDrawBackgroundColor(this.logs, 0x000000FF);
        TextDrawFont(this.logs, 1);
        TextDrawSetProportional(this.logs, 1);
        TextDrawSetSelectable(this.logs, 0);

        /* Spanw TextDraw */
        this.spawn[0] = TextDrawCreate(8.000000, 422.000000, SV_NAME[1]);
        TextDrawLetterSize(this.spawn[0], 0.379996, 1.499992);
        TextDrawTextSize(this.spawn[0], 1280.000000, 1280.000000);
        TextDrawAlignment(this.spawn[0], 0);
        TextDrawColor(this.spawn[0], 0x3333FFFF);
        TextDrawUseBox(this.spawn[0], 0);
        TextDrawBoxColor(this.spawn[0], 0x80808080);
        TextDrawSetShadow(this.spawn[0], 2);
        TextDrawSetOutline(this.spawn[0], 1);
        TextDrawBackgroundColor(this.spawn[0], 0x000000FF);
        TextDrawFont(this.spawn[0], 3);
        TextDrawSetProportional(this.spawn[0], 1);
        TextDrawSetSelectable(this.spawn[0], 0);

        this.spawn[1] = TextDrawCreate(64.000000, 424.000000, SV_NAME[2]);
        TextDrawLetterSize(this.spawn[1], 0.449995, 1.299993);
        TextDrawTextSize(this.spawn[1], 1280.000000, 1280.000000);
        TextDrawAlignment(this.spawn[1], 0);
        TextDrawColor(this.spawn[1], 0xFFFF00FF);
        TextDrawUseBox(this.spawn[1], 0);
        TextDrawBoxColor(this.spawn[1], 0x80808080);
        TextDrawSetShadow(this.spawn[1], 2);
        TextDrawSetOutline(this.spawn[1], 1);
        TextDrawBackgroundColor(this.spawn[1], 0x000000FF);
        TextDrawFont(this.spawn[1], 3);
        TextDrawSetProportional(this.spawn[1], 1);
        TextDrawSetSelectable(this.spawn[1], 0);

        this.spawn[2] = TextDrawCreate(103.000000, 423.000000, SV_NAME[3]);
        TextDrawLetterSize(this.spawn[2], 0.379999, 1.399997);
        TextDrawTextSize(this.spawn[2], 1280.000000, 1280.000000);
        TextDrawAlignment(this.spawn[2], 0);
        TextDrawColor(this.spawn[2], 0xFF0000FF);
        TextDrawUseBox(this.spawn[2], 0);
        TextDrawBoxColor(this.spawn[2], 0x80808080);
        TextDrawSetShadow(this.spawn[2], 2);
        TextDrawSetOutline(this.spawn[2], 1);
        TextDrawBackgroundColor(this.spawn[2], 0x000000FF);
        TextDrawFont(this.spawn[2], 3);
        TextDrawSetProportional(this.spawn[2], 1);
        TextDrawSetSelectable(this.spawn[2], 0);

        this.spawn[3] = TextDrawCreate(7.000000, 435.000000, "");
        TextDrawLetterSize(this.spawn[3], 0.199994, 1.299995);
        TextDrawTextSize(this.spawn[3], 1280.000000, 1280.000000);
        TextDrawAlignment(this.spawn[3], 0);
        TextDrawColor(this.spawn[3], 0xFFFF00FF);
        TextDrawUseBox(this.spawn[3], 0);
        TextDrawBoxColor(this.spawn[3], 0x80808080);
        TextDrawSetShadow(this.spawn[3], 1);
        TextDrawSetOutline(this.spawn[3], 0);
        TextDrawBackgroundColor(this.spawn[3], 0x000000FF);
        TextDrawFont(this.spawn[3], 1);
        TextDrawSetProportional(this.spawn[3], 1);
        TextDrawSetSelectable(this.spawn[3], 0);

        /*this.spawn[3] = TextDrawCreate(7.000000, 436.000000, "~w~~h~/~y~~h~tutorial ~w~~h~/~y~~h~important ~w~~h~/~y~~h~rules ~w~~h~/~y~~h~cmds ~w~~h~/~y~~h~teles");
        TextDrawLetterSize(this.spawn[3], 0.209994, 1.099995);
        TextDrawTextSize(this.spawn[3], 1280.000000, 1280.000000);
        TextDrawAlignment(this.spawn[3], 0);
        TextDrawColor(this.spawn[3], 0xFFFF00FF);
        TextDrawUseBox(this.spawn[3], 0);
        TextDrawBoxColor(this.spawn[3], 0x80808080);
        TextDrawSetShadow(this.spawn[3], 1);
        TextDrawSetOutline(this.spawn[3], 0);
        TextDrawBackgroundColor(this.spawn[3], 0x000000FF);
        TextDrawFont(this.spawn[3], 1);
        TextDrawSetProportional(this.spawn[3], 1);
        TextDrawSetSelectable(this.spawn[3], 0);*/

        /* Connect TextDraw */
        this.connect[0] = TextDrawCreate(8.000000, 346.000000, SV_NAME[1]);
        TextDrawLetterSize(this.connect[0], 0.449999, 2.199994);
        TextDrawTextSize(this.connect[0], 1280.000000, 1280.000000);
        TextDrawAlignment(this.connect[0], 0);
        TextDrawColor(this.connect[0], 0x0000FFFF);
        TextDrawUseBox(this.connect[0], 0);
        TextDrawBoxColor(this.connect[0], 0x80808080);
        TextDrawSetShadow(this.connect[0], 2);
        TextDrawSetOutline(this.connect[0], 1);
        TextDrawBackgroundColor(this.connect[0], 0x000000FF);
        TextDrawFont(this.connect[0], 3);
        TextDrawSetProportional(this.connect[0], 1);
        TextDrawSetSelectable(this.connect[0], 0);

        this.connect[1] = TextDrawCreate(75.000000, 347.000000, SV_NAME[2]);
        TextDrawLetterSize(this.connect[1], 0.469996, 2.099994);
        TextDrawTextSize(this.connect[1], 1280.000000, 1280.000000);
        TextDrawAlignment(this.connect[1], 0);
        TextDrawColor(this.connect[1], 0xFFFF00FF);
        TextDrawUseBox(this.connect[1], 0);
        TextDrawBoxColor(this.connect[1], 0x80808080);
        TextDrawSetShadow(this.connect[1], 2);
        TextDrawSetOutline(this.connect[1], 1);
        TextDrawBackgroundColor(this.connect[1], 0x000000FF);
        TextDrawFont(this.connect[1], 3);
        TextDrawSetProportional(this.connect[1], 1);
        TextDrawSetSelectable(this.connect[1], 0);

        this.connect[2] = TextDrawCreate(117.000000, 347.000000, SV_NAME[3]);
        TextDrawLetterSize(this.connect[2], 0.459996, 2.099992);
        TextDrawTextSize(this.connect[2], 1280.000000, 1280.000000);
        TextDrawAlignment(this.connect[2], 0);
        TextDrawColor(this.connect[2], 0xFF0000FF);
        TextDrawUseBox(this.connect[2], 0);
        TextDrawBoxColor(this.connect[2], 0x80808080);
        TextDrawSetShadow(this.connect[2], 2);
        TextDrawSetOutline(this.connect[2], 1);
        TextDrawBackgroundColor(this.connect[2], 0x000000FF);
        TextDrawFont(this.connect[2], 3);
        TextDrawSetProportional(this.connect[2], 1);
        TextDrawSetSelectable(this.connect[2], 0);

        this.connect[3] = TextDrawCreate(41.000000, 315.000000, "WELCOME");
        TextDrawLetterSize(this.connect[3], 0.559997, 1.999997);
        TextDrawTextSize(this.connect[3], 1280.000000, 1280.000000);
        TextDrawAlignment(this.connect[3], 0);
        TextDrawColor(this.connect[3], 0xFFFF00FF);
        TextDrawUseBox(this.connect[3], 0);
        TextDrawBoxColor(this.connect[3], 0x80808080);
        TextDrawSetShadow(this.connect[3], 2);
        TextDrawSetOutline(this.connect[3], 1);
        TextDrawBackgroundColor(this.connect[3], 0x000000FF);
        TextDrawFont(this.connect[3], 1);
        TextDrawSetProportional(this.connect[3], 1);
        TextDrawSetSelectable(this.connect[3], 0);

        this.connect[4] = TextDrawCreate(10.000000, 390.000000, "Please read                  !");
        TextDrawLetterSize(this.connect[4], 0.299997, 1.699998);
        TextDrawTextSize(this.connect[4], 1280.000000, 1280.000000);
        TextDrawAlignment(this.connect[4], 0);
        TextDrawColor(this.connect[4], 0x000000FF);
        TextDrawUseBox(this.connect[4], 0);
        TextDrawBoxColor(this.connect[4], 0x80808080);
        TextDrawSetShadow(this.connect[4], 2);
        TextDrawSetOutline(this.connect[4], 1);
        TextDrawBackgroundColor(this.connect[4], 0xFFFFFFFF);
        TextDrawFont(this.connect[4], 1);
        TextDrawSetProportional(this.connect[4], 1);
        TextDrawSetSelectable(this.connect[4], 0);

        this.connect[5] = TextDrawCreate(74.000000, 391.000000, "/rules, /important");
        TextDrawLetterSize(this.connect[5], 0.250000, 1.600000);
        TextDrawTextSize(this.connect[5], 1280.000000, 1280.000000);
        TextDrawAlignment(this.connect[5], 0);
        TextDrawColor(this.connect[5], 0xFF0000FF);
        TextDrawUseBox(this.connect[5], 0);
        TextDrawBoxColor(this.connect[5], 0x80808080);
        TextDrawSetShadow(this.connect[5], 2);
        TextDrawSetOutline(this.connect[5], 1);
        TextDrawBackgroundColor(this.connect[5], 0xFFFFFFFF);
        TextDrawFont(this.connect[5], 1);
        TextDrawSetProportional(this.connect[5], 1);
        TextDrawSetSelectable(this.connect[5], 0);

        this.connect[6] = TextDrawCreate(12.000000, 329.000000, "]");
        TextDrawLetterSize(this.connect[6], 0.659999, 1.899999);
        TextDrawTextSize(this.connect[6], 1280.000000, 1280.000000);
        TextDrawAlignment(this.connect[6], 0);
        TextDrawColor(this.connect[6], 0x00FFFFFF);
        TextDrawUseBox(this.connect[6], 0);
        TextDrawBoxColor(this.connect[6], 0x80808080);
        TextDrawSetShadow(this.connect[6], 2);
        TextDrawSetOutline(this.connect[6], 1);
        TextDrawBackgroundColor(this.connect[6], 0x000000FF);
        TextDrawFont(this.connect[6], 0);
        TextDrawSetProportional(this.connect[6], 1);
        TextDrawSetSelectable(this.connect[6], 0);

        this.connect[7] = TextDrawCreate(139.000000, 330.000000, "]");
        TextDrawLetterSize(this.connect[7], 0.659999, 1.899999);
        TextDrawTextSize(this.connect[7], 1280.000000, 1280.000000);
        TextDrawAlignment(this.connect[7], 0);
        TextDrawColor(this.connect[7], 0x00FFFFFF);
        TextDrawUseBox(this.connect[7], 0);
        TextDrawBoxColor(this.connect[7], 0x80808080);
        TextDrawSetShadow(this.connect[7], 2);
        TextDrawSetOutline(this.connect[7], 1);
        TextDrawBackgroundColor(this.connect[7], 0x000000FF);
        TextDrawFont(this.connect[7], 0);
        TextDrawSetProportional(this.connect[7], 1);
        TextDrawSetSelectable(this.connect[7], 0);

        this.connect[8] = TextDrawCreate(9.000000, 406.000000, "/cmds, /teles, /buyvip, /news");
        TextDrawLetterSize(this.connect[8], 0.299998, 1.700000);
        TextDrawTextSize(this.connect[8], 1280.000000, 1280.000000);
        TextDrawAlignment(this.connect[8], 0);
        TextDrawColor(this.connect[8], 0x221F99FF);
        TextDrawUseBox(this.connect[8], 0);
        TextDrawBoxColor(this.connect[8], 0x80808080);
        TextDrawSetShadow(this.connect[8], 2);
        TextDrawSetOutline(this.connect[8], 1);
        TextDrawBackgroundColor(this.connect[8], 0x00FFFFFF);
        TextDrawFont(this.connect[8], 1);
        TextDrawSetProportional(this.connect[8], 1);
        TextDrawSetSelectable(this.connect[8], 0);

        this.connect[9] = TextDrawCreate(34.000000, 422.000000, SERVER_WEB);
        TextDrawLetterSize(this.connect[9], 0.299998, 1.899997);
        TextDrawTextSize(this.connect[9], 1280.000000, 1280.000000);
        TextDrawAlignment(this.connect[9], 0);
        TextDrawColor(this.connect[9], 0xFF0000FF);
        TextDrawUseBox(this.connect[9], 0);
        TextDrawBoxColor(this.connect[9], 0x80808080);
        TextDrawSetShadow(this.connect[9], 2);
        TextDrawSetOutline(this.connect[9], 1);
        TextDrawBackgroundColor(this.connect[9], 0xFFFFFFFF);
        TextDrawFont(this.connect[9], 1);
        TextDrawSetProportional(this.connect[9], 1);
        TextDrawSetSelectable(this.connect[9], 0);

        this.connect[10] = TextDrawCreate(195.000000, 359.000000, ".");
        TextDrawLetterSize(this.connect[10], 15.990015, 1.600000);
        TextDrawTextSize(this.connect[10], 1280.000000, 1280.000000);
        TextDrawAlignment(this.connect[10], 3);
        TextDrawColor(this.connect[10], 0xFFFFFFFF);
        TextDrawUseBox(this.connect[10], 0);
        TextDrawBoxColor(this.connect[10], 0x80808080);
        TextDrawSetShadow(this.connect[10], 1);
        TextDrawSetOutline(this.connect[10], 0);
        TextDrawBackgroundColor(this.connect[10], 0x000000FF);
        TextDrawFont(this.connect[10], 1);
        TextDrawSetProportional(this.connect[10], 1);
        TextDrawSetSelectable(this.connect[10], 0);

        this.connect[11] = TextDrawCreate(79.000000, 332.000000, "TO");
        TextDrawLetterSize(this.connect[11], 0.509998, 1.699995);
        TextDrawTextSize(this.connect[11], 1280.000000, 1280.000000);
        TextDrawAlignment(this.connect[11], 0);
        TextDrawColor(this.connect[11], 0xFFFF00FF);
        TextDrawUseBox(this.connect[11], 0);
        TextDrawBoxColor(this.connect[11], 0x80808080);
        TextDrawSetShadow(this.connect[11], 2);
        TextDrawSetOutline(this.connect[11], 1);
        TextDrawBackgroundColor(this.connect[11], 0x000000FF);
        TextDrawFont(this.connect[11], 1);
        TextDrawSetProportional(this.connect[11], 1);
        TextDrawSetSelectable(this.connect[11], 0);

        this.connect[12] = TextDrawCreate(9.000000, 373.000000, "Stunt/Race/DM/Gangs/Clans/Fun");
        TextDrawLetterSize(this.connect[12], 0.279998, 1.700000);
        TextDrawTextSize(this.connect[12], 1280.000000, 1280.000000);
        TextDrawAlignment(this.connect[12], 0);
        TextDrawColor(this.connect[12], 0x221F99FF);
        TextDrawUseBox(this.connect[12], 0);
        TextDrawBoxColor(this.connect[12], 0x80808080);
        TextDrawSetShadow(this.connect[12], 2);
        TextDrawSetOutline(this.connect[12], 1);
        TextDrawBackgroundColor(this.connect[12], 0x00FFFFFF);
        TextDrawFont(this.connect[12], 1);
        TextDrawSetProportional(this.connect[12], 1);
        TextDrawSetSelectable(this.connect[12], 0);
    }
}