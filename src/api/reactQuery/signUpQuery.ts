import { useMutation } from '@tanstack/react-query';
import {
  toastNotice,
  toastWarning,
} from '../../components/toastr/ToastrConfig';
import { useShowSingUpModal } from '../../store/display/displayState';
const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;

export const useSignUp = (signupData: {
  username: string;
  password1: string;
  password2: string;
  email: string;
  nickname: string;
}) => {
  const { setShowSignupModal } = useShowSingUpModal();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${apiUrl}/api/member/signup`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(signupData),
      });
      if (response.ok) {
        setShowSignupModal(false); // 회원가입 성공 후 모달 닫기 이건 주스탠드에 있는 상태다

        toastNotice('회원가입 완료.');
      } else {
        toastWarning('중복된 이름입니다.');
        return;
      }
      return response;
    },
    onError: (error: Error) => {
      console.error('Signup Error:', error);
    },
  });
};
