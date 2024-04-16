import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
type LoginModalDisplay = {
  showLoginModal: boolean;
  setShowLoginModal: (toggle: boolean) => void;
};

export const useShowLoginModal = create<LoginModalDisplay>()(
  devtools((set) => ({
    showLoginModal: false,
    setShowLoginModal: (toggle) => {
      set(() => ({
        showLoginModal: toggle,
      }));
    },
  })),
);
type singUpModalDisplay = {
  showSignUpModal: boolean;
  setShowSignupModal: (toggle: boolean) => void;
};

export const useShowSingUpModal = create<singUpModalDisplay>()(
  devtools((set) => ({
    showSignUpModal: false,
    setShowSignupModal: (toggle) => {
      set(() => ({
        showSignUpModal: toggle,
      }));
    },
  })),
);
