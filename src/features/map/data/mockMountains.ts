// src/features/map/data/mockMountains.ts
import { Mountain } from "../types";

export const MOCK_MOUNTAINS: Mountain[] = [
  {
    id: 1,
    name: "북한산",
    height: 836,
    address: "서울특별시 강북구",
    lat: 37.6608,
    lng: 126.9936,
    level: "hard",
    thumbnailUrl: "https://placehold.co/600x400?text=Bukhansan",
    tags: ["#암릉", "#백운대", "#국립공원"],
    courses: [
      {
        id: 101,
        name: "백운대 코스",
        distance: 1.9,
        time: 90,
        difficulty: "hard",
        // 👇 [핵심] 가짜 경로 데이터 추가 (북한산 정상 부근을 대충 이은 선)
        path: [
          { lat: 37.658, lng: 126.991 }, // 시작점
          { lat: 37.6595, lng: 126.9925 },
          { lat: 37.6608, lng: 126.9936 }, // 정상 부근
          { lat: 37.662, lng: 126.995 },
          { lat: 37.6635, lng: 126.997 }, // 끝점
        ],
      },
      // 다른 코스들은 귀찮으니 빈 배열로 둡니다.
      {
        id: 102,
        name: "북한산성 코스",
        distance: 3.4,
        time: 140,
        difficulty: "medium",
        path: [],
      },
      {
        id: 103,
        name: "대동문 코스",
        distance: 2.7,
        time: 80,
        difficulty: "easy",
        path: [],
      },
    ],
  },
  {
    id: 2,
    name: "청계산",
    height: 582,
    address: "서울특별시 서초구",
    lat: 37.4455,
    lng: 127.0573,
    level: "medium",
    thumbnailUrl: "https://placehold.co/600x400?text=Cheonggyesan",
    tags: ["#계단지옥", "#매봉"],
    courses: [
      {
        id: 201,
        name: "매봉 코스",
        distance: 2.2,
        time: 60,
        difficulty: "medium",
        path: [],
      },
      {
        id: 202,
        name: "옥녀봉 코스",
        distance: 1.8,
        time: 50,
        difficulty: "easy",
        path: [],
      },
    ],
  },
  // ... 나머지 산들도 courses: [] 빈 배열이라도 넣어주세요 (에러 방지)
  {
    id: 3,
    name: "인왕산",
    height: 338,
    address: "서울특별시 종로구",
    lat: 37.5855,
    lng: 126.9575,
    level: "easy",
    thumbnailUrl: "https://placehold.co/600x400?text=Inwangsan",
    tags: ["#야경"],
    courses: [
      {
        id: 301,
        name: "성곽길 코스",
        distance: 1.5,
        time: 40,
        difficulty: "easy",
        path: [],
      },
    ],
  },
  {
    id: 4,
    name: "관악산",
    height: 632,
    address: "서울특별시 관악구",
    lat: 37.4445,
    lng: 126.9632,
    level: "hard",
    thumbnailUrl: "https://placehold.co/600x400?text=Gwanaksan",
    tags: ["#연주대"],
    courses: [],
  },
  {
    id: 5,
    name: "아차산",
    height: 295,
    address: "서울특별시 광진구",
    lat: 37.5683,
    lng: 127.1042,
    level: "easy",
    thumbnailUrl: "https://placehold.co/600x400?text=Achasan",
    tags: ["#일출"],
    courses: [],
  },
];
