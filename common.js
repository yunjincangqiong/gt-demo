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
        element.innerText=text;
    }else{
        element.textContent=text;
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
 * ���ݴ���
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
 * ������������
 * ÿ���ƶ�ʮ��֮һ����
 * @param element �ƶ�Ԫ��
 * @param target Ŀ�����
 * @param [step] ��ѡ���� ÿ���ƶ��ľ��� 1/step
 * @param [time] ��ѡ���� ִ�ж�ʱ����ʱ����
 */
function animateHuan(element,target,step,time) {
    //����ʱ��
    if (element.timer) {
        clearInterval(element.timer);
    }
    //���������� ���������ʱΪĬ��ֵ100
    time = time||100;
    step = step||10;
    element.timer = setInterval(move,time);
    function move() {
        //��ȡԪ�ص�ǰ����
        var current = element.offsetLeft;
        var step1 = (target - current) / step;
        //�ж�step���ϻ�������ȡ��
        step1 = step1 > 0 ? Math.ceil(step1) : Math.floor(step1);
        current += step1;
        element.style.left = current + "px";
        //�ж��ƶ��ľ����Ƿ�Ŀ��λ��
        if (target == current) {
            clearInterval(element.timer);
        }
    }
}

