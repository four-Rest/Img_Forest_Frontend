import { create } from 'zustand';

type LoginModalDisplay = {
  showModal: boolean;
  setShowModal: (toggle: boolean) => void;
};

export const useShowLoginModal = create<LoginModalDisplay>()((set) => ({
  showModal: false,
  setShowModal: (toggle) => {
    set(() => ({
      showModal: toggle,
    }));
  },
}));
