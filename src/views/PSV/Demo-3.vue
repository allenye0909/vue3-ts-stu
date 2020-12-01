<!--
 * @Description: xxx
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-23 17:10:32
 * @LastEditTime: 2020-11-30 18:14:47
-->
<template>
  <div class="panoramaContainer">
    <Demo2
      class="showThreeViewer"
      ref="multViewers"
      :viewerTitleArray="viewerTitleArray"
      @handleClick="handleClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, reactive, ref } from "vue";
import Demo2 from "./Demo-2.vue";
export default defineComponent({
  components: {
    Demo2,
  },
  setup() {
    let multViewers = ref(null);
    let viewer: any;

    const data: any = reactive({
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
    });

    function handleClick(target: any) {
      // console.log(Object.prototype.toString.call(target));
      viewer.handelAddMarker({
        id: new Date().getTime(),
        latitude: target.args[0].latitude,
        longitude: target.args[0].longitude,
        tooltip: "test>>>>>" + new Date().getTime(),
      });
    }

    onMounted(() => {
      // console.log(multViewers.value);
      const _multViewers: any = multViewers.value;
      viewer = _multViewers.Refs[2];
    });

    return {
      ...toRefs(data),
      multViewers,
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.panoramaContainer {
  overflow: hidden;

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
}
</style>
