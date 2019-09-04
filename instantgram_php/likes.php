<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$conn = new mysqli("localhost", "root","","instantgram");
if($conn->connect_error) {
	echo "Unable to connect, please try again";
}

$username = $_POST['username'];
$postID = $_POST['idPosting'];

$sql = "SELECT * FROM jempol_like WHERE idposting='$postID' AND username='$username'";
$result = $conn->query($sql);
if ($result->num_rows > 0){
	$sql = "DELETE FROM jempol_like WHERE idposting='$postID' AND username='$username'";
	$arrDetailPost['isLiked'] = 0;
}
else{
	$sql = "INSERT INTO jempol_like (idposting, username) VALUES ('$postID', '$username')";
	$arrDetailPost['isLiked'] = 1;
}

if($conn->query($sql) === true){
	$sql = "SELECT count(*) AS totalLikes FROM jempol_like WHERE idposting='$postID';";
	$result = $conn->query($sql);
	$theData = $result->fetch_assoc();
	$arrDetailPost['totalLikes'] = addslashes(htmlentities($theData['totalLikes']));
	echo json_encode($arrDetailPost);
}
else {
	echo "Error: ".$conn->error;
}

$conn->close();

?>