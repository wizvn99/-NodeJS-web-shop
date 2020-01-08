-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2020 at 02:06 AM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopshoe`
--

-- --------------------------------------------------------

--
-- Table structure for table `shoe`
--

CREATE TABLE `shoe` (
  `magiay` int(11) NOT NULL,
  `anh` varchar(15) DEFAULT NULL,
  `tengiay` varchar(255) DEFAULT NULL,
  `soluong` varchar(15) DEFAULT NULL,
  `nhanhieu` varchar(15) DEFAULT NULL,
  `mau` varchar(15) DEFAULT NULL,
  `giacu` int(11) DEFAULT NULL,
  `giamoi` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shoe`
--

INSERT INTO `shoe` (`magiay`, `anh`, `tengiay`, `soluong`, `nhanhieu`, `mau`, `giacu`, `giamoi`) VALUES
(1, 'p1.jpg', 'NIKE NEW KING', '10', 'NIKE', 'XAM', 250000, 149000),
(2, 'p2.jpg', 'ADIDAS NEW QUEEN', '12', 'ADIDAS', 'XAM', 250000, 2000000),
(3, 'p3.jpg', 'NIKE NEW LORD', '8', 'NIKE', 'DEN', 250000, 149000),
(4, 'p4.jpg', 'ADIDAS NEW CYBER', '50', 'ADIDAS', 'NAU', 250000, 149000),
(5, 'p5.jpg', 'BITIS NEW PHANTOM', '6', 'BITIS', 'XAM', 250000, 149000),
(6, 'p6.jpg', 'VANS NEW LION', '7', 'VANS', 'DO', 250000, 149000),
(7, 'p7.jpg', 'ADIDAS NEW DRAGON', '4', 'ADIDAS', 'XAM', 250000, 149000),
(8, 'p8.jpg', 'SNEAKER NEW TIGER', '3', 'SNEAKER', 'XAM', 250000, 149000),
(9, 'p9.jpg', 'AIR FORCE 1 SHADOW PALE IVORY', '5', 'NIKE', 'XAM', 1490000, 1290000),
(10, 'p10.jpg', 'AIR FORCE 1 X PARA-NOISE', '9', 'NIKE', 'DEN', 1600000, 1500000),
(11, 'p11.jpg', 'AIR FORCE 1 LX WHITE', '15', 'NIKE', 'TRANG', 1600000, 1290000),
(12, 'p12.jpg', 'AIR FORCE 1 LOW', '20', 'NIKE', 'TRANG', 1500000, 1290000),
(13, 'p13.jpg', 'AIR FORCE 1 LOW (LIMITED)', '21', 'NIKE', 'DEN', 1700000, 1590000),
(14, 'p14.jpg', 'AIR FORCE 1 (KOREA EXCLUSIVE)', '20', 'NIKE', 'DEN', 1700000, 1590000),
(15, 'p15.jpg', 'AIR FORCE 1 SHADOW PHANTOM', '6', 'NIKE', 'TRANG', 1500000, 1290000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `shoe`
--
ALTER TABLE `shoe`
  ADD PRIMARY KEY (`magiay`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `shoe`
--
ALTER TABLE `shoe`
  MODIFY `magiay` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
