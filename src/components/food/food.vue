<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="datail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="new">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">

          </div>
          <div class="buy">加入购物车</div>
        </div>
        <div class="split"></div>
        <div class="info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <div class="split"></div>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect  :selectType="selectType" :desc="desc"
                        :ratings="food.ratings"></ratingselect>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import ratingselect from '../ratingselect/ratingselect.vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      };
    },
    methods: {
      show() {
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      }
    },
    components: {
      ratingselect
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .food
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    width 100%
    background #fff
    transform translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .image-header
      position relative
      width 100%
      height 0;
      padding-top 100%;
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        top 10px
        left 0px
        .icon-arrow_lift
          display block
          padding 10px
          font-size 20px
          color #fff

    .content
      position relative
      padding 18px
      .title
        font-size 14px
        font-weight 700
        line-height 14px
        margin-bottom 8px
        color #07111b
      .datail
        margin-bottom 18px;
        line-height 10px;
        height 10px;
        font-size 0;
        .sell-count, .rating
          font-size 10px
          color #93999f
        .sell-count
          margin-right 12px;
      .price
        font-weight 700
        line-height 24px
        .new
          margin-right 8px
          font-size 14px
          color #f01414
        .old
          text-decoration line-through
          font-size 10px
          color #93999f
      .buy
        position absolute
        right 18px
        bottom 18px
        z-index 10
        height 24px
        line-height 24px
        padding 0 12px
        box-sizing border-box
        border-radius 12px
        font-size 10px
        color #fff
        background #00a0dc
        opacity 1
    .split
      width 100%
      height 16px
      border-top 1px solid rgba(7,17,27,0.1)
      border-bottom 1px solid rgba(7,17,27,0.1)
      background #f3f5f7
    .info
      padding 18px
      .title
        line-height 14px
        margin-bottom 6px
        font-size 14px
        color #07111b
      .text
        line-height 24px
        padding 0 8px
        font-size 12px
        color #4d555d
    .rating
      padding-top: 18px
      .title
        line-height 14px
        margin-left 18px
        font-size 14px
        color #07111b


</style>
