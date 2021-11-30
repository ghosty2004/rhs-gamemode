module.exports = {
    Load: function() {
        fso_map = CreateDynamicObject(10231, -1422.540039, 1489.349976, 8.453125, 0.000000, 0.000000, 0.000000, -1, -1);
        SetDynamicObjectMaterial(fso_map, 5, 3066, "ammotrx", "ammotrn92crate64", 0);
        SetDynamicObjectMaterial(fso_map, 4, 3066, "ammotrx", "ammotrn92crate64", 0);
        SetDynamicObjectMaterial(fso_map, 3, 3066, "ammotrx", "ammotrn92crate64", 0);
        SetDynamicObjectMaterial(fso_map, 2, 3066, "ammotrx", "ammotrn92crate64", 0);
        SetDynamicObjectMaterial(fso_map, 1, 12821, "alleystuff", "Gen_Crate", 0);
        SetDynamicObjectMaterial(fso_map, 0, 12821, "alleystuff", "Gen_Crate", 0);
        CreateDynamicObject(8357, -1409.330200, 1456.954712, 0.525903, 180.000000, 90.000000, 270.000000, -1, -1);
        CreateDynamicObject(8355, -1489.150391, 1509.844849, 0.525895, 180.000000, 90.000000, 180.000000, -1, -1);
        CreateDynamicObject(899, -1422.279785, 1546.260986, -4.212028, 0.000000, 0.000000, 0.000000, -1, -1);
        CreateDynamicObject(8357, -1409.770142, 1565.085083, 0.525887, 180.000000, 90.000000, 90.000000, -1, -1);
        CreateDynamicObject(8355, -1341.149902, 1513.244019, 0.525911, 180.000000, 90.000000, 360.000000, -1, -1);
    },
    RemoveBuilding: function(player) {
        player.RemoveBuildingForPlayer( 10231, -1422.540039, 1489.348999, 8.453000, 0.250000);
    }
}