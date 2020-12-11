/*
 * @Description: psv
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-12-11 13:49:37
 * @LastEditTime: 2020-12-11 13:50:13
 */
declare interface PanoramaOptions {
  longitude?: number;
  latitude?: number;
  zoom?: number;
  showLoader?: boolean;
  transition?: number;
  sphereCorrection?: {
    pan: number;
    tilt: number;
    roll: number;
  };
}
declare interface AddMarkerOptions {
  id: string;
  latitude: number;
  longitude: number;
  tooltip: string;
}
