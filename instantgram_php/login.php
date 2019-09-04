<?php 

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: *');

$conn = new mysqli('localhost', 'root', '', 'instantgram');
if($conn->connect_error){
	echo "Unable to connect, please try again";
}

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT username, nama FROM user WHERE username='".$username."' AND password='".$password."'";
$result = mysqli_query($conn, $sql);
$obj = $result->fetch_assoc();

$userLoginData = array();
if(mysqli_num_rows($result) == 0){
	$userLoginData['status'] = "gagal"; // tidak yg sama uname / uidnya
	echo json_encode($userLoginData);
}
else {
	$userLoginData['username'] = addslashes(htmlentities($obj['username']));
	$userLoginData['name'] = addslashes(htmlentities($obj['nama']));
	$userLoginData['status'] = "sukses";
	echo json_encode($userLoginData);
}
$conn->close();
?>