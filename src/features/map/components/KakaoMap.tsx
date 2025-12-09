"use client";

import { useEffect, useRef, useState } from "react";
import { MOCK_MOUNTAINS } from "../data/mockMountains";
import { Mountain } from "../types";

export default function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [selectedMountain, setSelectedMountain] = useState<Mountain | null>(
    null
  );

  // 1. 현재 지도에 그려진 등산로 선을 저장할 State
  const [activePolyline, setActivePolyline] = useState<any>(null);

  // 지도 빈 곳 클릭 핸들러
  const handleMapClick = () => {
    setSelectedMountain(null);
    // 선이 있다면 지도에서 제거
    if (activePolyline) {
      activePolyline.setMap(null);
      setActivePolyline(null);
    }
  };

  useEffect(() => {
    if (!window.kakao) return;

    window.kakao.maps.load(() => {
      const container = mapRef.current;
      if (!container) return;

      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 9,
      };

      const mapInstance = new window.kakao.maps.Map(container, options);
      setMap(mapInstance);

      window.kakao.maps.event.addListener(mapInstance, "click", () => {
        setSelectedMountain(null);
      });

      MOCK_MOUNTAINS.forEach((mountain) => {
        const markerPosition = new window.kakao.maps.LatLng(
          mountain.lat,
          mountain.lng
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          title: mountain.name,
        });
        marker.setMap(mapInstance);

        window.kakao.maps.event.addListener(marker, "click", () => {
          // 다른 산 마커 클릭 시, 기존 선이 있다면 제거
          if (activePolyline) {
            activePolyline.setMap(null);
            setActivePolyline(null);
          }
          setSelectedMountain(mountain);
          mapInstance.panTo(markerPosition);
        });
      });
    });
  }, []);

  const drawCoursePath = (pathData: Coordinate[]) => {
    if (!map || pathData.length === 0) {
      alert("이 코스는 아직 경로 데이터가 준비되지 않았습니다. 😅");
      return;
    }

    // 기존에 그려진 선이 있으면 지운다.
    if (activePolyline) {
      activePolyline.setMap(null);
    }

    // 카카오맵 LatLng 객체 배열로 변환
    const path = pathData.map(
      (coord) => new window.kakao.maps.LatLng(coord.lat, coord.lng)
    );

    // 빨간색 선(Polyline) 생성
    const polyline = new window.kakao.maps.Polyline({
      path: path, // 선을 구성하는 좌표 배열
      strokeWeight: 5, // 선의 두께 (픽셀)
      strokeColor: "#FF0000", // 선 색깔 (빨간색)
      strokeOpacity: 0.8, // 선의 불투명도 (0~1)
      strokeStyle: "solid", // 선 스타일
    });

    // 지도에 표시
    polyline.setMap(map);

    // 현재 그려진 선을 State에 저장 (나중에 지우기 위해)
    setActivePolyline(polyline);

    // (선택사항) 선이 잘 보이도록 지도 범위 재설정
    // const bounds = new window.kakao.maps.LatLngBounds();
    // path.forEach(point => bounds.extend(point));
    // map.setBounds(bounds);
  };
  const moveToCurrentLocation = () => {
    if (!map) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const locPosition = new window.kakao.maps.LatLng(lat, lng);
          map.panTo(locPosition);
        },
        () => alert("위치 정보를 가져올 수 없습니다.")
      );
    }
  };

  // 난이도에 따른 색상 반환 헬퍼 함수
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "hard":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "easy":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-100">
      <div ref={mapRef} className="w-full h-full" />

      {/* GPS 버튼 */}
      <button
        onClick={moveToCurrentLocation}
        className="absolute top-4 right-4 z-20 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-700"
        >
          <crosshair cx="12" cy="12" r="10"></crosshair>
          <line x1="22" y1="12" x2="18" y2="12"></line>
          <line x1="6" y1="12" x2="2" y2="12"></line>
          <line x1="12" y1="6" x2="12" y2="2"></line>
          <line x1="12" y1="22" x2="12" y2="18"></line>
        </svg>
      </button>

      {/* ⛰️ 산 정보 및 등산로 리스트 카드 */}
      {selectedMountain && (
        <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-center">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[60vh]">
            {/* 1. 산 헤더 정보 */}
            <div className="relative h-32 flex-shrink-0">
              <img
                src={selectedMountain.thumbnailUrl}
                alt={selectedMountain.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {selectedMountain.name}
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/30">
                    {selectedMountain.height}m
                  </span>
                </h2>
                <p className="text-sm opacity-90">{selectedMountain.address}</p>
              </div>
            </div>

            {/* 2. 등산로 리스트 (스크롤 가능) */}
            <div className="p-4 overflow-y-auto bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                추천 등산 코스 ({selectedMountain.courses.length})
              </h3>

              <div className="space-y-3">
                {selectedMountain.courses.length > 0 ? (
                  selectedMountain.courses.map((course) => (
                    <div
                      key={course.id}
                      onClick={() => drawCoursePath(course.path)}
                      className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer active:scale-99"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-800">
                          {course.name}
                        </h4>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(
                            course.difficulty
                          )}`}
                        >
                          {course.difficulty === "hard"
                            ? "상급"
                            : course.difficulty === "medium"
                            ? "중급"
                            : "초급"}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <span>👣</span>
                          <span>{course.distance}km</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>⏱️</span>
                          <span>{course.time}분</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400 text-sm bg-white rounded-xl border border-dashed border-gray-200">
                    등록된 등산로 정보가 없습니다. 😅
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
