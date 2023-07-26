<template>
  <div>
    <virtual-list
      style="height: 400px; overflow-y: auto"
      scrollable
      :data-key="'id'"
      :data-sources="items"
      :data-component="itemComponent"
    />
  </div>
</template>
<script>
import Item from "./moreitemv.vue";
import VirtualList from "vue-virtual-scroll-list";
function createData(len) {
  const arr = [];
  for (let index = 0; index < len; index++) {
    const obj = { id: index, text: Math.random() };
    arr.push(obj);
  }
  return arr;
}
export default {
  data() {
    return {
      itemComponent: Item,
      items: createData(200),
    };
  },
  components: { "virtual-list": VirtualList },
  mounted() {},
  methods: {},
};
</script>
<style scoped >
</style>