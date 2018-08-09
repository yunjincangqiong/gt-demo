//根据id获取对应的元素
function my$(id) {
    return document.getElementById(id);
}
/*
* element---任意的元素
* attr---属性
* */
function getStyle(element,attr) {
    return element.currentStyle?element.currentStyle[attr] : window.getComputedStyle(element,null)[attr]||0;
}

/*
* element----要移动的元素
* target----移动的目标
* 初级版本
* */

/*
* 终极版本的动画函数---有bug
*
* */



//json:键--值
function animate(element,json,fn) {
    clearInterval(element.setId);
    element.setId=setInterval(function () {
        var flag=true;//假设都到达了目标位置
        for(var attr in json){
            if(attr=="opacity"){//透明度
                //获取元素的当前位置
                var current=getStyle(element,attr)*100;//50
                //每次移动的步数
                var target=json[attr]*100; //100
                var step=(target-current)/10;//5
                step=step>0?Math.ceil(step):Math.floor(step);
                current+=step;
                element.style[attr]=current/100;
            }else if(attr=="zIndex"){//层级的判断
                element.style["zIndex"]=json[attr];
            }else{//除了透明度和层级的
                //获取元素的当前位置
                var current=parseInt(getStyle(element,attr));
                //每次移动的步数
                var target=json[attr];
                var step=(target-current)/10;
                step=step>0?Math.ceil(step):Math.floor(step);
                current+=step;
                element.style[attr]=current+"px";
            }

            if(current!=target){
                flag=false;
            }
        }
        if(flag){
            clearInterval(element.setId);//清除计时器
            if(fn){//如果传入回调函数则执行回调函数
                fn();
            }
        }
    },20);
}

