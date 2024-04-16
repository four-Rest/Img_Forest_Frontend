import { useEffect } from "react";


  /**
   * @author Sukyung Lee <ssssksss@naver.com> 
   * @file useWindowClick.ts
   * @version 0.0.1 "2024-04-09 01:23:36"
   * @description 윈도우 화면을 클릭하면 함수를 실행해주는 hook, 모달창이 열린 후 overlay 공간을 클릭하게되면 닫히게 해주는 역할
   * @사용  useWindowClick(() => 실행함수);
   */
  const useWindowClick = (func: () => unknown) => {
    useEffect(() => {
        const temp = () => {
            func();
        };
        window.addEventListener('click', temp);

        return () => {
            window.removeEventListener('click', temp);
        };
    }, []);
  };
  export default useWindowClick
