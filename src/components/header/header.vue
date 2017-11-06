<template>
  <div class="header" @click="showDetail">
    <div class="content-wrapper" >
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}
        </div>

        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">
            {{seller.supports[0].description}}
          </span>
        </div>

        <div class="support-count" v-if="seller.supports">
          <span>{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>

    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="detail-name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <span class="line"></span>
            <span class="text">优惠信息</span>
            <span class="line"></span>
          </div>
          <ul class="supports">
            <li class="support-item" v-for="item in seller.supports">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <span class="line"></span>
            <span class="text">商家公告</span>
            <span class="line"></span>
          </div>
          <p class="content">{{seller.bulletin}}</p>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>
<script>
  import star from '../../components/star/star';
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
        event.cancelBubble = true;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      star
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    position relative
    overflow hidden
    color #fff
    background rgba(7, 17, 27, 0.5)
    .content-wrapper
      position relative
      padding 24px 12px 18px 24px
      font-size 0
      .avatar
        display inline-block
        vertical-align top
        img
          border-radius: 2px
      .content
        display inline-block
        margin-left 16px
        .title
          margin 2px 0 8px 0
          .brand
            display inline-block
            vertical-align top
            width 30px
            height 18px
            bg-image('brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            margin-left 6px
            font-size 16px
            line-height: 18px
            font-weight: bold
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .support
          .support-icon
            width 16px
            height 16px
          .icon
            display inline-block
            vertical-align top
            width 12px
            height 12px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height 12px
            font-size 10px
            margin-left 4px
        .support-count
          position absolute
          right 12px
          bottom 18px
          height 24px
          line-height 24px
          font-size 10px
          font-weight 200
          background rgba(0, 0, 0, 0.2)
          border-radius 14px
          padding: 0 8px
          .icon-keyboard_arrow_right
            margin-left 2px
            line-height 24px
            font-size 10px

    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      background rgba(7, 17, 27, 0.2)
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      .bulletin-title
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
        display inline-block
        vertical-align: top
        width 22px
        height 12px
        margin-top 8px
      .bulletin-text
        font-size 10px
        vertical-align: top
        margin 0 4px
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 12px
        top: 8px
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .detail
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      z-index 100
      overflow auto
      background rgba(7, 17, 27, 0.7)
      backdrop-filter blur(10px)
      opacity 1
      .detail-wrapper
        width 100%
        min-height 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .detail-name
            text-align center
            font-weight 700
            font-size 16px
            line-height 16px
          .star-wrapper
            margin-top: 18px
            padding: 2px 0
            text-align: center
          .title
            position relative
            display inline-block
            text-align center
            width 100%
            margin 28px 0px 24px 0px
            .line
              display inline-block
              width 112px
              height 1px
              background rgba(255, 255, 255, 0.2)
              top -5px
              position relative
              margin 0 12px
          .supports
            width: 80%
            margin: 0 auto
            .support-item
              width 80%
              margin 0 auto
              font-size 0
              margin-bottom 12px
              padding 0 12px
              height 16px
              line-height 16px
              &:last-child
                margin-bottom: 0
              .icon
                display inline-block
                width 16px
                height 16px
                background-size 16px 16px
                background-repeat no-repeat
                vertical-align: top
                margin-right 6px
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                height 16px
                font-size 12px

          .content
            width calc(80% - 24px)
            margin 0 auto
            line-height: 24px;
            font-size: 12px;
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both
        font-size: 32px

</style>
