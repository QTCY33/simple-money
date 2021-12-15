<template>
  <Layout class-prefix="layout">
    <NumberPad />
    <Types />
    <Tags />
    <Notes />
  </Layout>
</template>

<script>
import NumberPad from "@/components/Money/NumberPad.vue";
import Tags from "@/components/Money/Tags.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
export default {
  components: { NumberPad, Tags, Notes, Types },
  name: "Money",
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
<style lang="scss" scoped>
</style>