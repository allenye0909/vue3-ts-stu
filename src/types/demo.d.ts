/*
 * @Author: your name
 * @Date: 2020-12-03 15:33:09
 * @LastEditTime: 2020-12-04 09:02:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-ts-stu\src\types\demo.d.ts
 */

declare interface People {
  name: string;
  age: 12;
  say: Event;
}

// 函数接口
declare interface NavigationCallback {
  (
    to: HistoryLocation,
    from: HistoryLocation,
    information: NavigationInformation
  ): void;
}

// 对象接口
declare interface NavigationInformation {
  type: NavigationType_2;
  direction: NavigationDirection;
  delta: number;
}
// 枚举
declare enum NavigationDirection {
  back = "back",
  forward = "forward",
  unknown = "",
}
// 枚举
declare enum NavigationType_2 {
  pop = "pop",
  push = "push",
}

// type 声明
declare type HistoryLocation = string;
