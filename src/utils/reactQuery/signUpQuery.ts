import { useMutation } from '@tanstack/react-query';
import {
  toastNotice,
  toastWarning,
} from '../../components/toastr/ToastrConfig';
import { useShowsingUpModal } from '../zustand/display/displayState';
const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;
const setShowModal = useShowsingUpModal().setShowModal;
export const useSignUp = (signupData: {
  userName: string;
  password1: string;
  password2: string;
  email: string;
  nickName: string;
}) => {
  return useMutation({
    mutationFn: async () => {
      if (!passwordCheck(signupData.password1, signupData.password2)) {
        toastWarning('비밀번호가 일치하지 않습니다.');
        return;
      }
      if (!blankCheck(signupData)) {
        toastWarning('필수 정보를 모두 입력해주세요.');
        return;
      }
      const response = await fetch(`${apiUrl}/api/member/signup`, {
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
        toastWarning('중복된 이름입니다.');
        return;
      }
      return response.json();
    },
    onSuccess: (data: any) => {
      setShowModal(false); // 회원가입 성공 후 모달 닫기 이건 주스탠드에 있는 상태다
      toastNotice('회원가입 완료.');
    },
    onError: (error: Error) => {
      console.error('Signup Error:', error);
    },
  });
};
function passwordCheck(password1: string, password2: string) {
  return password1 === password2;
}

function blankCheck(signupData: {
  userName: string;
  password1: string;
  password2: string;
  email: string;
  nickName: string;
}) {
  return (
    signupData.userName.trim() &&
    signupData.password1.trim() &&
    signupData.password2.trim() &&
    signupData.email.trim() &&
    signupData.nickName.trim()
  );
}
