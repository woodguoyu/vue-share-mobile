/*
   * desc: 商品分类序列化
   *  howToUse: proCateFilter(data);
   * */
function proCateFilter (data) {
  var _array=[];
  Reserve(0,_array);
  function Reserve(pid,_arr){
    /*var items=data.filter((x)=>x.pid==pid);*/
    var items = data.filter( function (x) {return x.pid == pid  } );
    for(var item of items){
      var _arrChildNumber = item.childrens.split(',');
      for(var k in _arrChildNumber){
        /* var _children=data.filter((x)=>x.cateid==_arrChildNumber[k]);*/
        var _children = data.filter(function (x ) {return x.cateid == _arrChildNumber[k]})
        if(k==0){
          item.children=_children;
        }else{
          item.children.push(_children[0])
        }

      }
      _arr.push(item);
    }
  }
  return _array;
}
/*
   * desc: 商品详情页面 ，规格数据处理
   *  howToUse: specinfoFun(data);
   * */
function specinfoFun(data) {
  var group_specinfo = {};
  var parents = _.groupBy(data, function (g) {
    return g.pid == 0
  });
  _.each(parents.true, function (e) {
    var children = _.filter(data, function (f) {
      return f.pid == e.specid
    });
    group_specinfo[e.spec_name] = children;
  });
  group_specinfo = JSON.parse(JSON.stringify(group_specinfo));
  return group_specinfo;
}

export { proCateFilter , specinfoFun }
