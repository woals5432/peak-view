"use client";

import { useEffect, useRef } from "react";

export default function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.kakao) return;

    window.kakao.maps.load(() => {
      const container = mapRef.current;
      if (!container) return;

      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      new window.kakao.maps.Map(container, options);
    });
  }, []);

  return <div ref={mapRef} className="w-full h-screen" />;
}
