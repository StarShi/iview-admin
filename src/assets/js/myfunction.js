export function addClass(elem,cls) {//添加样式
    var cls = cls || '';
    if(elem){
        var  oldClass = elem.className;
        oldClass = oldClass.replace(/^\s+|\s+$/g,'');//删除类名中多余的空格
        if(oldClass.indexOf(cls) === -1){
            elem.className = oldClass + ' ' + cls
        }else {
            elem.className = cls;
        }
    }
}

export function removeClass(elem,cls) {//移除样式
    var cls = cls || '';
    if(elem){
        var oldClass = elem.className;
        oldClass = oldClass.replace(/^\s+|\s+$/g,'');//删除类名中多余的空格
        if(oldClass.indexOf(cls) === -1){
            return
        }
        oldClass = oldClass.replace(cls,'');
        elem.className = oldClass;
    }
}

export function getStyle(elem,attr){ //获取属性值函数
    var attr = attr || '';
    var value = '';
    if(elem && attr !=''){
        if(elem.currentStyle) {
            value =  elem.currentStyle[attr];
        } else {
            value =  getComputedStyle(elem, false)[attr];
        }
        return value;
    }

}