import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCheckSocialLogin } from './reactQuery/checkSocialLogin';

const CheckSocialLogin = () => {
  // const frontUrl = process.env.REACT_APP_CORE_FRONT_BASE_URL;

  const { mutate } = useCheckSocialLogin();
  useEffect(() => {
    // 서버에 accessToken 검증 요청
    mutate();
  }, []);

  return (
    <div>
      <h1>Checking Social Login...</h1>
      {/* 추가적인 UI 요소나 메시지 */}
    </div>
  );
};

export default CheckSocialLogin;
