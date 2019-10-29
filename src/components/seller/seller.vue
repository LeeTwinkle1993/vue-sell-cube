<template>
  <cube-scroll class="seller" :options="sellerScrollOptions">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-bottom-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <i class="cubeic-like icon-favorite" :class="{'active':favorite}"></i>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-bottom-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li
            class="support-item border-bottom-1px"
            v-for="(item,index) in seller.supports"
            :key="index"
          >
            <support-ico :size=4 :type="seller.supports[index].type"></support-ico>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <cube-scroll class="pic-wrapper" :options="picScrollOptions">
          <ul class="pic-list">
            <li class="pic-item"
                v-for="(pic,index) in seller.pics"
                :key="index"
            >
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </cube-scroll>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-bottom-1px">商家信息</h1>
        <ul>
          <li
            class="info-item border-bottom-1px"
            v-for="(info,index) in seller.infos"
            :key="index"
          >
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </cube-scroll>
</template>

<script>
  import { saveToLocal, loadFromLocal } from 'common/js/storage'
  import Star from 'components/star/star'
  import Split from 'components/split/split'
  import SupportIco from 'components/support-ico/support-ico'

  export default {
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        favorite: false,
        sellerScrollOptions: {
          directionLockThreshold: 0,
          click: false
        },
        picScrollOptions: {
          scrollX: true,
          stopPropagation: true,
          directionLockThreshold: 0
        }
      }
    },
    computed: {
      seller() {
          return this.data.seller || {}
      },
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    created () {
      this.favorite = loadFromLocal('favorite', false)
    },
    methods: {
      toggleFavorite() {
        this.favorite = !this.favorite
        saveToLocal('favorite', this.favorite)
      }
    },
    components: {
      SupportIco,
      Star,
      Split
    }
  }
</script>

<style lang="scss" scoped>
  @import 'scss/mixin.scss';

  .seller {
    height: 100%;
    text-align: left;
    .overview {
      position: relative;
      padding: 18px;
      .title {
        color: #333;
        font-size: 14px;
        line-height: 14px;
        margin-bottom: 8px;
      }
      .desc {
        display: flex;
        align-items: center;
        padding-bottom: 18px;
        .star {margin-right: 8px}
        .text {
          color: #666;
          font-size: 10px;
          line-height: 18px;
          margin-right: 12px;
        }
      }
      .remark {
        display: flex;
        padding-top: 18px;
        .block {
          flex: 1;
          text-align: center;
          border-right: 1px solid #d9dde1;
          &:last-child {border: none;}
          h2 {
            color: #999;
            font-size: 10px;
            line-height: 10px;
            margin-bottom: 4px;
          }
          .content {
            color: #333;
            font-size: 10px;
            line-height: 24px;
            .stress {font-size: 24px}
          }
        }
      }
      .favorite {
        position: absolute;
        width: 50px;
        right: 11px;
        top: 18px;
        text-align: center;
        .icon-favorite {
          color: #ccc;
          display: block;
          font-size: 24px;
          line-height: 24px;
          margin-bottom: 4px;
          &.active {color: #f01414;}
        }
        .text {
          color: #666;
          font-size: 10px;
          line-height: 10px;
        }
      }
    }
    .bulletin {
      padding: 18px 18px 0 18px;
      white-space: normal;
      .title {
        color: #333;
        font-size: 14px;
        line-height: 14px;
        margin-bottom: 8px;
      }
      .content-wrapper {
        padding: 0 12px 16px 12px;
        .content {
          color: #f01414;
          font-size: 12px;
          line-height: 24px;
        }
      }
      .supports {
        .support-item {
          display: flex;
          align-items: center;
          padding: 16px 12px;
          &:last-child {@include border-none()}
          .support-ico { margin-right: 6px}
          .text {
            color: #333;
            font-size: 12px;
            line-height: 16px;
          }
        }
      }
    }  
    .pics {
      padding: 18px;
      .title {
        color: #333;
        font-size: 14px;
        line-height: 14px;
        margin-bottom: 12px;
      }
      .pic-wrapper {
        display: flex;
        align-items: center;
        .pic-list {
          .pic-item {
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;
            &:last-child {border: 0;}
          }
        }
      }
    }
    .info {
      color: #333;
      padding: 18px 18px 0;
      .title {
        font-size: 12px;
        line-height: 16px;
        padding: 16px 12px;
      }
      .info-item {
        padding: 16px 12px;
        line-height: 16px;
        font-size: 12px;
        &:last-child {@include border-none ()}
      }
    }
  }

</style>
