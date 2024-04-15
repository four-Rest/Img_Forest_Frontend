import { useEffect } from "react";

/**
 * @author Sukyung Lee <ssssksss@naver.com> 
 * @file tempAuth.tsx
 * @version 0.0.1 "2024-04-12 03:47:08"
 * @description 설명 
 */
const TempAuth = () => {
    const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;
    useEffect(()=>{
        const login = async () => {
            const response = await fetch(`${apiUrl}/api/member/login`, {
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                  username: "test666",
                  password: "test666",
                }),
              });
              if (response.ok) {
                const res = await response.json(); // 응답이 성공적인 경우에만 JSON 파싱
                localStorage.setItem("username", res.data.username);
                localStorage.setItem("nickname", res.data.nickname);
                localStorage.setItem('isLogin', 'true');
              
                console.log("로그인")
              } else {
                console.log("tempAuth.tsx 파일 : 에러");
                // 서버 에러 처리
              }
        }
        login();
    },[])

    // useEffect(()=>{
    //   const signUp = async () => {
    //     const response = await fetch(`${apiUrl}/api/member/signup`, {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         method: "POST",
    //         credentials: "include",
    //         body: JSON.stringify({
    //           username: "test666",
    //           password1: "test666",
    //           password2: "test666",
    //           email: "test666@naver.com",
    //           nickname: "test666",
    //         }),
    //       });
    //       if (response.ok) {
    //         const res = await response.json(); // 응답이 성공적인 경우에만 JSON 파싱
    //         localStorage.setItem("username", res.data.username);
    //         localStorage.setItem("nickname", res.data.nickname);
    //         localStorage.setItem('isLogin', 'true');
          
    //         console.log("로그인")
    //       } else {
    //         console.log("tempAuth.tsx 파일 : 에러");
    //         // 서버 에러 처리
    //       }
    // }
    // signUp();
    // },[])
};
export default TempAuth
