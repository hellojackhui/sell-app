<template>
  <div class="tab border-1px">
      <router-link class="tab-item" tag="div" to="/goods">商品</router-link>
      <router-link class="tab-item" tag="div" to="/ratings">评论</router-link>
      <router-link class="tab-item" tag="div" to="/seller">商家</router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .tab
    display flex;
    width 100%;
    height 40px;
    line-height 40px;
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex 1
      text-align center
      display block
      text-decoration none
      font-size 14px
      color rgb(77, 85, 93)
      &.router-link-active
        color rgb(240, 20, 20)
</style>
