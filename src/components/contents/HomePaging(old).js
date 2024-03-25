// **same
import React, { useContext, useState, useEffect, useRef } from "react";
// import "../../styles/styles.css";
// import { IdDetailContext } from "../../api/IdDetailContext";
// import DetailModal from "../elements/DetailModal";
// same**
import Paging from "../modules/paging";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../api/AuthContext";
// import "../modules/pagingVar";
//import DetailModal

function HomePaging() {
  // Paging();
  // **same
  // const [idDetail, setIdDetail] = useState(0);
  // const { updateIdDetail } = useContext(IdDetailContext);
  const [articleData, setArticleData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [pageNo, setPageNo] = useState(0);
  const pageNo = 0;
  // const [pageSize, setPageSize] = useState(10);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(0);
  const apiBaseUrl = process.env.REACT_APP_CORE_API_BASE_URL;
  // const [showDetailModal, setShowDetailModal] = useState(false); // 상세보기를 위한 변수

  // const target = useRef(null); // IntersectionObserver를 위한 ref 생성
  // const handleImageClick = (id) => {
  //   setIdDetail(id);
  //   updateIdDetail({ id: id });
  //   setShowDetailModal(true);
  //   console.log(id);
  // };
  // same**
  const { login, logout } = useAuth();

  const apiUrl = process.env.REACT_APP_CORE_API_BASE_URL;

  const location = useLocation();
  const navigate = useNavigate();

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

  // 삼항연산자?
  // **same?
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/article?pageNo=${pageNo}&pageSize=${pageSize}`
        );
        const data = await res.json();
        console.log(data.data);
        // setArticleData(prevData => prevData.concat(data.data));
        setArticleData((prevData) => {
          const newData = data.data.filter(
            (newArticle) =>
              !prevData.some((prevArticle) => prevArticle.id === newArticle.id)
          );
          return [...prevData, ...newData];
        });
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [apiBaseUrl, pageNo, pageSize]);
  // same**?

  // **same
  // useEffect(() => {
  //   // useEffect를 사용하여 target 요소의 가시성을 감시하고 스크롤 시 추가 데이터 로드
  //   const observer = new IntersectionObserver(
  //     async (entries) => {
  //       if (entries[0].isIntersecting && !loading && pageNo < totalPages - 1) {
  //         // target 요소가 화면에 나타났고 로딩 중이 아닌 경우
  //         setPageNo((prevPageNo) => prevPageNo + 1);
  //       }
  //     },
  //     { threshold: 0 }
  //   ); // IntersectionObserver 옵션 설정

  //   if (!loading && target.current) {
  //     // 로딩 중이 아니고 target이 현재 존재하는 경우
  //     observer.observe(target.current); // IntersectionObserver를 target에 등록하여 가시성 감시
  //   }

  //   return () => {
  //     if (target.current) {
  //       observer.unobserve(target.current); // 컴포넌트 언마운트 시 IntersectionObserver에서 target 제거
  //     }
  //   };
  // }, [loading, pageNo, totalPages]);
  // same**

  // // 클릭시 modal로 redirection
  // return articleData.length !== 0 ? (
  //   <div className="container pt-24">
  //     {articleData.map((article) => (
  //       <div key={article.id} className="box">
  //         <img
  //           src={`/imgFiles/${article.imgFilePath}/${article.imgFileName}`}
  //           alt="a"
  //           onClick={() => handleImageClick(article.id)}
  //         />
  //       </div>
  //     ))}
  //     <div ref={target}></div>
  //     <DetailModal
  //       showModal={showDetailModal}
  //       setShowModal={setShowDetailModal}
  //       articleId={idDetail}
  //     />
  //   </div>
  // ) : (
  //   <></>
  // );
  return (
    <Paging
      articleData={articleData}
      loading={loading}
      totalpages={totalPages}
      pageno={pageNo}
      // isHome={true}
      pagesize={pageSize}
      // setPageNo={setPageNo}
    />
  );
}

export default HomePaging;
