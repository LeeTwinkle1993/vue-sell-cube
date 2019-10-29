<template>
  <cube-scroll ref="scroll" class="ratings" :options="scrollOptions">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select
        @select="onSelect"
        @toggle="onToggle"
        :selectType="selectType"
        :onlyContent="onlyContent"
        :ratings="ratings"
      >
      </rating-select>
      <div class="rating-wrapper">
        <ul>
          <li
            v-for="(rating,index) in computedRatings"
            :key="index"
            class="rating-item border-bottom-1px"
          >
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <i class="cubeic-good"></i>
                <span
                  class="item"
                  v-for="(item,index) in rating.recommend"
                  :key="index"
                >
                  {{item}}
                </span>
              </div>
              <div class="time">
                {{rating.rateTime | format}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </cube-scroll>
</template>

<script>
  import Star from 'components/star/star'
  import RatingSelect from 'components/rating-select/rating-select'
  import Split from 'components/split/split'
  import ratingMixin from 'common/mixins/rating'
  import { getRatings } from 'api'
  import { format } from 'common/js/filters'

  export default {
    name: 'ratings',
    mixins: [ratingMixin],
    props: {
      data: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        ratings: [],
        scrollOptions: {
          click: false,
          directionLockThreshold: 0
        }
      }
    },
    watch: {
      selectType () {
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      }
    },
    computed: {
      seller () {
        return this.data.seller || {}
      }
    },
    filters: {
      format
    },
    methods: {
      fetch () {
        if (!this.fetched) {
          this.fetched = true
          getRatings({
            id: this.seller.id
          }).then((ratings) => {
            this.ratings = ratings
          })
        }
      },
    },
    components: {
      Star,
      Split,
      RatingSelect
    },
  }
</script>

<style lang="scss" scoped>
  @import 'scss/mixin.scss';
  .ratings {
    position: relative;
    text-align: left;
    white-space: normal;
    height: 100%;
    .overview {
      display: flex;
      padding: 18px 0;
      .overview-left {
        flex: 0 0 137px;
        padding: 6px 0;
        width: 137px;
        border-right: 1px solid #d9dde1;
        text-align: center;
        @media only screen and (max-width: 320px) {
          flex: 0 0 120px;
          width: 120px;
        }
        .score {
          color: #fc9153;
          font-size: 24px;
          line-height: 28px;
          margin-bottom: 6px;
        }
        .title {
          margin-bottom: 8px;
          line-height: 12px;
          font-size: 12px;
          color: #333;
        }
        .rank {
          line-height: 10px;
          font-size: 10px;
          color: #999;
        }
      }
      .overview-right {
        flex: 1;
        padding: 6px 0 6px 24px;
        @media only screen and (max-width: 320px) {padding-left: 6px}
        .score-wrapper {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          .title {
            line-height: 18px;
            font-size: 12px;
            color: #333;
          }
          .star {margin: 0 12px}
          .score {
            line-height: 18px;
            color: #fc9153;
            font-size: 12px;
          }
        }
      }
      .delivery-wrapper {
        display: flex;
        align-items: center;
        .title {
          line-height: 18px;
          font-size: 12px;
          color: #333;
        }
        .delivery {
          margin-left: 12px;
          font-size: 10px;
          color: #333;
        }
      }
    }
    .rating-wrapper {
      padding: 0 18px;
      .rating-item {
        display: flex;
        padding: 18px 0;
        &:last-child {@include border-none();}
        .avatar {
          flex: 0 0 28px;
          width: 28px;
          margin-right: 12px;
          img {height: auto;border-radius: 50%;}
        }
        .content {
          position: relative;
          flex: 1;
          .name {
            color: #333;
            font-size: 10px;
            line-height: 12px;
            margin-bottom: 4px;
          }
          .star-wrapper {
            margin-bottom: 6px;
            display: flex;
            align-items: center;
            .star {margin-right: 6px}
            .delivery {
              color: #999;
              font-size: 10px;
            }
          }
          .text {
            color: #333;
            font-size: 12px;
            line-height: 18px;
            margin-bottom: 8px;
          }
          .recommend {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            line-height: 16px;
            .cubeic-good {
              margin: 0 8px 4px 0;
              font-size: 10px;
              color: #00a0dc;
            }
            .item {
              margin: 0 8px 4px 0;
              font-size: 10px;
              background: #fff;
              border: 1px solid rgba(7,17,27,.1);
              border-radius: 1px;
              color: #999;
              padding: 0 6px;
            }
          }
          .time {
            color: #999;
            font-size: 12px;
            line-height: 12px;
            position: absolute;
            right: 0;
            top: 0;
          }
        }
      }
    }
  }
</style>
