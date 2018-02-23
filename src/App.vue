<template>
  <div id="app">
    <div class="tabwrap" v-show="isBottom">
      <div class="tab-item">
        <router-link :to="{path: '/index', query: {corpid: corpid}}">
          <div class="icon"><yd-icon name="home-outline" size=".4rem" color=""></yd-icon></div>
          <div class="icon-word">首页</div>
        </router-link>
      </div>

      <div class="tab-item">
        <router-link :to="{path: '/cate', query: {corpid: corpid}}">
          <div class="icon"><yd-icon name="type" size=".4rem"></yd-icon></div>
          <div class="icon-word">分类</div>
        </router-link>
      </div>

      <div class="tab-item">
        <router-link :to="{path: '/search', query: {corpid: corpid}}">
          <div class="icon"><yd-icon name="search" size=".4rem" color=""></yd-icon></div>
          <div class="icon-word">搜索</div>
        </router-link>
      </div>

      <div class="tab-item">
        <router-link :to="{path: '/about', query: {corpid: corpid}}">
          <div class="icon"><yd-icon name="ucenter-outline" size=".4rem" color=""></yd-icon></div>
          <div class="icon-word">关于</div>
        </router-link>
      </div>
    </div>
  <div>
    <router-view class="Router"></router-view>
    <!--<transition :name="transitionName">
      <router-view class="Router"></router-view>
    </transition>-->
  </div>
  </div>
</template>

<script>
  import { Icon } from 'iview';
  export default {
    name: 'app',
    components:{
      "zdh-icon":Icon
    },
    data(){
      return {
        transitionName:'slide-right',
        isBottom:true,
        corpid:'',
      }
    },
    created(){
        this.corpid = this.$route.query.corpid;
        const params = {corpid:this.corpid};
        /*设置网页头部信息*/
        const that = this;
        this.$api.get('/product/share/getShareSet',params,res =>{
          if(res.code===0){
            document.title = res.data.shopname;
            document.querySelector('#headerIcon').href = res.data.logo
          }else{
            console.log(res.stat);
          }
        });
    },
    watch: {
      '$route' (to, from) {
        let isBack = this.$router.isBack  //  监听路由变化时的状态为前进还是后退
        if (isBack) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
        this.$router.isBack = false;
      }
    },
  }
</script>

<style type="text/css" lang="scss" scoped>
  #app{
    .Router{
     /* margin-bottom: 1rem;*/
    }
    .tabwrap {
      width: 100%;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #fff;
      border-top: 1px solid #c9e8ea;
      display: flex;
      z-index: 99;
      padding: 0;
      .tab-item {
        flex: 1;
        text-align: center;
        a{
          display: block;
          padding: .1rem 0;
        }
        a.router-link-active{
          color: rgb(0, 162, 174);
        }
      }
    }
    .Router {
      position: absolute;
      width: 100%;
      transition: all .8s cubic-bezier(.55,0,.1,1);
    }
    /*.slide-left-enter,
    .slide-right-leave-active {
      opacity: 0;
      -webkit-transform: translate(100%, 0);
      transform: translate(100%, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
      opacity: 0;
      -webkit-transform: translate(-100%, 0);
      transform: translate(-100% 0);
    }*/
  }
</style>
