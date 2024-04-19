import { useEffect } from "react";

const Home = () => {

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
            }).catch(err => {
              return null;
            })
            if (response != null) {
              const res = await response.json(); // 응답이 성공적인 경우에만 JSON 파싱
              localStorage.setItem("username", res.data.username);
              localStorage.setItem("nickname", res.data.nickname);
              localStorage.setItem('isLogin', 'true');
              console.log("로그인")
            }
      }
      login();
  },[])

  return (
     <div> 123456 </div> 
  );
};
export default Home
