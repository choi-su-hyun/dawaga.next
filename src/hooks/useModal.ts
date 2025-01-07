import {
  Modal,
  ModalParams,
  modalSelector,
  modalListSelector,
  ModalType,
} from "@/stores/modalStore";
import { useCallback } from "react";
import { useRecoilCallback } from "recoil";

function useModal() {
  const setModal = useRecoilCallback(
    ({ set }) =>
      (id: ModalType) => {
        set(modalListSelector, id);
      },
    []
  );

  const closeModal = useRecoilCallback(
    ({ reset }) =>
      (id: ModalType) => {
        reset(modalSelector(id));
      },
    []
  );

  // const handleOpenModal = useCallback(
  //   (id: ModalType) => {
  //     setModal(id);
  //   },
  //   [setModal]
  // );

  return { openModal: setModal, closeModal };
}

export default useModal;
