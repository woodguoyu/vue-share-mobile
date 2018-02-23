<template>
  <div id="search" class="dd" style="height: 100%;padding-bottom: 1rem">
    <yd-layout>
    <div class="search-container">
      <yd-search  v-model="searchkey" :on-submit="submitHandler"></yd-search>
    </div>
      <!--结果列表-->
      <yd-pullrefresh :callback="prorefresh" ref="prorefresh">
        <yd-infinitescroll :callback="infinitescroll" ref="infinitescroll">
          <yd-list theme="4" slot="list">
            <yd-list-item v-for="item in dataproList" class="pro-list-container"
                          type="link"
                          :href="{path:'proDetail',query:{corpid:corpid, productid: item.productid}}">
              <img slot="img" :src="item.image">
              <!--  <span class="pro-title" slot="title">{{item.name}}</span>-->
              <yd-list-other slot="other" class="other-attrs-container" style="display: block">
                <div class="title-container">
                  <span class="pro-title">{{item.name}}</span>
                </div>
                <div class="pro-group" v-if="item.protype==1">  组合 </div>
                <p class="cate-name">分类：{{item.cate_name}}</p>
                <p class="product-code">{{item.product_code}}</p>
                <p class="pro-price"><Icon type="social-yen"></Icon>
                  {{item.price}}
                  <span class="splid">/</span>
                  {{item.unitname}}</p>
              </yd-list-other>
            </yd-list-item>
          </yd-list>
          <span slot="doneTip">没有数据啦~~</span>
        </yd-infinitescroll>
        <yd-backtop></yd-backtop>
      </yd-pullrefresh>
      <!--结果列表-->
      <!--无商品显示-->
      <div class="img_container" v-if="HASResult" style="text-align: center;margin: auto;width: 100%">
        <img src="static/img/lazyimg/loading.gif" alt="" style="width: 100%">
        <h2 style="font-size: .3rem">暂无此商品</h2>
      </div>
      <!--无商品显示-->
    </yd-layout>
  </div>
</template>

<script>
  import { Icon } from 'iview';
  import { QueryParam } from '../assets/js/getUrl.js'
  export default {
  name: 'search',
  components:{
    Icon
  },
  data () {
    return {
      corpid:'',
      searchkey:"",
      result: [],
      dataproList:[],
      dataAll:[],
      page:1,
      last_page:'',
      current_page:'',
      HASResult:false
    }
  },
  created(){
    this.corpid = this.$route.query.corpid;
  },
  methods:{
    itemClickHandler(item) {

    },
    submitHandler(value) {
      this.searchkey = value;
      this.getproList();
    },
    // 获取列表
    getproList(){
      this.page = 1;
      const params = {corpid:this.corpid,page:this.page,key:this.searchkey};
      const that = this;
      this.$api.get('product/share/getProductList/',params,res =>{
        if(res.code===0){
          that.dataInit(res.data);
          that.$refs.prorefresh.$emit('ydui.pullrefresh.finishLoad');
          that.page++;
        }else{
          that.$dialog.toast({
            icon: 'error',
            mes: res.stat,
            timeout: 800,
          });
        }
      });
    },
    // 列表数据初始化
    dataInit(data){
      if(data.data.length===0){
        this.HASResult = true
      }else{
        this.HASResult = false
      }
      this.dataAll =data;
      this.last_page = data.last_page;
      this.current_page = data.current_page;
      this.dataproList = data.data;
    },
    // 下拉刷新
    prorefresh (){
      this.getproList();
    },
    // 上拉加载
    infinitescroll (){
      if(this.page > this.last_page){
        this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
        this.$dialog.toast({
          timeout: 800,
          mes:'已是最新内容'
        });
      }else{
        const params = {corpid:this.corpid,page:this.page,key:this.searchkey};
        const that = this;
        this.$api.get('product/share/getProductList/',params,res =>{
          if(res.code===0){
            const _list = res.data.data;
            that.dataproList = this.dataproList.concat(_list);
            that.$dialog.toast({
              timeout: 800,
              mes: _list.length > 0 ? '为您更新了' + _list.length + '条内容' : '已是最新内容'
            });
            if(that.page === that.last_page){
              this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
              return;
            }
            that.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');
            that.page++;
          }else{
            console.log(res.stat);
          }
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss">
  #search{
    height: 100%;
    background: #ffffff;
    .yd-search-input>.cancel-text{
      color: #00a2ae;
    }
    .yd-search-input>.search-input .search-icon:after{
      color: #00a2ae;
    }
    .other-attrs-container{
      .title-container{
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
        text-overflow: ellipsis;
        line-height: .38rem;
        max-height: 1.34rem;
        .pro-title{
          color: #505050;
          font-size: .26rem;
          text-align: justify;
          font-weight: 800;
        }
      }
      .pro-group{
        position: absolute;
        padding: 0 .2rem;
        text-align: center;
        background: #0db78a;
        color: #ffffff;
        right: 0;
        top: 0;
        font-size: .25rem;
      }
      p.cate-name{
        overflow: hidden;
        font-size: .2rem;
        color: #7F7F7F;
      }
      p.product-code{
        overflow: hidden;
        font-size: .2rem;
        color: #7F7F7F;
      }
      p.pro-price{
        font-size: .30rem;
        line-height: 1;
        margin-top: .25rem;
        text-align: left;
        color: #e4393c;
        span.splid{
          height: 10px;
          font-size: 18px;
          line-height: 10px;
        }
      }
    }
  }
</style>
