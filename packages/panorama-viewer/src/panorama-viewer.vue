<!--
 * @Description: 单屏组件
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-12-07 15:31:24
 * @LastEditTime: 2020-12-14 15:05:58
-->
<template>
  <div class="single-view-container" style="position: relative;">
    <div ref="refSingleViewer" class="viewerContainer"></div>
    <!-- <TitleLabel
      ref="titleLabel"
      v-if="visible"
      class="title-label"
      :label="titleLabelInfo.name"
      :isPc="titleLabelInfo.isPc"
      :style="titleLabelStyle"
      :maxZoomLevel="maxZoomLevel"
      @fullscreenToggle="fullscreenToggle"
      v-bind="$attrs"
    />
    <SetAngle v-if="isCoverShow" /> -->
  </div>
</template>

<script lang="ts">
import { Viewer } from "photo-sphere-viewer";
import MarkersPlugins from "photo-sphere-viewer/dist/plugins/markers";
import { defineComponent, onMounted, onBeforeUpdate, ref, unref } from "vue";
import { setID } from "@/utils/psv";
let viewer: any;
type EmitType = (event: string, ...args: any[]) => void;

export default defineComponent({
  name: "panorama-viewer",
  setup(props, { emit }) {
    let refSingleViewer = ref(null);
    viewer = ref(null);

    const { handelResizeViewer, setPanorama } = handelViewer();

    const { addMarker } = handelMarker();

    onMounted(async () => {
      initViewer(props, emit, refSingleViewer);
      initMarkerEvent(emit);
    });

    onBeforeUpdate(() => {
      console.log("onBeforeUpdate");
    });

    return {
      refSingleViewer,
      setPanorama,
      addMarker,
      handelResizeViewer,
    };
  },
});

function initViewer(props: any, emit: EmitType, refSingleViewer: any): void {
  const config = {
    container: refSingleViewer.value,
    plugins: [[MarkersPlugins]],
    // panorama:
    //   "https://i.carimg.com//zf/0/290/043/597/000/1597043290/15970432906ABYwo.jpg",
  };
  viewer = new Viewer(config);
  viewer._id = setID();
  // TODO:
  //   只能在这调用initViewerEvent
  initViewerEvent(props, emit, viewer);
}

function initViewerEvent(props: any, emit: EmitType, viewer: any): void {
  // setTimeout(() => {
  //   viewer.navbar.hide();
  // }, 200);
  viewer.on("position-updated", (e: Object, position: Object): void => {
    emit("positionUpdated", position, viewer._id);
  });

  viewer.on("zoom-updated", (e: Object, zoomLevel: Object): void => {
    emit("zoomUpdated", zoomLevel, viewer._id);
  });

  viewer.on("click", (target: Object): void => {
    emit("handleClick", target);
  });

  viewer.on("dblclick", (target: Object): void => {
    emit("handleDblClick", target);
  });
}

function initMarkerEvent(emit: EmitType): void {
  viewer
    .getPlugin(MarkersPlugins)
    .on("select-marker", (marker: Object, dblclick: Object): void => {
      emit("selectMarker", marker, dblclick);
    });
}
function handelViewer() {
  function handelResizeViewer() {
    const random = 100;
    viewer.resize({ width: `${random}%`, height: `${random}%` });
    // viewer.needsUpdate();
    // viewer.autoSize();
    // viewer.toggleFullscreen();
    // viewer.showError();
    // console.log(viewer);
  }

  function setPanorama(path: string, options: PanoramaOptions) {
    viewer.setPanorama(path, options);
  }

  return {
    handelResizeViewer,
    setPanorama,
  };
}
function handelMarker() {
  function addMarker({ id, latitude, longitude, tooltip }: AddMarkerOptions) {
    viewer.getPlugin(MarkersPlugins).addMarker({
      id,
      longitude,
      latitude,
      tooltip,
      // image: require("../../assets/img/marker.gif"),
      image: "http://photo-sphere-viewer.js.org/assets/pin-blue.png",
      // 原图 宽高比 7.8:3
      width: 78,
      height: 30,
      style: {
        cursor: "pointer",
        backgroundPosition: "center bottom",
      },
      anchor: "center 48%",
    });
  }

  return {
    addMarker,
  };
}
</script>

<style lang="scss">
@import "~photo-sphere-viewer/dist/photo-sphere-viewer.css";
@import "~photo-sphere-viewer/dist/plugins/markers.css";

.single-view-container {
  height: 100%;
  width: 100%;
  .viewerContainer {
    height: 100%;
    width: 100%;
    .psv-navbar {
      bottom: -40px !important;
    }
  }
}
</style>
