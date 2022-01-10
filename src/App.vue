<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/helper.scss";
@import "~@/assets/style/reset.scss";
body {
  font-family: $font-hei;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: rgb(247, 246, 238);
  font-size: 16px;
}
  #app {
    max-width: 500px;
    margin: 0 auto;
  }

</style>
