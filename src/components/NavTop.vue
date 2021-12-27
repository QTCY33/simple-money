<template>
  <div class="nav-top"><slot /></div>
</template>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.nav-top {
  min-height: 50px;
  padding: 18px;
  padding-left: 20px;
  font-family: $font-hei;
  font-size: 30px;
  color: rgb(88, 79, 79);
}
</style>
