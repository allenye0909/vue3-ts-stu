/*
 * @Description: psv
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-25 09:26:37
 * @LastEditTime: 2020-11-25 09:28:09
 */
let ID = 0;
export const setID = function() {
  ID += 1;
  const strID = ID.toString(16);
  return strID;
};
