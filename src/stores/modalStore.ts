import { atom, atomFamily, DefaultValue, selectorFamily } from "recoil";

export type ModalType = "SearchMap" | "DaumPostCode" | "AddParticipants";

// ============================= 모달 상태 [START] =============================
export const modalListState = atom<ModalType[]>({
  key: "modalListState",
  default: [],
});

export const modalListSelector = selectorFamily({
  key: "modalListSelector",
  get:
    (modalId: ModalType) =>
    ({ get }) => {
      const modalList = get(modalListState);
      return modalList.length !== 0 ? modalList[modalList.length - 1] : null;
    },
  set:
    (modalId: string) =>
    ({ get, set, reset }, newValue) => {
      const currentList = get(modalListState);
      if (newValue instanceof DefaultValue) {
        reset(modalListState);
        return;
      }

      if (newValue) {
        if (!currentList.includes(modalId)) {
          // modalId가 리스트에 없으면 추가
          set(modalListState, [...currentList, modalId]);
        }
      } else {
        // modalId가 리스트에 있으면 제거
        set(
          modalListState,
          currentList.filter((item) => item !== modalId)
        );
      }
    },
});
// ============================= 모달 상태 [END] =============================

// COMMENT : 모달에서는 직접적으로 props를 관리하는 것이 더 좋다는 판단하에 store로는 id만 관리하도록 변경
// const modalState = atomFamily<ModalStateType, ModalType>({
//   key: "modalState",
//   default: (id) => ({
//     id,
//     isOpen: false,
//     params: null,
//   }),
// });
// export const modalSelector = selectorFamily<ModalStateType, ModalType>({
//   key: "modalSelector",
//   get:
//     (id) =>
//     ({ get }) =>
//       get(modalState(id)),
//   set:
//     (id) =>
//     ({ get, set, reset }, newValue) => {
//       if (newValue instanceof DefaultValue) {
//         set(modalListState, (prev) => prev.filter((modalId) => modalId !== id));
//         reset(modalState(id));
//         return;
//       }

//       set(modalState(id), newValue);

//       if (get(modalListState).find((id) => id === newValue.id)) return;
//       set(modalListState, (prev) => [...prev, newValue.id]);
//     },
// });
