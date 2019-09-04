<?php 

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: *'); 

$conn = new mysqli('localhost', 'root', '', 'instantgram');
if($conn->connect_error){
	echo "Unable to connect, please try again";
}

$username = $_POST['username'];
$postID = $_POST['idPosting'];
$comment = $_POST['comment'];

$sql = "INSERT INTO balasan_komen(idposting, username, isi_komen) VALUES ('$postID','$username','$comment')";
if($conn->query($sql) === true){
	echo json_encode("sukses");
}
else {
	echo "Error: ".$conn->error;
}
$conn->close();

?>