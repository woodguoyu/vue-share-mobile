
function QueryParam(url,param){
  var reg=eval("/"+name+"/g");
  return GetQueryString(url,param);
  /*var flag=reg.test(url);
  if(flag){
    return this.GetQueryString(url,name);
  }else{
    return;
    console.log('警告:'+'参数中必须含有'+param+'这个字段')
  }*/
}
function GetQueryString(url,param)
{
  var arrObj = url.split("?");
  if (arrObj.length > 1) {
    var arrPara = arrObj[1].split("&");
    var arr;
    for (var i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split("=");
      if (arr != null && arr[0] == param) {
        return arr[1];
      }
    }
    return "";
  }
  else {
    return "";
  }
}
export {QueryParam}
