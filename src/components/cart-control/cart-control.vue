<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop="decrease">
        <span class="inner cubeic-remove"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add cubeic-add" @click.stop="add"></div>
  </div>
</template>

<script>
  const EVENT_ADD = 'add'

  export default {
    name: 'cart-control',
    props: {
      food: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      add(event) {
        if (!this.food.count) {
          this.$set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        this.$emit(EVENT_ADD, event.target)
      },
      decrease() {
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cartcontrol {
    display: flex;
    align-items: center;
    .cart-decrease {
      display: inline-block;
      padding: 6px;
      opacity: 1;
      .inner {
        color: #00a0dc;
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
        transform: rotate(0);
      }
      &.move-enter-active, &.move-leave-active {transition: all 0.4s linear}  
      &.move-enter, &.move-leave-active {
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        .inner {transform: rotate(180deg)}
      }
    }        
    .cart-count {
      color: #666;
      font-size: 10px;
      line-height: 24px;
      text-align: center;
      width: 12px;
    }
    .cart-add {
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: #00a0dc;
    }
  }
</style>
