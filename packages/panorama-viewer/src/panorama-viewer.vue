<!--
 * @Description: 单屏组件
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-12-07 15:31:24
 * @LastEditTime: 2020-12-08 10:22:13
-->
<template>
  <div class="single-view-container" style="position: relative;">
    <h1>single-view-container</h1>
    <!-- <div ref="viewer" class="viewerContainer">嘻嘻嘻</div> -->
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
import { defineComponent } from "vue";
export default defineComponent({
  name: "panorama-viewer"
});
</script>

<style></style>
