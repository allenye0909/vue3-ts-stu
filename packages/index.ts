/*
 * @Description: xxx
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-12-07 15:37:02
 * @LastEditTime: 2020-12-08 10:21:18
 */
import login from "./login";
import PanoramaViewer from "./panorama-viewer";

const components = [login, PanoramaViewer];

const install = function(Vue: any): any {
  // if (install.installed) return;
  components.map((component) => Vue.component(component.name, component));
};

// if (typeof window !== "undefined" && window.Vue) {
//   install(window.Vue);
// }

export default {
  install,
  login,
  PanoramaViewer,
};
