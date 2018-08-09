/**
 * Created by macbook on 2017/8/20.
 */

/**
 * 封装函数
 * 用id获取元素
 * @param id 元素id值
 * @returns {Element} 返回元素对象
 */
function my$(id){
    return document.getElementById(id);
}

/**
 * 兼容代码
 * 封装函数
 * 获取元素的文本内容
 * @param element 元素
 * @returns {*} 返回文本内容
 */
function getInnerText(element){
    if(element.textContent){
        return element.innerText;
    }else{
        return element.textContent;
    }
}

/**
 * 兼容代码
 * 封装函数
 * 设置元素的文本内容
 * @param element 元素
 * @param text 要设置的文本内容
 */
function setInnerText(element,text){
    if(element.textContent){
        element.textContent=text;
    }else{
        element.innerText=text;
    }
}

/**
 * 兼容代码
 * 为元素绑定事件
 * @param element 绑定事件的元素
 * @param type 事件类型
 * @param fn 事件处理函数(命名函数)
 */
function addEventListener(element, type, fn) {
    if(element.addEventListener){
        element.addEventListener(type,fn,false);
    }else if(element.attachEvent){
        element.attachEvent("on"+type,fn);
    }else{
        element["on"+type]=fn;
    }
}

/**
 * 兼容代码
 * 为元素解绑事件
 * @param element 解绑元素
 * @param type 事件类型
 * @param fn 事件处理函数(命名函数)
 */
function removeEvevtListener(element,type,fn){
    if(element.removeEventListener){
        element.removeEventListener(type,fn,false);
    }else if(element.detachEvent){
        element.detachEvent("on"+type,fn);
    }else{
        element["on"+type]=null;
    }
}

/**
 * 匀速动画函数
 * @param element 元素
 * @param target 目标距离
 * @param [step] 可选参数 每次移动的距离
 * @param [time] 可选参数 执行定时器的时间间隔
 */
function animateYun(element,target,step,time){
    if(element.timer){
        clearInterval(element.timer);
    }
    time = time||5;
    element.timer = setInterval(move,time);
    function move(){
        var current = element.offsetLeft;
        var step1 = step||3;
        step1 = current<target?step1:-step1;
        if(Math.abs(current-target)>Math.abs(step1)){
            current +=step1;
            element.style.left = current+"px";
        }else{
            element.style.left = target+"px";
            clearInterval(element.timer);
        }
    }
}

/**
 * 缓动动画函数(变速)
 * 变速的效果:(目标-当前)/10
 * @param element 元素
 * @param target 目标位置
 */
function animateHuan(element, target) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        //获取元素的当前的位置
        var current = element.offsetLeft;
        //每次移动的步数
        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        //移动后的距离
        current += step;
        element.style.left = current + "px";
        if (current == target) {
            //清理定时器
            clearInterval(element.timeId);
        }
    }, 100);
}

/**
 * 兼容代码
 * 获取任意一个元素的前一个元素
 * @param element 任意元素
 * @returns {*} 返回前一个元素
 */
function getPreviousElement(element) {
    if(element.previousElementSibling){
        return element.previousElementSibling;
    }else{
        var ele=element.previousSibling;
        while (ele&&ele.nodeType!==1){
            ele=ele.previousSibling;
        }
        return ele;
    }
}

/**
 * 兼容代码
 * 获取任意一个元素的后一个元素
 * @param element 任意元素
 * @returns {*} 返回后一个元素
 */
function getNextElement(element) {
    if(element.nextElementSibling){
        return element.nextElementSibling;
    }else{
        var ele=element.nextSibling;
        while(ele&&ele.nodeType!==1){
            ele=ele.nextSibling;
        }
        return ele;
    }
}

/**
 * 兼容代码
 * 获取任意父元素的第一个元素
 * @param parent 任意元素
 * @returns {*} 返回父元素的第一个子元素
 */
function getFirstElement(parent) {
    if(parent.firstElementChild){
        return parent.firstElementChild;
    }else{
        var ele=parent.firstChild;
        while (ele&&ele.nodeType!==1){
            ele=ele.nextSibling;
        }
        return ele;
    }
}

