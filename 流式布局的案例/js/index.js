window.onload = function () {
    searchBg();
    banner();
    timeRev();
};

//搜索框背景颜色改变
function searchBg() {
    var searchBox = document.querySelector("header.header");
    var bannerHeight = document.querySelector("section.banner").offsetHeight;
    var opacity = 0;
    window.onscroll = function () {
        var scrollTopHeight = document.body.scrollTop;
        if (scrollTopHeight < bannerHeight) {
            opacity = scrollTopHeight / bannerHeight * 0.85;
        } else {
            opacity = 0.85;
        }
        searchBox.style.backgroundColor = "rgba(201, 21, 35," + opacity + ")";
    };
}

//轮播图
function banner() {
    var bannerWidth = document.querySelector("section.banner").offsetWidth;
    var banner = document.querySelector("section.banner");
    var ul = banner.querySelector("ul");
    var spans = banner.querySelectorAll("section span");

    function addTransition() {
        ul.style.transition = "all 0.2s linear";
        ul.style.webkitTransition = "all 0.2s linear";
    }

    function removetransition() {
        ul.style.transition = "none";
        ul.style.webkitTransition = "none";
    }

    function addTransform(attr) {
        ul.style.transform = "translateX(" + attr + "px)";
        ul.style.webkitTransform = "translateX(" + attr + "px)";
    }

    var index = 1;
    var timer = setInterval(ulMove, 1000);

    function ulMove() {
        index++;
        addTransition();
        addTransform(-index * bannerWidth);
    }

    ul.addEventListener("transitionend", function () {
        if (index >= 9) {
            index = 1;
            removetransition();
            addTransform(-index * bannerWidth);
        }
        if (index <= 0) {
            index = 8;
            removetransition();
            addTransform(-index * bannerWidth);
        }
        [].slice.apply(spans).forEach(function (item) {
            item.classList.remove("select");
        });
        spans[index - 1].classList.add("select");
    });
//  touch事件
    var startp = 0;
    //判断是否触发了touchmov事件
    var flag = false;
    //判断移动方向 默认向左滑动
    var dir = true;
    banner.addEventListener("touchstart", function (e) {
        clearInterval(timer);
        startp = e.changedTouches[0].clientX;
    });
    banner.addEventListener("touchmove", function (e) {
        flag = true;
        var movep = e.changedTouches[0].clientX - startp;
        if(movep >= 0){
            dir = false;
        }
        removetransition();
        addTransform(-index * bannerWidth+movep);
    });
    banner.addEventListener("touchend", function (e) {
        if(flag){
            var endp = e.changedTouches[0].clientX;
            if(parseInt(Math.abs(endp - startp)) >= parseInt(Math.abs(bannerWidth/3))){
                if(dir){
                    index++;
                }else{
                    index--;
                }
                addTransition();
                addTransform(-index * bannerWidth);
                timer = setInterval(ulMove, 1000);
            }else{
                addTransition();
                addTransform(-index * bannerWidth);
                timer = setInterval(ulMove, 1000);
            }
            //重置
            flag =true;
            dir = true;
        }
    });
}

//倒计时
function timeRev(){
    var timeRevSpans = document.querySelectorAll("section.time-rev span");
    //初始自定义时间为4小时
    var time = 4*60*60;
    function initTime() {
        timeRevSpans[0].innerText = parseInt(parseInt(time/3600)/10);
        timeRevSpans[1].innerText = parseInt(time/3600)%10;
        timeRevSpans[3].innerText = parseInt(parseInt(time/60)%60/10);
        timeRevSpans[4].innerText = parseInt(time/60)%10;
        timeRevSpans[6].innerText = parseInt(parseInt(time%60)/10);
        timeRevSpans[7].innerText = parseInt(time%60)%10;
    }
    initTime();
    var timer = setInterval(function () {
        time--;
        if(time >= 0){
            initTime();
        }else{
            clearInterval(timer);
        }
    },1000);
}