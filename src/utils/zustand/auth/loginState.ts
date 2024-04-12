import { create } from 'zustand';

type UserAuthInfo = {
  signupData: { userName: string; password: string };
  setUserName: (updateUserName: string) => void;
  setPassword: (updatePassword: string) => void;
};
type LoginStat = {
  loginState: boolean;
  setIsLogin: (toggleLoginState: boolean) => void;
  setIsLogout: (toggleLoginState: boolean) => void;
};
export const useAuthInfo = create<UserAuthInfo>()((set) => ({
  signupData: { userName: '', password: '' },
  setUserName: (updateUserName) =>
    set((state) => ({
      signupData: { ...state.signupData, userName: updateUserName },
    })),
  setPassword: (updatePassword) =>
    set((state) => ({
      signupData: { ...state.signupData, password: updatePassword },
    })),
}));

const useLoginState = create<LoginStat>()((set) => ({
  loginState: false,
  setIsLogin: (toggleLoginState) => set({ loginState: toggleLoginState }),
  setIsLogout: (toggleLoginState) => set({ loginState: toggleLoginState }),
}));
