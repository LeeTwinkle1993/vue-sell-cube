<template>
  <transition
    name="move"
    @after-leave="afterLeave"
  >
    <div class="food" v-show="visible">
      <cube-scroll ref="scroll">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image">
            <div class="back" @click="hide">
              <i class="icon-arrow_lift cubeic-back"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="cart-control-wrapper">
              <cart-control @add="addFood" :food="food"></cart-control>
            </div>
            <transition name="fade">
              <div @click="addFirst" class="buy" v-show="!food.count">
                加入购物车
              </div>
            </transition>
          </div>
          <split v-show="food.info"></split>
          <div class="info" v-show="food.info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <split></split>
          <div class="rating">
            <h1 class="title">商品评价</h1>
            <rating-select
              @select="onSelect"
              @toggle="onToggle"
              :selectType="selectType"
              :onlyContent="onlyContent"
              :desc="desc"
              :ratings="ratings">
            </rating-select>
            <div class="rating-wrapper">
              <ul v-show="computedRatings && computedRatings.length">
                <li
                  v-for="(rating,index) in computedRatings"
                  class="rating-item border-bottom-1px"
                  :key="index"
                >
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img class="avatar" width="12" height="12" :src="rating.avatar">
                  </div>
                  <div class="time">{{rating.rateTime | format}}</div>
                  <p class="text">
                    <i :class="{'icon-thumb_up cubeic-good':rating.rateType===0,'icon-thumb_down cubeic-bad':rating.rateType===1}"></i>{{rating.text}}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!computedRatings || !computedRatings.length">暂无评价</div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import CartControl from 'components/cart-control/cart-control'
  import RatingSelect from 'components/rating-select/rating-select'
  import Split from 'components/split/split'
  import ratingMixin from 'common/mixins/rating'
  import popupMixin from 'common/mixins/popup'
  import {format} from 'common/js/filters'

  const EVENT_SHOW = 'show'
  const EVENT_ADD = 'add'
  const EVENT_LEAVE = 'leave'

  export default {
    name: 'product-details',
    mixins: [ratingMixin, popupMixin],
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    filters: {
      format
    },
    computed: {
      ratings() {
        return this.food.ratings
      }
    },
    created() {
      this.$on(EVENT_SHOW, () => {
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      })
    },
    methods: {
      afterLeave() {
        this.$emit(EVENT_LEAVE)
      },
      addFirst(event) {
        this.$set(this.food, 'count', 1)
        this.$emit(EVENT_ADD, event.target)
      },
      addFood(target) {
        this.$emit(EVENT_ADD, target)
      },
    },
    components: {
      CartControl,
      RatingSelect,
      Split
    }
  }
</script>

<style lang="scss" scoped>
  @import 'scss/icon.scss';
  @import 'scss/mixin.scss';
  .food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #fff;
    &.move-enter-active, &.move-leave-active {transition: all 0.3s linear;}
    &.move-enter, &.move-leave-active {transform: translate3d(100%, 0, 0)}
    .image-header {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .back {
        position: absolute;
        top: 10px;
        left: 0;
        .icon-arrow_lift {
          display: block;
          padding: 5px;
          color: #fff;
          font-size: 24px;
        }
      }
    }
    .content {
      position: relative;
      padding: 18px;
      .title {
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 10px;
        font-weight: 700;
        color: #333;
      }
      .detail {
        height: 10px;
        line-height: 10px;
        margin-bottom: 18px;
        .sell-count, .rating {
          font-size: 10px;
          color: #999;
        }
        .sell-count {margin-right: 12px;}
      }
      .price {
        line-height: 24px;
        font-weight: 700;
        .now {
          margin-right: 8px;
          font-size: 14px;
          color: #f01414;
        }
        .old {
          text-decoration: line-through;
          color: #999;
          font-size: 10px;
        }
      }
      .cart-control-wrapper {
        position: absolute;
        right: 12px;
        bottom: 12px;
      }
      .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10;
        height: 24px;
        line-height: 24px;
        padding: 0 12px;
        box-sizing: border-box;
        border-radius: 12px;
        font-size: 10px;
        color: #fff;
        background: #00a0dc;
        opacity: 1;
        &.fade-enter-active, &.fade-leave-active {transition: all 0.3s}
        &.fade-enter, &.fade-leave-active {
          opacity: 0;
          z-index: -1;
        }
      }
    }
    .info {
      padding: 18px;
      .title {
        color: #333;
        font-size: 14px;
        line-height: 14px;
        margin-bottom: 6px;
      }
      .text {
        color: #666;
        font-size: 12px;
        line-height: 24px;
        padding: 0 8px;
      }
    }
    .rating {
      padding: 18px;
      .title {
        color: #333;
        font-size: 14px;
        line-height: 14px;
        margin-bottom: 6px;
      }
      .rating-wrapper {
        padding: 0 18px;
        .rating-item {
          position: relative;
          padding: 16px 0;
          &:last-child {@include border-none()}
          .user {
            position: absolute;
            right: 0;
            top: 16px;
            display: flex;
            align-items: center;
            line-height: 12px;
            .name {
              color: #999;
              font-size: 10px;
              margin-right: 6px;
            }
            .avatar {border-radius: 50%;}
          }
          .time {
            color: #999;
            font-size: 10px;
            line-height: 12px;
            margin-bottom: 6px;
          }
          .text {
            color: #333;
            font-size: 12px;
            line-height: 16px;
            .icon-thumb_up, .icon-thumb_down {
              margin-right: 4px;
              line-height: 16px;
              font-size: 12px;
            }
            .icon-thumb_up {color: #00a0dc;}
            .icon-thumb_down {color: #999}
          }
        }
        .no-rating {
          color: #999;
          font-size: 12px;
          padding: 16px 0;
        }
      }
    }
  }
</style>
