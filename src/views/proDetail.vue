<template>
  <div id="proDetail" class="dd" style="height: 100%;padding-bottom: 1rem">
    <yd-layout>
      <yd-navbar slot="navbar"  title="商品详情">
        <div  slot="left" @click="$router.go(-1)">
          <yd-navbar-back-icon  size=".5rem" color="#666" ></yd-navbar-back-icon>
        </div>
        <router-link :to="{path: '/index', query: {corpid: corpid}}" slot="right">
          <yd-icon name="home" size=".5rem" color="#666"></yd-icon>
        </router-link>
      </yd-navbar>
    <!--无商品显示-->
    <div class="img_container" v-show="!ISSHOW.showPro" style="text-align: center;margin: auto;width: 100%">
      <img src="static/img/lazyimg/loading.gif" alt="" style="width: 100%">
      <h2 style="font-size: .3rem">暂无商品详情</h2>
    </div>
    <!--无商品显示-->
    <div class="detail-container" v-show="ISSHOW.showPro">
      <!--轮播图-->
      <div class="img-container" >
        <yd-slider autoplay="0">
          <yd-slider-item>
            <a href="javascript:void(0)">
              <img slot="img" :src="data_detail.image">
            </a>
          </yd-slider-item>
          <yd-slider-item v-for="(item,key) in  data_detail.show_imageurl" :key="key">
            <a href="javascript:void(0)">
              <img slot="img" :src="item.img">
            </a>
          </yd-slider-item>
        </yd-slider>
      </div>
      <!--轮播图-->

      <!--baseInfo-->
      <div class="others-container">
        <div class="pro-BaseInfo-container">
          <p class="pro-name">{{data_detail.name}}</p>
          <p class="pro-desc" v-if="data_detail.cate_name">
            <span class="title">分类</span>
            <span v-if="data_detail.cate_name">{{data_detail.cate_name}}</span>
            <span v-if="data_detail.brand_name"> / {{data_detail.brand_name}}</span>
          </p>
          <p class="pro-price"><span class="title">价格</span><Icon type="social-yen"></Icon>&nbsp;<span class="price">{{data_detail.price}}</span></p>
          <p class="pro-btn-goToOrder"><span class="content" @click="gotoOrder">去订货</span></p>
          <p v-show="List_specinfo" class="fen-Line" style="border-bottom: 1px solid #f5f5f5"></p>
        </div>
        <div class="J-P-choosen-container" v-if="List_selected_specinfo.length>0">
          <!--已选规格-->
          <div class="J-P-choosen selected-container">
            <ul class="clearfix">
              <span class="key">已选</span>
              <li v-for="item in List_selected_specinfo" class="item-has-selected">{{item}}</li>
            </ul>
          </div>
          <!--已选规格-->
          <!--规格-->
          <div class="J-P-choosen">
            <ul v-for="(value, key) in List_specinfo" class="clearfix J-spec-chose">
              <span class="key">{{key}}</span>
              <li v-for="(item,key2) in value"
                  :specid="item.specid"
                  class="J-item"
                  @click="chooseSpecinfo($event,value)">{{item.spec_name}}</li>
            </ul>
          </div>
          <!--规格-->
        </div>
      </div>
      <!--baseInfo-->

      <!--公司信息-->
      <p class="dividing-line"></p>
        <div class="dividing-container company-info-container">
          <!--<p class="pro-code"><span class="title">商品编号</span><span>{{data_detail.product_code}}</span></p>-->
          <p class="pro-company-name"><span class="icon"><Icon type="home"></Icon> </span><span class="content">{{data_detail.company}}</span></p>
          <p class="pro-mobile"><span class="icon"><Icon type="ios-telephone"></Icon></span><span class="content">{{data_detail.mobile}}</span></p>
        </div>
      <p class="dividing-line"></p>
      <!--公司信息-->

      <!--子商品列表-->
      <div class="pro-groupList-container" v-show="ISSHOW.showGroupList">
        <div class="dividing-container">
          <p class="pro-mobile"><span class="icon"><Icon type="ios-list"></Icon></span><span class="content">包括商品</span></p>
        </div>
        <p class="dividing-line"></p>
          <group-pro-list :datagrouplist="data_groupList"></group-pro-list>
        <p class="dividing-line"></p>
      </div>
      <!--子商品列表-->

      <!--详情介绍-->
      <div class="pro-body-container">
        <div class="dividing-container dividding-pro-body">
          <p class="pro-mobile"><span class="icon"><Icon type="ios-paper"></Icon></span><span class="content">商品详情</span></p>
        </div>
        <div id="main-container" style="width: 100%">
          <div v-html="data_detail.content"></div>
        </div>
      </div>
      <!--详情介绍-->
    </div>
      <yd-backtop></yd-backtop>
    </yd-layout>
  </div>
</template>

<script>
import { QueryParam } from '../assets/js/getUrl.js'
import { specinfoFun } from '../assets/js/common.js'
import animate from 'animate.css'
import groupProList from '../components/groupProList'
import { Icon ,Button} from 'iview'

