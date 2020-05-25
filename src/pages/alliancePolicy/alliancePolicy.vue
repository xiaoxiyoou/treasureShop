<template>
  <div class="container col a-c">
    <img class="" src="./pic.png" alt="">
    <img class="add" src="./add.png" alt="" @click="add">

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


  },
  methods: {
    add() {
      this.$router.push({
        path: '/add',

      })

    }

  },
  components: {
  }
}
</script>
<style scoped lang="stylus">
.container
  position relative
  top 0px
  width 100%
  height 100%
  bottom 0
  img
    width 100%
  .add
    width 427px
    position absolute
    z-index 1
    bottom 73px
</style>