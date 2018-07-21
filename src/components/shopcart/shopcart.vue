<template>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highLight': totalCount > 0}">
              <i class="icon-shopping_cart" :class="{'highLight': totalCount > 0}"></i>
            </div>
            <div class="num" v-show="totalCount > 0">{{totalCount}}
            </div>
          </div>
          <div class="price" :class="{'highLight': totalPrice > 0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <span class="pay" :class="payClass">
           {{totalPay}}
          </span>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      selectedFoods: {
        type: Array,
        default() {
          return [
            {price: 20, count: 1}
          ];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 3
      }
    },
    computed: {
      totalPrice() {
        let temp = 0;
        this.selectedFoods.forEach((food) => {
          temp += food.price * food.count;
        });
        return temp;
      },
      totalCount() {
        let temp = 0;
        this.selectedFoods.forEach((food) => {
          temp += food.count;
        });
        return temp;
      },
      totalPay() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let temp = this.totalPrice - this.minPrice;
          return `还差${temp}元起送`;
        } else {
          return `去结算`;
        }
      },
      payClass() {
        return this.totalPrice >= this.minPrice ? 'highLight' : '';
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position fixed
    left 0px
    bottom 0px
    z-index 100
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      height 100%
      font-size 0
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          vertical-align top
          border-radius 50%
          background #141d27
          text-align center
          .logo
            width 100%
            height 100%
            border-radius 50%
            background #2b343c
            text-align center
            &.highLight
              background rgb(0, 160, 220)
            .icon-shopping_cart
              font-size 24px
              color #80858a
              line-height 44px
              &.highLight
                color #fff
          .num
            position absolute
            top 0px
            right 0px
            width 24px
            height 16px
            line-height 16px
            border-radius 16px
            font-size 9px
            color #fff
            font-weight 700
            background rgb(240, 20, 20)
            box-shadow 0px 4px 8px 0px rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 12px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          border-right 1px solid rgba(255, 255, 255, 0.1)
          font-size 16px
          font-weight 700
          color rgba(255, 255, 255, 0.4)
          &.highLight
            color #fff
        .desc
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px
          color rgba(255, 255, 255, 0.4)
          font-size 12px
      .content-right
        flex  0 0 105px
        width 105px
        text-align center
        .pay
          display block
          height 48px
          line-height 48px
          font-size 12px
          font-weight 700
          color rgba(255, 255, 255, 0.4)
          background #435159
          &.highLight
            background rgb(0, 180, 60)
            color #fff
</style>
