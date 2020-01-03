-- phpMyAdmin SQL Dump
-- version 5.0.0-rc1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 18, 2019 at 03:46 PM
-- Server version: 8.0.18
-- PHP Version: 7.2.24-0ubuntu0.18.04.1

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
-- Table structure for table `adminUsers`
--

CREATE TABLE `adminUsers` (
  `id` int(11) NOT NULL,
  `name` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `password` char(64) DEFAULT NULL,
  `email` char(30) DEFAULT NULL,
  `tel` char(12) DEFAULT NULL,
  `stt` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `adminUsers`
--

INSERT INTO `adminUsers` (`id`, `name`, `password`, `email`, `tel`) VALUES
(1, 'S-Admin', '$2a$10$XWHFOuSLoCAb8QtPX.XLauK1ht88EgkYivkthvtU0bGBhRTRuux/u', 'nodejsacc1@gmail.com', NULL),
(4, 'Vinh', '$2a$10$PAnCVFNZ25p3Z6b8EnEPgesQoeZrXGAaO/GMaXTpzujJZF2floFXW', 'nodejsacc2@gmail.com', '0868459091'),
(5, 'adminVY', '$2a$10$Mgnrmzg3Rl4EUkSdXgjkg.pNuuGJR6ETYsd/.qa9D9KFzsWY6AAJO', 'adminVY@gmail.com', '123456789');

-- --------------------------------------------------------

--
-- Table structure for table `shoe`
--

CREATE TABLE `shoe` (
  `magiay` int(11) NOT NULL,
  `anh` varchar(15) CHARACTER SET utf8 DEFAULT NULL,
  `tengiay` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `soluong` varchar(15) CHARACTER SET utf8 DEFAULT NULL,
  `nhanhieu` varchar(15) CHARACTER SET utf8 DEFAULT NULL,
  `mau` varchar(15) CHARACTER SET utf8 DEFAULT NULL,
  `giacu` int(11) DEFAULT NULL,
  `giamoi` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shoe`
--

INSERT INTO `shoe` (`magiay`, `anh`, `tengiay`, `soluong`, `nhanhieu`, `mau`, `giacu`, `giamoi`) VALUES
('0001', 'p1', 'NIKE NEW KING', '10', 'NIKE', 'XAM', 250000, 149000),
('0002', 'p2', 'ADIDAS NEW QUEEN', '12', 'ADIDAS', 'XAM', 250000, 149000),
('0003', 'p3', 'NIKE NEW LORD', '8', 'NIKE', 'DEN', 250000, 149000),
('0004', 'p4', 'ADIDAS NEW CYBER', '50', 'ADIDAS', 'NAU', 250000, 149000),
('0005', 'p5', 'BITIS NEW PHANTOM', '6', 'BITIS', 'XAM', 250000, 149000),
('0006', 'p6', 'VANS NEW LION', '7', 'VANS', 'DO', 250000, 149000),
('0007', 'p7', 'ADIDAS NEW DRAGON', '4', 'ADIDAS', 'XAM', 250000, 149000),
('0008', 'p8', 'SNEAKER NEW TIGER', '3', 'SNEAKER', 'XAM', 250000, 149000),
('0009', 'p9', 'AIR FORCE 1 SHADOW PALE IVORY', '5', 'NIKE', 'XAM', 1490000, 1290000),
('0010', 'p10', 'AIR FORCE 1 X PARA-NOISE', '9', 'NIKE', 'DEN', 1600000, 1500000),
('0011', 'p11', 'AIR FORCE 1 LX WHITE', '15', 'NIKE', 'TRANG', 1600000, 1290000),
('0012', 'p12', 'AIR FORCE 1 LOW', '20', 'NIKE', 'TRANG', 1500000, 1290000),
('0013', 'p13', 'AIR FORCE 1 LOW (LIMITED)', '21', 'NIKE', 'DEN', 1700000, 1590000),
('0014', 'p14', 'AIR FORCE 1 (KOREA EXCLUSIVE)', '20', 'NIKE', 'DEN', 1700000, 1590000),
('0015', 'p15', 'AIR FORCE 1 SHADOW PHANTOM', '6', 'NIKE', 'TRANG', 1500000, 1290000);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `password` char(64) DEFAULT NULL,
  `email` char(30) DEFAULT NULL,
  `tel` char(12) DEFAULT NULL,
  `stt` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `tel`) VALUES
(1, 'nodejsacc3@gmail.com', '$2a$10$CFzE0H4WBOogvtnZnf5aQuZ7mV5Pb9oFbPOvKrN1Hjc.e4sTFI8W.', 'Thay giao 3', '1234567981'),
(2, 'user1@gmail.com', '$2a$10$3c9Ltd18Y3BMxmU/eSOBKO1zyEP9cWDQ0r/x2rHIphrBqTJBfB.aO', 'Vinh Đặng', '0915797703'),
(3, 'truongvy@gmail.com', '$2a$10$QV4zpWYhAt0yGe9CAwlSBu5bTZuN70oi6pE6goXPzXOeSisg27O32', 'vy dep chai', '012');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminUsers`
--
ALTER TABLE `adminUsers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shoe`
--
ALTER TABLE `shoe`
  ADD PRIMARY KEY (`magiay`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminUsers`
--
ALTER TABLE `adminUsers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
  
--
-- AUTO_INCREMENT for table `shoe`
--
ALTER TABLE `shoe`
  MODIFY `magiay` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
  
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

