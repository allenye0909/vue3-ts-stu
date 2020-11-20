<template>
  <div>
    <div class="sidebar">xxx</div>
    <iframe src="./vue3.html" frameborder="0"></iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
iframe {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
