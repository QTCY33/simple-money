<template>
  <svg>
    <use :xlink:href="'#' + name" />
  </svg>
</template>

<script lang="ts">
let importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context("../assets/icons", true, /\.svg$/));
} catch {
  console.log(Error);
}
export default {
  props: ["name"],
  name: "Icon",
};
</script>

<style lang="scss" scoped>
</style>