-- Copiando estrutura do banco de dados para l45u0zesnsf2bf9o
CREATE DATABASE IF NOT EXISTS `l45u0zesnsf2bf9o` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `l45u0zesnsf2bf9o`;

-- Copiando estrutura para tabela l45u0zesnsf2bf9o.weekday
CREATE TABLE IF NOT EXISTS `help` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(500) DEFAULT NULL,
  `title` varchar(150) NOT NULL,
  `desc` varchar(200) NOT NULL,
  `text` varchar(1000) NOT NULL,
  `location` enum('FAQ','Desk') NOT NULL DEFAULT 'FAQ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
COMMIT;

CREATE TABLE IF NOT EXISTS `weekday` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '0',
  `id_prod` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela l45u0zesnsf2bf9o.weekday: ~7 rows (aproximadamente)
/*!40000 ALTER TABLE `weekday` DISABLE KEYS */;
INSERT IGNORE INTO `weekday` (`id`, `name`, `id_prod`) VALUES
	(1, 'Domingo', 0),
	(2, 'Segunda-Feira', 1),
	(3, 'Terça-Feira', 2),
	(4, 'Quarta-Feira', 3),
	(5, 'Quinta-Feira', 4),
	(6, 'Sexta-Feira', 5),
	(7, 'Sábado', 6);
/*!40000 ALTER TABLE `weekday` ENABLE KEYS */;

-- Copiando estrutura para tabela l45u0zesnsf2bf9o.specialty
CREATE TABLE IF NOT EXISTS `specialty` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela l45u0zesnsf2bf9o.specialty: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `specialty` DISABLE KEYS */;
INSERT IGNORE INTO `specialty` (`id`, `name`) VALUES
	(1, 'Assistência Social'),
	(2, 'Pedagogia'),
	(3, 'Psicologia'),
	(4, 'Outra');
/*!40000 ALTER TABLE `specialty` ENABLE KEYS */;

-- Copiando estrutura para tabela l45u0zesnsf2bf9o.help
CREATE TABLE IF NOT EXISTS `help` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(500) DEFAULT NULL,
  `title` varchar(150) NOT NULL,
  `desc` varchar(200) NOT NULL,
  `text` varchar(1000) NOT NULL,
  `location` enum('FAQ','Desk') NOT NULL DEFAULT 'FAQ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando estrutura para tabela l45u0zesnsf2bf9o.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

-- Copiando estrutura para tabela l45u0zesnsf2bf9o.rescuer
CREATE TABLE IF NOT EXISTS `rescuer` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `bio` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `available` int(2) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `specialty_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rescuer_user_id_foreign` (`user_id`),
  KEY `rescuer_specialty_id_foreign` (`specialty_id`),
  CONSTRAINT `rescuer_specialty_id_foreign` FOREIGN KEY (`specialty_id`) REFERENCES `specialty` (`id`),
  CONSTRAINT `rescuer_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

-- Copiando estrutura para tabela l45u0zesnsf2bf9o.schedule
CREATE TABLE IF NOT EXISTS `schedule` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `week_day` int(10) NOT NULL DEFAULT '0',
  `from` int(11) NOT NULL,
  `to` int(11) NOT NULL,
  `rescuer_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `schedule_rescuer_id_foreign` (`rescuer_id`),
  CONSTRAINT `schedule_rescuer_id_foreign` FOREIGN KEY (`rescuer_id`) REFERENCES `rescuer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

-- Copiando estrutura para tabela l45u0zesnsf2bf9o.vulnerable
CREATE TABLE IF NOT EXISTS `vulnerable` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `access_key` varchar(255) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vulnerable_user_id_foreign` (`user_id`),
  CONSTRAINT `vulnerable_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

-- Copiando estrutura para tabela l45u0zesnsf2bf9o.assistance
CREATE TABLE IF NOT EXISTS `assistance` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `protocol` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `accessLink` varchar(255) NOT NULL,
  `session_start` varchar(255) DEFAULT NULL,
  `session_end` varchar(255) DEFAULT NULL,
  `preview` varchar(255) DEFAULT NULL,
  `rescuer_id` int(10) unsigned NOT NULL,
  `vulnerable_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `assistance_rescuer_id_foreign` (`rescuer_id`),
  KEY `assistance_vulnerable_id_foreign` (`vulnerable_id`),
  CONSTRAINT `assistance_rescuer_id_foreign` FOREIGN KEY (`rescuer_id`) REFERENCES `rescuer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `assistance_vulnerable_id_foreign` FOREIGN KEY (`vulnerable_id`) REFERENCES `vulnerable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;