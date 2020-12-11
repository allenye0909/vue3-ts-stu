<!--
 * @Description: xxx
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-12-09 09:44:59
 * @LastEditTime: 2020-12-11 15:51:43
-->
<template>
  <div class="example">
    <div class="toolContainer">
      <a-button class="mr10" type="primary" @click="handelGotoSingleViewer"
        >单屏</a-button
      >
      <a-button class="mr10" type="primary" @click="handelSetPanorama"
        >切换图片</a-button
      >
      <a-button class="mr10" type="primary" @click="handelAddMarker"
        >添加marker</a-button
      >
      <a-button class="mr10" type="primary" @click="handelChangeScreen"
        >切换屏幕【{{ showViewerNum }}】</a-button
      >
    </div>
    <multi-panorama-viewer
      ref="refMultiViewers"
      :viewerTitleArray="viewerTitleArray"
      :class="[
        showViewerNum === 3
          ? 'showThreeViewer ignore-grid-gap'
          : showViewerNum === 2
          ? 'showTwoViewer ignore-grid-gap'
          : 'showOneViewer',
      ]"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUpdate, unref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const {
      list,
      showViewerNum,
      refMultiViewers,
      handelSetPanorama,
      handelAddMarker,
      handelChangeScreen,
      handelGotoSingleViewer,
    } = handelTestButtonEvent();
    onBeforeUpdate(() => {
      const multiViewer: any = refMultiViewers.value;
      multiViewer.handelMultiSetPanorama(list);
    });
    onMounted(() => {
      const multiViewer: any = refMultiViewers.value;
      multiViewer.handelMultiSetPanorama(list);
    });
    return {
      showViewerNum,
      viewerTitleArray: [
        {
          name: "test1",
          top: 20,
          left: 20,
          isPc: true,
          fullscreenState: false,
        },
        {
          name: "test2",
          top: 20,
          left: 20,
          isPc: true,
          fullscreenState: false,
        },
        {
          name: "test3",
          top: 20,
          left: 20,
          isPc: true,
          fullscreenState: false,
        },
      ],
      refMultiViewers,
      handelSetPanorama,
      handelAddMarker,
      handelChangeScreen,
      handelGotoSingleViewer,
    };
  },
});

function handelTestButtonEvent() {
  const { push } = useRouter();
  let showViewerNum = ref(3);
  let refMultiViewers = ref(null);
  function handelSetPanorama() {}
  function handelAddMarker() {}
  function handelChangeScreen() {
    if (showViewerNum.value === 3) {
      showViewerNum.value = 1;
    } else if (showViewerNum.value === 2) {
      showViewerNum.value = 3;
    } else {
      showViewerNum.value = 2;
    }
    setTimeout(() => {
      const multiViewer: any = refMultiViewers.value;

      multiViewer.handelResize();
    });
  }
  function handelGotoSingleViewer() {
    push({ path: "/examples/singleViewer" });
  }
  const list = [
    {
      path:
        "https://i.carimg.com//zf/0/320/269/606/000/1606269320/1606269320OkSK5Z.jpg",
      options: {
        showLoader: false,
        sphereCorrection: {
          pan: Math.random() * 6,
          tilt: 0,
          roll: 0,
        },
        transition: 1000,
      },
    },
    {
      path:
        "https://i.carimg.com//zf/0/320/269/606/000/1606269320/1606269320OkSK5Z.jpg",
      options: {
        showLoader: false,
        sphereCorrection: {
          pan: Math.random() * 6,
          tilt: 0,
          roll: 0,
        },
        transition: 1000,
      },
    },
    {
      path:
        "https://i.carimg.com//zf/0/320/269/606/000/1606269320/1606269320OkSK5Z.jpg",
      options: {
        showLoader: false,
        sphereCorrection: {
          pan: Math.random() * 6,
          tilt: 0,
          roll: 0,
        },
        transition: 1000,
      },
    },
  ];
  return {
    list,
    showViewerNum,
    refMultiViewers,
    handelSetPanorama,
    handelAddMarker,
    handelChangeScreen,
    handelGotoSingleViewer,
  };
}
</script>

<style lang="scss" scoped>
.example {
  width: 100%;
  height: 100%;
}
.showThreeViewer {
  grid-template-columns: 38.2% 61.8%;
  grid-template-rows: 50% 50%;
  grid-template-areas: "viewer1 viewer3" "viewer2 viewer3";
  // grid-gap: 1px;
  width: 100vw;
  height: 100vh;
}
.showTwoViewer {
  grid-template-rows: 50% 50%;
  grid-template-rows: 50% 50% 0%;
  grid-template-areas: "viewer1 viewer3" "viewer1 viewer3" "viewer2 viewer2";
  // grid-gap: 1px;
  width: 100vw;
  height: 100vh;
}

.showOneViewer {
  grid-template-rows: 100% 0%;
  grid-template-rows: 100% 0% 0%;
  grid-template-areas: var(
    --grid-template-areas,
    "viewer3 viewer3" "viewer3 viewer3" "viewer1 viewer2"
  );
  width: 100vw;
  height: 100vh;
}

.toolContainer {
  position: fixed;
  width: 100%;
  height: 5%;
  text-align: center;
  left: 0;
  top: 20px;
  z-index: 9999;
}

.mr10 {
  margin-right: 10px;
}
</style>
