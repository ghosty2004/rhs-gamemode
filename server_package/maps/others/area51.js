module.exports = {
    Load: function() {
        let ghosty2004_map;
        ghosty2004_map = CreateDynamicObject(7313, 218.579407, 1880.649170, 12.805507, 0.000000, 0.000000, 262.500000, -1, -1, -1, 400.000000, 400.000000);
        SetDynamicObjectMaterial(ghosty2004_map, 1, 16644, "a51_detailstuff", "roucghstonebrtb", 0);
        SetDynamicObjectMaterialText(ghosty2004_map, 0, "A51 is the only free zone, if you are doing this outside of it you will be {ff0000} punnished {ffffff} !", 110, "Ariel", 16, 0, -1, 1, 1);
        ghosty2004_map = CreateDynamicObject(7914, 219.521820, 1885.119629, 13.293821, 0.000000, 0.000000, 262.000000, -1, -1, -1, 400.000000, 400.000000);
        SetDynamicObjectMaterialText(ghosty2004_map, 0, "{ffff00} This is a free zone, all the weapons are allowed here !", 120, "Engravers MT", 20, 1, -1, 0, 0);
        ghosty2004_map = CreateDynamicObject(7914, 219.521820, 1885.119751, 12.433821, 0.000000, 0.000000, 262.000000, -1, -1, -1, 400.000000, 400.000000);
        SetDynamicObjectMaterialText(ghosty2004_map, 0, "{ffff00} Drive by is allowed, jetpack dm is allowed !", 120, "Engravers MT", 20, 1, -1, 0, 2);
        ghosty2004_map = CreateDynamicObject(7914, 219.541626, 1885.116577, 11.533818, 0.000000, 0.000000, 262.000000, -1, -1, -1, 400.000000, 400.000000);
        SetDynamicObjectMaterialText(ghosty2004_map, 0, "{ff0000}NO {ffffff} Hacks or Mods allowed !", 120, "Engravers MT", 20, 1, -1, 0, 2);
        ghosty2004_map = CreateDynamicObject(7313, 209.239319, 1880.178101, 12.805507, 0.000000, 0.000000, 458.599945, -1, -1, -1, 400.000000, 400.000000);
        SetDynamicObjectMaterial(ghosty2004_map, 1, 16644, "a51_detailstuff", "roucghstonebrtb", 0);
        SetDynamicObjectMaterialText(ghosty2004_map, 0, "A51 este singura zona libera, in exteriorul acesteia vei fii {ff0000} pedepsit {ffffff} !", 110, "Ariel", 16, 0, -1, 1, 1);
        ghosty2004_map = CreateDynamicObject(7914, 208.151581, 1884.715698, 11.543814, 0.000000, 0.000000, 458.500000, -1, -1, -1, 400.000000, 400.000000);
        SetDynamicObjectMaterialText(ghosty2004_map, 0, "Hack-urile si Modurile de tip cheat sunt {FF0000} INTERZISE {ffffff} !", 120, "Engravers MT", 20, 1, -1, 0, 0);
        ghosty2004_map = CreateDynamicObject(7914, 208.112274, 1885.518433, 12.473821, 0.000000, 0.000000, 458.500000, -1, -1, -1, 400.000000, 400.000000);
        SetDynamicObjectMaterialText(ghosty2004_map, 0, "{ffff00} Drive by este permis, Jetpack dm este permis !", 120, "Engravers MT", 20, 1, -1, 0, 0);
        ghosty2004_map = CreateDynamicObject(7914, 207.990753, 1885.925171, 13.293821, 0.000000, 0.000000, 458.500000, -1, -1, -1, 400.000000, 400.000000);
        SetDynamicObjectMaterialText(ghosty2004_map, 0, "{ffff00} Aceasta este o zona libera, toate armele sunt permise aici !", 120, "Engravers MT", 20, 1, -1, 0, 0);
    },
    RemoveBuilding: function(player) {
        player.RemoveBuildingForPlayer(16732, 226.593796, 1859.171875, 14.554700, 0.250000);
    }
}