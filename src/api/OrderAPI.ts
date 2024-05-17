// 이곳에서 API작성해서 불러오기

import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

const paymentSuccessAPI = () => {
  const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;
  const [searchParams] = useSearchParams();
  const jsonBody = {
    orderId: searchParams.get('orderId'),
    paymentKey: searchParams.get('paymentKey'),
    amount: searchParams.get('amount'),
  };
  console.log('OrderAPI.ts 파일 : ', jsonBody);
  const mutationFn = async () => {
    const response = await fetch(`${apiUrl}/api/order/confirm2`, {
      method: 'POST',
      body: JSON.stringify(jsonBody),
      credentials: 'include',
    });
    return response.json();
  };

  return useMutation({
    mutationFn,
    // onMutate: (variables) => {},
    // onError: (error, variables, context) => {},
    onSuccess: (data) => {
      return data;
    },
    // onSettled: (data, error, variables, context) => {},
  });
};

export const orderAPI = {
  paymentSuccessAPI,
};
