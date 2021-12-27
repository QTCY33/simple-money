<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected"
      ><Icon name="money"
    /></router-link>
    <router-link to="/labels" class="item" active-class="selected"
      ><Icon name="label"
    /></router-link>
    <router-link to="/statistics" class="item" active-class="selected"
      ><Icon name="statistics"
    /></router-link>
  </nav>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav {
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  background: #3f3a3a;
  color: rgb(255, 255, 255);
  > .item {
    padding: 5px 0;
    width: 33.333333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon {
      margin: 7px;
      width: 32px;
      height: 32px;
    }
  }
  .item.selected {
    color: rgb(141, 126, 126);
  }
}
</style>
