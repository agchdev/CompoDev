-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-03-2025 a las 23:24:08
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `compodev`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `titulo` varchar(30) NOT NULL,
  `html` longtext NOT NULL,
  `css` longtext NOT NULL,
  `js` longtext NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `categoria` varchar(30) NOT NULL,
  `likes` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`id`, `titulo`, `html`, `css`, `js`, `descripcion`, `categoria`, `likes`) VALUES
(13, 'holaPepe', '', '', '', 'Mi Primero proyecto', 'Botones', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos_guardados`
--

CREATE TABLE `proyectos_guardados` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_proyecto` bigint(11) UNSIGNED NOT NULL,
  `id_usuario` bigint(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos_usuarios`
--

CREATE TABLE `proyectos_usuarios` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_proyecto` bigint(11) UNSIGNED NOT NULL,
  `id_usuario` bigint(11) UNSIGNED NOT NULL,
  `rol` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `proyectos_usuarios`
--

INSERT INTO `proyectos_usuarios` (`id`, `id_proyecto`, `id_usuario`, `rol`) VALUES
(12, 13, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguidres_usuarios`
--

CREATE TABLE `seguidres_usuarios` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_usu1` bigint(11) UNSIGNED NOT NULL,
  `id_usu2` bigint(11) UNSIGNED NOT NULL,
  `tiempo` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `urlFoto` varchar(50) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `verificado` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `user`, `email`, `password`, `urlFoto`, `descripcion`, `verificado`) VALUES
(1, 'agch', 'agch@gmail.com', '82bb78b29f8b9245de2e50fa1d5eda82', 'backend\\uploads\\deafult.jpg', '', 0),
(2, 'pepe', 'pepe@pepe.com', '$2y$10$6MPWTsCDFVLVA.lu0yoKW.zj.C3KpaKAlPFiBGRuTeODYhUvY7FKq', './uploads/pepe.jpg', 'Hola me llamo Pepe y soy un apasionado por la Itenligencia artificial y todo lo relacionado con el ambito de la programacion', 0),
(3, 'pablo', 'pablo@pablo.com', '$2y$10$GBd9siKt8qk5Rmzyj3IWKewJATpikNWpi97lrI/YMh/I/1e2b3kly', './uploads/pablo.jpg', '', 0),
(4, 'aa', 'aa@aa', '$2y$10$Z5NmY5oQVA.4Aik8YcPT7e0mYPVg.mciZutMgtkRtY5NpZI680bx2', './uploads/aa.jpg', '', 0),
(5, 'ew', 'ew@ew', '$2y$10$OSlIKIvh9CCiAjYuBZK4aOpGuVZNa5QXVHLbkunUZlrrLP0ZBQsnO', './uploads/ew.jpg', '', 0),
(6, 'nasa', 'nasa@nasa.com', '$2y$10$/ICzHeum6A0UrkMdgy08YONaGNTSGlLjaeYX/r9QmDPDc9yzwar2G', './uploads/nasa.jpg', '', 0),
(7, 'andres', 'andres@andres.com', '$2y$10$G.oCPNEOSq1CbeUNAwd2nuBxveRc/fYGYR023275WEacORhKT0i0.', './uploads/andres.jpg', '', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `proyectos_guardados`
--
ALTER TABLE `proyectos_guardados`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `fk_pro_save` (`id_proyecto`),
  ADD KEY `fk_usu_save` (`id_usuario`);

--
-- Indices de la tabla `proyectos_usuarios`
--
ALTER TABLE `proyectos_usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `fk_pro_pusu` (`id_proyecto`),
  ADD KEY `fk_usu_pusu` (`id_usuario`);

--
-- Indices de la tabla `seguidres_usuarios`
--
ALTER TABLE `seguidres_usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `fk_usu_susu1` (`id_usu1`),
  ADD KEY `fk_usu_susu2` (`id_usu2`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `proyectos_guardados`
--
ALTER TABLE `proyectos_guardados`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proyectos_usuarios`
--
ALTER TABLE `proyectos_usuarios`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `seguidres_usuarios`
--
ALTER TABLE `seguidres_usuarios`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `proyectos_guardados`
--
ALTER TABLE `proyectos_guardados`
  ADD CONSTRAINT `fk_pro_save` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usu_save` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `proyectos_usuarios`
--
ALTER TABLE `proyectos_usuarios`
  ADD CONSTRAINT `fk_pro_pusu` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usu_pusu` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `seguidres_usuarios`
--
ALTER TABLE `seguidres_usuarios`
  ADD CONSTRAINT `fk_usu_susu1` FOREIGN KEY (`id_usu1`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usu_susu2` FOREIGN KEY (`id_usu2`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
