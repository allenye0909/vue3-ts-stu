<!--
 * @Description: 多屏组件
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-12-07 15:31:24
 * @LastEditTime: 2020-12-14 10:42:23
-->
<template>
  <div id="multi-viewer-container" ref="container">
    <panorama-viewer
      :ref="
        (el) => {
          if (el) refMultiViewer[index] = el;
        }
      "
      :class="`viewer${index + 1}`"
      :style="`grid-area:viewer${index + 1}`"
      v-for="(item, index) in viewerTitleArray"
      :key="index"
      @zoomUpdated="handelZoomUpdated"
      @positionUpdated="handelPositionUpdated"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onBeforeUpdate,
  ref,
  unref,
  nextTick,
} from "vue";
export default defineComponent({
  name: "MultiPanoramaViewer",
  props: {
    viewerTitleArray: Array,
  },
  setup() {
    const {
      refMultiViewer,
      handelResize,
      handelMultiSetPanorama,
      handelZoomUpdated,
      handelPositionUpdated,
    } = handelViewers();
    onMounted(() => {
      console.log(refMultiViewer);
    });
    onBeforeUpdate(() => {
      refMultiViewer.value = [];
    });
    return {
      refMultiViewer,
      handelResize,
      handelMultiSetPanorama,
      handelZoomUpdated,
      handelPositionUpdated,
    };
  },
});
function handelViewers() {
  const refMultiViewer = ref([]);
  function handelResize() {
    let viewer: any;
    for (viewer of refMultiViewer.value) {
      const random = 100;
      viewer.refSingleViewer.photoSphereViewer.resize({
        width: `${random}%`,
        height: `${random}%`,
      });
    }
  }

  function handelMultiSetPanorama(multiViewerData: any) {
    for (var i = 0; i < refMultiViewer.value.length; i++) {
      let viewer: any = refMultiViewer.value[i];
      viewer.refSingleViewer.photoSphereViewer.setPanorama(
        multiViewerData[i].path,
        multiViewerData[i].options
      );
    }
  }

  function handelZoomUpdated(zoomLevel: number, id: string | number) {
    console.log(zoomLevel, id);
  }

  function handelPositionUpdated() {
    console.log(">>>>");
  }

  return {
    refMultiViewer,
    handelResize,
    handelMultiSetPanorama,
    handelZoomUpdated,
    handelPositionUpdated,
  };
}
</script>

<style>
#multi-viewer-container {
  display: grid;
  height: 100%;
  width: 100%;
}
</style>
