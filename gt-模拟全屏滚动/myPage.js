$(function () {

  // 封装myPage
  $.fn.myPage = function (data = {}) {
    // 多屏幕个数
    var pageCount = $('#myPage .page').length;
    // var pageCount = $(this).find('.page').length;
    // 没有页面时直接返回
    if (pageCount === 0) {
      return;
    }
    // 当前页面索引
    var index = 0;
    var flag = true;
    var pageHeight = $('body').height();

    if (data.sideBar) {
      // 创建右侧点状导航
      var arr = ['<div class="pageNav"><ul class="pageNavBar"><li class="active"></li>'];
      if (pageCount > 1) {
        for (var i = 1; i < pageCount; i++) {
          arr.push('<li></li>');
        }
        arr.push('</ul></div>');
      }
      $('#myPage')
        .append(arr.join(''))
        .on('click', 'li', function () {
          if (!flag) {
            return
          };
          flag = false;
          $(this).attr('class', 'active').siblings().attr('class', '');
          $('#myPage').animate({
            top: -$(this).index() * pageHeight
          }, 500, function () {
            flag = true;
          })
        })
    }

    // 获取右侧点状导航
    var pointNav = $('#myPage .pageNav .pageNavBar li');
    // 滚轮滚动上下翻页
    $(document).on('mousewheel', function (e, dir) {
      // 向上滚动
      if (dir === 1 && index > 0 && flag) {
        flag = false;
        index--;
        if (data.sideBar) {
          pointNav.eq(index).attr('class', 'active').siblings().attr('class', '');
        }
        $('#myPage').animate({
          'top': -index * pageHeight
        }, 500, function () {
          flag = true;
        });
        // 向下滚动
      } else if (dir === -1 && index < pageCount - 1 && flag) {
        flag = false;
        index++;
        if (data.sideBar) {
          pointNav.eq(index).attr('class', 'active').siblings().attr('class', '');
        }
        $('#myPage').animate({
          'top': -index * pageHeight
        }, 500, function () {
          flag = true;
        });
      }
    });
  }
});