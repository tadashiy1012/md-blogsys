-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017 年 3 朁E27 日 06:00
-- サーバのバージョン： 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mdblog`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `blog`
--

CREATE TABLE `blog` (
  `userId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- テーブルのデータのダンプ `blog`
--

INSERT INTO `blog` (`userId`, `title`, `description`) VALUES
(1, 'md-blog', 'hoge fuga');

-- --------------------------------------------------------

--
-- テーブルの構造 `entry`
--

CREATE TABLE `entry` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `authorId` int(11) NOT NULL,
  `body` text NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- テーブルのデータのダンプ `entry`
--

-- INSERT INTO `entry` (`id`, `title`, `authorId`, `body`, `date`) VALUES
-- (1, 'test entry', 1, 'hogehoge', '2017-03-15 00:00:00'),
-- (2, 'fugafuga', 1, 'fugafugafuga', '2017-03-19 00:00:00'),
-- (3, 'fugafuga', 1, 'fugafugafuga', '2017-03-26 00:00:00'),
-- (5, 'test hoge', 1, '# test hogefuga', '2017-03-26 16:42:02'),
-- (7, 'test hoge', 1, '# test hogefuga', '2017-03-26 16:49:59'),
-- (8, 'test hoge', 1, '# test hogefuga', '2017-03-26 17:00:31'),
-- (9, 'test hoge', 1, '# test hogefuga', '2017-03-26 17:01:11'),
-- (10, 'test hoge', 1, '# test hogefuga', '2017-03-26 17:01:21'),
-- (11, 'test hoge fuga', 1, '# test hogefuga\r\n## hogefuga hogefuga', '2017-03-27 12:34:12'),
-- (12, 'no title', 1, 'no body', '2017-03-26 17:14:23'),
-- (13, 'hage hoge', 1, '# hagehoge', '2017-03-26 17:14:44'),
-- (14, 'piyopiyo', 1, '- piyo\n- piyo', '2017-03-26 21:18:30');

-- --------------------------------------------------------

--
-- テーブルの構造 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- テーブルのデータのダンプ `user`
--

INSERT INTO `user` (`id`, `name`, `pass`) VALUES
(1, 'yama', 'hogehoge');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `entry`
--
ALTER TABLE `entry`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `entry`
--
ALTER TABLE `entry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
