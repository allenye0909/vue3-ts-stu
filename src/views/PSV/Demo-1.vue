<!--
 * @Description: 单屏组件
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-23 09:53:40
 * @LastEditTime: 2020-12-14 14:26:26
-->
<template>
  <div class="single-view-container" style="position: relative;">
    <div id="viewer" ref="refViewer"></div>
  </div>
</template>

<script lang="ts">
/// <reference path="../../../declaration.d.ts" />
import { Viewer } from "photo-sphere-viewer";
import MarkersPlugins from "photo-sphere-viewer/dist/plugins/markers";

import { setID } from "../../utils/psv";
import { defineComponent, onMounted, ref, toRefs, reactive, App } from "vue";

import { addMarker, initViewerEvent } from "./demo-1";
import { AddMarkerOpts } from "./type.d";

export default defineComponent({
  setup(props, { emit }) {
    let viewer: any;
    let refViewer = ref(null);
    const data = reactive({});

    function handelAddMarker({
      id,
      latitude,
      longitude,
      tooltip,
    }: AddMarkerOpts): void {
      addMarker(
        { id, latitude, longitude, tooltip },
        viewer.getPlugin(MarkersPlugins)
      );
    }

    function initViewer() {
      const config = {
        container: refViewer.value,
        panorama:
          "https://i.carimg.com//zf/0/290/043/597/000/1597043290/15970432906ABYwo.jpg",
        plugins: [[MarkersPlugins]],
      };

      viewer = new Viewer(config);
      viewer._id = setID();
      // console.log(viewer);
      initViewerEvent(props, emit, viewer);
    }

    onMounted(() => {
      initViewer();
    });

    return {
      refViewer,
      ...toRefs(data),
      handelAddMarker,
    };
  },
});
</script>

<style lang="scss">
@import "~photo-sphere-viewer/dist/photo-sphere-viewer.css";
@import "~photo-sphere-viewer/dist/plugins/markers.css";
.single-view-container {
  height: 100%;
  width: 100%;
  #viewer {
    height: 100%;
    width: 100%;
    .psv-navbar {
      bottom: -40px !important;
    }
  }
}
</style>
