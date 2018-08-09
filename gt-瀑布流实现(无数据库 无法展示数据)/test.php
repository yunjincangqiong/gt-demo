<?php
function my_delete($tableName, $arr) {
  $sql = 'DELETE FROM ' . $tableName . ' WHRER id';
  if (!is_array($arr)) {
    $sql .= '=' .$arr . ';';
  } else {
    $str = '';
    foreach($arr as $k => $v) {
      $str .= $v .',';
    }
    $str = substr($str, 0, -1);
    $sql .= ' IN ('. $str .');';
  }
 echo $sql;
}
my_delete('categories', 1);
my_delete('categories', [1,2,3]);