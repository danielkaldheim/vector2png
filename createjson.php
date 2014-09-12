#!/usr/bin/env php
<?php
/**
 *
 *	createjson.php
 *	Created on 22.1.2014.
 *
 *	@author Daniel Rufus Kaldheim <daniel@idrift.no>
 *	@copyright 2012 - 2014 iDrift Web AS
 *	@version 1.0.0
 *
 */

define('DS', DIRECTORY_SEPARATOR);
global $ignore; $ignore = array('..', '.', '.DS_Store', '.git', '.svn', '.localized', 'Thumbs.db', '');

function open($path) {
	$dirs = array();
	foreach (scandir($path) as $file) {
		if (in_array($file, $GLOBALS['ignore'])) {
			continue;
		}
		if (is_dir($path . DS . $file)) {
			$dirs[] = realpath($path . DS . $file);
			$dirs = array_merge($dirs, open($path . DS . $file));
		}
	}
	return $dirs;
}
$log = '';
$options = getopt("d:", array("dir:"));
if (!empty($options)) {
	$optdir = ((isset($options['d'])) ? $options['d'] : $options['dir']);
}
else {
	if (isset($argv[1]) && is_dir($argv[1])) {
		$path = realpath($argv[1]);
	}
	else {
		$path = dirname(__FILE__);
	}
}

$log .= "Open ".realpath($path).PHP_EOL;

$dirs = open($path);

$countDirs = 0;
$countImages = 0;
foreach ($dirs as $dir) {
	$e = explode('.', $dir);
	if (end($e) == 'imageset') {
		$ds = explode(DS, $dir);
		$log .= "\tScans: ".end($ds).PHP_EOL;
		$files = scandir($dir);
		$json = array();

		foreach ($files as $file) {
			$f = explode(".", $file);
			if (!in_array($file, $GLOBALS['ignore']) && in_array(end($f), array('jpg', 'jpeg', 'png'))) {

				$log .= "\t\t{$file}".PHP_EOL;

				$images = array();
				$images['idiom'] = 'universal';
				$images['scale']  = "1x";
				if (strrpos($file, '@2x')) {
					$images['scale']  = "2x";
				}
				$images['filename'] = $file;
				$countImages++;
				$json['images'][] = $images;
			}

		}

		$version = 1;
		if (file_exists($dir . DS . 'Contents.json')) {
			$j = json_decode(file_get_contents($dir . DS . 'Contents.json'));
			$version = $j->info->version + 1;
			unlink($dir . DS . 'Contents.json');
		}

		$json['info'] = array('version' => $version, 'author' => 'Daniel Rufus Kaldheim');

		$log .= "\t".((@file_put_contents($dir . DS . 'Contents.json', json_encode($json, JSON_PRETTY_PRINT))) ? 'Created new Contents.json file' : '').PHP_EOL;
		$countDirs++;
	}
}

$log .= "Made json for {$countDirs} directories and {$countImages} images".PHP_EOL;

file_put_contents('debug.log', $log, FILE_APPEND);
echo $log;
exit();

/* End of file createjson.php */
