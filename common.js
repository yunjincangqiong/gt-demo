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
        element.innerText=text;
    }else{
        element.textContent=text;
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
function animate(element,target,step,time){
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
 * 兼容代码
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
 * 缓动动画函数
 * 每次移动十分之一距离
 * @param element 移动元素
 * @param target 目标距离
 * @param [step] 可选参数 每次移动的距离 1/step
 * @param [time] 可选参数 执行定时器的时间间隔
 */
function animateHuan(element,target,step,time) {
    //清理定时器
    if (element.timer) {
        clearInterval(element.timer);
    }
    //第三个参数 不传入参数时为默认值100
    time = time||100;
    step = step||10;
    element.timer = setInterval(move,time);
    function move() {
        //获取元素当前距离
        var current = element.offsetLeft;
        var step1 = (target - current) / step;
        //判断step向上或者向下取整
        step1 = step1 > 0 ? Math.ceil(step1) : Math.floor(step1);
        current += step1;
        element.style.left = current + "px";
        //判断移动的距离是否到目标位置
        if (target == current) {
            clearInterval(element.timer);
        }
    }
}

