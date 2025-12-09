import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "PeakView",
  description: "등산 지도 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Script
          // 👇 여기가 중요! process.env로 교체
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
