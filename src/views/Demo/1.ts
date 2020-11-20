/*
 * @Description: xxx
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-18 13:45:39
 * @LastEditTime: 2020-11-18 13:58:09
 */

let num: number = 1;
let userName: string = "allen";

let list: number[] = [1, 2, 3, 0];
let list2: {}[] = [{}, {}, {}];
let list3: string[] = ["123"];


interface Person {
  name: string;
  age: number;
}
const user: Person = {
  name: "allen",
  age: 123
};
console.log(user);
////////////////////////////////////////////////
