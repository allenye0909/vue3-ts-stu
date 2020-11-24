<!--
 * @Description: psv-demo
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-23 09:53:40
 * @LastEditTime: 2020-11-24 11:10:08
-->
<template>
  <div id="multi-viewer-container">
    <Demo1
      ref="viewers"
      v-for="(item, index) in this.viewerTitleArray"
      :key="item.name"
      :class="`viewer${index + 1}`"
      :style="`grid-area:viewer${index + 1}`"
      @position-updated="positionUpdated"
      @zoomUpdated="zoomUpdated"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Demo1 from "./Demo-1.vue";
export default defineComponent({
  props: {
    viewerTitleArray: Array,
  },
  components: {
    Demo1,
  },
  setup(props, context) {
    const { positionUpdated, zoomUpdated } = watchEvent();
    const viewers = ref(null);

    onMounted(() => {
      console.log(viewers);
    });

    return {
      zoomUpdated,
      positionUpdated,
      viewers,
    };
  },
});

const watchEvent = function(): any {
  function positionUpdated(v: any): void {}
  function zoomUpdated(v: number): void {}
  return {
    positionUpdated,
    zoomUpdated,
  };
};
</script>

<style lang="scss">
#multi-viewer-container {
  width: 100vw;
  height: 100vh;
  display: grid;
}
</style>
