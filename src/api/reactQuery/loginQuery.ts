import { useMutation } from '@tanstack/react-query';
import { useShowLoginModal } from '../../store/display/displayState';
import { useLoginState } from '../../store/auth/loginState';
import {
  toastNotice,
  toastWarning,
} from '../../components/toastr/ToastrConfig';

const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;

//로그인

export const useLogin = () => {
  const { setIsLogin } = useLoginState();
  const { setShowLoginModal } = useShowLoginModal();
  const logout = useLogout();

  return useMutation({
    mutationFn: async (signupData: { username: string; password: string }) => {
      const response = await fetch(`${apiUrl}/api/member/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(signupData),
      });

      return response;
    },
    onSuccess: (data) => {
      if (data.ok) {
        setIsLogin();
        setShowLoginModal(false); // 로그인 성공 후 모달 닫기
        console.log('로그인');
        toastNotice('로그인 완료.');
      } else {
        // 서버 에러 처리

        toastWarning('존재하지 않는 회원입니다.');

        //context의 로그아웃 로직 구현해야댐
      }
    },
    onError: (error: Error) => {
      console.error('login Error:', error);

      logout.mutate();
    },
  });
};

export const useLogout = () => {
  const { setIsLogout } = useLoginState();
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${apiUrl}/api/member/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.json();
    },
    onSuccess: () => {
      // 로그아웃 성공 시 처리할 작업 수행
      localStorage.removeItem('username');
      localStorage.removeItem('nickname');
      localStorage.removeItem('isLogin');
      setIsLogout();

      window.location.href = `/`;
    },
    onError: (error) => {
      // 로그아웃 실패 시 처리할 작업 수행
      console.error('로그아웃 에러:', error.message);
    },
  });
};
