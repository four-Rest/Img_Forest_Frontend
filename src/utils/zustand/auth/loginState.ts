import { create } from 'zustand';

type LoginStat = {
  loginState: boolean;
  setIsLogin: (toggleLoginState: boolean) => void;
  setIsLogout: (toggleLoginState: boolean) => void;
};

const useLoginState = create<LoginStat>()((set) => ({
  loginState: false,
  setIsLogin: (toggleLoginState) => set({ loginState: toggleLoginState }),
  setIsLogout: (toggleLoginState) => set({ loginState: toggleLoginState }),
}));