/**
 * 兼容代码
 * 获取任意父元素的最后一个元素
 * @param parent 任意元素
 * @returns {*} 返回父元素的最后一个子元素
 */
function getLastElement(parent) {
    if(parent.lastElementChild){
        return parent.lastElementChild;
    }else{
        var ele=parent.lastChild;
        while(ele&&ele.nodeType!==1){
            ele=ele.previousSibling;
        }
        return ele;
    }
}

/**
* 兼容代码
* 获取任意元素的所有兄弟元素
* @param ele 任意元素
* @returns {*} 返回所有兄弟元素
*/
function getSiblings(ele) {
    if(!ele)return;//判断当前的ele这个元素是否存在
    var elements=[];//定义数组的目的就是存储当前这个元素的所有的兄弟元素
    var el=ele.previousSibling;//当前元素的前一个节点
    while (el){
        if (el.nodeType===1){//元素
            elements.push(el);//加到数组中
        }
        el=el.previousSibling;
    }
    el=ele.nextSibling;
    while(el){
        if(el.nodeType===1){
            elements.push(el);
        }
        el=el.nextSibling;
    }
    return elements;
}

/**
 *兼容代码
 *获取页面向上或向左卷曲的距离
 * getScroll().top   getScroll().left
 * @returns {{top: (Number|number), left: (*|number)}}
 */
function getScroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,//为都不支持的浏览器设置0
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0//为都不支持的浏览器设置0
    }
}

/**
 * 获取元素的任意属性
 * @param element 元素
 * @param attr 属性
 * @returns {*} 返回属性值
 */
function getStyle(element, attr) {
    return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr];
}

/**
 * !!!其中使用了获取元素的任意属性兼容代码函数getStyle() 和封装获取函数 my$();
 * 缓动动画函数(变速)
 * @param element 元素
 * @param json json
 * @param fn 函数
 */
function animate(element, json,fn) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var flag=true;//假设都到达目标了
        for (var attr in json) {
            if(attr=="opacity"){
                //获取元素的当前的位置
                var current = getStyle(element, attr)*100;//20
                //这个属性---对应这个目标
                var target = json[attr]*100; //90
                //每次移动的步数
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //移动后的距离
                current += step;
                element.style[attr] = current/100 ;
            }else if(attr=="zIndex"){
                element.style[attr]=json[attr];
            }else{
                //获取元素的当前的位置
                var current = parseInt(getStyle(element, attr));
                //这个属性---对应这个目标
                var target = json[attr];
                //每次移动的步数
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //移动后的距离
                current += step;
                element.style[attr] = current + "px";
            }
            if (current != target) {
                flag=false;
            }
        }
        if(flag){
            //清理定时器
            clearInterval(element.timeId);
            if(fn){
                fn();
            }
        }
    }, 10);
}

//封装 获取页面横纵坐标 对象
//事件参数对象e或者window.event兼容
//clientX和clientY,可视区域横纵坐标
//scrollLeft和scrollTop页面向上或者向右卷曲的距离
//pageX和pageY封装 页面整体的宽高
//e.pageX或者e.clientX+scrollLeft 事件参数获取页面的宽等于可视区域的宽加上向左卷曲的距离
//e.pageY或者e.clientY+scrollTop  事件参数获取页面的高等于可视区域的高加上向上卷曲的距离

var evn = {
    getEvent: function (e) {
        return window.event || e;
    },
    getClientX: function (e) {
        return this.getEvent(e).clientX;
    },
    getClientY: function (e) {
        return this.getEvent(e).clientY;
    },
    getScrollTop: function () {
        return window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft;
    },
    getScrollLeft: function () {
        return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
    },
    getPageX: function (e) {
        return this.getEvent(e).pageX ? this.getEvent(e).pageX : this.getClientX(e) + this.getScrollLeft();
    },
    getPageY: function (e) {
        return this.getEvent(e).pageY ? this.getEvent(e).pageY : this.getClientY(e) + this.getScrollTop();
    }
};



