import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
} from "recoil";

export type ModalType = "searchMap" | "daumPostCode";

export type ModalParams = Record<string, unknown> | null;
export type Modal = {
  id: ModalType;
};

// ============================= 모달 상태 [START] =============================
export const modalListState = atom<string[]>({
  key: "modalListState",
  default: [],
});

export const modalListSelector = selector({
  key: "modalListSelector",
  get: ({ get }) => {
    return get(modalListState).length > 0
      ? get(modalListState)[get(modalListState).length - 1]
      : "";
  },
  set: ({ get, set, reset }, newValue) => {
    const currentList = get(modalListState);
    if (newValue instanceof DefaultValue) {
      reset(modalListState);
      return;
    }

    if (!currentList.includes(newValue)) {
      // newValue가 리스트에 없으면 추가
      set(modalListState, [...currentList, newValue]);
    } else {
      // newValue가 리스트에 있으면 제거
      set(
        modalListState,
        currentList.filter((item) => item !== newValue)
      );
    }

    if (get(modalListState).find((item: string) => item === newValue)) return;
  },
});
// ============================= 모달 상태 [END] =============================

// COMMENT : 모달에서는 직접적으로 props를 관리하는 것이 더 좋다는 판단하에 store로는 id만 관리하도록 변경
const modalState = atomFamily<Modal, ModalType>({
  key: "modalState",
  default: (id) => ({
    id,
    params: null,
  }),
});
export const modalSelector = selectorFamily<Modal, ModalType>({
  key: "modalSelector",
  get:
    (id) =>
    ({ get }) =>
      get(modalState(id)),
  set:
    (id) =>
    ({ get, set, reset }, newValue) => {
      if (newValue instanceof DefaultValue) {
        set(modalListState, (prev) => prev.filter((modalId) => modalId !== id));
        reset(modalState(id));
        return;
      }

      set(modalState(id), newValue);

      if (get(modalListState).find((id) => id === newValue.id)) return;
      set(modalListState, (prev) => [...prev, newValue.id]);
    },
});
