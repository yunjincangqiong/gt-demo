$(function () {
  $('#fullpage').fullpage({
    navigation: true,
    onLeave: function (index, nextIndex, direction) {
      $('.section').data('flag', true);
      console.log($('.section2').data('flag'));
      if (index === 1 && nextIndex === 2 && direction === 'down' && $('.section2').data('flag')) {
        $('.section2').data('flag', false);
        $('.section2 .search').animate({
          'marginLeft': -111,
          'opacity': 1
        },1000,function () {
          $('.section2 .search .text-sofa').animate({
            'opacity': 1
          }, .5, function () {
            $('.section2 .search').animate({
              'width': 111,
              'height': 22,
              'top': 195,
              'marginLeft': 155
            },1000);
            $('.section2 .search .text-sofa').animate({
              'width': 34,
              'height': 16,
              'top': 1
            }, 1000);
            $('.section2 .goods').animate({
              'width': 441,
              'height': 218,
              'opacity': 1
            }, 1000);
            $('.section2 .text1').animate({
              'opacity': 0
            }, 1000);
            $('.section2 .text2').animate({
              'opacity': 1
            }, 1000);
          })
        })
      }
      if (index === 2 && nextIndex === 3 && direction === 'down' && $('.section3').data('flag')) {
        $('.section3').data('flag', false);
        $('.section2 .sofa').css('opacity', 1);
        $('.section2 .sofa').animate({
          'top': 942,
          'width': 207,
          'height': 166,
          'marginLeft': -237
        }, 1000, function () {
          $(this).hide();
          $('.section3 .sofa').css('opacity', 1);
          $('.section3 .car .car1').fadeIn();
          $('.section3 .info .info1').fadeIn();
        });
      }
      if (index === 3 && nextIndex === 4 && direction === 'down' && $('.section4').data('flag')) {
        $('.section4').data('flag', false);
        $('.section3 .sofa').css('transform', 'rotate(15deg)').animate({
          'top': 900,
          'marginLeft': '-55px'
        }, 1000 ,function () {
          $(this).hide();
          $('.section4 .car .car1').show();
          $('.section4 .car').animate({
            'marginLeft': 700 
          }, 1000, function () {
            $('.section4 .text .text1').fadeIn(1000);
            $('.section4 .info').fadeIn(1000, function () {
              $('.section4 .info .info1').fadeIn(1000);
            });
          })
        });
      }
      if (index === 4 && nextIndex === 5 && direction === 'down' && $('.section5').data('flag')) {
        $('.section5').data('flag', false);
        $('.section5 .list').animate({
          'top': 157
        }, 1000)
        $('.section5 .sofa').animate({
          'top': 338
        }, 1000)
        $('.section5 .hand .hand1').animate({
          'top': 0
        }, 1000, function () {
          $('.section5 .mouse .mouse1').show();
        })
      }
      if (index === 5 && nextIndex === 6 && direction === 'down' && $('.section6').data('flag')) {
        $('.section6').data('flag', false);
        $('.section5 .sofa').animate({
          top: 800,
          width: 100,
          height: 100
        }, 1000, function () {
          $(this).hide();
        })
        $('.section6 .box').animate({
          'marginLeft': -390
        }, 1000, function () {
          $(this).animate({
            'top': 490,
            'marginLeft': -270
          }, 1000, function () {
            $(this).hide();
            $('.section6 .address').fadeIn(500);
            $('.section6 .text').fadeIn(500);
            $('.section6').animate({
              'backgroundPositionX': '-1100'
            }, 3000, function () {
              $('.section6 .text .text1').fadeIn();
              $('.section6 .man').animate({
                'width': 252,
                'height': 305,
                'bottom': 155,
                'marginLeft': 31
              }, 1000, function () {
                $('.section6 .goods').fadeIn(750);
                $('.section6 .door').fadeIn(750, function () {
                  $('.section6 .woman').animate({
                    'width': 87,
                    'height': 294,
                    'bottom': 160,
                    'marginLeft': 374
                  }, 1000)
                });
              });
            })
          })
        })
      }
      if (index === 6 && nextIndex === 7 && direction === 'down' && $('.section8').data('flag')) {
        $('.section8').data('flag', false);
        $('.section8').on('mousemove', function (e) {
          $('.section8 .hand').css({
            'top': e.clientY + 5,
            'left': e.clientX - $('.section8 .hand').width() / 3
          });
        })
        $('.section8 .again').hover(function () {
          $('.section8 .again .again1').toggle();
        });
        $('.section8 .text').click(function () {

          // 清除所有标签的 style 样式, 因为动画的属性全都加到了 style 属性上面
          $('#fullpage .section').find('*').stop().attr('style', '');
          // 将背景图片位置还原
          $('.section6').stop().css('backgroundPosition', '-200px bottom');
          // 跳转到首屏
          $.fn.fullpage.moveTo(1);
        });
      }
    }
  });
});