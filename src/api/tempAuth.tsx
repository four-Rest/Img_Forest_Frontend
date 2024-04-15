import { useEffect } from 'react';
import { useLogin } from './reactQuery/loginQuery';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file tempAuth.tsx
 * @version 0.0.1 "2024-04-12 03:47:08"
 * @description 로그인 기능 추가전까지 잠시 사용하는 로그인 기능
 */
const TempAuth = () => {
  const login = useLogin();
  useEffect(() => {
    login.mutate({
      username: 'test666',
      password: 'test666',
    });
  }, []);
};
export default TempAuth;
