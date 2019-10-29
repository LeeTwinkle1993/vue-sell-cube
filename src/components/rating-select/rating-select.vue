<template>
  <div class="rating-select">
    <div class="rating-type border-bottom-1px">
      <span @click="select(2)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span
        class="count">{{ratings.length}}</span></span>
      <span @click="select(0)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span
        class="count">{{positives.length}}</span></span>
      <span @click="select(1)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span
        class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
      <i class="cubeic-right"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2

  const EVENT_TOGGLE = 'toggle'
  const EVENT_SELECT = 'select'

  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    },
    methods: {
      select(type) {
        this.$emit(EVENT_SELECT, type)
      },
      toggleContent() {
        this.$emit(EVENT_TOGGLE)
      }
    }
  }
</script>

<style lang="scss">
  @import 'scss/icon.scss';

  .rating-select {
    .rating-type {
      padding: 18px 0;
      margin: 0 18px;
      .block {
        border-radius: 1px;
        color: #666;
        display: inline-block;
        font-size: 12px;
        line-height: 16px;
        margin-right: 8px;
        padding: 8px 12px;
         &.active {color: #fff;}
         .count {margin-left: 2px}
         &.positive {
           background: rgba(0,160,220,.2);
           &.active {background: #00a0dc;}
         }
         &.negative {
           background: #ccc;
           &.active {background: #00a0dc;}
         }
      }
    }
    .switch {
      display: flex;
      align-items: center;
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7,17,27,.1);
      color: #999;
      &.on {color: #00b43c}
      .cubeic-right {    
        font-size: 20px;
        margin-right: 4px;
      }
      .text {font-size: 12px}
    }
  }
</style>
