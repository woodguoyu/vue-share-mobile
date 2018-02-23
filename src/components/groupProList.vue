<template>
  <div id="groupProList" class="dd">
    <!--列表-->
    <yd-list theme="4" slot="list">
      <yd-list-item v-for="item in datagrouplist" class="pro-list-container"
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
          <p class="pro-price">
            <Icon type="social-yen"></Icon>
            {{item.price}}
            <span class="splid">/</span>
            {{item.unitname}}
            <span class='mount'>(&nbsp;x{{item.mount}}&nbsp;)</span>
          </p>
        </yd-list-other>
      </yd-list-item>
    </yd-list>
    <!--列表-->
  </div>
</template>

<script>
  import { Icon } from 'iview';
  export default {
    name: 'groupProList',
    components:{
      Icon
    },
    props: {
      datagrouplist:{
        type: Array,
      }
    },
    data () {
      return {
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
    mounted() {
      /*const url = window.location.href;
      this.corpid = QueryParam(url,'corpid');*/
      this.corpid = this.$route.query.corpid;
     /* this.getproList();*/
    },
    methods:{
      test(data){
       debugger
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
  #groupProList{
    height: 100%;
    background: #ffffff;
    width: 100%;
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
