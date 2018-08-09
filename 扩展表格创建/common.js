/**
 * Created by Administrator on 2016/7/20.
 */

//能力检测获取innerText
function getInnerText(element) {
    return element.textContent?element.textContent:element.innerText;
}
//能力检测设置innerText
function setInnerText(element,content) {
    if(element.innerText){
        element.innerText=content;
    }else{
        element.textContent=content;
    }
}
//能力检测---获取下一个节点
function getNextElement(element) {
    if(element.nextElementSibling){
        return element.nextElementSibling;
    }else{
        var node=element.nextSibling;
        while(node&&node.nodeType!==1){
            node=node.nextSibling;
        }
        return node;
    }
}
//能力检测---获取上一个节点
function getPreviousElement(element) {
    if (element.previousElementSibling){
        return element.previousElementSibling;
    }else{
        var node=element.previousSibling;
        while(node&&node.nodeType!==1){
            node=node.previousSibling;
        }
    }
}

//能力检测获取兄弟元素标签
function getSiblings(element) {
    if(!element)return;
    var elements=[];
    //获取前面的兄弟节点
    var ele=element.previousSibling;
    while(ele){
        if(ele.nodeType===1){
            elements.push(ele);
        }
        ele=ele.previousSibling;
    }
    //获取后面的兄弟节点
    ele=element.nextSibling;
    while(ele){
        if(ele.nodeType===1){
            elements.push(ele);
        }
        ele=ele.nextSibling;
    }
    return elements;
}
//获取第一个节点的能力检测
function getFirstElement(element) {
    if(element.firstElementChild){
        return element.firstElementChild;
    }else{
        var node=element.firstChild;
        while(node&&node.nodeType!==1){
            node=element.nextSibling;
        }
        return node;
    }
}
//根据id获取相应的元素
function my$(id) {
    return document.getElementById(id);
}

/**
 * 返回最后一个元素
 * @param parent
 * @returns {*}
 */
function getLastElement(parent) {
    if (parent.lastElementChild) {
        return parent.lastElementChild;
    }else{
        var el = parent.lastChild;
        while (el && el.nodeType !== 1) {
            el = el.previousSibling;
        }
        return el;
    }
}
