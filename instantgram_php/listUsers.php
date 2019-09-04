<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: *');

$conn = new mysqli("localhost", "root","","instantgram");

if($conn->connect_error) {
	echo "Unable to connect, please try again";
}

$user = $_POST['username'];
$sql = "SELECT * FROM user WHERE username!='$user' ORDER by username ASC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	$i = 0;
	$theOtherUsers = array();
	while ($obj = $result->fetch_assoc()) {
		$theOtherUsers[$i]['username'] = addslashes(htmlentities($obj['username']));
		$i++;
    }	
    echo json_encode($theOtherUsers);
} else {
	echo "Unable to get Users";
	die();
}
$conn->close();
?>