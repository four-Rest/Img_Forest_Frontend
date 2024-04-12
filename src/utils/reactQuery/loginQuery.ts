import { useAuthInfo } from '../zustand/auth/loginState';
import { useMutation } from '@tanstack/react-query';
import { useShowLoginModal } from '../zustand/display/displayState';
import { useLoginState } from '../zustand/auth/loginState';
import {
  toastNotice,
  toastWarning,
} from '../../components/toastr/ToastrConfig';

// const { login, logout } = useAuth() as any; //이건뭐지
const signupData = useAuthInfo();

const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;

const { setIsLogin, setIsLogout } = useLoginState();
//로그인
const loginMutation = async () => {
  const response = await fetch(`${apiUrl}/api/member/login`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(signupData),
  });
  if (!response.ok) {
    // 서버 에러 처리
    const errorData = await response.json();
    toastWarning('존재하지 않는 회원입니다.');
    useLogout(); //context의 로그아웃 로직 구현해야댐
  }

  return response.json();
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginMutation,
    onSuccess: (data: any) => {
      console.log('성공', data);

      localStorage.setItem('username', data.data.username);
      localStorage.setItem('nickname', data.data.nickname);
      localStorage.setItem('isLogin', 'true');

      setIsLogin(true);
      useShowLoginModal().setShowModal(false); // 로그인 성공 후 모달 닫기
      console.log('로그인');
      toastNotice('로그인 완료.');
    },
    onError: (error: Error) => {
      console.error('login Error:', error);
      useLogout();
    },
  });
};
const logoutMutation = async () => {
  const response = await fetch(`${apiUrl}/api/member/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('로그아웃에 실패했습니다.');
  }
};
const useLogout = () => {
  return useMutation({
    mutationFn: logoutMutation,
    onSuccess: () => {
      // 로그아웃 성공 시 처리할 작업 수행
      localStorage.removeItem('username');
      localStorage.removeItem('nickname');
      localStorage.removeItem('isLogin');
      setIsLogout(false);
      window.location.href = `/`;
    },
    onError: (error) => {
      // 로그아웃 실패 시 처리할 작업 수행
      console.error('로그아웃 에러:', error.message);
    },
  });
};
