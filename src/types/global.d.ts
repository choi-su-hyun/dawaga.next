declare global {
  interface KakaoMap {
    new (container: HTMLElement | null, options: any): {
      setCenter: (latLng: window.kakao.maps.LatLng) => void;
      getCenter: () => window.kakao.maps.LatLng;
      addListener: (event: string, callback: (mouseEvent: any) => void) => void;
    };
  }

  interface KakaoMaps {
    LatLng: typeof window.kakao.maps.LatLng; // LatLng을 카카오 맵에서 가져옴
    Marker: typeof window.kakao.maps.Marker;
    Map: typeof window.kakao.maps.Map;
    services: {
      Geocoder: {
        new (): {
          coord2Address: (
            lng: number,
            lat: number,
            callback: (result: any, status: string) => void
          ) => void;
        };
      };
      Status: {
        OK: string;
      };
    };
  }

  interface Window {
    kakao: {
      maps: any;
    };
  }
}

declare module "react" {
  interface CSSProperties {
    "--modal-height"?: string; // 여기에 원하는 CSS 변수를 추가
  }
}

export {};
