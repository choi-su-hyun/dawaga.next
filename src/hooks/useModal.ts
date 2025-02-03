import { modalListSelector } from "@/stores/modalStore";
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
      () => {
        reset(modalListSelector(modalId));
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
