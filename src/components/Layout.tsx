import { ReactNode } from "react";
import Header from "./common/Header/Header";
import localFont from "next/font/local";

interface Props {
  children: ReactNode;
}
const pretendard = localFont({
  src: "../pages/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function Layout({ children }: Props) {
  return (
    <>
      <div className={`${pretendard.variable}`}>
        <Header />
        <main>{children}</main>
      </div>
    </>
  );
}
