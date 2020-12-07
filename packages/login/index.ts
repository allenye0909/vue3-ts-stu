/*
 * @Description: xxx
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-12-07 15:34:20
 * @LastEditTime: 2020-12-07 15:56:23
 */
import login from "./src/login.vue";

login.install = function(Vue:any) {
  Vue.component(login.name, login);
};

export default login;