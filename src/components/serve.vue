<template>
  <div style="height:300px">
    <div @click="toclicktext()">'11111'</div>
  </div>
</template>;
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    toclicktext() {
      fetch("http://localhost:3000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: "你好" }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    },
  },
};
</script>
<style scoped >
</style>