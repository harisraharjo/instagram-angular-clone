<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: *');

$conn = new mysqli("localhost", "root","","instantgram");
if($conn->connect_error) {
	echo "Unable to connect, please try again";
}

$postID = $_POST['idPosting'];
$username = $_POST['username'];

$sql = "SELECT g.idgambar, g.extention FROM posting p INNER JOIN gambar g ON p.idposting=g.idposting WHERE p.idposting='$postID';";
$result = $conn->query($sql);

if ($result->num_rows > 0) {		
	$arrDetailPost = array();
	$i = 0;
	while ($theData = $result->fetch_assoc()) {
		$arrDetailPost['gambar'][$i]['idgambar'] = addslashes(htmlentities($theData['idgambar']));
		$arrDetailPost['gambar'][$i]['extention'] = addslashes(htmlentities($theData['extention']));
		$i++;
	}

	$sql = "SELECT username, isi_komen, tanggal FROM balasan_komen WHERE idposting='$postID';";
	$result = $conn->query($sql);
	$i = 0;
	while ($theData = $result->fetch_assoc()) {
		$arrDetailPost['balasanKomen'][$i]['username'] = addslashes(htmlentities($theData['username']));
		$arrDetailPost['balasanKomen'][$i]['tanggal'] = addslashes(htmlentities($theData['tanggal']));
		$arrDetailPost['balasanKomen'][$i]['isi_komen'] = addslashes(htmlentities($theData['isi_komen']));
		$i++;
	}

	$sql = "SELECT idposting, username, tanggal, komen FROM posting WHERE idposting='$postID';";
	$result = $conn->query($sql);
	$theData = $result->fetch_assoc();
	$arrDetailPost['idposting'] = addslashes(htmlentities($theData['idposting']));
	$arrDetailPost['username'] = addslashes(htmlentities($theData['username']));
	$arrDetailPost['tanggal'] = addslashes(htmlentities($theData['tanggal']));
	$arrDetailPost['caption'] = addslashes(htmlentities($theData['komen']));

	$sql = "SELECT count(*) AS totalLikes FROM jempol_like WHERE idposting='$postID';";
	$result = $conn->query($sql);
	$theData = $result->fetch_assoc();
	$arrDetailPost['totalLikes'] = addslashes(htmlentities($theData['totalLikes']));

	$sql = "SELECT * FROM jempol_like WHERE idposting='$postID' AND username='$username'";
	$result = $conn->query($sql);
	if ($result->num_rows > 0){
		$arrDetailPost['isLiked'] = 1;
	}
	else{
		$arrDetailPost['isLiked'] = 0;
	}

    echo json_encode($arrDetailPost);
} else {
	echo "Unable to get the data";
	die();
}

$conn->close();
?>