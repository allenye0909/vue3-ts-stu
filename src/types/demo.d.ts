/*
 * @Author: your name
 * @Date: 2020-12-03 15:33:09
 * @LastEditTime: 2020-12-04 09:36:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-ts-stu\src\types\demo.d.ts
 */

declare interface Card {
  suit: string;
  card: number;
}
declare interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T;
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;


declare interface People {
  name: string;
  age: number;
  // say: any;
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
