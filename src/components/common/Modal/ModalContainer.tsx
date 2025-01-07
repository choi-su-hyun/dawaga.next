import { modalListState, ModalType } from "@/stores/modalStore";
import { createPortal } from "react-dom";
import { useRecoilValue } from "recoil";
import style from "./Modal.module.scss";
import { ReactNode, useEffect, useRef } from "react";
import useModal from "@/hooks/useModal";

interface Props {
  id: ModalType;
  label?: string; //position이 bottom 일 경우에만 필요
  children: ReactNode;
  position: "center" | "bottom";
}

function ModalContainer({ id, label, children, position }: Props) {
  const modalList = useRecoilValue(modalListState);
  const modalRef = useRef<HTMLDivElement>(null);
  const { closeModal } = useModal();

  const handleModal = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal(id);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleModal);

    return () => {
      document.removeEventListener("mousedown", handleModal);
    };
  });
  const renderModal = modalList.map((id) => {
    return (
      <div key={id}>
        {/* ============================= 모달 위치 - bottom [START] ============================= */}
        {position === "bottom" && (
          <div
            className={`${style["modal__overlay"]} ${style["modal--bottom"]}`}
          >
            <div
              className={`${style["modal__content-box"]} ${style["modal-content--full-width"]} ${style["modal--bottom"]}`}
              ref={modalRef}
            >
              <h3 className={style["modal__title"]}>{label}</h3>
              {children}
            </div>
          </div>
        )}
        {/* ============================= 모달 위치 - bottom [END] ============================= */}

        {/* ============================= 모달 위치 - center [START] ============================= */}
        {position === "center" && (
          <div className={style["modal__overlay"]}>
            <div ref={modalRef}>{children}</div>
          </div>
        )}
        {/* ============================= 모달 위치 - center [END] ============================= */}
      </div>
    );
  });

  return createPortal(
    <>{renderModal}</>,
    document.getElementById("modal") as HTMLElement
  );
}

export default ModalContainer;
