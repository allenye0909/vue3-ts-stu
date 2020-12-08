<!--
 * @Description: 单屏组件
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-12-07 15:31:24
 * @LastEditTime: 2020-12-08 17:43:21
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
import { defineComponent, onMounted, ref, unref } from "vue";
import { setID } from "@/utils/psv";
let refSingleViewer: any;
let viewer: any;
interface PanoramaOptions {
  longitude?: number;
  latitude?: number;
  zoom?: number;
  showLoader?: boolean;
  transition?: number;
  sphereCorrection?: {
    pan: number;
    tilt: number;
    roll: number;
  };
}

interface AddMarkerOptions {
  id: string;
  latitude: number;
  longitude: number;
  tooltip: string;
}
export default defineComponent({
  name: "panorama-viewer",
  setup(props, { emit }) {
    refSingleViewer = ref(null);
    viewer = ref(null);

    function setPanorama(path: string, options: PanoramaOptions) {
      viewer.setPanorama(path, options);
    }

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

    onMounted(() => {
      initViewer();
      initViewerEvent(props, emit, viewer);
      initMarkerEvent(emit, viewer.getPlugin(MarkersPlugins));
    });

    return {
      refSingleViewer,
      setPanorama,
      addMarker,
    };
  },
});

function initViewer() {
  const config = {
    container: refSingleViewer.value,
    plugins: [[MarkersPlugins]],
    panorama:
      "https://i.carimg.com//zf/0/290/043/597/000/1597043290/15970432906ABYwo.jpg",
  };
  viewer = new Viewer(config);
  viewer._id = setID();
}

function initViewerEvent(props: any, emit: any, viewer: any): void {
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

function initMarkerEvent(emit: any, markersPlugin: any) {
  markersPlugin.on(
    "select-marker",
    (marker: Object, dblclick: Object): void => {
      emit("selectMarker", marker, dblclick);
    }
  );
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
