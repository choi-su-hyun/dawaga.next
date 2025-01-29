import React from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  return (
    <>
      <Map
        center={{ lat: 33.450701, lng: 126.570667 }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{ color: "#000" }}>Hello World!</div>
        </MapMarker> */}

        <CustomOverlayMap position={{ lat: 33.55635, lng: 126.795841 }}>
          <div
            style={{ padding: "42px", backgroundColor: "#fff", color: "#000" }}
          >
            Custom Overlay!
          </div>
        </CustomOverlayMap>
      </Map>
    </>
  );
};

export default KakaoMap;
