import { useEffect } from 'react';
import { orderAPI } from '../../api/OrderAPI';

/**
 * @description 토스 결제 성공시 리다이렉트로 받는 주소
 */
const TossPaymentSuccess = () => {
  const tossPaymentSuccess = orderAPI.paymentSuccessAPI();
  useEffect(() => {
    tossPaymentSuccess.mutate();
  }, []);
  return <div> 결제 대기 중입니다... </div>;
};
export default TossPaymentSuccess;
