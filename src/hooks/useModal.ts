import { modalListSelector, ModalType } from "@/stores/modalStore";
import { useRecoilCallback } from "recoil";

function useModal(modalId: string) {
  const setModal = useRecoilCallback(
    ({ set }) =>
      () => {
        set(modalListSelector(modalId), true);
      },
    []
  );

  const closeModal = useRecoilCallback(
    ({ reset }) =>
      (id: ModalType) => {
        reset(modalListSelector(id));
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
