<!--
 * @Description: 单屏使用组件
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-12-08 10:19:03
 * @LastEditTime: 2020-12-08 17:44:26
-->
<template>
  <div class="example">
    <div class="toolContainer">
      <a-button class="mr10" type="primary" @click="handelSetPanorama"
        >切换图片</a-button
      >
      <a-button class="mr10" type="primary" @click="handelAddMarker"
        >添加marker</a-button
      >
    </div>
    <panorama-viewer
      ref="refSingleViewer"
      @positionUpdated="positionUpdated"
      @selectMarker="handelSelectMarker"
      @handleDblClick="handleDblClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  setup() {
    let refSingleViewer = ref(null);

    function positionUpdated(position) {
      // console.log(position);
    }
    
    function handleDblClick(target) {
      refSingleViewer.value.setPanorama(
        "https://i.carimg.com//zf/0/320/269/606/000/1606269320/1606269320OkSK5Z.jpg",
        {
          showLoader: false,
          sphereCorrection: {
            pan: Math.random() * 6,
            tilt: 0,
            roll: 0,
          },
          transition: 1000,
        }
      );

      refSingleViewer.value.addMarker({
        id: new Date().getTime(),
        latitude: target.args[0].latitude,
        longitude: target.args[0].longitude,
        tooltip: "handleDblClick>>>>>" + new Date().getTime(),
      });
    }

    function handelSelectMarker(marker, dblclick) {
      refSingleViewer.value.setPanorama(
        "https://i.carimg.com//zf/0/320/269/606/000/1606269320/1606269320OkSK5Z.jpg",
        {
          showLoader: false,
          sphereCorrection: {
            pan: Math.random() * 6,
            tilt: 0,
            roll: 0,
          },
          transition: 1000,
        }
      );
    }

    function handelSetPanorama() {
      refSingleViewer.value.setPanorama(
        "https://i.carimg.com//zf/0/320/269/606/000/1606269320/1606269320OkSK5Z.jpg",
        {
          showLoader: false,
          sphereCorrection: {
            pan: Math.random() * 6,
            tilt: 0,
            roll: 0,
          },
          transition: 1000,
        }
      );
    }

    function handelAddMarker() {
      refSingleViewer.value.addMarker({
        id: new Date().getTime(),
        latitude: 0,
        longitude: 0,
        tooltip: "handelAddMarker" + new Date().getTime(),
      });
    }

    onMounted(() => {});

    return {
      refSingleViewer,
      positionUpdated,
      handleDblClick,
      handelSetPanorama,
      handelAddMarker,
      handelSelectMarker
    };
  },
});
</script>

<style scoped lang="scss">
.example {
  width: 100%;
  height: 100%;

  .toolContainer {
    position: fixed;
    width: 100%;
    height: 5%;
    text-align: center;
    left: 0;
    top: 20px;
    z-index: 9999;
  }
}

.mr10 {
  margin-right: 10px;
}
</style>
