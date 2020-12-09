/*
 * @Description: xxx
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-12-07 15:31:05
 * @LastEditTime: 2020-12-09 09:44:12
 */
import { App } from "vue";
import MultiPanoramaViewer from "./src/multi-panorama-viewer.vue";

MultiPanoramaViewer.install = function(Vue: App) {
  Vue.component(MultiPanoramaViewer.name, MultiPanoramaViewer);
};

export default MultiPanoramaViewer;
