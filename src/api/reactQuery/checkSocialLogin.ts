import { useMutation } from '@tanstack/react-query';
import { error } from 'toastr';
import { useLoginState } from '../../store/auth/loginState';
import { useNavigate } from 'react-router-dom';
import { useLogout } from './loginQuery';
const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;
const checkSocialLogin = async () => {
  const response = await fetch(`${apiUrl}/api/member/checkAccessToken`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};
export const useCheckSocialLogin = () => {
  const navigate = useNavigate();
  const logout = useLogout;
  const { setIsLogin, setUserName } = useLoginState();
  return useMutation({
    mutationFn: checkSocialLogin,
    onSuccess: (data) => {
      if (data.resultCode === '200') {
        // 로그인 성공 처리
        setIsLogin();
        console.log('로그인 성공');
        setUserName(data.data.username); // 응답에서 username 추출

        navigate('/', { replace: true }); // 홈으로 리디렉션
      } else {
        // 로그인 실패 처리 (유효하지 않은 토큰, 토큰 만료 등)
        console.log(data.message); // 서버에서 보낸 오류 메시지 출력
        logout(); // 로그아웃 처리
      }
    },
    onError: (error) => {
      console.error('에러 발생:', error);
      logout();
    },
  });
};
