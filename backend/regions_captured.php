<?php
	require_once('inc/db.inc');
	if ($_REQUEST['uid'] == "CURRENT") {
		session_start();
		$uid = $_SESSION['nh_uid'];
	} else {
		$uid = $_REQUEST['uid'];
	}
	for ($i=0;$i<11;$i++) {
		$region = region_details($uid, $i);
		if ($region['conquerstatus'] == 1) {
			$regionlist .= $region['number'] . ',';
		}
	}
	$regionlist = substr($regionlist, 0, -1);
	echo $regionlist;
?>