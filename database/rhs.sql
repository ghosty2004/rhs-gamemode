-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2021 at 04:21 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- Table structure for table `clans`
--

CREATE TABLE `clans` (
  `ID` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `owner` int(11) NOT NULL,
  `position` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`position`)),
  `weapon` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`weapon`)),
  `color` varchar(10) NOT NULL,
  `member_skin` int(11) NOT NULL,
  `leader_skin` int(11) NOT NULL,
  `kills` int(11) NOT NULL DEFAULT 0,
  `deaths` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `spawnzones`
--

CREATE TABLE `spawnzones` (
  `ID` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `position` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`position`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `ID` int(11) NOT NULL,
  `command` varchar(30) NOT NULL,
  `type` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `position` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`position`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(37, 'lvsp', 'others', 'Las Venturas Spawn Place', '[2127.6824,2377.0803,10.8203,179.6744]');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `name` varchar(24) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(50) NOT NULL,
  `spassword` varchar(50) NOT NULL DEFAULT 'null',
  `mail` varchar(50) NOT NULL DEFAULT 'none',
  `admin` int(11) NOT NULL DEFAULT 0,
  `VIP` int(11) NOT NULL DEFAULT 0,
  `VIP_Expire` int(11) NOT NULL DEFAULT 0,
  `clan` int(11) NOT NULL DEFAULT 0,
  `clan_rank` int(11) NOT NULL DEFAULT 0,
  `gang` int(11) NOT NULL DEFAULT 0,
  `jailed` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clans`
--
ALTER TABLE `clans`
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
-- AUTO_INCREMENT for table `clans`
--
ALTER TABLE `clans`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `spawnzones`
--
ALTER TABLE `spawnzones`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `teleports`
--
ALTER TABLE `teleports`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
