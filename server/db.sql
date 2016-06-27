/*
Navicat MariaDB Data Transfer

Source Server         : localhost
Source Server Version : 100110
Source Host           : localhost:3306
Source Database       : fluido

Target Server Type    : MariaDB
Target Server Version : 100110
File Encoding         : 65001

Date: 2016-05-21 04:45:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for fl_log_process
-- ----------------------------
DROP TABLE IF EXISTS `fl_log_process`;
CREATE TABLE `fl_log_process` (
  `trxprocessid` int(11) NOT NULL,
  `processid` varchar(255) NOT NULL,
  `deploymentid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `rev` int(11) NOT NULL DEFAULT '1',
  `status` varchar(20) DEFAULT NULL,
  `starttime` int(11) DEFAULT NULL,
  `startuser` int(11) DEFAULT NULL,
  `endtime` int(11) DEFAULT NULL,
  `enduser` int(11) DEFAULT NULL,
  `entrytime` int(11) DEFAULT NULL,
  `entryuser` int(11) DEFAULT NULL,
  `isdeleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for fl_log_process_variable
-- ----------------------------
DROP TABLE IF EXISTS `fl_log_process_variable`;
CREATE TABLE `fl_log_process_variable` (
  `variableid` int(11) NOT NULL,
  `trxprocessid` int(11) NOT NULL,
  `rev` int(11) NOT NULL DEFAULT '1',
  `field` varchar(255) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `entrytime` int(11) DEFAULT NULL,
  `entryuser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for fl_log_task
-- ----------------------------
DROP TABLE IF EXISTS `fl_log_task`;
CREATE TABLE `fl_log_task` (
  `trxtaskid` int(11) NOT NULL,
  `taskid` varchar(255) NOT NULL,
  `trxprocessid` int(11) NOT NULL,
  `processid` varchar(255) NOT NULL,
  `deploymentid` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `rev` int(11) NOT NULL DEFAULT '1',
  `type` varchar(20) NOT NULL,
  `subtype` varchar(20) DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `starttime` int(11) DEFAULT NULL,
  `startuser` int(11) DEFAULT '0',
  `endtime` int(11) DEFAULT NULL,
  `enduser` int(11) DEFAULT '0',
  `entrytime` int(11) DEFAULT NULL,
  `entryuser` int(11) DEFAULT NULL,
  `isdeleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for fl_log_task_variable
-- ----------------------------
DROP TABLE IF EXISTS `fl_log_task_variable`;
CREATE TABLE `fl_log_task_variable` (
  `trxtaskid` int(11) NOT NULL,
  `rev` int(11) NOT NULL DEFAULT '1',
  `field` varchar(255) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `entrytime` int(11) DEFAULT NULL,
  `entryuser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for fl_mst_deployment
-- ----------------------------
DROP TABLE IF EXISTS `fl_mst_deployment`;
CREATE TABLE `fl_mst_deployment` (
  `deploymentid` int(11) NOT NULL AUTO_INCREMENT,
  `bpmn` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `entrytime` int(11) DEFAULT NULL,
  `entryuser` int(11) DEFAULT NULL,
  `deletedtime` int(11) DEFAULT NULL,
  `deleteduser` int(11) DEFAULT NULL,
  `isdeleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`deploymentid`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=950 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for fl_mst_flow
-- ----------------------------
DROP TABLE IF EXISTS `fl_mst_flow`;
CREATE TABLE `fl_mst_flow` (
  `flowid` varchar(255) NOT NULL,
  `deploymentid` int(11) NOT NULL,
  `processid` varchar(255) NOT NULL,
  `source` varchar(255) NOT NULL,
  `target` varchar(255) NOT NULL,
  `expression` text,
  KEY `deploymentid` (`deploymentid`),
  KEY `processid` (`processid`),
  KEY `source` (`source`),
  KEY `target` (`target`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for fl_mst_process
-- ----------------------------
DROP TABLE IF EXISTS `fl_mst_process`;
CREATE TABLE `fl_mst_process` (
  `processid` varchar(255) NOT NULL,
  `deploymentid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `documentation` text,
  `isexecutable` tinyint(1) NOT NULL DEFAULT '1',
  KEY `deploymentid` (`deploymentid`),
  KEY `name` (`name`),
  KEY `isexecutable` (`isexecutable`),
  KEY `processid` (`processid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for fl_mst_task
-- ----------------------------
DROP TABLE IF EXISTS `fl_mst_task`;
CREATE TABLE `fl_mst_task` (
  `taskid` varchar(255) NOT NULL,
  `deploymentid` int(11) NOT NULL,
  `processid` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(20) NOT NULL,
  `subtype` varchar(20) DEFAULT NULL,
  `documentation` text,
  `class` varchar(255) DEFAULT NULL,
  KEY `taskid` (`taskid`),
  KEY `deploymentid` (`deploymentid`),
  KEY `processid` (`processid`),
  KEY `name` (`name`),
  KEY `type` (`type`),
  KEY `subtype` (`subtype`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for fl_trx_flow
-- ----------------------------
DROP TABLE IF EXISTS `fl_trx_flow`;
CREATE TABLE `fl_trx_flow` (
  `trxflowid` int(11) NOT NULL AUTO_INCREMENT,
  `flowid` varchar(255) NOT NULL,
  `deploymentid` int(11) NOT NULL,
  `trxprocessid` int(11) NOT NULL,
  `processid` varchar(255) NOT NULL,
  `trxtasksource` int(11) NOT NULL,
  `trxtasktarget` int(11) NOT NULL,
  PRIMARY KEY (`trxflowid`),
  KEY `flowid` (`flowid`),
  KEY `deploymentid` (`deploymentid`),
  KEY `trxprocessid` (`trxprocessid`),
  KEY `processid` (`processid`),
  KEY `trxtasksource` (`trxtasksource`),
  KEY `trxtasktarget` (`trxtasktarget`)
) ENGINE=InnoDB AUTO_INCREMENT=1280 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for fl_trx_process
-- ----------------------------
DROP TABLE IF EXISTS `fl_trx_process`;
CREATE TABLE `fl_trx_process` (
  `trxprocessid` int(11) NOT NULL AUTO_INCREMENT,
  `processid` varchar(255) NOT NULL,
  `deploymentid` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `rev` int(11) NOT NULL DEFAULT '1',
  `status` varchar(10) NOT NULL,
  `starttime` int(11) DEFAULT NULL,
  `startuser` int(11) DEFAULT '0',
  `endtime` int(11) DEFAULT NULL,
  `enduser` int(11) DEFAULT '0',
  `entrytime` int(11) DEFAULT NULL,
  `entryuser` int(11) DEFAULT NULL,
  `modifiedtime` int(11) DEFAULT NULL,
  `modifieduser` int(11) DEFAULT NULL,
  `deletedtime` int(11) DEFAULT NULL,
  `deleteduser` int(11) DEFAULT NULL,
  `isdeleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`trxprocessid`),
  KEY `processid` (`processid`),
  KEY `deploymentid` (`deploymentid`),
  KEY `name` (`name`),
  KEY `status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=742 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for fl_trx_process_variable
-- ----------------------------
DROP TABLE IF EXISTS `fl_trx_process_variable`;
CREATE TABLE `fl_trx_process_variable` (
  `variableid` int(11) NOT NULL AUTO_INCREMENT,
  `trxprocessid` int(11) NOT NULL,
  `rev` int(11) NOT NULL DEFAULT '1',
  `field` varchar(255) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`variableid`),
  KEY `trxprocessid` (`trxprocessid`),
  KEY `field` (`field`),
  KEY `trxprocessid+field` (`trxprocessid`,`field`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for fl_trx_task
-- ----------------------------
DROP TABLE IF EXISTS `fl_trx_task`;
CREATE TABLE `fl_trx_task` (
  `trxtaskid` int(11) NOT NULL AUTO_INCREMENT,
  `taskid` varchar(255) NOT NULL,
  `trxprocessid` int(11) NOT NULL,
  `processid` varchar(255) NOT NULL,
  `deploymentid` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `rev` int(11) NOT NULL DEFAULT '1',
  `type` varchar(20) NOT NULL,
  `subtype` varchar(20) DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `starttime` int(11) DEFAULT NULL,
  `startuser` int(11) DEFAULT '0',
  `endtime` int(11) DEFAULT NULL,
  `enduser` int(11) DEFAULT '0',
  `entrytime` int(11) DEFAULT NULL,
  `entryuser` int(11) DEFAULT NULL,
  `modifiedtime` int(11) DEFAULT NULL,
  `modifieduser` int(11) DEFAULT NULL,
  `deletedtime` int(11) DEFAULT NULL,
  `deleteduser` int(11) DEFAULT NULL,
  `isdeleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`trxtaskid`),
  KEY `taskid` (`taskid`),
  KEY `trxprocessid` (`trxprocessid`),
  KEY `processid` (`processid`),
  KEY `deploymentid` (`deploymentid`),
  KEY `name` (`name`),
  KEY `rev` (`rev`),
  KEY `type` (`type`),
  KEY `subtype` (`subtype`),
  KEY `status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=15644 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for fl_trx_task_variable
-- ----------------------------
DROP TABLE IF EXISTS `fl_trx_task_variable`;
CREATE TABLE `fl_trx_task_variable` (
  `variableid` int(11) NOT NULL AUTO_INCREMENT,
  `trxtaskid` int(11) NOT NULL,
  `rev` int(11) NOT NULL DEFAULT '1',
  `field` varchar(255) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`variableid`),
  KEY `trxtaskid` (`trxtaskid`),
  KEY `field` (`field`),
  KEY `trxtaskid+field` (`trxtaskid`,`field`)
) ENGINE=InnoDB AUTO_INCREMENT=312857 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for sys_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_log`;
CREATE TABLE `sys_log` (
  `logid` int(11) NOT NULL AUTO_INCREMENT,
  `ipaddress` varchar(255) DEFAULT NULL,
  `token` text,
  `useragent` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `request` text,
  `response` text,
  `datetime` bigint(20) DEFAULT NULL,
  `entrytime` int(11) DEFAULT NULL,
  `entryuser` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`logid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for sys_session
-- ----------------------------
DROP TABLE IF EXISTS `sys_session`;
CREATE TABLE `sys_session` (
  `sessionid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `token` text,
  `ipaddress` varchar(255) DEFAULT NULL,
  `useragent` varchar(255) DEFAULT NULL,
  `entrytime` int(11) DEFAULT NULL,
  PRIMARY KEY (`sessionid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `usergroupid` int(1) NOT NULL DEFAULT '0',
  `isenabled` int(1) NOT NULL DEFAULT '1',
  `pekerjaan` varchar(255) DEFAULT NULL,
  `jabatan` varchar(255) DEFAULT NULL,
  `rt` varchar(5) DEFAULT NULL,
  `rw` varchar(5) DEFAULT NULL,
  `kodepos` varchar(10) DEFAULT NULL,
  `kewarganegaraan` varchar(3) DEFAULT NULL,
  `wilayahid` int(11) DEFAULT NULL,
  `teleponrumah` varchar(255) DEFAULT NULL,
  `tipe` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userid`),
  KEY `usergroupid` (`usergroupid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for sys_usergroup
-- ----------------------------
DROP TABLE IF EXISTS `sys_usergroup`;
CREATE TABLE `sys_usergroup` (
  `usergroupid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `level` int(1) NOT NULL DEFAULT '0',
  `isdisplayed` int(1) NOT NULL DEFAULT '1',
  `isallowregistration` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`usergroupid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
