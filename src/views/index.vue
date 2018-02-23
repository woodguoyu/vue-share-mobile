<template>
  <div id="index" class="dd" style="height: 100%;padding-bottom: 1rem">
    <yd-layout>
      <!--头部-->
      <yd-navbar  slot="navbar" title="首页">
        <router-link :to="{path: '/about', query: {corpid: corpid}}" slot="left">
          <yd-icon name="ucenter-outline" size=".5rem" color="#666"></yd-icon>
        </router-link>
        <router-link :to="{path: '/search', query: {corpid: corpid}}" slot="right">
          <yd-icon name="search" size=".5rem" color="#666"></yd-icon>
        </router-link>
      </yd-navbar>
     <!--头部-->
      <!--无商品显示-->
      <div class="img_container" v-if="dataproList.length==0" style="text-align: center;margin: auto;width: 100%">
        <img src="static/img/lazyimg/loading.gif" alt="" style="width: 100%">
        <h2 style="font-size: .3rem">暂无商品</h2>
      </div>
      <!--无商品显示-->
    <!--列表-->
      <div class="" v-show="dataproList.length>0">
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
      </div>
    <!--列表-->
    </yd-layout>
  </div>
</template>

<script>
import { Icon } from 'iview';
import { QueryParam } from '../assets/js/getUrl.js'
export default {
  name: 'index',
  components:{
    Icon
  },
  data () {
    return {
      msg: 'index',
      corpid:'',
      ISSHOW:{

      },
      dataproList:[],
      dataAll:[],
      page:1,
      last_page:'',
      current_page:''
    }
  },
  created() {
    /*const url = window.location.href;
    this.corpid = QueryParam(url,'corpid');*/
    this.corpid = this.$route.query.corpid;
    this.getproList();
  },
  methods:{
    // 获取列表
    getproList(){
      const params = {corpid:this.corpid,page:this.page};
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
      this.dataAll =data;
      this.last_page = data.last_page;
      this.current_page = data.current_page;
      this.dataproList = data.data;
    },
    // 下拉刷新
    prorefresh (){
      this.page = 1;
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
        const params = {corpid:this.corpid,page:this.page};
        const that = this;
        this.$api.get('product/share/getProductList/',params,res =>{
          if(res.code===0){
            const _list = res.data.data;
            that.dataproList = this.dataproList.concat(_list);
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

    },
    // 查看商品详情
    toProDetail(item){
      debugger
      this.$router.push({ path: 'productDetails', query:{corpid:this.corpid, productid: item.productid}});
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
  #index{
    height: 100%;
    background: #ffffff;
    width: 100px;
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
