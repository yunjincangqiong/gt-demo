<?php
header('Content-Type: application/json');
$con = @mysqli_connect('127.0.0.1', 'root', 'root', 'study') or die('数据库连接失败');
$page = $_POST['page'];
$sql = 'SELECT * FROM goods LIMIT '. ($page * 10) .', 10';
$res =  mysqli_query($con, $sql);
$arr = [];
while ($temp = mysqli_fetch_assoc($res)) {
	array_push($arr, $temp);
}
mysqli_free_result($res);
// 查询总数据条数
$sql2 = 'SELECT count(id) FROM goods';
$res2 =  mysqli_query($con, $sql2);
$temp2 = mysqli_fetch_row($res2)[0];
mysqli_free_result($res2);
mysqli_close($con);
// 模拟网络延迟
sleep(1);
// 如果没有数据了
if (($page * 10) > $temp2) {
  // 返回 isNull 数据, 以让前端知道没数据了
  echo '{"isNull": true}';
  exit();
}
echo json_encode($arr);