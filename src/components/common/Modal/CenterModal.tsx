import React, { ReactNode } from "react";
import Portal from "../Portal";
import style from "./Modal.module.scss";

interface Props {
  children: ReactNode;
  modalName?: string;
}

const Modal = ({ children, modalName }: Props) => {
  console.log(`modalName : `, modalName);
  return (
    <div>
      <Portal selector="#modal">
        <div className={style["modal__overlay"]}>
          <div>{children}</div>
        </div>
      </Portal>
    </div>
  );
};

export default Modal;
