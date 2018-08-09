<?php
// 初次获取页面动态渲染第一页数据
$con = @mysqli_connect('127.0.0.1', 'root', 'root', 'study') or die('数据库连接失败');
$sql = 'SELECT * FROM goods LIMIT 0, 10';
$res =  mysqli_query($con, $sql);
$arr = [];
while ($temp = mysqli_fetch_assoc($res)) {
	array_push($arr, $temp);
}
mysqli_free_result($res);
mysqli_close($con);
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		body {
			padding: 0;
			margin: 0;
		}

		.wrapper {
			width: 1000px;
			margin: 50px auto;
		}

		img {
			width: 100%;
		}
	</style>
</head>
<body>
	<div class="wrapper">
		<div class="items">
			<!-- 此处添加瀑布流数据 -->
		</div>
		<a class="load" href="javascript:;">正在加载...</a>
	</div>
	<!-- 模板引擎 -->
	<script src="./libs/template-web.js"></script>
	<!-- jQuery 库 -->
	<script src="./libs/jquery-1.12.4.min.js"></script>
	<!-- 插件 -->
	<script src="./libs/jquery.waterfall.js"></script>
	<!-- 定义模板引擎 -->
	<script type="template" id="waterfall">
		<% for (var i = 0; i < lists.length; i++) { %>
			<div class="item">
				<img src="<%= lists[i].path %>" width="<%= lists[i].width %>" height="<%= lists[i].height %>" alt="图片">
				<p><%= lists[i].text %></p>
			</div>
		<% } %>
	</script>

	<script>
		// 渲染首页数据
		var html = template('waterfall', {lists: <?php echo json_encode($arr); ?>});
		var items = document.querySelector('.items');
		items.innerHTML += html;
		$(function () {
			// 渲染首页数据
			$('.items').waterfall({
				gap: 15
			});
			// 定义允不允许发送数据的变量
			var flag = true;
			// 定义发送的页数
			var index = 0;
			// 动态获取窗口的高度
			var windowHeight = $(window).height();
			// 动态获取瀑布流父元素距离页面顶部的高度
			var itemsTop = $('.items').offset().top;
			$(window).on('scroll', function () {
				// 动态获取页面向上卷曲的距离
				var windowScrollTop = $(this).scrollTop();
				// 动态获取瀑布流父元素距离页面顶部的高度
				var itmesHeight = $('.items').height();
				// 获取瀑布流父元素距离底部的距离
				var cha = itmesHeight + itemsTop - windowScrollTop - windowHeight;
				// 距离小于10 并且允许发送数据
				if (cha < 10 && flag) {
					// 状态变为不允许发送数据
					flag = false;
					// 页数加1
					index++;
					$.ajax({
						'url': './data.php',
						'type': 'post',
						'data': {'page': index},
						'success': function (data) {
							// 判断是否还有数据
							if (!data['isNull']) {
								html = template('waterfall', {lists: data});
								items.innerHTML += html;
								// 动态添加数据后重新渲染瀑布流
								$('.items').waterfall({
									gap: 15
								});
							} else {
								document.querySelector('.load').innerHTML = '没有更多数据了';
							}
						},
						'complete': function () { 
							// 完成请求后, 状态变为可以发送请求
							flag = true;
						}
					})
				}
			});
		});
	</script>
</body>
</html>