export default {
  name: 'proDetail',
  components:{
    Icon,
    Button,
    groupProList
  },
  data () {
    return {
      ISSHOW:{
        showPro:true,
        showGroupList:false
      },
      data_detail:[],
      List_specinfo: [],// 规格
      List_selected_specinfo:[],
      data_groupList:[],
      corpid:'',
      proid:'',
      primaryid:''
    }
  },
  watch:{
    '$route' (to, from) {
      if(to.query.productid!==this.proid){
        this.proid = to.query.productid;
        this.data_groupList=[];
        this.List_specinfo=[];
        this.List_selected_specinfo=[];
        this.data_detail.show_imageurl=[];
        this.getProDetal();
      }
    }
  },
  created(){
    this.corpid = this.$route.query.corpid;
    this.proid = this.$route.query.productid;
   /* this.primaryid = this.$route.query.primaryid;*/
    this.getProDetal();
  },
  methods:{
    // 去订货
    gotoOrder(){
      var url = window.location.origin+'/app/product/show?sellerid='+ this.corpid +'&proid='+this.proid;
      console.log(url);
      window.open(url);
    },
    getProDetal(){
      const params = {corpid:this.corpid,proid:this.proid};
      const that = this;
      this.$api.get('/product/share/index',params,res =>{
        if(res.code===0){
          that.dataInit(res.data);
          that.ISSHOW.showPro = true;
        }else{
          that.ISSHOW.showPro = false;
          console.log(res.stat);
        }
      });
    },
    dataInit(data){
      this.data_detail = data;
      // 组合商品
      if(data.protype===1){
        this.data_groupList = data.groupproduct;
        this.ISSHOW.showGroupList = true;
      }
      // 多规格商品处理
      if(data.primary_productid>0 && data.protype===0){
        this.ISSHOW.showGroupList = false;
        // 处理多规格数据
        this.List_specinfo = specinfoFun(data.specinfo);
        // 当前选择的规格
        const spec_strs = data.spec_strs.split(",");
        this.List_selected_specinfo = spec_strs;
        this.$nextTick(function () {
          // 首次规格渲染完成后添加 激活状态
          for (let k=0;k< data.specids.length;k++) {
            $(".J-spec-chose li[specid = " + data.specids[k] + "]").addClass('active');
          }
        });
      }
    },
    chooseSpecinfo(event,data){
      $(event.target).siblings('li').removeClass('active');
      $(event.target).addClass('active');
      // 拿到选中的规格 specid
      var data_specid = [];
      $(".J-spec-chose li.active").each(function () {
        data_specid.push(Number($(this).attr('specid')));
      });
      data_specid = data_specid.toString();
      // 获取当前被选中规格商品
      const params = {  spec: data_specid };
      const that = this;
      this.$api.get('/product/share/index',params,res =>{
        if(res.code===0){
          that.dataInit(res.data);
          that.ISSHOW.showPro = true;
        }else{
          that.$dialog.toast({
            timeout: 800,
            mes:res.stat
          });
          console.log(res.stat);
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
  #proDetail{
    height: 100%;
    background: #ffffff;
    .img-container{
      border-bottom: 1px solid #f5f5f5;
    }
    .others-container{
      width: 100%;
    }

    .pro-BaseInfo-container{
      padding: 0 .3rem;
      p,span{
        font-size: .25rem;
        color: #333333;
        margin: .08rem 0;
        span{
          color: #666666;
          font-size: .2rem;
        }
        span.title{
          color: #333333;
          font-weight: bold;
          margin-right: .15rem;
        }
      }
      p.pro-name{
        margin: .15rem 0;
        font-size: .3rem;
        font-weight: bold;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 2; /** 显示的行数 **/
        overflow: hidden;  /** 隐藏超出的内容 **/
      }
      p.pro-price{
        margin: .1rem 0;
        font-size: .4rem;
        color: #e4393c;
        .price{
          font-size: .45rem;
          color: #e4393c;
        }
      }
      p.pro-code,p.pro-desc{
        color: #666666;
      }
      p.pro-btn-goToOrder{
        text-align: right;
        span.content{
          padding: .12rem .2rem;
          background: #00a2ae;
          color: #ffffff;
          border: 1px solid #00a2ae;
          border-radius: 3px;
        }
      }
    }

    .J-P-choosen-container{
      padding: 0 .3rem;
      .J-P-choosen{
        margin: .2rem 0;
        ul{
          margin: .2rem 0;
        }
        ul span.key{
          font-size: .25rem;
          font-weight: bold;
          float: left;
          height: .52rem;
          margin-right: .1rem;
          line-height: calc(.52rem);
        }
        ul li {
          float: left;
          font-size: .23rem;
          text-align: center;
          height: .52rem;
          line-height: calc(.52rem - 3px);
          padding: 0.05rem .25rem;
          border: 1px solid #f5f5f5;
          border-radius: 3px;
          margin: 0 .1rem;
          transition: all 0.25s;
        }
        li.active{
          border: 1px solid #00a2ae;
          color: #ffffff;
          background: #00a2ae;
        }
      }
      .selected-container{
        ul li{
          border-radius: 20px;
          height: .42rem;
          line-height: calc(.42rem - 4px);
          padding: 0.05rem .15rem;
          border: 1px solid #00a2ae;
        }
      }
    }
    .dividing-line{
      width: 100%;
      background: #f5f5f5;
      height: .15rem;
    }
    .dividing-container{
      padding: .15rem .3rem;
      color: #666666;
      font-size: .3rem;
      p{
        height: .5rem;
        line-height: .5rem;
        span.icon{
          font-size: .4rem;
          height: .5rem;
          line-height: .5rem;
          margin-right: .15rem;
          color: #00a2ae;
        }
        span.content{
          height: .5rem;
          line-height: .5rem;
        }
      }
    }
  }
  .pro-body-container{
    width: 100%;
    .dividding-pro-body{

    }
  }
</style>
<style lang="scss">
  #main-container{
    width:100%;
    padding: 0 .2rem;
  }
  #main-container img{
    width: 100%;
    height: auto;
  }
  .yd-slider-pagination-item-active{
    background: #00a2ae !important;
  }
  .yd-slider-item img {
    width: auto !important;
    display: block;
    max-height: 6.5rem;
    margin: auto;
    max-width: 100%;
  }
</style>
