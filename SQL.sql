-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 23-Jun-2021 às 15:21
-- Versão do servidor: 10.1.36-MariaDB
-- versão do PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `apivulnerabilitybd`
--
CREATE DATABASE IF NOT EXISTS `apivulnerabilitybd` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `apivulnerabilitybd`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `assistance`
--

CREATE TABLE IF NOT EXISTS `assistance` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `protocol` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `accessLink` varchar(255) NOT NULL,
  `session_start` varchar(255) DEFAULT NULL,
  `session_end` varchar(255) DEFAULT NULL,
  `preview` varchar(255) DEFAULT NULL,
  `rescuer_id` int(10) UNSIGNED NOT NULL,
  `vulnerable_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `assistance_rescuer_id_foreign` (`rescuer_id`),
  KEY `assistance_vulnerable_id_foreign` (`vulnerable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `help`
--

CREATE TABLE IF NOT EXISTS `help` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(500) DEFAULT NULL,
  `title` varchar(150) NOT NULL,
  `desc` varchar(200) NOT NULL,
  `text` varchar(1000) NOT NULL,
  `location` enum('FAQ','Desk','Landing') NOT NULL DEFAULT 'FAQ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `help`
--

INSERT INTO `help` (`id`, `url`, `title`, `desc`, `text`, `location`) VALUES
(1, NULL, 'ESTOU SOFRENDO VIOLÊNCIA DOMÉSTICA E GOSTARIA DE ORIENTAÇÕES. COMO PROCEDER?', '', 'Disque 180. A ligação é gratuita e o serviço funciona 24 horas por dia, todos os dias da semana. São atendidas todas as pessoas que ligam relatando eventos de violência contra a mulher. O Ligue 180 atende todo o território nacional e também pode ser acessado em outros países.', 'Landing'),
(2, NULL, 'MAS AFINAL, COMO A CENTRAL DE ATENDIMENTO À MULHER PODE AJUDAR?', '', 'A Central de Atendimento à Mulher – Ligue 180 presta uma escuta e acolhida qualificada às mulheres em situação de violência. O serviço registra e encaminha denúncias de violência contra a mulher aos órgão competentes, bem como reclamações, sugestões ou elogios sobre o funcionamento dos serviços de atendimento.\r\n<br></br>\r\nO serviço também fornece informações sobre os direitos da mulher, como os locais de atendimento mais próximos e apropriados para cada caso: Casa da Mulher Brasileira, Centros de Referências, Delegacias de Atendimento à Mulher (Deam), Defensorias Públicas, Núcleos Integrados de Atendimento às Mulheres, entre outros.', 'Landing'),
(3, NULL, 'COMO DENUNCIAR VIOLÊNCIA DOMÉSTICA?', '', 'Procure a delegacia mais próxima para registrar um boletim de ocorrência relatando os abusos sofridos, o que implicará na instauração de um processo investigatório. As vantagens da instauração deste procedimento são justamente as medidas protetivas para a mulher: Elas são aplicadas após a denúncia de agressão feita pela vítima à Delegacia de Polícia, sendo que cabe ao juiz determinar a execução das mesmas em até 48 horas após o recebimento do pedido da vítima ou do Ministério Público, caso elas sejam urgentes.', 'Landing'),
(4, NULL, 'QUAIS SÃO AS MEDIDAS PROTETIVAS?', '', 'As medidas protetivas podem ser o afastamento do agressor do lar ou local de convivência com a vítima, a fixação de limite mínimo de distância de que o agressor fica proibido de ultrapassar em relação à vítima e a suspensão da posse ou restrição do porte de armas, se for o caso. O agressor também pode ser proibido de entrar em contato com a vítima, seus familiares e testemunhas por qualquer meio ou, ainda, deverá obedecer à restrição ou suspensão de visitas aos dependentes menores, ouvida a equipe de atendimento multidisciplinar ou serviço militar. Outra medida que pode ser aplicada pelo juiz em proteção à mulher vítima de violência é a obrigação de o agressor pagar pensão alimentícia provisória.', 'Landing'),
(5, NULL, 'O QUE PODE ACONTECER SE O AGRESSOR DESCUMPRIR ALGUMA DESSAS MEDIDAS?', '', 'O descumprimento de qualquer medida protetiva pelo agressor implicará na decretação da sua prisão preventiva, vide arts. 20 e seguintes da Lei 11.340/2006.', 'Landing'),
(6, NULL, 'SÓ A VÍTIMA PODE DENUNCIAR UM CASO DE VIOLÊNCIA DOMÉSTICA?', '', 'Não. Qualquer pessoa pode denunciar um caso de violência doméstica. É preferível que a mulher se sinta confortável com tal denúncia e que, por isso, ela mesma a faça. Contudo, se ela estiver em uma situação de vulnerabilidade e não conseguir fazê-la, qualquer outra pessoa pode, sendo que o único empecilho é que alguns delitos necessitam da representação da mulher para seguirem o curso da investigação.', 'Landing'),
(7, NULL, 'ESTOU SENDO VÍTIMA DE BULLYING VIRTUAL. COMO POSSO PROCEDER?', '', 'O primeiro passo é manter a calma. Sabemos que esse momento pode ser muito difícil, mas estamos aqui para te auxiliar. Primeiro, colete evidências. É importante guardar tudo o que te ajude a provar sobre os crimes que estão ocorrendo. Salve e-mails, print screen das telas e preserve as conversas dos aplicativos de mensagens. Lembre-se de guardar essas informações em mais de um lugar, seja na nuvem, imprimindo ou pen drive. Tenha muito cuidado para não perder evidências que irão te ajudar nesse processo. Se possível, conte com testemunhas para te acompanhar durante a coleta de evidências para que existam ainda mais consistência em suas provas.', 'Landing'),
(8, NULL, 'JÁ TENHO AS PROVAS DO BULLYING VIRTUAL. COMO PROCEDER?', '', 'Com evidências em mãos, é importante registrar uma ata notarial no cartório para declarar a veracidade dos documentos e fatos digitais reunidos por você como prova. Esse documento é significativo para que suas evidências sejam registradas como verdadeiras dentro do processo e utilizadas como provas numa futura ação judicial. No cartório você pode se informar acerca da ata notarial e como proceder.', 'Landing'),
(9, NULL, 'DEVO FAZER BOLETIM DE OCORRÊNCIA PARA CRIMES QUE OCORREM NA INTERNET?', '', 'Sim. Assim como qualquer crime, é preciso fazer um boletim de ocorrência. Dirija-se à delegacia mais próxima e faça o B.O. É possível fazer esse registro em qualquer unidade da Polícia Civil, mas se existir em sua cidade, é interessante procurar a Delegacia de Repressão aos Crimes Informáticos (DRCI). Os dados coletados no BO serão muito úteis para nortear as autoridades em relação ao crime e ele é essencial para o seu processo!', 'Landing'),
(10, NULL, 'COMO PEDIR REMOÇÃO DE CONTEÚDO INAPROPRIADO QUE POSTARAM EM MEU NOME?', '', 'A depender do crime, você pode solicitar a remoção desse conteúdo até mesmo por meio do Boletim de Ocorrência que realizará na Delegacia. Para fazer essa solicitação, é necessário enviar uma Carta Registrada relatando o acontecido para o prestador do serviço de conteúdo na internet, onde você busca retirar o conteúdo publicado.', 'Landing');

