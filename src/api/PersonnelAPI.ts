/**
 * @description 개인정보수정, 개인 구매내역, 개인 판매 내역, 추천 목록 관련  
 */

import { useMutation, useQuery } from "@tanstack/react-query";
const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;

const readPersonelInformation = () => {
      const result = useQuery({
        queryKey: ['readPersonelInformation'],
        queryFn: async () => {
          const response = await fetch(`${apiUrl}/api/member/mypage`, {
            method: 'GET',
            credentials: 'include',
          });
          const data = await response.json();
            return data;
        },
      });
      return result;
}

const updatePersonelInformation = () => {
      const mutationFn = async ({
          nickname,
          password1,
        password2,
          email,
        }: {
          nickname?: string,
          password1?: string,
          password2?: string;          
          email?: string;
          }) => {
        const response = await fetch(`${apiUrl}/api/member/mypage`, {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
            nickname,
            password1,
            password2,
            email,
          }),
        });

        return response.json();
      };

      return useMutation({
        mutationFn,
        // onMutate: (variables) => {},
        // onError: (error, variables, context) => {},
        onSuccess: (data, variables, context) => {
          // history.back();
          return data;
        },
        // onSettled: (data, error, variables, context) => {},
      });
}

const PersonnelAPI = {
    readPersonelInformation,
    updatePersonelInformation,
};
export default PersonnelAPI
