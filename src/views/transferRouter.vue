<template>

</template>

<script>
export default {
  name: 'transferRouter',
  data () {
    return {

    }
  },
  created(){
    const corpid  = this.$route.query.corpid;
    const productid = this.$route.query.productid;
    var parames = {corpid:corpid,productid:productid};
    this.$router.push({ path: 'proDetail', query:parames });
  }
}
</script>

<style scoped>

</style>
