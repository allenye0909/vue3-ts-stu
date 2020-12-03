/*
 * @Description: xxx
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-30 16:21:49
 * @LastEditTime: 2020-12-03 14:06:21
 */

import {AddMarkerOpts} from "./type.d"
export function addMarker({ id, latitude, longitude, tooltip }: AddMarkerOpts, markersPlugin: any) {
  markersPlugin.addMarker({
    id,
    longitude,
    latitude,
    tooltip,
    // image: require("../../assets/img/marker.gif"),
    image: "http://photo-sphere-viewer.js.org/assets/pin-blue.png",
    // 原图 宽高比 7.8:3
    width: 78,
    height: 30,
    style: {
      cursor: "pointer",
      backgroundPosition: "center bottom",
    },
    anchor: "center 48%",
  });
}

export function initViewerEvent(props: object, emit: any, viewer: any): void {
  viewer.on("position-updated", (e: Object, position: Object): void => {
    emit("positionUpdated", position, viewer._id);
  });

  viewer.on("zoom-updated", (e: Object, zoomLevel: Object): void => {
    emit("zoomUpdated", zoomLevel, viewer._id);
  });

  viewer.on("click", (target: Object): void => {
    emit("handleClick", target);
  });

  viewer.on("dblclick", (target: Object): void => {
    emit("handleDblClick", target);
  });

  viewer.on("select-marker", (marker: Object, dblclick: Object): void => {
    emit("selectMarker", marker, dblclick);
  });
}