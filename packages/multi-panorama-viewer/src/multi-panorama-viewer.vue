<!--
 * @Description: 多屏组件
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-12-07 15:31:24
 * @LastEditTime: 2020-12-11 10:36:44
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
    const { refMultiViewer, handelResize } = handelViewers();
    onMounted(() => {});
    onBeforeUpdate(() => {
      refMultiViewer.value = [];
    });
    return {
      refMultiViewer,
      handelResize,
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

  return {
    refMultiViewer,
    handelResize,
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
