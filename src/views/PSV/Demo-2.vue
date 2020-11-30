<!--
 * @Description: psv-demo
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-23 09:53:40
 * @LastEditTime: 2020-11-27 13:36:24
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
      @handleDblClick="handleDblClick"
      @handleClick="handleClick"
    />
  </div>
</template>

<script lang="ts">
// /// <reference path="../../../declaration.d.ts" />
// // import { Viewer } from "photo-sphere-viewer";
// import MarkersPlugins from "photo-sphere-viewer/dist/plugins/markers";
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
    const {
      positionUpdated,
      zoomUpdated,
      handleDblClick,
      handleClick,
    } = watchEvent(props, context, Refs);
    // onBeforeUpdate(() => {});
    // onMounted(() => {});

    return {
      zoomUpdated,
      positionUpdated,
      handleDblClick,
      handleClick,
      viewers,
      Refs,
    };
  },
});

const watchEvent = function(props: any, context: any, viewers: any): any {
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
      if (!viewer.refViewer) return;
      if (viewer.refViewer.photoSphereViewer._id !== id) {
        // console.log(viewer.refViewer.photoSphereViewer);
        viewer.refViewer.photoSphereViewer.zoom(zoomLevel);
      }
    }
  }
  function handleDblClick(target: any, MarkersPlugins: Event): void {
    // console.log(
    //   viewers[2].refViewer.photoSphereViewer.getPlugin(MarkersPlugins)
    // );
    context.emit("handleDblClick", target, MarkersPlugins);
  }

  function handleClick(target: any, MarkersPlugins: Event): void {
    // console.log(
    //   viewers[2].refViewer.photoSphereViewer.getPlugin(MarkersPlugins)
    // );
    context.emit("handleClick", target, MarkersPlugins);
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
