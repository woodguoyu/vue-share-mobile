<template>
  <div id="page404">
      <div class="container">
        <div class="img_container">
          <img src="static/img/lazyimg/loading.gif" alt="">
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'page404',
  data () {
    return {
      msg: 'index'
    }
  },
  created() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
#page404{
  width: 100%;
  background: #ffffff;
  color: #333333;
  .container{
    .img_container{
      width: 100%;
      text-align: center;
      margin: auto;
      height: 300px;
      margin: 200px 0;
      img{
        text-align: center;
      }
    }
    .info_container{
      background:#eee;
      padding: 5px;
      .info{
        margin:auto;
        text-align: center;
      }
    }
  }
}

</style>
