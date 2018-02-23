<template>
  <div id="about" class="dd" style="height: 100%;padding-bottom: 1rem">
    <yd-layout>
      <!--无商品显示-->
      <div class="img_container" v-if="contact.length==0" style="text-align: center;margin: auto;width: 100%">
        <img src="static/img/lazyimg/loading.gif" alt="" style="width: 100%">
        <h2 style="font-size: .3rem">暂无信息</h2>
      </div>
      <!--无商品显示-->
      <div class="about-container" v-if="contact.length>0">
        <div class="header-info-container">
          <div class="header-top"></div>
          <div class="content">
            <span class="logo-wrap">
              <Icon class="icon-header" type="home"></Icon>
            </span>
              <br>
              <p class="shopname">{{shopname}}</p>
          </div>
        </div>
        <div class="content-container">
          <ul class="clearfix">
            <li>
              <span class="icon-wrap"><Icon class="icon-info" type="home"></Icon></span>
              {{shopname}}
            </li>
            <li>
              <span class="icon-wrap"><Icon class="icon-info" type="person"></Icon></span>
              {{contact[0]}}
            </li>
            <li>
              <span class="icon-wrap"><Icon class="icon-info" type="ios-telephone"></Icon></span>
              {{contact[1]}}
            </li>
          </ul>
          <div class="btn-container">

            <router-link :to="{path: '/index', query: {corpid: corpid}}" slot="left">
              <span class="left">去首页</span>
            </router-link>
            <span class="left" @click="trunRegister">去注册</span>
          </div>
        </div>
    </div>
    </yd-layout>
  </div>
</template>

<script>
import { QueryParam } from '../assets/js/getUrl.js'
import animate from 'animate.css'
import { Icon ,Button} from 'iview'
export default {
  name: 'about',
  components:{
    Icon,Button
  },
  data () {
    return {
      contact:[],
      shopname:'',
      registerUrl:'',
      corpid:'',
      logo:''
    }
  },
  created(){
    this.corpid = this.$route.query.corpid;
    this.loadCompInfo();
  },
  methods:{
    loadCompInfo(){
      const params = {corpid:this.corpid};
      const that = this;
      this.$api.get('/product/share/getShareSet',params,res =>{
        if(res.code===0){
          that.dataInit(res.data);
        }else{
          console.log(res.stat);
        }
      });
    },
    dataInit(data){
      console.log(data);
      this.contact = data.contact;
      this.shopname = data.shopname;
      this.registerUrl = data.inviteurl;
      this.logo = data.logo;
    },
    trunRegister(){
      window.open(this.registerUrl);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
  #about{
    background: #ffffff;
    .about-container{
      width: 100%;
      .header-info-container{
        width: 100%;
        height: 4.5rem;
        background: #00a2ae;
        text-align: center;
        .header-top{
          width: 100%;
          height: 2.5rem;
          position: absolute;
          top: -1.25rem;
          border-radius: 50%;
          background-color:#438084;
        }
        .content{
          width: 100%;
          position: absolute;
          margin-top: 1.8rem;
          text-align: center;
          .logo-wrap{
            position: relative;
            text-align: center;
            display: inline-block;
            width: 1rem;
            height: 1rem;
            vertical-align: middle;
            background: #ffffff;
            font-size: .25rem;
            color: #ffffff;
            border:1px solid #ffffff;
            border-radius: 50%;
            .icon-header{
              position: absolute;
              top:50%;
              left: 50%;
              transform: translate(-50%,-50%);
              color: #00a2ae;
              font-size: .5rem;
              line-height: 1rem;
            }
          }
          p.shopname{
            color: #ffffff;
            margin: .15rem 0;
            font-size: .3rem;
          }
        }
      }
      .content-container{
        ul li{
          border-bottom: 1px solid #f5f5f5;
          padding: .25rem;
          font-size: .3rem;
          color: #555555;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          word-break: break-all;
          text-overflow: ellipsis;
          line-height: .8rem;
          max-height: 1.34rem;
          span.icon-wrap{
            position: relative;
            text-align: center;
            margin-right: .2rem;
            .icon-info{
              color: #ffffff;
              background: #00a2ae;
              width: .7rem;
              height: .7rem;
              font-size: .4rem;
              line-height: .7rem;
              border-radius: 50%;
            }
          }
        }
        ul li:last-child{
          border: none;
        }
      }
      .btn-container{
        margin:.23rem auto;
        width: 92%;
        .left,.right{
          float: left;
          width: 50%;
          text-align: center;
          color: #ffffff;
          background: #00a2ae;
          padding: .15rem .3rem;
          font-size: .3rem;
        }
        .left{
          border-right: 1px solid #ffffff;
        }
      }
    }
  }
</style>