-- --------------------------------------------------------

--
-- Estrutura da tabela `rescuer`
--

CREATE TABLE IF NOT EXISTS `rescuer` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `bio` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `available` int(2) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `specialty_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rescuer_user_id_foreign` (`user_id`),
  KEY `rescuer_specialty_id_foreign` (`specialty_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `schedule`
--

CREATE TABLE IF NOT EXISTS `schedule` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `week_day` int(10) NOT NULL DEFAULT '0',
  `from` int(11) NOT NULL,
  `to` int(11) NOT NULL,
  `rescuer_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `schedule_rescuer_id_foreign` (`rescuer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `specialty`
--

CREATE TABLE IF NOT EXISTS `specialty` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `vulnerable`
--

CREATE TABLE IF NOT EXISTS `vulnerable` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `access_key` varchar(255) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vulnerable_user_id_foreign` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `weekday`
--

CREATE TABLE IF NOT EXISTS `weekday` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '0',
  `id_prod` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `assistance`
--
ALTER TABLE `assistance`
  ADD CONSTRAINT `assistance_rescuer_id_foreign` FOREIGN KEY (`rescuer_id`) REFERENCES `rescuer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assistance_vulnerable_id_foreign` FOREIGN KEY (`vulnerable_id`) REFERENCES `vulnerable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `rescuer`
--
ALTER TABLE `rescuer`
  ADD CONSTRAINT `rescuer_specialty_id_foreign` FOREIGN KEY (`specialty_id`) REFERENCES `specialty` (`id`),
  ADD CONSTRAINT `rescuer_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_rescuer_id_foreign` FOREIGN KEY (`rescuer_id`) REFERENCES `rescuer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `vulnerable`
--
ALTER TABLE `vulnerable`
  ADD CONSTRAINT `vulnerable_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
