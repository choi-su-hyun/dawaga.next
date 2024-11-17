"use client";

import React, { ReactNode, useEffect, useRef } from "react";
import Portal from "../Portal";
import style from "./Modal.module.scss";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
  modalName?: string;
  label?: string;
}

const BottomModal = ({ children, modalName, label }: Props) => {
  console.log(`modalName : `, modalName);
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const handleModal = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      router.back();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleModal);

    return () => {
      document.removeEventListener("mousedown", handleModal);
    };
  });

  return (
    <>
      <Portal selector="#modal">
        <div className={`${style["modal__overlay"]} ${style["modal--bottom"]}`}>
          <div
            className={`${style["modal__content-box"]} ${style["modal-content--full-width"]} ${style["modal--bottom"]}`}
            ref={modalRef}
          >
            <h3 className={style["modal__title"]}>{label}</h3>
            {children}
          </div>
        </div>
      </Portal>
    </>
  );
};

export default BottomModal;
