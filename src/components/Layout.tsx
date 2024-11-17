import { ReactNode } from "react";
import Header from "./common/Header/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
