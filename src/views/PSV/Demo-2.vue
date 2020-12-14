<!--
 * @Description: psv-demo
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-23 09:53:40
 * @LastEditTime: 2020-12-14 14:32:57
-->
<template>
  <div id="multi-viewer-container">
    <Demo1
      :ref="funcViewers"
      v-for="(item, index) in this.viewerTitleArray"
      :key="item.name"
      :class="`viewer${index + 1}`"
      :style="`grid-area:viewer${index + 1}`"
      @positionUpdated="positionUpdated"
      @zoomUpdated="zoomUpdated"
      @handleDblClick="handleDblClick"
      @handleClick="handleClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUpdate, ref, nextTick } from "vue";
import Demo1 from "./Demo-1.vue";

let refViewers: any[] = [];

export default defineComponent({
  props: {
    viewerTitleArray: Array,
  },
  components: {
    Demo1,
  },
  setup(props: Object, context: Object) {
    let funcViewers = (el: Element): void => {
      if (el) {
        // console.log(el);
        // refViewers.push(el.$.refs);
        refViewers.push(el);
      }
    };
    const {
      positionUpdated,
      zoomUpdated,
      handleDblClick,
      handleClick,
    } = watchEvent(props, context, refViewers);
    // onBeforeUpdate(() => {});
    // onMounted(() => {});

    return {
      zoomUpdated,
      positionUpdated,
      handleDblClick,
      handleClick,
      funcViewers,
      refViewers,
    };
  },
});
interface Position {
  latitude: number;
  longitude: number;
}
const watchEvent = function(props: any, context: any, viewers: any): any {
  function positionUpdated(position: Position, id: string): void {
    for (const viewer of viewers) {
      if (!viewer.refViewer) return;
      if (viewer.refViewer.photoSphereViewer._id !== id) {
        // console.log(viewer.refViewer.photoSphereViewer);
        viewer.refViewer.photoSphereViewer.rotate(position);
      }
    }
  }
  function zoomUpdated(zoomLevel: number, id: string): void {
    for (const viewer of viewers) {
      if (!viewer.refViewer) return;
      if (viewer.refViewer.photoSphereViewer._id !== id) {
        // console.log(viewer.refViewer.photoSphereViewer);
        viewer.refViewer.photoSphereViewer.zoom(zoomLevel);
      }
    }
  }
  function handleDblClick(target: any): void {
    // console.log(
    //   viewers[2].refViewer.photoSphereViewer.getPlugin(MarkersPlugins)
    // );
    context.emit("handleDblClick", target);
  }

  function handleClick(target: any): void {
    // console.log(
    //   viewers[2].refViewer.photoSphereViewer.getPlugin(MarkersPlugins)
    // );
    context.emit("handleClick", target);
  }
  return {
    positionUpdated,
    zoomUpdated,
    handleDblClick,
    handleClick,
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
