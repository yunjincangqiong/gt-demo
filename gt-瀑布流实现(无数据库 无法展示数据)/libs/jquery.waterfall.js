
$.fn.waterfall = function (params) {

	// 默认参数
	var defaults = {
		column: 5,
		gap: 10
	}

	// 继承
	params = $.extend(defaults, params);

	// 在此完成 瀑布流布局的 逻辑即可
	
	// 1 定位实现，通过计算来获得定位坐标
	// 2 等宽
	
	// this 指的是 items jQuery 对象
	
	// 使用 $(this) 是为了保持代码书风格
	
	// 获取所有需要定位的子元素
	var items = $(this).children();

	// 假定总共放 5 列，可以计算出每列的宽度（即所谓定宽）
	var column = params.column;

	// 间隙
	var gap = params.gap;

	// 获取布局容器（items）的宽度
	var cWidth = $(this).width();

	// 每一列宽度（等宽）
	var width = cWidth / column;

	// 布局元素高度
	var height;

	// 用来记录每一列的高度
	var h = [];

	var min_key, min_val, max_val;

	// 设置布局容器的定位方式
	$(this).css({
		position: 'relative',
		left: gap / 2
	});

	// 设置所有布局元素的宽度
	items.width(width - gap);

	// 遍历元素
	items.each(function (key, val) {

		// 元素高度
		height = $(this).height();

		// key 指索引值
		// val 原生DOM
		// console.log(this)
		
		// 找到了规律，第1行 top 值为 0
		// left 值为 布局元素索引值 * 等宽
		if(key < column) {

			// 当放置完成第1行后，便产生了 column 列
			// 需要将列的高度记录下来，方便后判断

			// 记录下来第1行元素的高度
			h.push(height);

			$(this).css({
				position: 'absolute',
				top: 0,
				left: key * width
			});			
		} else {
			// 除了第1行外，应该优先处理高度较小那一列，即将新元素
			// 定位到高度最小那一列
			
			min_key = 0;
			min_val = h[0];

			for(var i=0; i<h.length; i++) {
				if(h[i] < min_val) {
					// 最小值和最小值对应的索引
					min_val = h[i];
					min_key = i;
				}
			}

			// 实时更新列的高度
			h[min_key] += height;

			$(this).css({
				position: 'absolute',
				top: min_val,
				left: min_key * width
			});
		}
	});

	max_val = h[0];

	// 获得最大列的高度
	for(var i=0; i<h.length; i++) {
		if(h[i] > max_val) {
			max_val = h[i];
		}
	}

	// 设置布局容器的高度
	$(this).height(max_val);
}