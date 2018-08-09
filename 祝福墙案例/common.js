/**
 * Created by macbook on 2017/8/20.
 */

/**
 * ��װ����
 * ��id��ȡԪ��
 * @param id Ԫ��idֵ
 * @returns {Element} ����Ԫ�ض���
 */
function my$(id){
    return document.getElementById(id);
}

/**
 * ���ݴ���
 * ��װ����
 * ��ȡԪ�ص��ı�����
 * @param element Ԫ��
 * @returns {*} �����ı�����
 */
function getInnerText(element){
    if(element.textContent){
        return element.innerText;
    }else{
        return element.textContent;
    }
}

/**
 * ���ݴ���
 * ��װ����
 * ����Ԫ�ص��ı�����
 * @param element Ԫ��
 * @param text Ҫ���õ��ı�����
 */
function setInnerText(element,text){
    if(element.textContent){
        element.textContent=text;
    }else{
        element.innerText=text;
    }
}

/**
 * ���ݴ���
 * ΪԪ�ذ��¼�
 * @param element ���¼���Ԫ��
 * @param type �¼�����
 * @param fn �¼�������(��������)
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
 * ���ݴ���
 * ΪԪ�ؽ���¼�
 * @param element ���Ԫ��
 * @param type �¼�����
 * @param fn �¼�������(��������)
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
 * ���ٶ�������
 * @param element Ԫ��
 * @param target Ŀ�����
 * @param [step] ��ѡ���� ÿ���ƶ��ľ���
 * @param [time] ��ѡ���� ִ�ж�ʱ����ʱ����
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
 * ������������(����)
 * ���ٵ�Ч��:(Ŀ��-��ǰ)/10
 * @param element Ԫ��
 * @param target Ŀ��λ��
 */
function animateHuan(element, target) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        //��ȡԪ�صĵ�ǰ��λ��
        var current = element.offsetLeft;
        //ÿ���ƶ��Ĳ���
        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        //�ƶ���ľ���
        current += step;
        element.style.left = current + "px";
        if (current == target) {
            //����ʱ��
            clearInterval(element.timeId);
        }
    }, 100);
}

/**
 * ���ݴ���
 * ��ȡ����һ��Ԫ�ص�ǰһ��Ԫ��
 * @param element ����Ԫ��
 * @returns {*} ����ǰһ��Ԫ��
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
 * ���ݴ���
 * ��ȡ����һ��Ԫ�صĺ�һ��Ԫ��
 * @param element ����Ԫ��
 * @returns {*} ���غ�һ��Ԫ��
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
 * ���ݴ���
 * ��ȡ���⸸Ԫ�صĵ�һ��Ԫ��
 * @param parent ����Ԫ��
 * @returns {*} ���ظ�Ԫ�صĵ�һ����Ԫ��
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
 * ���ݴ���
 * ��ȡ���⸸Ԫ�ص����һ��Ԫ��
 * @param parent ����Ԫ��
 * @returns {*} ���ظ�Ԫ�ص����һ����Ԫ��
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
* ���ݴ���
* ��ȡ����Ԫ�ص������ֵ�Ԫ��
* @param ele ����Ԫ��
* @returns {*} ���������ֵ�Ԫ��
*/
function getSiblings(ele) {
    if(!ele)return;//�жϵ�ǰ��ele���Ԫ���Ƿ����
    var elements=[];//���������Ŀ�ľ��Ǵ洢��ǰ���Ԫ�ص����е��ֵ�Ԫ��
    var el=ele.previousSibling;//��ǰԪ�ص�ǰһ���ڵ�
    while (el){
        if (el.nodeType===1){//Ԫ��
            elements.push(el);//�ӵ�������
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
 *���ݴ���
 *��ȡҳ�����ϻ���������ľ���
 * getScroll().top   getScroll().left
 * @returns {{top: (Number|number), left: (*|number)}}
 */
function getScroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,//Ϊ����֧�ֵ����������0
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0//Ϊ����֧�ֵ����������0
    }
}

/**
 * ��ȡԪ�ص���������
 * @param element Ԫ��
 * @param attr ����
 * @returns {*} ��������ֵ
 */
function getStyle(element, attr) {
    return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr];
}

/**
 * !!!����ʹ���˻�ȡԪ�ص��������Լ��ݴ��뺯��getStyle() �ͷ�װ��ȡ���� my$();
 * ������������(����)
 * @param element Ԫ��
 * @param json json
 * @param fn ����
 */
function animate(element, json,fn) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var flag=true;//���趼����Ŀ����
        for (var attr in json) {
            if(attr=="opacity"){
                //��ȡԪ�صĵ�ǰ��λ��
                var current = getStyle(element, attr)*100;//20
                //�������---��Ӧ���Ŀ��
                var target = json[attr]*100; //90
                //ÿ���ƶ��Ĳ���
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //�ƶ���ľ���
                current += step;
                element.style[attr] = current/100 ;
            }else if(attr=="zIndex"){
                element.style[attr]=json[attr];
            }else{
                //��ȡԪ�صĵ�ǰ��λ��
                var current = parseInt(getStyle(element, attr));
                //�������---��Ӧ���Ŀ��
                var target = json[attr];
                //ÿ���ƶ��Ĳ���
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //�ƶ���ľ���
                current += step;
                element.style[attr] = current + "px";
            }
            if (current != target) {
                flag=false;
            }
        }
        if(flag){
            //����ʱ��
            clearInterval(element.timeId);
            if(fn){
                fn();
            }
        }
    }, 10);
}

//��װ ��ȡҳ��������� ����
//�¼���������e����window.event����
//clientX��clientY,���������������
//scrollLeft��scrollTopҳ�����ϻ������Ҿ����ľ���
//pageX��pageY��װ ҳ������Ŀ��
//e.pageX����e.clientX+scrollLeft �¼�������ȡҳ��Ŀ���ڿ�������Ŀ������������ľ���
//e.pageY����e.clientY+scrollTop  �¼�������ȡҳ��ĸߵ��ڿ�������ĸ߼������Ͼ����ľ���

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



