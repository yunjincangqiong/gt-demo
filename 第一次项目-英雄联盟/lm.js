/**
 * Created by macbook on 2017/8/29.
 */
function my$(id) {
    return document.getElementById(id);
}

//�˵�������л�����Ч��
var menuLis = my$("menu").children[0].children;
for (var i = 0; i < menuLis.length; i++) {
    menuLis[0].style.color = "#d1ab57";
    menuLis[0].style.borderBottom = "3px solid #d1ab57";
    //�˴���ӵ����ҳ�湦��
    menuLis[i].onclick = function () {
        for (var j = 0; j < menuLis.length; j++) {
            menuLis[j].style.color = "#555555";
            menuLis[j].style.borderBottom = "0";
        }
        this.style.color = "#d1ab57";
        this.style.borderBottom = "3px solid #d1ab57";
    }
}

//�ֲ�ͼЧ��
/**
 * �Զ��嶯������
 * @param element Ԫ��
 * @param target Ŀ��λ��
 * @param time ��ʱ��ִ��ʱ����
 * @param step �ƶ��ľ�����
 */
function animate(element, target, time, step) {
    if (element.timer) {
        clearInterval(element.timer);
    }
    element.timer = setInterval(function () {
        var current = element.offsetLeft;
        var step1 = step;
        step1 = current < target ? step1 : -step1;
        current += step1;
        if (Math.abs(target - current) > Math.abs(step1)) {
            element.style.left = current + "px";
        } else {
            clearInterval(element.timer);
            element.style.left = target + "px";
        }
    }, time);
}

var move = function () {
    pic++;
    if (pic == 5) {
        pic = 0;
        ul.style.left = "0px";
    }
    animate(ul, -pic * imgWidth, 1, 30);
    for (var k = 0; k < spans.length; k++) {
        spans[k].style.color = "#c8c8c8";
        spans[k].style.backgroundColor = "#121112";
    }
    spans[pic].style.color = "#e9c06c";
    spans[pic].backgroundColor = "#303030";
};

var screen = my$("main-body").children[0].children[0].children[0];
var imgWidth = screen.offsetWidth;
var ul = screen.children[0];
//�ֲ���ͼƬ��
var list = ul.getElementsByTagName("li");
//span����
var spans = my$("main-body").children[0].children[0].children[1].children;
var pic = 0;
var timer;
for (var i = 0; i < spans.length; i++) {
    spans[i].setAttribute("index", i);
    spans[i].onmousemove = function () {
        for (var j = 0; j < spans.length; j++) {
            spans[j].style.color = "#c8c8c8";
            spans[j].style.backgroundColor = "#121112";
        }
        this.style.color = "#e9c06c";
        this.style.backgroundColor = "#303030";
        pic = this.getAttribute("index");
        animate(ul, -pic * imgWidth, 1, 30);
        clearInterval(timer);
    };
    spans[i].onmouseout = function () {
        timer = setInterval(move, 5000);
    }
}
timer = setInterval(move, 5000);

//�ҵ����������Ч��
var ulListLis = my$("ul-list").getElementsByTagName("li");
for (var x = 0; x < ulListLis.length; x++) {
    ulListLis[x].onmousemove = function () {
        this.style.backgroundColor = "#f4f4f4";
    };
    ulListLis[x].onmouseout = function () {
        this.style.backgroundColor = "";
    };
}

//�µ����������Ч��
(function () {
    var mainLis = my$("main-body-center").children[0].children[0].children[1].children;
    for (var i = 0; i < mainLis.length; i++) {
        mainLis[0].style.color = "#d1ab57";
        mainLis[0].style.borderBottom = "3px solid #d1ab57";
        mainLis[0].style.fontWeight = "bold";
        //�˴������������л�ҳ�湦��
        mainLis[i].onmousemove = function () {
            for (var j = 0; j < mainLis.length; j++) {
                mainLis[j].style.color = "#666";
                mainLis[j].style.borderBottom = "0";
            }
            this.style.color = "#d1ab57";
            this.style.borderBottom = "3px solid #d1ab57";
            this.style.fontWeight = "bold";
        }
    }
})();

//�ײ���������������Ƴ�����
(function () {
    var mainLis = my$("left-body-bottom-ul").children;
    var spans1 = my$("left-body-bottom-ul").getElementsByClassName("news");
    var spans2 = my$("left-body-bottom-ul").getElementsByClassName("new1");
    for (var i = 0; i < mainLis.length; i++) {
        mainLis[i].setAttribute("index", i);
        mainLis[i].onmousemove = function () {
            var index = this.getAttribute("index");
            spans1[index].style.color = "#fff";
            spans1[index].style.backgroundColor = "#d1ab57";
            spans2[index].style.color = "#d1ab57";
        };
        mainLis[i].onmouseout = function () {
            var index = this.getAttribute("index");
            spans1[index].style.color = "#7a7a7a";
            spans1[index].style.backgroundColor = "#ebebeb";
            spans2[index].style.color = "#7a7a7a";
        };
    }
})();
//�ұ����������Ч��
(function () {
    var mainLis = my$("right-body-top").children;
    for (var i = 0; i < mainLis.length; i++) {
        mainLis[2].style.color = "#d1ab57";
        mainLis[2].style.borderBottom = "3px solid #d1ab57";
        //�˴������������л�ҳ�湦��
        mainLis[i].onmousemove = function () {
            for (var j = 0; j < mainLis.length; j++) {
                mainLis[j].style.color = "#666";
                mainLis[j].style.borderBottom = "0";
            }
            this.style.color = "#d1ab57";
            this.style.borderBottom = "3px solid #d1ab57";
        }
    }
})();
//    �ұ߿�����
(function () {
    var lis = my$("right-body-middle").getElementsByTagName("li");
    var bgz = my$("right-body-middle").getElementsByClassName("bgz");
    for (var i = 0; i < lis.length; i++) {
        lis[i].setAttribute("index", i);
        lis[i].onmouseover = function () {
            var index = this.getAttribute("index");
            bgz[index].style.display = "block";
        };
        lis[i].onmouseout = function () {
            var index = this.getAttribute("index");
            bgz[index].style.display = "none";
        };
    }
})();

my$("read-more").onmousemove = function () {
    this.style.backgroundColor = "#dad8d8";
};
my$("read-more").onmouseout = function () {
    this.style.backgroundColor = "";
};


