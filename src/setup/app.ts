/*
 * @Author: your name
 * @Date: 2020-12-03 15:03:03
 * @LastEditTime: 2020-12-03 17:57:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-ts-stu\src\setup\app.ts
 */

import { App } from "vue";
let _app: App;

export function setApp(app: App): void {
  _app = app;
}

export function getApp(): App {
  return _app;
}
