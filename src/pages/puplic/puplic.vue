<template>
  <div class="container">
  </div>

</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0

    window.WeixinJSBridge.call('hideOptionMenu');
  },
  methods: {

  },
  components: {
  }
}
</script>
<style scoped lang="stylus">
.container
  position absolute
  top 0px
  width 100%
  height 100%
  bottom 0
</style>