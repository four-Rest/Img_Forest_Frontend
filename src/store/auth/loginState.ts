import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
type LoginStat = {
  loginState: boolean;
  username: string;
  nickname: string;
  setIsLogin: () => void;
  setIsLogout: () => void;
  setUserName: (data: string) => void;
  setNickName: (data: string) => void;
};
//로그인 상태, 로그아웃 상태
export const useLoginState = create<LoginStat>()(
  devtools((set) => ({
    loginState: false,
    username: '',
    nickname: '',
    setIsLogin: () => set({ loginState: true }),
    setIsLogout: () => set({ loginState: false }),
    setUserName: (data) => set({ username: data }),
    setNickName: (data) => set({ username: data }),
  })),
);
