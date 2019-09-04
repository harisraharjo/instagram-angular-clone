<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: *');

$conn = new mysqli("localhost", "root","","instantgram");
if($conn->connect_error) {
	echo "Unable to connect, please try again";
}

$username = $_POST['username'];

$sql = "SELECT p.idposting, p.username, g.idgambar, g.extention FROM posting p INNER JOIN gambar g ON p.idposting=g.idposting 
WHERE p.username='$username' GROUP BY p.idposting ORDER by p.tanggal DESC, p.idposting DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	$theUsersPosts = array();
	$i = 0;
	while ($theData = $result->fetch_assoc()) {
		$theUsersPosts[$i]['username'] = addslashes(htmlentities($theData['username']));
		$theUsersPosts[$i]['idposting'] = addslashes(htmlentities($theData['idposting']));
		$theUsersPosts[$i]['idgambar'] = addslashes(htmlentities($theData['idgambar']));
		$theUsersPosts[$i]['extention'] = addslashes(htmlentities($theData['extention']));
		$i++;
	}
    echo json_encode($theUsersPosts);
} else {
	echo 0;
}

$conn->close();
?>