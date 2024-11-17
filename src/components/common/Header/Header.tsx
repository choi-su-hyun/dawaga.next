// "use client";

import { NextPage } from "next";
import Logo from "@/assets/logo.svg";
import Alarm from "@/assets/alarm.svg";
import UserIcon from "@/assets/userIcon.svg";
import Cogwheel from "@/assets/cogwheel.svg";
import Link from "next/link";
import S from "./Header.module.scss";
import { usePathname } from "next/navigation";
import { getPageName } from "@/utils/pageHeaderName";

const Header: NextPage = ({}) => {
  const pathName = usePathname();
  return (
    <header className={S.header}>
      <Link href={"/"}>
        <Logo />
      </Link>
      <h1>{getPageName(pathName)}</h1>
      <nav>
        <ul>
          <li>
            <Link href={"/"}>
              <Alarm />
            </Link>
          </li>
          <li>
            <Link href={"/sign-in"}>
              <UserIcon />
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <Cogwheel />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
