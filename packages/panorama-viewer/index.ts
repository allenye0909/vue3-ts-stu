/*
 * @Description: xxx
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-12-07 15:31:05
 * @LastEditTime: 2020-12-09 09:44:28
 */
import { App } from "vue";
import PanoramaViewer from "./src/panorama-viewer.vue";

PanoramaViewer.install = function(Vue:App) {
  Vue.component(PanoramaViewer.name, PanoramaViewer);
};

export default PanoramaViewer;