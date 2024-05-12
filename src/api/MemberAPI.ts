import { useMutation } from "@tanstack/react-query";
import { toastNotice } from "../components/toastr/ToastrConfig";
import { useLoginState } from "../store/auth/loginState";
import { useShowLoginModal } from "../store/display/displayState";
import { useLogout } from "./reactQuery/loginQuery";

const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;


const getMemberUsingTokenFn = async () => {
  const response = await fetch(`${apiUrl}/api/member/login/refresh`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
  });
  return response.json();
};

export const getMemberUsingToken = () => {
    const { setIsLogin, setUserName, setNickName } = useLoginState();
      const { setShowLoginModal } = useShowLoginModal();
    const logout = useLogout();
    
      return useMutation({
        mutationFn: getMemberUsingTokenFn,
        onSuccess: (data: {
          data?: {
            nickname: string;
            username: string;
          };
          msg?: string;
          resultCode?: string;
          error: any;
        }) => {
            if (data.error) {
                console.log("MemberAPI.ts 파일 : ",data.error);
            } else {
                fetch(
                `${apiUrl}/api/member/mypage`,
                    {
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        method: 'GET',
                        credentials: 'include',
                    },
                ).then(res => {
                    res.json().then(data => {
                        setUserName(data.data?.username as string);
                        setNickName(data.data?.nickname as string);
                    })
                })
            setIsLogin();
            setShowLoginModal(false); // 로그인 성공 후 모달 닫기
            toastNotice('로그인 완료.'); // 성공 메시지 토스트로 표시
          }
        },
        onError: (error: Error) => {
          logout.mutate();
        },
      });
}