<template>
  <div id="cate" class="dd" style="height: 100%;padding-bottom: 1rem">
    <yd-layout>
      <!--头部-->
      <yd-navbar slot="navbar" title="分类">
        <router-link :to="{path: '/index', query: {corpid: corpid}}" slot="left">
          <yd-icon name="home-outline" size=".5rem" color="#666"></yd-icon>
        </router-link>
        <router-link :to="{path: '/search', query: {corpid: corpid}}" slot="right">
          <yd-icon name="search" size=".5rem" color="#666"></yd-icon>
        </router-link>
      </yd-navbar>
      <!--头部-->

      <!--body-->
      <yd-scrolltab class='scroller-tab-container'>
        <yd-scrolltab-panel icon="discount"
                            :label="item.cate_name"
                            v-for="item in data_cate"
                            class="scroller-content-container">
          <div class="child-cate-container">
           <!-- <strong class="yd-scrolltab-content-title-zdh">{{item.cate_name}}</strong>-->
            <ul class="clearfix">
              <li @click="getProductListFromCateId(item)">{{item.cate_name}}</li>
            </ul>
            <ul v-if="item.children.length>0" class="clearfix">
              <li v-for="child in item.children" @click="getProductListFromCateId(child)">{{child.cate_name}}</li>
            </ul>
          </div>
        </yd-scrolltab-panel>
      </yd-scrolltab>
      <!--body-->
    </yd-layout>
  </div>
</template>

<script>
import { QueryParam } from '../assets/js/getUrl.js'
import {mapState} from 'vuex'
import { proCateFilter } from '../assets/js/common.js'
export default {
  name: 'cate',
  components:{

  },
  data () {
    return {
      corpid:'',
      data_cate:[],
      thisCate:[]
    }
  },
  computed:mapState({
    msg:state => state.msg
  }),
  created(){
    this.corpid = this.$route.query.corpid;
    this.getCateList();
  },
  methods:{
    getCateList(){
      var that = this;
      const prames = { corpid:this.corpid };
      this.$api.get('product/share/getCateList/',prames,res =>{
        if(res.code === 0){
          that.dataFilter(res.data);
        }else{
         console.log(res.stat)
        }
      });
    },
    dataFilter(data){
      this.data_cate = proCateFilter(data);
    },
    getProductListFromCateId(item){
      this.$store.commit('SET_MSG',item);
      this.$router.push({ path: 'resultProList', query: { corpid:this.corpid,cateid: item.cateid}});
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss">
  #cate{
     background: #ffffff;
    .yd-scrolltab-nav{
      background: #ffffff;
      .yd-scrolltab-active{
        background: #00a2ae;
       .yd-scrolltab-title{
         color: #ffffff;
       }
      }
    }
    .child-cate-container{
      ul{
        width: 100%;
      }
      ul li{
        float: left;
        width: 40%;
        height: .5rem;
        line-height: calc(.5rem);
        text-align: center;
        font-size: .3rem;
        margin: 5px 5px;
        border-radius: 5px;
        border:1px solid #b2b2b2;
        color: #666666;
        overflow: hidden;
      }
    }
  }
</style>
