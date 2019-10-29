<template>
  <span class="bubble">
    {{ num }}
  </span>
</template>

<script>
  export default {
    name: 'bubble',
    props: {
      num: {
        type: Number
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bubble {
    background: linear-gradient(to right,#fc9153,#f01414);
    border-radius: 16px;
    color: #fff;
    display: inline-block;
    font-family: Helvetica;
    font-size: 10px;
    font-weight: 700;
    height: 16px;
    line-height: 16px;
    padding: 0 5px;
    text-align: center;
  }    
</style>
