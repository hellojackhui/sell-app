<template>
  <div>
  <div class="goods">
    <div class="left-wrapper" ref="wrapper1">
      <ul>
        <li v-for="(item, index) in goods" :key="item" class="menu-item" :class="{'current': currentIndex === index}" @click="selectMenu(index)">
          <span class="text">
            <span v-show="item.type > 0" class="icon" :class="classmap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="wrapper2">
      <ul>
        <li v-for="item in goods" :key="item" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" :key="food" class="food-item" @click="selectFood(food, $event)">
              <div class="icon">
                <img :src="food.icon" width="57px" height="57px">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice >0">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart :selectedFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" ref="shopcart"></shop-cart>
  </div>
  <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import ShopCart from 'components/shopcart/shopcart';
  import CartControl from 'components/cartcontrol/cartcontrol';
  import Food from 'components/food/food';
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    created() {
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
        };
      });
      this.classmap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (height2 || (height1 <= this.scrollY && height2 > this.scrollY)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._scroll();
        this._calculateHeight();
      });
    },
    methods: {
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        console.log(this.selectedFood);
        this.$refs.food.show();
      },
      _scroll() {
        this.scroll = new BScroll(this.$refs.wrapper1, {
          click: true
        });
        this.scroll2 = new BScroll(this.$refs.wrapper2, {
          click: true,
          probeType: 3
        });
        this.scroll2.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _drop(target) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.wrapper2.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.wrapper2.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.scroll2.scrollToElement(el, 300);
      }
    },
    components: {
      ShopCart,
      CartControl,
      Food
    },
    events: {
     'add'(target) {
        this._drop(target);
  }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .left-wrapper
      flex 0 0 80px
      width 80px
      background-color #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        line-height 14px
        padding 0 12px
        &.current
          position relative
          margin-top -1px
          z-index 10
          background-color white
          font-weight 700
          .text
            border-none()
        .icon
          display inline-block
          vertical-align middle
          width 12px
          height 12px
          margin-right -2px
          margin-top -2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display table-cell
          width 56px
          font-size 12px
          vertical-align middle
          border-1px(rgba(7, 17, 27, 0.1))
          text-align center
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        color rgb(147, 153, 159)
        background-color #f3f5f7
        font-size 12px
        font-weight 200
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            font-size 14px
            line-height 14px
            margin 2px 0 8px 0
            height 14px
            color rgb(7, 17, 27)
          .desc, .extra
            font-size 10px
            line-height 10px
            color rgb(147, 153, 159)
          .desc
            margin-bottom 8px
            line-height 12px
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240, 20, 20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147, 153, 159)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 12px

</style>
