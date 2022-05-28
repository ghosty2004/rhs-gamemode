-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 18, 2022 at 08:49 PM
-- Server version: 8.0.29-0ubuntu0.20.04.3
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rhs`
--

-- --------------------------------------------------------

--
-- Table structure for table `akas`
--

CREATE TABLE `akas` (
  `ID` int NOT NULL,
  `names` varchar(100) NOT NULL,
  `ip` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bans`
--

CREATE TABLE `bans` (
  `ID` int NOT NULL,
  `acc_id` int NOT NULL,
  `ip` varchar(16) NOT NULL,
  `admin_acc_id` int NOT NULL,
  `from_timestamp` int NOT NULL,
  `to_timestamp` int NOT NULL,
  `reason` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `business`
--

CREATE TABLE `business` (
  `ID` int NOT NULL,
  `name` varchar(30) NOT NULL,
  `owner` int NOT NULL,
  `position` json NOT NULL,
  `interiorType` varchar(30) NOT NULL,
  `cost` int NOT NULL,
  `win` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `business`
--

INSERT INTO `business` (`ID`, `name`, `owner`, `position`, `interiorType`, `cost`, `win`) VALUES
(2, 'ForSale', 0, '[-1889.9747314453125, 487.2457885742187, 35.150699615478516]', 'BUSINESS_INTERIOR_5', 2000, 300),
(3, 'ForSale', 0, '[2079.502685546875, 2046.17236328125, 11.057899475097656]', 'BUSINESS_INTERIOR_22', 900, 10),
(4, 'ForSale', 0, '[2085.6669921875, 2054.803466796875, 11.057899475097656]', 'BUSINESS_INTERIOR_41', 900, 10),
(5, 'ForSale', 0, '[2085.6650390625, 2066.701904296875, 11.057899475097656]', 'BUSINESS_INTERIOR_22', 900, 10),
(6, 'Las Venturas Spawn Place', 0, '[2127.435791015625, 2378.900146484375, 10.8203125]', 'BUSINESS_INTERIOR_11', 4000, 10),
(7, 'ForSale', 0, '[2085.118896484375, 2074.051513671875, 11.0546875]', 'BUSINESS_INTERIOR_39', 900, 10),
(8, 'ForSale', 0, '[2085.6650390625, 2090.211669921875, 11.057899475097656]', 'BUSINESS_INTERIOR_12', 900, 10),
(9, 'ForSale', 0, '[2076.56591796875, 2096.54541015625, 11.057899475097656]', 'BUSINESS_INTERIOR_10', 900, 10),
(10, 'ForSale', 0, '[2065.086181640625, 2096.546630859375, 11.057899475097656]', 'BUSINESS_INTERIOR_7', 900, 10),
(11, 'ForSale', 0, '[2053.6904296875, 2096.5478515625, 11.057899475097656]', 'BUSINESS_INTERIOR_6', 900, 10),
(13, 'market', 0, '[2194.94140625, 1991.0137939453125, 12.296875]', 'BUSINESS_INTERIOR_6', 2000, 200),
(14, 'La nivel inalt', 0, '[2107.863037109375, 2049.29248046875, 22.850542068481445]', 'BUSINESS_INTERIOR_28', 1, 99999),
(16, 'boss', 0, '[2081.385498046875, 2323.35595703125, 11.2421875]', 'BUSINESS_INTERIOR_21', 100000, 80000),
(17, 'ForSale', 0, '[1555.503662109375, -1675.6826171875, 16.1953125]', 'BUSINESS_INTERIOR_7', 80000, 3000000),
(18, 'casino', 0, '[2019.3231201171875, 1008.0875854492188, 10.8203125]', 'BUSINESS_INTERIOR_16', 99999999, 99999999),
(19, 'bar', 0, '[2089.48681640625, 1514.1163330078125, 10.8203125]', 'BUSINESS_INTERIOR_18', 1000, 500),
(20, 'profi cel mai ieftin;)))', 0, '[2196.678466796875, 1677.61962890625, 12.3671875]', 'BUSINESS_INTERIOR_22', 10, 100),
(21, 'piese auto', 0, '[1220.4822998046875, -1811.942138671875, 16.59375]', 'BUSINESS_INTERIOR_30', 1500, 700),
(22, 'magazin non stop', 0, '[142.6163330078125, -1470.351806640625, 25.2109375]', 'BUSINESS_INTERIOR_35', 100, 50),
(23, 'DEDEMAN', 0, '[1397.7691650390625, -1570.303955078125, 14.273103713989258]', 'BUSINESS_INTERIOR_37', 1900, 3000),
(24, 'DESANTO muzic', 0, '[816.0489501953125, -1386.085205078125, 13.601930618286133]', 'BUSINESS_INTERIOR_22', 1980, 980),
(25, 'peco', 0, '[661.363037109375, -573.4849243164062, 16.3359375]', 'BUSINESS_INTERIOR_9', 1900, 890),
(27, 'dulce ca keedyy', 0, '[1099.1334228515625, 1602.435791015625, 12.273954391479492]', 'BUSINESS_INTERIOR_3', 1000, 300),
(28, 'volly gay', 0, '[1513.8197021484375, 742.2025756835938, 11.583946228027344]', 'BUSINESS_INTERIOR_28', 69, 69),
(29, 'Voller. poponar', 0, '[2001.3306884765625, 1544.4259033203125, 13.5859375]', 'BUSINESS_INTERIOR_40', 100, 10),
(30, 'ForSale', 0, '[2200.90869140625, 1394.804931640625, 11.0625]', 'BUSINESS_INTERIOR_27', 1, 299),
(32, 'ForSale', 0, '[2118.030029296875, 897.3939819335938, 11.1796875]', 'BUSINESS_INTERIOR_30', 3000, 10);

-- --------------------------------------------------------

--
-- Table structure for table `clans`
--

CREATE TABLE `clans` (
  `ID` int NOT NULL,
  `name` varchar(30) NOT NULL,
  `owner` int NOT NULL,
  `position` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `weapon` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `color` varchar(10) NOT NULL,
  `member_skin` int NOT NULL,
  `leader_skin` int NOT NULL,
  `kills` int NOT NULL DEFAULT '0',
  `deaths` int NOT NULL DEFAULT '0'
) ;

-- --------------------------------------------------------

--
-- Table structure for table `dealership`
--

CREATE TABLE `dealership` (
  `ID` int NOT NULL,
  `type` varchar(15) NOT NULL,
  `model` int NOT NULL,
  `cost` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `dealership`
--

INSERT INTO `dealership` (`ID`, `type`, `model`, `cost`) VALUES
(1, 'cheap', 478, 100000),
(2, 'cheap', 543, 300000),
(3, 'cheap', 422, 320000),
(4, 'cheap', 404, 330000),
(5, 'cheap', 600, 400000),
(6, 'cheap', 418, 450000),
(7, 'cheap', 482, 500000),
(8, 'cheap', 483, 530000),
(9, 'cheap', 508, 550000),
(10, 'cheap', 467, 600000),
(11, 'cheap', 474, 650000),
(12, 'cheap', 401, 670000),
(13, 'cheap', 479, 700000),
(14, 'cheap', 547, 700000),
(21, 'cheap', 546, 800000),
(22, 'cheap', 550, 820000),
(23, 'cheap', 517, 850000),
(24, 'cheap', 439, 900000),
(25, 'cheap', 549, 900000),
(26, 'cheap', 580, 930000),
(27, 'cheap', 542, 950000),
(28, 'regular', 536, 1200000),
(29, 'regular', 400, 1400000),
(30, 'regular', 434, 2000000),
(31, 'regular', 561, 2500000),
(32, 'regular', 551, 2700000),
(33, 'regular', 567, 3000000),
(34, 'regular', 496, 3200000),
(35, 'regular', 518, 3500000),
(36, 'regular', 535, 3700000),
(37, 'regular', 555, 4000000),
(38, 'regular', 534, 4000000),
(39, 'regular', 426, 4200000),
(40, 'regular', 589, 4500000),
(41, 'regular', 603, 4800000),
(42, 'regular', 489, 4800000),
(43, 'regular', 587, 5000000),
(44, 'regular', 445, 5200000),
(45, 'regular', 533, 5500000),
(46, 'regular', 504, 6000000),
(47, 'expensive', 579, 9000000),
(48, 'expensive', 565, 9500000),
(49, 'expensive', 558, 10000000),
(50, 'expensive', 602, 12000000),
(51, 'expensive', 495, 15000000),
(52, 'expensive', 480, 17000000),
(53, 'expensive', 506, 19000000),
(54, 'expensive', 562, 21000000),
(55, 'expensive', 559, 21500000),
(56, 'expensive', 402, 22000000),
(57, 'expensive', 477, 22500000),
(58, 'expensive', 415, 25000000),
(59, 'expensive', 560, 28000000),
(60, 'expensive', 429, 28500000),
(61, 'expensive', 451, 30000000),
(62, 'expensive', 541, 40000000),
(63, 'expensive', 411, 60000000),
(64, 'expensive', 475, 1500000),
(65, 'bikes', 509, 200000),
(66, 'bikes', 481, 500000),
(67, 'bikes', 510, 800000),
(68, 'bikes', 462, 600000),
(69, 'bikes', 471, 1500000),
(70, 'bikes', 586, 2500000),
(71, 'bikes', 463, 3000000),
(72, 'bikes', 468, 5000000),
(73, 'bikes', 461, 6500000),
(74, 'bikes', 521, 7500000),
(75, 'bikes', 522, 12000000),
(76, 'premium', 494, 15000000),
(77, 'premium', 502, 17500000),
(78, 'premium', 503, 18500000),
(79, 'premium', 444, 20000000),
(80, 'premium', 447, 10000000),
(81, 'premium', 487, 13000000);

-- --------------------------------------------------------

--
-- Table structure for table `discordChannelLogs`
--

CREATE TABLE `discordChannelLogs` (
  `ID` int NOT NULL,
  `type` varbinary(20) NOT NULL,
  `guildId` varchar(20) NOT NULL,
  `channelId` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gangs`
--

CREATE TABLE `gangs` (
  `ID` int NOT NULL,
  `name` varchar(30) NOT NULL,
  `position` json NOT NULL,
  `weapon` json NOT NULL,
  `color` int NOT NULL DEFAULT '0',
  `alliance` int NOT NULL DEFAULT '0',
  `points` int NOT NULL DEFAULT '0',
  `captures` int NOT NULL DEFAULT '0',
  `kills` int NOT NULL DEFAULT '0',
  `deaths` int NOT NULL DEFAULT '0',
  `base_position` json NOT NULL,
  `gate_objectid` int NOT NULL DEFAULT '980',
  `gate_position` json NOT NULL,
  `territory_position` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `gangs`
--

INSERT INTO `gangs` (`ID`, `name`, `position`, `weapon`, `color`, `alliance`, `points`, `captures`, `kills`, `deaths`, `base_position`, `gate_objectid`, `gate_position`, `territory_position`) VALUES
(1, 'Gang1', '[-2530.2219, -627.4271, 102.1203, 271.0126]', '[9, 24, 26, 31, 32, 34]', -16777046, 0, 90, 9, 0, 0, '[-2471.03, -597.011, 132.4762, 177.685]', 980, '[-2486.840088, -614.753784, 134.437195, 0.0, 0.0, 90.0]', '[-2546.6389, -724.8781, -2482.2898, -589.0472]'),
(2, 'Gang2', '[-1097.2271, -1654.6874, 41.1946, 358.687]', '[9, 24, 26, 31, 32, 34]', -342346582, 0, 0, 0, 0, 0, '[-1067.5989, -1698.6659, 76.1206, 92.2072]', 980, '[0, 0, 0, 0, 0, 0]', '[-1130.4531, -1692.6906, -1077.3817, -1607.33]'),
(3, 'Gang3', '[2184.3428, -1780.822, -26.8097, 268.5805]', '[9, 24, 26, 31, 32, 34]', -638896982, 0, 0, 0, 0, 0, '[2180.3501, -1811.45, 13.5469, 358.875]', 980, '[2184.909912, -1766.880005, 15.17, 0.0, 0.0, 0.0]', '[2130.865, -1840.4093, 2195.76, -1765.9631]'),
(4, 'Gang4', '[1080.98, -333.6257, 3.1703, 91.7151]', '[9, 24, 26, 31, 32, 34]', 887841450, 0, 10, 1, 0, 0, '[1079.66, -380.75, 72.1558, 86.5275]', 980, '[0, 0, 0, 0, 0, 0]', '[1006.0575, -368.3903, 1122.3557, -279.5055]'),
(5, 'Gang5', '[1254.272, 750.8763, -12.3615, 88.5634]', '[9, 24, 26, 31, 32, 34]', 887286698, 0, 10, 1, 0, 0, '[1168.37, 736.128, 10.8188, 265.686]', 980, '[1226.220093, 797.979309, 12.67907, 0.0, 0.0, 0.0]', '[1146.0496, 680.821, 1336.1428, 796.8187]'),
(6, 'Gang6', '[-660.7247, 1037.8153, -7.1097, 92.3058]', '[9, 24, 26, 31, 32, 34]', -184499030, 0, 0, 0, 0, 0, '[-731.181, 798.678, 17.3766, 358.17]', 980, '[0, 0, 0, 0, 0, 0]', '[-731.5027, 909.1513, -643.9531, 991.5863]');

-- --------------------------------------------------------

--
-- Table structure for table `gangscheckpoints`
--

CREATE TABLE `gangscheckpoints` (
  `ID` int NOT NULL,
  `gang_id` int NOT NULL,
  `position` json NOT NULL,
  `position_to` json NOT NULL,
  `textlabel` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `gangscheckpoints`
--

INSERT INTO `gangscheckpoints` (`ID`, `gang_id`, `position`, `position_to`, `textlabel`) VALUES
(1, 1, '[-2522.3500976563, -627.48901367188, 101.63200378418]', '[-2493.8101, -715.333, 139.3203, 359.12]', 'Base'),
(2, 1, '[-2522.3500976563, -628.98901367188, 101.63200378418]', '[-2531.53, -650.326, 147.9063, 307.663]', 'Rocket'),
(3, 1, '[-2522.3500976563, -625.98901367188, 101.63200378418]', '[-2485.5901, -618.795, 143.6497, 285.103]', 'Minigun');

-- --------------------------------------------------------

--
-- Table structure for table `holds`
--

CREATE TABLE `holds` (
  `ID` int NOT NULL,
  `owner` int NOT NULL,
  `index_number` int NOT NULL,
  `model` int NOT NULL,
  `bone` int NOT NULL,
  `offsetposition` json NOT NULL,
  `offsetrotation` json NOT NULL,
  `offsetscale` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `houses`
--

CREATE TABLE `houses` (
  `ID` int NOT NULL,
  `owner` int NOT NULL,
  `position` json NOT NULL,
  `interiorType` varchar(30) NOT NULL,
  `cost` int NOT NULL,
  `lifts` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `houses`
--

INSERT INTO `houses` (`ID`, `owner`, `position`, `interiorType`, `cost`, `lifts`) VALUES
(5, 0, '[-2861.176025390625, 2188.6904296875, 175.06632995]', 'HOUSE_INTERIOR_22', 1000, '[{\"positionsZ\": [0, 6.68, 13.36, 20.05, 26.71, 33.4, 40.05], \"positionXYZ\": [-2861.227051, 2186.06543, 176.003494], \"rotationXYZ\": [0, 0, 270]}]'),
(8, 0, '[2147.197509765625, 2851.887939453125, 10.8203125]', 'HOUSE_INTERIOR_2', 7000, '[]'),
(9, 0, '[300.18768310546875, -1154.3975830078125, 81.39518737792969]', 'HOUSE_INTERIOR_42', 500, '[]'),
(10, 0, '[1479.2816162109375, -1783.4765625, 15.41655731201172]', 'HOUSE_INTERIOR_32', 7000, '[]'),
(11, 0, '[2017.5335693359375, 1919.5533447265625, 12.343249320983888]', 'HOUSE_INTERIOR_31', 300, '[]'),
(12, 0, '[228.00242614746097, -1405.4638671875, 51.609375]', 'HOUSE_INTERIOR_43', 1756, '[]'),
(13, 0, '[219.44837951660156, -1249.654541015625, 78.3359146118164]', 'HOUSE_INTERIOR_32', 1900, '[]'),
(14, 0, '[252.92173767089844, -1270.19873046875, 74.43604278564453]', 'HOUSE_INTERIOR_41', 9829, '[]'),
(15, 0, '[251.20713806152344, -1220.6422119140625, 76.10237121582031]', 'HOUSE_INTERIOR_10', 980, '[]'),
(16, 0, '[416.2203979492187, -1153.783935546875, 76.68761444091797]', 'HOUSE_INTERIOR_17', 9870, '[]'),
(17, 0, '[470.6870422363281, -1164.255126953125, 67.21417236328125]', 'HOUSE_INTERIOR_13', 100, '[]'),
(18, 0, '[691.5774536132812, -1276.0447998046875, 13.553149223327637]', 'HOUSE_INTERIOR_31', 870, '[]'),
(19, 0, '[2099.8701171875, 1552.5137939453125, 10.8203125]', 'HOUSE_INTERIOR_2', 1900, '[]'),
(20, 0, '[-1061.3359375, -1195.57470703125, 129.78118896484375]', 'HOUSE_INTERIOR_8', 190, '[]'),
(21, 0, '[-2552.131103515625, 2266.471435546875, 5.47552490234375]', 'HOUSE_INTERIOR_15', 999999, '[]'),
(22, 0, '[-2523.871337890625, 2238.814208984375, 5.3984375]', 'HOUSE_INTERIOR_22', 0, '[]'),
(23, 0, '[-2523.92041015625, 2238.8525390625, 5.3984375]', 'HOUSE_INTERIOR_30', 0, '[]'),
(24, 0, '[-2354.2978515625, -1619.752197265625, 492.46490478515625]', 'HOUSE_INTERIOR_4', 99999999, '[]'),
(25, 0, '[1298.60986328125, -797.9884033203125, 84.140625]', 'HOUSE_INTERIOR_5', 1600, '[]'),
(26, 0, '[1122.7081298828125, -2036.897705078125, 69.89582824707031]', 'HOUSE_INTERIOR_43', 99999999, '[]'),
(27, 0, '[2454.879150390625, 1499.596923828125, 11.625]', 'HOUSE_INTERIOR_42', 900, '[]'),
(28, 0, '[2561.5498046875, 1561.74560546875, 10.8203125]', 'HOUSE_INTERIOR_37', 906226, '[]'),
(29, 0, '[1496.885009765625, -687.8945922851562, 95.56330871582033]', 'HOUSE_INTERIOR_13', 6500, '[]');

-- --------------------------------------------------------

--
-- Table structure for table `personalcars`
--

CREATE TABLE `personalcars` (
  `ID` int NOT NULL,
  `owner` int NOT NULL,
  `model` int NOT NULL,
  `color` json NOT NULL,
  `position` json NOT NULL,
  `cartext` json NOT NULL,
  `from_admin` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `spawnzones`
--

CREATE TABLE `spawnzones` (
  `ID` int NOT NULL,
  `name` varchar(30) NOT NULL,
  `position` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ;

--
-- Dumping data for table `spawnzones`
--

INSERT INTO `spawnzones` (`ID`, `name`, `position`) VALUES
(1, 'Los Santos', '[1612.9655,-2243.7664,13.5296,178.9145]'),
(2, 'Las Venturas', '[2127.5049,2377.1042,10.8203,179.6744]');

-- --------------------------------------------------------

--
-- Table structure for table `teleports`
--

CREATE TABLE `teleports` (
  `ID` int NOT NULL,
  `command` varchar(30) NOT NULL,
  `type` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `position` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ;

--
-- Dumping data for table `teleports`
--

INSERT INTO `teleports` (`ID`, `command`, `type`, `name`, `position`) VALUES
(1, 'ls', 'others', 'Los Santos', '[1498.7114,-1635.0256,14.0469,273.2714]'),
(2, 'sf', 'others', 'San Fierro', '[-1896.0042,486.6035,35.1719,89.0000]'),
(3, 'lv', 'others', 'Las Venturas', '[2023.4292,1545.4972,10.8202,269.9597]'),
(4, 'lvps', 'others', 'Las Venturas Pay And Spray', '[1958.6022,2162.1301,10.8203,0.0000]'),
(5, 'lv4d', 'others', 'Four Dragos Casino', '[2023.9523,1008.2184,10.8203,0.0000]'),
(6, 'lvstrip', 'others', 'Las Venturas Strip', '[2028.6366,1351.3407,10.8203,0.0000]'),
(7, 'lvpd', 'others', 'Las Venturas Police Dep', '[2233.4011,2453.8323,10.8345,0.0000]'),
(8, 'lvtrans', 'others', 'Las Venturas Transfender', '[2387.8733,1034.4077,10.8203,0.0000]'),
(9, 'sfps', 'others', 'San Fierro Pay and Spray', '[-2426.1794,1039.8589,50.3906,0.0000]'),
(10, 'sft', 'others', 'San Fierro Train', '[-1986.2827,137.5190,27.6875,0.0000]'),
(11, 'lspool', 'others', 'Los Santos Pool', '[1002.5175,-1027.4229,42.7101,0.0000]'),
(12, 'maddog', 'others', 'Madd Dog\'s House', '[1300.3966,-807.3150,84.1406,0.0000]'),
(13, 'vinewood', 'others', 'Vinewood', '[1413.2775,-871.3857,46.9813,0.0000]'),
(14, 'beach', 'others', 'Santa Maria Beach', '[356.7338,-1840.2225,3.6344,88.1765]'),
(15, 'grove', 'others', 'Grove Street', '[2511.9021,-1679.1162,13.5469,58.1343]'),
(16, 'pimps', 'others', 'Pimps', '[-2227.6323,2326.6331,7.5894,90.6285]'),
(17, 'chilliad', 'others', 'Mount Chilliad', '[-2248.9099,-1715.8380,480.2822,44.1701]'),
(18, 'lvpd', 'others', 'Las Venturas PD', '[2290.4636,2451.4724,10.8203,87.1417]'),
(19, 'lspd', 'others', 'Los Santos PD', '[1601.5493,-1623.4749,13.4822,89.3021]'),
(20, 'sfpd', 'others', 'San Fierro PD', '[-1634.4753,674.3205,7.1875,252.8705]'),
(21, 'dam', 'others', 'Dam', '[-928.1943,2029.5308,60.9205,270.0000]'),
(22, 'hut', 'others', 'Forest Hut', '[-1640.9650,-2246.4597,31.4766,85.4683]'),
(23, 'desertramp', 'others', 'Desert Ramp', '[-659.9482,2319.7434,138.6691,77.9657]'),
(24, 'disco', 'others', 'Alhambra Club', '[1829.2306,-1680.6556,13.5469,174.7349]'),
(25, 'lssp', 'others', 'Los Santos Spawn Place', '[1612.9655,-2243.7664,13.5296,180.6691]'),
(26, 'lst', 'others', 'Los Santos Trains', '[1730.2751,-1949.7240,14.1172,270.0000]'),
(27, 'lvt', 'others', 'Las Venturas Trains', '[1432.7722,2623.4712,11.3926,0.0000]'),
(28, 'sft', 'others', 'San Fierro Trains', '[-1986.2827,137.5190,27.6875,0.0000]'),
(29, 'sffire', 'others', 'SF Fire Departament', '[-2041.7462,56.3562,28.3906,306.9080]'),
(30, 'lsammu', 'others', 'Los Santos Ammunation', '[1364.0420,-1279.1008,13.5469,168.4452]'),
(31, 'lvammu', 'others', 'Las Venturas Ammunation', '[2159.2546,945.7769,10.8203,83.9888]'),
(32, 'sfammu', 'others', 'San Fierro Ammunation', '[-2626.4656,212.8103,4.6051,174.6689]'),
(33, 'sfh', 'others', 'San Fierro Hospital', '[-2662.8206,621.0546,14.4531,182.4522]'),
(34, 'quarry', 'others', 'Quarry', '[463.8937,882.3331,-28.3971,260.4150]'),
(35, 'a51', 'others', 'Area 51', '[257.7074,1819.8815,17.6406,20.2470]'),
(36, 'lvchina', 'others', 'Las Venturas China', '[2631.9814,1756.6223,10.8203,93.1331]'),
(37, 'lvsp', 'others', 'Las Venturas Spawn Place', '[2127.6824,2377.0803,10.8203,179.6744]'),
(38, 'drift 1', 'drifts', 'Drift 1', '[-305.5494,1571.5586,75.3594,205.4540]'),
(39, 'drift 2', 'drifts', 'Drift 2', '[-1064.0741,-1647.9069,76.6503,247.5123]'),
(40, 'drift 3', 'drifts', 'Drift 3', '[-2412.2952,-601.3637,132.5625,124.3945]'),
(41, 'drift 4', 'drifts', 'Drift 4', '[2072.2935,2431.3442,49.5234,178.5783]'),
(42, 'drift 5', 'drifts', 'Drift 5', '[2228.8164,1964.7600,31.7797,269.7592]'),
(43, 'drift 6', 'drifts', 'Drift 6', '[2262.4592,1399.1954,42.8203,267.8791]'),
(44, 'lvair', 'drifts', 'Las Venturas Airport', '[1284.0563,1324.0452,10.5331,272.7608]'),
(45, 'aa', 'stunts', 'Old Airport', '[404.7850,2441.8279,16.5563,358.7360]'),
(46, 'lsair', 'stunts', 'Los Santos Airport', '[2079.9316,-2543.0876,13.3024,90.5050]'),
(47, 'sfair', 'stunts', 'San Fierro Airport', '[-1199.7649,12.4021,13.8937,133.9510]'),
(48, 'jizzy', 'stunts', 'Jizzy Stunt', '[-2632.2393,1349.4683,6.8599,295.9024]'),
(49, 'chrome', 'stunts', 'Stunt Chrome', '[-816.0350,1814.7744,7.0000,274.4066]'),
(50, 'rc', 'stunts', 'Roller Coaster', '[229.5539,123.7873,3.3036,79.2009]'),
(51, 'bmx', 'stunts', 'Stunt BMX', '[1419.0518,2773.6829,10.8203,95.5057]'),
(52, 'mc', 'stunts', 'Monster Crash', '[-2014.9366,-965.4127,32.5234,359.3015]'),
(53, 'reedy', 'custom', 'Reedy\'s house', '[-2859.5552,2206.4790,174.9100,192.5727]'),
(54, 'party', 'partys', 'Party', '[-2952.0520,-502.6630,3.2503,177.2973]'),
(55, 'bamboo', 'partys', 'Bamboo Club', '[957.5664,2413.0393,11.1100,227.7955]'),
(56, 'bar', 'partys', 'Party Bar', '[-854.8422,-1967.1138,15.9304,249.0278]');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int NOT NULL,
  `name` varchar(24) CHARACTER SET utf8mb3 COLLATE utf8_bin NOT NULL,
  `password` varchar(50) NOT NULL,
  `spassword` varchar(50) NOT NULL DEFAULT 'null',
  `mail` varchar(50) NOT NULL DEFAULT 'none',
  `money` int NOT NULL DEFAULT '0',
  `coins` int NOT NULL DEFAULT '0',
  `respect_positive` int NOT NULL DEFAULT '0',
  `respect_negative` int NOT NULL DEFAULT '0',
  `hours` int NOT NULL DEFAULT '0',
  `minutes` int NOT NULL DEFAULT '0',
  `seconds` int NOT NULL DEFAULT '0',
  `admin` int NOT NULL DEFAULT '0',
  `admin_points` int NOT NULL DEFAULT '0',
  `admin_kicks` int NOT NULL DEFAULT '0',
  `admin_warns` int NOT NULL DEFAULT '0',
  `admin_bans` int NOT NULL DEFAULT '0',
  `admin_reactiontests` int NOT NULL DEFAULT '0',
  `admin_mathtests` int NOT NULL DEFAULT '0',
  `admin_jails` int NOT NULL DEFAULT '0',
  `admin_mutes` int NOT NULL DEFAULT '0',
  `admin_clearchats` int NOT NULL DEFAULT '0',
  `admin_since` varchar(20) NOT NULL DEFAULT 'Unknown',
  `rcontype` int NOT NULL DEFAULT '0',
  `VIP` int NOT NULL DEFAULT '0',
  `VIP_Expire` int NOT NULL DEFAULT '0',
  `clan` int NOT NULL DEFAULT '0',
  `clan_rank` int NOT NULL DEFAULT '0',
  `gang` int NOT NULL DEFAULT '0',
  `gang_rank` int NOT NULL DEFAULT '0',
  `gang_kills` int NOT NULL DEFAULT '0',
  `gang_deaths` int NOT NULL DEFAULT '0',
  `gang_captures` int NOT NULL DEFAULT '0',
  `gang_points` int NOT NULL DEFAULT '0',
  `gang_warns` int NOT NULL DEFAULT '0',
  `gang_hours` int NOT NULL DEFAULT '0',
  `gang_minutes` int NOT NULL DEFAULT '0',
  `gang_seconds` int NOT NULL DEFAULT '0',
  `gang_membersince` varchar(20) DEFAULT 'Unknown',
  `kills` int NOT NULL DEFAULT '0',
  `headshots` int NOT NULL DEFAULT '0',
  `killingspree` int NOT NULL DEFAULT '0',
  `bestkillingspree` int NOT NULL DEFAULT '0',
  `deaths` int NOT NULL DEFAULT '0',
  `driftpoints` int NOT NULL DEFAULT '0',
  `stuntpoints` int NOT NULL DEFAULT '0',
  `racepoints` int NOT NULL DEFAULT '0',
  `month_hours` int NOT NULL DEFAULT '0',
  `month_minutes` int NOT NULL DEFAULT '0',
  `month_seconds` int NOT NULL DEFAULT '0',
  `month_kills` int NOT NULL DEFAULT '0',
  `month_headshots` int NOT NULL DEFAULT '0',
  `month_killingspree` int NOT NULL DEFAULT '0',
  `month_bestkillingspree` int NOT NULL DEFAULT '0',
  `month_deaths` int NOT NULL DEFAULT '0',
  `month_driftpoints` int NOT NULL DEFAULT '0',
  `month_stuntpoints` int NOT NULL DEFAULT '0',
  `month_racepoints` int NOT NULL DEFAULT '0',
  `description1` varchar(100) NOT NULL DEFAULT '',
  `description2` varchar(100) NOT NULL DEFAULT '',
  `description3` varchar(100) NOT NULL DEFAULT '',
  `laston` varchar(10) DEFAULT 'Unknown',
  `jailed` int NOT NULL DEFAULT '0',
  `caged` int NOT NULL DEFAULT '0',
  `kicks` int NOT NULL DEFAULT '0',
  `discord` varchar(20) NOT NULL DEFAULT '0',
  `hold_settings` int NOT NULL DEFAULT '0',
  `house` int NOT NULL DEFAULT '0',
  `business` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `akas`
--
ALTER TABLE `akas`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `bans`
--
ALTER TABLE `bans`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `business`
--
ALTER TABLE `business`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `clans`
--
ALTER TABLE `clans`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `dealership`
--
ALTER TABLE `dealership`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `discordChannelLogs`
--
ALTER TABLE `discordChannelLogs`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `gangs`
--
ALTER TABLE `gangs`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `gangscheckpoints`
--
ALTER TABLE `gangscheckpoints`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `holds`
--
ALTER TABLE `holds`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `houses`
--
ALTER TABLE `houses`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `personalcars`
--
ALTER TABLE `personalcars`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `spawnzones`
--
ALTER TABLE `spawnzones`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `teleports`
--
ALTER TABLE `teleports`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `akas`
--
ALTER TABLE `akas`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bans`
--
ALTER TABLE `bans`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `business`
--
ALTER TABLE `business`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `clans`
--
ALTER TABLE `clans`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dealership`
--
ALTER TABLE `dealership`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `discordChannelLogs`
--
ALTER TABLE `discordChannelLogs`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gangs`
--
ALTER TABLE `gangs`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `gangscheckpoints`
--
ALTER TABLE `gangscheckpoints`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `holds`
--
ALTER TABLE `holds`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `houses`
--
ALTER TABLE `houses`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `personalcars`
--
ALTER TABLE `personalcars`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `spawnzones`
--
ALTER TABLE `spawnzones`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `teleports`
--
ALTER TABLE `teleports`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
