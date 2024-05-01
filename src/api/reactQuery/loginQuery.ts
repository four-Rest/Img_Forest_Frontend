import { useMutation } from '@tanstack/react-query';
import { useShowLoginModal } from '../../store/display/displayState';
import { useLoginState } from '../../store/auth/loginState';

import {
  toastNotice,
  toastWarning,
} from '../../components/toastr/ToastrConfig';

const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;

//로그인
const loginApi = async (signupData: { username: string; password: string }) => {
  const response = await fetch(`${apiUrl}/api/member/login`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(signupData),
  });
  return response.json();
};
export const useLogin = () => {
  const { setIsLogin, setUserName, setNickName } = useLoginState();
  const { setShowLoginModal } = useShowLoginModal();
  const logout = useLogout();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      if (data.error) {
        // 에러 메시지가 존재하는 경우
        console.error('Login Error:', data.error); // 에러 메시지 토스트로 표시
        toastWarning('존재하지 않는 회원입니다.');
        logout.mutate(); // 로그아웃 처리
      } else {
        // 에러가 없는 경우
        setUserName(data.data.username);
        setNickName(data.data.nickname);
        setIsLogin();
        setShowLoginModal(false); // 로그인 성공 후 모달 닫기
        console.log('로그인');
        toastNotice('로그인 완료.'); // 성공 메시지 토스트로 표시
      }
    },
    onError: (error: Error) => {
      console.error('login Error:', error);

      logout.mutate();
    },
  });
};

export const useLogout = () => {
  const { setIsLogout, setUserName, setNickName } = useLoginState();
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
      setUserName('');
      setNickName('');
      setIsLogout();
      // window.location.href = `/`;
    },
    onError: (error) => {
      // 로그아웃 실패 시 처리할 작업 수행
      console.error('로그아웃 에러:', error.message);
    },
  });
};
