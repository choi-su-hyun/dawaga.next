import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        {/* TODO : 속도가 느려진 경우 이 script를 개별로 분리해보자. */}
        <Script src={process.env.KAKAO_SDK_URL} strategy="beforeInteractive" />
        <div id="modal"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
