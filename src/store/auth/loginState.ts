import { create } from 'zustand';

type LoginStat = {
  loginState: boolean;
  setIsLogin: () => void;
  setIsLogout: () => void;
};
//로그인 상태, 로그아웃 상태
export const useLoginState = create<LoginStat>()((set) => ({
  loginState: false,
  setIsLogin: () => set({ loginState: true }),
  setIsLogout: () => set({ loginState: false }),
}));
