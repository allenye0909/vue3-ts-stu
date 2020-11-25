<!--
 * @Description: psv-demo
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-23 09:53:40
 * @LastEditTime: 2020-11-25 15:14:44
-->
<template>
  <div id="multi-viewer-container">
    <Demo1
      :ref="viewers"
      v-for="(item, index) in this.viewerTitleArray"
      :key="item.name"
      :class="`viewer${index + 1}`"
      :style="`grid-area:viewer${index + 1}`"
      @positionUpdated="positionUpdated"
      @zoomUpdated="zoomUpdated"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUpdate, ref, nextTick } from "vue";
import Demo1 from "./Demo-1.vue";
export default defineComponent({
  props: {
    viewerTitleArray: Array,
  },
  components: {
    Demo1,
  },
  setup(props, context) {
    let Refs: any[] = [];
    let viewers = (el: any): void => {
      if (el) {
        // console.log(el);
        // Refs.push(el.$.refs);
        Refs.push(el);
      }
    };
    const { positionUpdated, zoomUpdated } = watchEvent(Refs);
    // onBeforeUpdate(() => {});
    // onMounted(() => {});

    return {
      zoomUpdated,
      positionUpdated,
      viewers,
      Refs,
    };
  },
});

const watchEvent = function(viewers: any): any {
  function positionUpdated(position: any, id: string): void {
    for (const viewer of viewers) {
      if (viewer.refViewer.photoSphereViewer._id !== id) {
        // console.log(viewer.refViewer.photoSphereViewer);
        viewer.refViewer.photoSphereViewer.rotate(position);
      }
    }
  }
  function zoomUpdated(zoomLevel: number, id: string): void {
    for (const viewer of viewers) {
      if (viewer.refViewer.photoSphereViewer._id !== id) {
        // console.log(viewer.refViewer.photoSphereViewer);
        viewer.refViewer.photoSphereViewer.zoom(zoomLevel);
      }
    }
  }
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
