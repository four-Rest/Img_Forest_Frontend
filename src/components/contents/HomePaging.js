import React, { useState, useEffect } from "react";
import Paging from "../modules/paging";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../api/AuthContext";

function HomePaging() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, logout } = useAuth();
  const [articleData, setArticleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const apiBaseUrl = process.env.REACT_APP_CORE_API_BASE_URL;
  const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;

  const pageNo = useState(0);
  // const pageSize = useState(10);

  // let pageNo = 0;
  let pageSize = 10;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has("check-social-login")) {
      // 서버에 accessToken 검증 요청
      fetch(`${apiUrl}/api/member/checkAccessToken`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // 서버 응답에서 resultCode와 LoginResponseDto 정보를 확인
          if (data.resultCode === "200") {
            // 로그인 성공 처리
            login();
            console.log("로그인 성공");
            localStorage.setItem("username", data.data.username); // 응답에서 username 추출
            localStorage.setItem("isLogin", "true");

            const url = new URL(window.location);
            url.searchParams.delete("check-social-login");
            window.history.replaceState({}, "", url);
          } else {
            // 로그인 실패 처리 (유효하지 않은 토큰, 토큰 만료 등)
            console.log(data.message); // 서버에서 보낸 오류 메시지 출력
            logout(); // 로그아웃 처리
          }
        })
        .catch((error) => {
          console.error("에러 발생:", error);
          logout(); // 네트워크 오류 등의 이유로 로그아웃 처리
        });
    }
  }, [location.search]);

  return (
    <Paging
      articledata={articleData}
      parentLoading={loading}
      totalpages={totalPages}
      pageno={pageNo}
      pagesize={pageSize}
      hasParams={false}
    />
  );
}

export default HomePaging;
