/*
 * @Author: allenye
 * @Date: 2020-12-03 14:44:38
 * @LastEditTime: 2020-12-07 09:37:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-ts-stu\src\setup\element-ui.ts
 */

// import { Form, Input, Row, Col, Spin, Button } from "ant-design-vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

export function setupAntd(app: any): void {
  app.use(Antd);
  // .use(Form)
  // .use(Input)
  // .use(Row)
  // .use(Button)
  // .use(Col);
}
