// src/features/map/types/index.ts

// 좌표 한 점의 타입
export interface Coordinate {
  lat: number;
  lng: number;
}

// 1. 등산로(코스) 타입 정의 수정
export interface Course {
  id: number;
  name: string;
  distance: number;
  time: number;
  difficulty: "easy" | "medium" | "hard";
  path: Coordinate[]; // 👈 [핵심] 경로 좌표 배열 추가
}

// 2. 산 타입 (그대로 유지)
export interface Mountain {
  id: number;
  name: string;
  height: number;
  address: string;
  lat: number;
  lng: number;
  level: "easy" | "medium" | "hard";
  thumbnailUrl: string;
  tags: string[];
  courses: Course[];
}
