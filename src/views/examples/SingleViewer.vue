<!--
 * @Description: xxx
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-12-08 10:19:03
 * @LastEditTime: 2020-12-08 16:24:25
-->
<template>
  <div class="example">
    <div class="toolContainer">
      <a-button type="primary" @click="handelSetPanorama">切换图片</a-button>
    </div>
    <panorama-viewer
      ref="refSingleViewer"
      @positionUpdated="positionUpdated"
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
    function handleDblClick() {
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

    onMounted(() => {});

    return {
      refSingleViewer,
      positionUpdated,
      handleDblClick,
      handelSetPanorama,
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
</style>
